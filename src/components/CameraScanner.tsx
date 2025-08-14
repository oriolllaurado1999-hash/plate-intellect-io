import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Upload, X, Loader2, ScanLine, Zap, CreditCard, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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
}

const CameraScanner = ({ onAnalysisComplete, onClose }: CameraScannerProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Start camera automatically when component mounts
  useEffect(() => {
    startCamera();
    
    // Cleanup function to stop camera when component unmounts
    return () => {
      stopCamera();
    };
  }, []);

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

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);
      
      const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
      setCapturedImage(imageDataUrl);
      stopCamera();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setCapturedImage(result);
      };
      reader.readAsDataURL(file);
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
                  <span className="text-white font-medium text-lg">Scan Food</span>
                  <div className="w-10 h-10"></div> {/* Spacer */}
                </div>
              </div>

              {/* Scanning Frame */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64">
                  {/* Corner frames */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-white"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-white"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-white"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-white"></div>
                </div>
              </div>

              {/* Bottom Controls */}
              <div className="absolute bottom-0 left-0 right-0 pb-4">
                {/* Function buttons */}
                <div className="flex justify-center space-x-3 px-6 mb-6">
                  <Button
                    variant="outline"
                    className="flex flex-col items-center justify-center h-16 px-3 bg-white/90 text-black border-0 rounded-xl shadow-lg"
                    onClick={capturePhoto}
                  >
                    <ScanLine className="h-5 w-5 mb-1" />
                    <span className="text-xs font-medium">Scan Food</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="flex flex-col items-center justify-center h-16 px-3 bg-white/90 text-black border-0 rounded-xl shadow-lg"
                    onClick={() => {/* Handle barcode */}}
                  >
                    <CreditCard className="h-5 w-5 mb-1" />
                    <span className="text-xs font-medium">Barcode</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="flex flex-col items-center justify-center h-16 px-3 bg-white/90 text-black border-0 rounded-xl shadow-lg"
                    onClick={() => {/* Handle food label */}}
                  >
                    <Upload className="h-5 w-5 mb-1" />
                    <span className="text-xs font-medium">Food label</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="flex flex-col items-center justify-center h-16 px-3 bg-white/90 text-black border-0 rounded-xl shadow-lg"
                    onClick={() => fileInputRef.current?.click()}
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
              <div className="absolute bottom-safe left-4 right-4 pb-8">
                <div className="bg-black/80 backdrop-blur-md rounded-2xl p-6 mx-4">
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