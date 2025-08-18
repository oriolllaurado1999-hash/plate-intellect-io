import { useState } from 'react';
import CameraOptions from './CameraOptions';
import ScanGuide from './ScanGuide';
import CameraScanner from './CameraScanner';
import BarcodeScanner from './BarcodeScanner';

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

interface CameraFlowProps {
  onAnalysisComplete: (analysis: FoodAnalysis, imageUrl: string) => void;
  onClose: () => void;
}

type FlowStep = 'options' | 'guide' | 'scanner' | 'barcode';

const CameraFlow = ({ onAnalysisComplete, onClose }: CameraFlowProps) => {
  const [currentStep, setCurrentStep] = useState<FlowStep>('options');

  const handleScanFood = () => {
    setCurrentStep('guide');
  };

  const handleBarcodeScanner = () => {
    console.log('Navigating to barcode scanner');
    setCurrentStep('barcode');
  };

  const handleGuideComplete = () => {
    setCurrentStep('scanner');
  };

  const handleGuideClose = () => {
    setCurrentStep('options');
  };

  const handleBarcodeDetected = (barcode: string) => {
    console.log('Barcode detected:', barcode);
  };

  const handleProductAdded = () => {
    // Refresh the dashboard data when a product is added
    window.location.reload();
  };

  switch (currentStep) {
    case 'options':
      return (
        <CameraOptions 
          onClose={onClose} 
          onScanFood={handleScanFood}
          onBarcodeScanner={handleBarcodeScanner}
        />
      );
    
    case 'guide':
      return <ScanGuide onClose={handleGuideClose} onComplete={handleGuideComplete} />;
    
    case 'scanner':
      return <CameraScanner onAnalysisComplete={onAnalysisComplete} onClose={onClose} />;
    
    case 'barcode':
      return <BarcodeScanner onClose={onClose} onBarcodeDetected={handleBarcodeDetected} onProductAdded={handleProductAdded} />;
    
    default:
      return null;
  }
};

export default CameraFlow;