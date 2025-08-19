import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import GenderStep from './onboarding/GenderStep';
import WorkoutStep from './onboarding/WorkoutStep';
import SourceStep from './onboarding/SourceStep';
import ExperienceStep from './onboarding/ExperienceStep';
import DateStep from './onboarding/DateStep';
import GoalStep from './onboarding/GoalStep';
import DesiredWeightStep from './onboarding/DesiredWeightStep';
import MotivationStep from './onboarding/MotivationStep';
import SpeedStep from './onboarding/SpeedStep';
import ObstaclesStep from './onboarding/ObstaclesStep';
import DietStep from './onboarding/DietStep';
import AccomplishStep from './onboarding/AccomplishStep';
import PotentialStep from './onboarding/PotentialStep';
import TrustStep from './onboarding/TrustStep';
import HealthConnectStep from './onboarding/HealthConnectStep';
import CaloriesBurnedStep from './onboarding/CaloriesBurnedStep';
import RolloverStep from './onboarding/RolloverStep';
import RatingStep from './onboarding/RatingStep';
import NotificationStep from './onboarding/NotificationStep';
import ReferralStep from './onboarding/ReferralStep';
import AllDoneStep from './onboarding/AllDoneStep';
import GeneratingStep from './onboarding/GeneratingStep';
import CompletionStep from './onboarding/CompletionStep';
import TrialOfferStep from './onboarding/TrialOfferStep';
import TrialReminderStep from './onboarding/TrialReminderStep';

import TrialTimelineStep from './onboarding/TrialTimelineStep';
import WelcomeDashboardStep from './onboarding/WelcomeDashboardStep';
import HeightWeightStep from './onboarding/HeightWeightStep';

interface OnboardingData {
  gender: 'male' | 'female' | null;
  workouts: '0-2' | '3-5' | '6+' | null;
  source: 'instagram' | 'friend' | 'tv' | 'x' | 'facebook' | 'google' | 'tiktok' | null;
  hasTriedOtherApps: boolean | null;
  birthDate: Date | null;
  goal: 'lose' | 'maintain' | 'gain' | null;
  currentWeight: { weight: number; unit: 'kg' | 'lbs' } | null;
  height: { height: number; unit: 'cm' | 'ft' } | null;
  desiredWeight: number | null;
  lossSpeed: number | null;
  obstacle: string[];
  diet: string | null;
  accomplish: string[];
  connectHealth: boolean | null;
  addBurnedCalories: boolean | null;
  rolloverCalories: boolean | null;
  allowNotifications: boolean | null;
  referralCode: string | null;
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
    birthDate: null,
    goal: null,
    currentWeight: null,
    height: null,
    desiredWeight: null,
    lossSpeed: null,
    obstacle: [],
    diet: null,
    accomplish: [],
    connectHealth: null,
    addBurnedCalories: null,
    rolloverCalories: null,
    allowNotifications: null,
    referralCode: null,
  });

  const totalSteps = 27;

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
        return (
          <DateStep
            selected={data.birthDate}
            onSelect={(birthDate) => updateData('birthDate', birthDate)}
            onNext={handleNext}
          />
        );
      case 6:
        return (
          <GoalStep
            selected={data.goal}
            onSelect={(goal) => updateData('goal', goal)}
            onNext={handleNext}
          />
        );
      case 7:
        return (
          <HeightWeightStep
            selectedHeight={data.height}
            selectedWeight={data.currentWeight}
            onSelect={(heightWeight) => {
              updateData('height', heightWeight.height);
              updateData('currentWeight', heightWeight.weight);
            }}
            onNext={handleNext}
          />
        );
      case 8:
        return (
          <DesiredWeightStep
            selected={data.desiredWeight}
            onSelect={(weight) => updateData('desiredWeight', weight)}
            onNext={handleNext}
          />
        );
      case 9:
        return (
          <MotivationStep 
            onNext={handleNext}
            currentWeight={data.currentWeight}
            desiredWeight={data.desiredWeight}
            goal={data.goal}
          />
        );
      case 10:
        return (
          <SpeedStep
            selected={data.lossSpeed}
            onSelect={(speed) => updateData('lossSpeed', speed)}
            onNext={handleNext}
          />
        );
      case 11:
        return (
          <ObstaclesStep
            selected={data.obstacle}
            onSelect={(obstacle) => updateData('obstacle', obstacle)}
            onNext={handleNext}
          />
        );
      case 12:
        return (
          <DietStep
            selected={data.diet}
            onSelect={(diet) => updateData('diet', diet)}
            onNext={handleNext}
          />
        );
      case 13:
        return (
          <AccomplishStep
            selected={data.accomplish}
            onSelect={(accomplish) => updateData('accomplish', accomplish)}
            onNext={handleNext}
          />
        );
      case 14:
        return <PotentialStep onNext={handleNext} />;
      case 15:
        return <TrustStep onNext={handleNext} />;
      case 16:
        return (
          <HealthConnectStep
            onConnect={() => {
              updateData('connectHealth', true);
              handleNext();
            }}
            onSkip={() => {
              updateData('connectHealth', false);
              handleNext();
            }}
          />
        );
      case 17:
        return (
          <CaloriesBurnedStep
            onSelect={(addBack) => {
              updateData('addBurnedCalories', addBack);
              handleNext();
            }}
          />
        );
      case 18:
        return (
          <RolloverStep
            onSelect={(rollover) => {
              updateData('rolloverCalories', rollover);
              handleNext();
            }}
          />
        );
      case 19:
        return <RatingStep onNext={handleNext} />;
      case 20:
        return (
          <NotificationStep
            onAllow={() => {
              updateData('allowNotifications', true);
              handleNext();
            }}
            onDeny={() => {
              updateData('allowNotifications', false);
              handleNext();
            }}
          />
        );
      case 21:
        return (
          <ReferralStep
            onSubmit={(code) => {
              updateData('referralCode', code);
              handleNext();
            }}
            onSkip={() => {
              updateData('referralCode', null);
              handleNext();
            }}
          />
        );
      case 22:
        return <AllDoneStep onNext={handleNext} />;
      case 23:
        return <GeneratingStep onComplete={handleNext} />;
      case 24:
        return <CompletionStep onGetStarted={handleNext} />;
      case 25:
        return <TrialOfferStep onNext={handleNext} />;
      case 26:
        return <TrialReminderStep onNext={handleNext} />;
      case 27:
        return <WelcomeDashboardStep onComplete={() => onComplete(data)} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 pt-12">
        {currentStep > 1 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="rounded-full mr-4"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}

        {/* Progress bar */}
        <div className="flex-1">
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-foreground h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${getProgressWidth()}%` }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pb-32">
        {renderStep()}
      </div>
    </div>
  );
};

export default OnboardingFlow;