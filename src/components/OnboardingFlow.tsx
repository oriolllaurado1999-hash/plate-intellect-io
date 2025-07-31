import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import GenderStep from './onboarding/GenderStep';
import WorkoutStep from './onboarding/WorkoutStep';
import SourceStep from './onboarding/SourceStep';
import ExperienceStep from './onboarding/ExperienceStep';
import ResultsStep from './onboarding/ResultsStep';

interface OnboardingData {
  gender: 'male' | 'female' | 'other' | null;
  workouts: '0-2' | '3-5' | '6+' | null;
  source: 'instagram' | 'friend' | 'tv' | 'x' | 'facebook' | 'google' | 'tiktok' | null;
  hasTriedOtherApps: boolean | null;
}

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
}

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    gender: null,
    workouts: null,
    source: null,
    hasTriedOtherApps: null,
  });

  const totalSteps = 5;

  const updateData = (field: keyof OnboardingData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(data);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getProgressWidth = () => {
    return (currentStep / totalSteps) * 100;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <GenderStep
            selected={data.gender}
            onSelect={(gender) => updateData('gender', gender)}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <WorkoutStep
            selected={data.workouts}
            onSelect={(workouts) => updateData('workouts', workouts)}
            onNext={handleNext}
          />
        );
      case 3:
        return (
          <SourceStep
            selected={data.source}
            onSelect={(source) => updateData('source', source)}
            onNext={handleNext}
          />
        );
      case 4:
        return (
          <ExperienceStep
            selected={data.hasTriedOtherApps}
            onSelect={(hasTriedOtherApps) => updateData('hasTriedOtherApps', hasTriedOtherApps)}
            onNext={handleNext}
          />
        );
      case 5:
        return <ResultsStep onNext={handleNext} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        {currentStep > 1 ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        ) : (
          <div className="w-10"></div>
        )}

        {/* Progress bar */}
        <div className="flex-1 mx-4">
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-foreground h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${getProgressWidth()}%` }}
            />
          </div>
        </div>

        {/* Language selector */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🇺🇸</span>
          <span className="text-sm font-medium">EN</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        {renderStep()}
      </div>
    </div>
  );
};

export default OnboardingFlow;