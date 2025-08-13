import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, CheckCircle, Camera, Crop, ScanLine } from 'lucide-react';

interface ScanGuideProps {
  onClose: () => void;
  onComplete: () => void;
}

const ScanGuide = ({ onClose, onComplete }: ScanGuideProps) => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: "Perfect! Scan now.",
      subtitle: "capture the full meal",
      icon: <Camera className="h-16 w-16 text-muted-foreground" />,
      tips: [
        "Fit the entire meal in the scan lines.",
        "Don't cut off the sides of the meal.",
        "Make sure the image has good lighting."
      ]
    },
    {
      id: 2,
      title: "All ingredients visible.",
      subtitle: "Show every ingredient",
      icon: <Crop className="h-16 w-16 text-muted-foreground" />,
      tips: [
        "Make sure all ingredients are visible.",
        "Spread out layered food, like burgers.",
        "Remove covers like foil or lids."
      ]
    },
    {
      id: 3,
      title: "Barcode & library is best",
      subtitle: "Any doubt? Barcodes or Food Database",
      icon: <ScanLine className="h-16 w-16 text-muted-foreground" />,
      tips: [
        "When possible use our barcode/label scanner and food database for the highest accuracy.",
        "Our scan feature is best when you're at a restaurant and don't know all the ingredient measurements."
      ]
    }
  ];

  const currentStepData = steps[currentStep - 1];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 bg-background z-50">
      {/* Header */}
      <div className="flex justify-between items-center p-4 pt-12">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onClose}
          className="rounded-full"
        >
          <X className="h-5 w-5" />
        </Button>
        
        {/* Step indicators */}
        <div className="flex space-x-2">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === currentStep
                  ? 'bg-foreground text-background'
                  : step < currentStep
                  ? `bg-[#4AD4B2] text-white`
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {step < currentStep ? <CheckCircle className="h-4 w-4" /> : step}
            </div>
          ))}
        </div>
        
        <div className="w-10"></div> {/* Spacer */}
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8">
        {/* Success indicator */}
        <div className="flex items-center mb-6">
          <CheckCircle className="h-5 w-5 mr-2" style={{ color: '#4AD4B2' }} />
          <span className="font-medium" style={{ color: '#4AD4B2' }}>{currentStepData.title}</span>
        </div>

        {/* Image placeholder */}
        <div className="bg-muted rounded-2xl aspect-square mb-8 flex items-center justify-center">
          {currentStepData.icon}
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-8">{currentStepData.subtitle}</h1>

        {/* Tips */}
        <div className="space-y-4">
          {currentStepData.tips.map((tip, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Camera className="h-5 w-5 text-muted-foreground mt-0.5" />
              <p className="text-muted-foreground">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom button */}
      <div className="p-6">
        <Button
          onClick={handleNext}
          className="w-full h-12 text-base font-semibold"
          size="lg"
        >
          {currentStep < 3 ? 'Next' : 'Scan now'}
        </Button>
      </div>
    </div>
  );
};

export default ScanGuide;