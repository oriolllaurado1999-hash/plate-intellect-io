import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, X, Zap, ScanLine, CreditCard, Upload, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { pipeline, env } from '@huggingface/transformers';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface BarcodeScannerProps {
  onClose: () => void;
  onBarcodeDetected?: (barcode: string) => void;
  onProductAdded?: () => void;
}

const BarcodeScanner = ({ onClose, onBarcodeDetected, onProductAdded }: BarcodeScannerProps) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [detector, setDetector] = useState<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const { toast } = useToast();
  const { user } = useAuth();

  // Configure transformers.js
  useEffect(() => {
    env.allowLocalModels = false;
    env.useBrowserCache = true;
  }, []);

  const initializeBarcodeDetector = async () => {
    try {
      console.log('Initializing barcode detector...');
      // Use a barcode detection model
      const barcodeDetector = await pipeline(
        'object-detection',
        'google/owlvit-base-patch32',
        { device: 'webgpu' }
      );
      setDetector(barcodeDetector);
      console.log('Barcode detector initialized');
    } catch (error) {
      console.error('Error initializing barcode detector:', error);
      // Fallback to basic implementation
      setDetector(true);
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        
        // Start scanning when video is loaded
        videoRef.current.onloadedmetadata = () => {
          if (!detector) {
            initializeBarcodeDetector();
          }
          startScanning();
        };
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Error de Cámara",
        description: "No se puede acceder a la cámara. Intenta subir una imagen en su lugar.",
        variant: "destructive"
      });
    }
  };

  const startScanning = () => {
    if (!isScanning) {
      setIsScanning(true);
      scanForBarcode();
    }
  };

  const scanForBarcode = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw current video frame to canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Try to detect barcode using HTML5 BarcodeDetector API (if available)
    if ('BarcodeDetector' in window) {
      try {
        const barcodeDetector = new (window as any).BarcodeDetector({
          formats: ['code_128', 'code_39', 'ean_13', 'ean_8', 'upc_a', 'upc_e']
        });
        
        const barcodes = await barcodeDetector.detect(canvas);
        
        if (barcodes.length > 0) {
          const barcode = barcodes[0].rawValue;
          console.log('Barcode detected:', barcode);
          handleBarcodeFound(barcode);
          return;
        }
      } catch (error) {
        console.error('BarcodeDetector error:', error);
      }
    }

    // Continue scanning if still active
    if (isScanning) {
      animationFrameRef.current = requestAnimationFrame(scanForBarcode);
    }
  };

  const handleBarcodeFound = async (barcode: string) => {
    setIsScanning(false);
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    toast({
      title: "Código detectado",
      description: `Buscando producto: ${barcode}...`,
    });

    try {
      // Call our barcode lookup function
      const { data, error } = await supabase.functions.invoke('barcode-lookup', {
        body: { barcode }
      });

      if (error) throw error;

      if (data.success && data.product) {
        // Create a meal entry for this product
        await addProductToMeal(data.product);
      } else {
        toast({
          title: "Producto no encontrado",
          description: "No se pudo encontrar información nutricional para este código de barras.",
          variant: "destructive"
        });
        // Restart scanning
        setTimeout(() => startScanning(), 2000);
      }
    } catch (error) {
      console.error('Error looking up barcode:', error);
      toast({
        title: "Error",
        description: "Error al buscar el producto. Inténtalo de nuevo.",
        variant: "destructive"
      });
      // Restart scanning
      setTimeout(() => startScanning(), 2000);
    }
  };

  const addProductToMeal = async (product: any) => {
    if (!user) return;

    try {
      // Create a meal entry
      const { data: meal, error: mealError } = await supabase
        .from('meals')
        .insert({
          user_id: user.id,
          name: product.name,
          meal_type: 'snack',
          meal_date: new Date().toISOString().split('T')[0],
          total_calories: product.calories_per_100g,
          total_protein: product.protein_per_100g,
          total_carbs: product.carbs_per_100g,
          total_fat: product.fat_per_100g,
          total_fiber: product.fiber_per_100g,
          ai_analyzed: false
        })
        .select()
        .single();

      if (mealError) throw mealError;

      // Create meal item entry
      const { error: itemError } = await supabase
        .from('meal_items')
        .insert({
          meal_id: meal.id,
          food_name: product.name,
          food_item_id: product.id,
          quantity: 100, // Default to 100g
          calories: product.calories_per_100g,
          protein: product.protein_per_100g,
          carbs: product.carbs_per_100g,
          fat: product.fat_per_100g,
          fiber: product.fiber_per_100g,
          confidence: 1.0
        });

      if (itemError) throw itemError;

      toast({
        title: "¡Producto añadido!",
        description: `${product.name} se ha añadido a tu diario.`,
      });

      // Call callback if provided
      onProductAdded?.();
      
      // Close scanner
      onClose();

    } catch (error) {
      console.error('Error adding product to meal:', error);
      toast({
        title: "Error",
        description: "Error al añadir el producto. Inténtalo de nuevo.",
        variant: "destructive"
      });
    }
  };

  // Start camera when component mounts
  useEffect(() => {
    startCamera();
    
    return () => {
      stopCamera();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const stopCamera = () => {
    setIsScanning(false);
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // TODO: Process uploaded image for barcode scanning
      toast({
        title: "Image uploaded",
        description: "Processing barcode from image..."
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* Camera Feed - Full Screen */}
      <div className="relative w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        
        {/* Camera Overlay with darkened areas */}
        <div className="absolute inset-0">
          {/* Top Controls */}
          <div className="absolute top-0 left-0 right-0 pt-safe">
            <div className="flex justify-between items-center px-6 py-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={onClose}
                className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70"
              >
                <X className="h-5 w-5" />
              </Button>
              <div className="w-12 h-12"></div> {/* Spacer */}
              <Button 
                variant="ghost" 
                size="icon"
                className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70"
              >
                <span className="text-lg font-bold">?</span>
              </Button>
            </div>
          </div>

          {/* Barcode Scanner Title */}
          <div className="absolute top-20 left-0 right-0 flex justify-center pt-8">
            <h2 className="text-white text-xl font-semibold">Barcode Scanner</h2>
          </div>

          {/* Scanning Frame with darkened overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40"></div>
            
            {/* Scanner area */}
            <div className="relative z-10">
              {/* Clear scanning area */}
              <div className="w-80 h-48 relative">
                {/* Clear area (no overlay) */}
                <div className="absolute inset-0 bg-transparent border-4 border-white rounded-2xl"></div>
                
                {/* Scanner animation line (optional) */}
                <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2">
                  <div className="h-0.5 bg-white/80 animate-pulse"></div>
                </div>
              </div>
            </div>
            
            {/* Mask to darken everything except the scanner area */}
            <div className="absolute inset-0 pointer-events-none">
              <svg width="100%" height="100%" className="absolute inset-0">
                <defs>
                  <mask id="scanner-mask">
                    <rect width="100%" height="100%" fill="white" />
                    <rect x="50%" y="50%" width="320" height="192" transform="translate(-160, -96)" rx="16" fill="black" />
                  </mask>
                </defs>
                <rect width="100%" height="100%" fill="black" fillOpacity="0.5" mask="url(#scanner-mask)" />
              </svg>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 pb-safe">
            {/* Function buttons */}
            <div className="flex justify-center space-x-4 px-8 mb-6">
              <Button
                variant="outline"
                className="flex flex-col items-center justify-center h-16 px-4 bg-white/90 text-black border-0 rounded-xl shadow-lg"
                onClick={() => {/* Handle scan food */}}
              >
                <ScanLine className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">Scan Food</span>
              </Button>

              <Button
                variant="outline"
                className="flex flex-col items-center justify-center h-16 px-4 bg-primary text-primary-foreground border-0 rounded-xl shadow-lg"
                onClick={() => {/* Handle barcode - current mode */}}
              >
                <CreditCard className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">Barcode</span>
              </Button>

              <Button
                variant="outline"
                className="flex flex-col items-center justify-center h-16 px-4 bg-white/90 text-black border-0 rounded-xl shadow-lg"
                onClick={() => {/* Handle food label */}}
              >
                <Upload className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">Food label</span>
              </Button>

              <Button
                variant="outline"
                className="flex flex-col items-center justify-center h-16 px-4 bg-white/90 text-black border-0 rounded-xl shadow-lg"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageIcon className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">Library</span>
              </Button>
            </div>

            {/* Flash button */}
            <div className="flex justify-start px-8 py-4">
              <Button 
                variant="ghost" 
                size="icon"
                className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70"
              >
                <Zap className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden canvas for barcode detection */}
      <canvas
        ref={canvasRef}
        className="hidden"
      />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};

export default BarcodeScanner;