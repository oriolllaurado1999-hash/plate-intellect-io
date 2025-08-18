import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Upload, X, Loader2, ScanLine, Zap, CreditCard, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/useTranslation';
import { supabase } from '@/integrations/supabase/client';

// Declare BarcodeDetector type for TypeScript
declare global {
  interface Window {
    BarcodeDetector?: any;
  }
}

interface DetectedBarcode {
  rawValue: string;
  format: string;
}

interface FoodAnalysis {
  foods: Array<{
    name: string;
    quantity: number;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    confidence: number;
  }>;
  overall_confidence: number;
  meal_name: string;
}

interface CameraScannerProps {
  onAnalysisComplete: (analysis: FoodAnalysis, imageUrl: string) => void;
  onClose: () => void;
  onModeChange?: (mode: 'barcode' | 'food-label' | 'library') => void;
}

const CameraScanner = ({ onAnalysisComplete, onClose, onModeChange }: CameraScannerProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [activeMode, setActiveMode] = useState<'scan-food' | 'barcode' | 'library'>('scan-food');
  const [isScanning, setIsScanning] = useState(false);
  const [barcodeAnalyzing, setBarcodeAnalyzing] = useState(false);
  const [barcodeDetector, setBarcodeDetector] = useState<any>(null);
  const [animationFrameId, setAnimationFrameId] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { t } = useTranslation();

  // Initialize barcode detector and start camera
  useEffect(() => {
    initializeBarcodeDetector();
    startCamera();
    
    // Cleanup function to stop camera when component unmounts
    return () => {
      stopCamera();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const initializeBarcodeDetector = async () => {
    try {
      if ('BarcodeDetector' in window) {
        const detector = new (window as any).BarcodeDetector();
        setBarcodeDetector(detector);
        console.log('BarcodeDetector initialized');
      } else {
        console.log('BarcodeDetector not supported, using fallback method');
        // We'll implement a fallback that works by taking a photo when user taps
        setBarcodeDetector('fallback');
      }
    } catch (error) {
      console.error('Error initializing BarcodeDetector:', error);
      // Use fallback method
      setBarcodeDetector('fallback');
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment', // Use back camera on mobile
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please try uploading an image instead.",
        variant: "destructive"
      });
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const capturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);
      
      // If in barcode mode and using fallback method, try to process as barcode
      if (activeMode === 'barcode' && barcodeDetector === 'fallback') {
        const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        await processBarcodeFromImage(imageDataUrl);
        return;
      }
      
      const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
      setCapturedImage(imageDataUrl);
      stopCamera();
    }
  };

  const processBarcodeFromImage = async (imageData: string) => {
    // For fallback mode, we'll send the image to analyze-food function
    // which can potentially detect text/barcodes
    setBarcodeAnalyzing(true);
    
    try {
      toast({
        title: "Procesando imagen",
        description: "Buscando código de barras en la imagen...",
        duration: 2000
      });

      // For now, show a simple manual input option
      const barcodeInput = prompt("No se pudo detectar automáticamente. Por favor, introduce el código de barras manualmente:");
      
      if (barcodeInput) {
        await handleBarcodeFound(barcodeInput);
      } else {
        setBarcodeAnalyzing(false);
        toast({
          title: "Cancelado",
          description: "Escaneo cancelado por el usuario",
          duration: 2000
        });
      }
    } catch (error) {
      setBarcodeAnalyzing(false);
      toast({
        title: "Error",
        description: "No se pudo procesar la imagen",
        variant: "destructive"
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setCapturedImage(result);
        stopCamera(); // Stop camera when image is loaded from gallery
      };
      reader.readAsDataURL(file);
    }
    // Clear the input value to allow selecting the same file again if needed
    event.target.value = '';
  };

  const openGallery = () => {
    fileInputRef.current?.click();
  };

  const handleBarcodeMode = () => {
    setActiveMode('barcode');
    setIsScanning(true);
    
    // Show initial instruction
    toast({
      title: t.barcodeScanner,
      description: t.positionBarcodeInFrame,
      duration: 3000
    });

    // Check if we need to use fallback mode
    if (!barcodeDetector || barcodeDetector === 'fallback') {
      setTimeout(() => {
        toast({
          title: "Modo manual (Safari)",
          description: "Pulsa el botón de captura cuando el código esté centrado",
          duration: 5000
        });
      }, 1000);
    } else {
      // Start real barcode scanning for supported browsers
      startBarcodeScanning();
    }
    
    onModeChange?.('barcode');
  };

  const startBarcodeScanning = () => {
    if (!barcodeDetector) {
      console.log('Barcode detector not ready');
      return;
    }

    if (barcodeDetector === 'fallback') {
      // Fallback method: Show instructions for manual capture
      toast({
        title: "Modo manual activado",
        description: "Pulsa el botón de captura cuando el código esté centrado",
        duration: 4000
      });
      return;
    }

    const scanForBarcode = async () => {
      if (!isScanning || activeMode !== 'barcode') return;

      try {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (video && canvas && context) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0);

          // Detect barcodes in the current frame
          if (barcodeDetector && typeof barcodeDetector.detect === 'function') {
            const barcodes = await barcodeDetector.detect(canvas);
            
            if (barcodes && barcodes.length > 0) {
              console.log('Barcode detected:', barcodes[0].rawValue);
              setBarcodeAnalyzing(true);
              await handleBarcodeFound(barcodes[0].rawValue);
              return;
            }
          }
        }

        // Continue scanning if no barcode found
        const frameId = requestAnimationFrame(scanForBarcode);
        setAnimationFrameId(frameId);
      } catch (error) {
        console.error('Error scanning for barcode:', error);
        // Continue scanning despite errors
        const frameId = requestAnimationFrame(scanForBarcode);
        setAnimationFrameId(frameId);
      }
    };

    scanForBarcode();
  };

  const handleBarcodeFound = async (barcode: string) => {
    try {
      setIsScanning(false);
      setBarcodeAnalyzing(true);

      toast({
        title: "Código detectado",
        description: "Buscando información del producto...",
        duration: 2000
      });

      // Look up product using the barcode-lookup edge function
      const { data, error } = await supabase.functions.invoke('barcode-lookup', {
        body: { barcode }
      });

      if (error) {
        throw error;
      }

      if (data && data.success) {
        // Add product to database
        await addProductToMeal(data.product, barcode);
      } else {
        throw new Error(data?.error || 'Producto no encontrado');
      }
    } catch (error) {
      console.error('Error processing barcode:', error);
      setBarcodeAnalyzing(false);
      setIsScanning(false);
      
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "No se pudo procesar el código de barras",
        variant: "destructive"
      });
      
      // Restart scanning
      setTimeout(() => {
        setIsScanning(true);
        startBarcodeScanning();
      }, 2000);
    }
  };

  const addProductToMeal = async (product: any, barcode: string) => {
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Usuario no autenticado');
      }

      // Create meal entry
      const { data: mealData, error: mealError } = await supabase
        .from('meals')
        .insert({
          user_id: user.id,
          name: product.name || 'Producto escaneado',
          meal_type: 'snack',
          meal_date: new Date().toISOString().split('T')[0],
          ai_analyzed: false,
          total_calories: product.calories_per_100g || 0,
          total_protein: product.protein_per_100g || 0,
          total_carbs: product.carbs_per_100g || 0,
          total_fat: product.fat_per_100g || 0,
          total_fiber: product.fiber_per_100g || 0
        })
        .select()
        .single();

      if (mealError) throw mealError;

      // Create meal item
      const { error: itemError } = await supabase
        .from('meal_items')
        .insert({
          meal_id: mealData.id,
          food_name: product.name || 'Producto escaneado',
          food_item_id: product.id,
          quantity: 1,
          calories: product.calories_per_100g || 0,
          protein: product.protein_per_100g || 0,
          carbs: product.carbs_per_100g || 0,
          fat: product.fat_per_100g || 0,
          fiber: product.fiber_per_100g || 0,
          confidence: 1.0
        });

      if (itemError) throw itemError;

      // Capture image for display
      const video = videoRef.current;
      const canvas = canvasRef.current;
      let imageUrl = '';

      if (video && canvas) {
        const context = canvas.getContext('2d');
        if (context) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0);
          imageUrl = canvas.toDataURL('image/jpeg', 0.8);
        }
      }

      // Close camera and complete analysis
      stopCamera();
      onClose();

      // Create analysis result for callback
      const analysis: FoodAnalysis = {
        foods: [{
          name: product.name || 'Producto escaneado',
          quantity: 1,
          calories: product.calories_per_100g || 0,
          protein: product.protein_per_100g || 0,
          carbs: product.carbs_per_100g || 0,
          fat: product.fat_per_100g || 0,
          fiber: product.fiber_per_100g || 0,
          confidence: 1.0
        }],
        overall_confidence: 1.0,
        meal_name: product.name || 'Producto escaneado'
      };

      // Call the analysis complete callback
      onAnalysisComplete(analysis, imageUrl);

      toast({
        title: "¡Producto añadido!",
        description: `${product.name || 'Producto'} ha sido añadido a tu diario`,
        duration: 3000
      });

    } catch (error) {
      console.error('Error adding product to meal:', error);
      throw error;
    }
  };


  const analyzeImage = async () => {
    if (!capturedImage) return;

    setIsAnalyzing(true);
    
    try {
      console.log('Starting image analysis...');
      console.log('Image data length:', capturedImage.length);
      
      const { data, error } = await supabase.functions.invoke('analyze-food', {
        body: { imageBase64: capturedImage }
      });

      console.log('Supabase response:', { data, error });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      if (data && data.success) {
        console.log('Analysis successful:', data.analysis);
        onAnalysisComplete(data.analysis, capturedImage);
        toast({
          title: "Analysis Complete",
          description: `Found ${data.analysis.foods.length} food items`
        });
      } else {
        console.error('Analysis failed:', data);
        throw new Error(data?.error || 'Analysis failed');
      }
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Unable to analyze the image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
  };

  return (
    <div className="fixed inset-0 bg-black z-50">
      {!capturedImage ? (
        <>
          {/* Camera Feed - Full Screen */}
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            <canvas ref={canvasRef} className="hidden" />
            
            {/* Camera Overlay */}
            <div className="absolute inset-0">
              {/* Top Controls */}
              <div className="absolute top-0 left-0 right-0 pt-4 z-10">
                <div className="flex justify-between items-center px-6 py-4">
                  <button 
                    onClick={onClose}
                    className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 flex items-center justify-center z-20"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <span className="text-white font-medium text-lg">
                    {activeMode === 'barcode' ? t.barcodeScanner : t.scanFood}
                  </span>
                  <div className="w-10 h-10"></div> {/* Spacer */}
                </div>
              </div>

              {/* Scanning Frame */}
              <div className="absolute inset-0 flex items-center justify-center" style={{ marginTop: '-60px' }}>
                {activeMode === 'barcode' ? (
                  // Overlay effect for barcode scanning
                  <>
                    {/* Dark overlay outside rectangle */}
                    <div className="absolute inset-0 bg-black/50"></div>
                    {/* Clear rectangle area */}
                    <div 
                      className="relative bg-transparent"
                      style={{
                        width: '320px',
                        height: '192px',
                        boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)'
                      }}
                    >
                      {/* Simple white rectangle border with rounded corners */}
                      <div className={`absolute inset-0 border-2 rounded-lg transition-colors duration-300 ${
                        barcodeAnalyzing ? 'border-[#4AD4B2]' : 'border-white'
                      }`}></div>
                    </div>
                  </>
                ) : (
                  // Square frame for food scanning
                  <div className="relative w-64 h-64">
                    <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-white"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-white"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-white"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-white"></div>
                  </div>
                )}
              </div>

              {/* Bottom Controls */}
              <div className="absolute bottom-0 left-0 right-0 pb-4">
                {/* Function buttons */}
                <div className="flex justify-center space-x-4 px-6 mb-6">
                  <Button
                    variant="outline"
                    className={`flex flex-col items-center justify-center h-16 w-20 border-0 rounded-xl shadow-lg transition-all ${
                      activeMode === 'barcode' 
                        ? 'bg-white text-black ring-2 ring-blue-500' 
                        : 'bg-white/70 text-black/70'
                    }`}
                    onClick={() => {
                      setActiveMode('barcode');
                      handleBarcodeMode();
                    }}
                  >
                    <CreditCard className="h-5 w-5 mb-1" />
                    <span className="text-xs font-medium">Barcode</span>
                  </Button>

                  <Button
                    variant="outline"
                    className={`flex flex-col items-center justify-center h-16 w-20 border-0 rounded-xl shadow-lg transition-all ${
                      activeMode === 'scan-food' 
                        ? 'bg-white text-black ring-2 ring-blue-500' 
                        : 'bg-white/70 text-black/70'
                    }`}
                    onClick={() => {
                      setActiveMode('scan-food');
                      capturePhoto();
                    }}
                  >
                    <ScanLine className="h-5 w-5 mb-1" />
                    <span className="text-xs font-medium">Scan Food</span>
                  </Button>

                  <Button
                    variant="outline"
                    className={`flex flex-col items-center justify-center h-16 w-20 border-0 rounded-xl shadow-lg transition-all ${
                      activeMode === 'library' 
                        ? 'bg-white text-black ring-2 ring-blue-500' 
                        : 'bg-white/70 text-black/70'
                    }`}
                    onClick={() => {
                      setActiveMode('library');
                      openGallery();
                    }}
                  >
                    <ImageIcon className="h-5 w-5 mb-1" />
                    <span className="text-xs font-medium">Library</span>
                  </Button>
                </div>

                {/* Capture button and flash */}
                <div className="flex items-center justify-center px-8 py-4">
                  <div className="flex items-center space-x-8">
                    {/* Flash button */}
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50"
                    >
                      <Zap className="h-5 w-5" />
                    </Button>
                    
                    {/* Capture button */}
                    <Button 
                      onClick={capturePhoto}
                      disabled={!stream}
                      className="w-20 h-20 rounded-full bg-white text-black hover:bg-gray-100 shadow-2xl border-4 border-white/20 disabled:opacity-50"
                    >
                      {!stream ? (
                        <Camera className="h-8 w-8" />
                      ) : (
                        <div className="w-4 h-4 bg-black rounded-full"></div>
                      )}
                    </Button>
                    
                    {/* Help button */}
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50"
                    >
                      <span className="text-lg font-bold">?</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileUpload}
            className="hidden"
          />
        </>
      ) : (
        <>
          {/* Captured Image Preview - Full Screen */}
          <div className="relative w-full h-full">
            <img
              src={capturedImage}
              alt="Captured food"
              className="w-full h-full object-cover"
            />
            
            {/* Preview Overlay */}
            <div className="absolute inset-0 bg-black/40">
              {/* Top Controls */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                <button 
                  onClick={retakePhoto}
                  className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 flex items-center justify-center"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Bottom Actions */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 mx-4">
                  <div className="space-y-4">
                    <Button
                      onClick={analyzeImage}
                      disabled={isAnalyzing}
                      className="w-full bg-white text-black hover:bg-gray-200 font-semibold py-3"
                      size="lg"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Analyzing Food...
                        </>
                      ) : (
                        'Analyze Food'
                      )}
                    </Button>
                    
                    <div className="text-center">
                      <Button 
                        variant="ghost" 
                        onClick={retakePhoto}
                        className="text-white hover:bg-white/20"
                      >
                        Retake Photo
                      </Button>
                    </div>

                    <p className="text-xs text-white/70 text-center">
                      AI will identify foods and calculate nutrition automatically
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CameraScanner;