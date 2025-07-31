import { useState } from 'react';
import CameraOptions from './CameraOptions';
import ScanGuide from './ScanGuide';
import CameraScanner from './CameraScanner';

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

type FlowStep = 'options' | 'guide' | 'scanner';

const CameraFlow = ({ onAnalysisComplete, onClose }: CameraFlowProps) => {
  const [currentStep, setCurrentStep] = useState<FlowStep>('options');

  const handleScanFood = () => {
    setCurrentStep('guide');
  };

  const handleGuideComplete = () => {
    setCurrentStep('scanner');
  };

  const handleGuideClose = () => {
    setCurrentStep('options');
  };

  switch (currentStep) {
    case 'options':
      return <CameraOptions onClose={onClose} onScanFood={handleScanFood} />;
    
    case 'guide':
      return <ScanGuide onClose={handleGuideClose} onComplete={handleGuideComplete} />;
    
    case 'scanner':
      return <CameraScanner onAnalysisComplete={onAnalysisComplete} onClose={onClose} />;
    
    default:
      return null;
  }
};

export default CameraFlow;