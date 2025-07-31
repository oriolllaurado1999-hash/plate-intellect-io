import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, X, Zap, ScanLine, CreditCard, Upload, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BarcodeScannerProps {
  onClose: () => void;
  onBarcodeDetected?: (barcode: string) => void;
}

const BarcodeScanner = ({ onClose, onBarcodeDetected }: BarcodeScannerProps) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

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