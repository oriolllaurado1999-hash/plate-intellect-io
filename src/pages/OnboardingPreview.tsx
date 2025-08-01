import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import GenderStep from '@/components/onboarding/GenderStep';
import WorkoutStep from '@/components/onboarding/WorkoutStep';
import SourceStep from '@/components/onboarding/SourceStep';
import ExperienceStep from '@/components/onboarding/ExperienceStep';
import ResultsStep from '@/components/onboarding/ResultsStep';
import DateStep from '@/components/onboarding/DateStep';
import GoalStep from '@/components/onboarding/GoalStep';
import DesiredWeightStep from '@/components/onboarding/DesiredWeightStep';
import MotivationStep from '@/components/onboarding/MotivationStep';
import SpeedStep from '@/components/onboarding/SpeedStep';
import ComparisonStep from '@/components/onboarding/ComparisonStep';
import ObstaclesStep from '@/components/onboarding/ObstaclesStep';
import DietStep from '@/components/onboarding/DietStep';
import AccomplishStep from '@/components/onboarding/AccomplishStep';
import PotentialStep from '@/components/onboarding/PotentialStep';
import TrustStep from '@/components/onboarding/TrustStep';
import HealthConnectStep from '@/components/onboarding/HealthConnectStep';
import CaloriesBurnedStep from '@/components/onboarding/CaloriesBurnedStep';
import RolloverStep from '@/components/onboarding/RolloverStep';
import RatingStep from '@/components/onboarding/RatingStep';
import NotificationStep from '@/components/onboarding/NotificationStep';
import ReferralStep from '@/components/onboarding/ReferralStep';
import AllDoneStep from '@/components/onboarding/AllDoneStep';
import GeneratingStep from '@/components/onboarding/GeneratingStep';
import CompletionStep from '@/components/onboarding/CompletionStep';
import TrialOfferStep from '@/components/onboarding/TrialOfferStep';
import TrialReminderStep from '@/components/onboarding/TrialReminderStep';
import PricingPlansStep from '@/components/onboarding/PricingPlansStep';
import TrialTimelineStep from '@/components/onboarding/TrialTimelineStep';
import WelcomeDashboardStep from '@/components/onboarding/WelcomeDashboardStep';

interface OnboardingData {
  gender: 'male' | 'female' | 'other' | null;
  workouts: '0-2' | '3-5' | '6+' | null;
  source: 'instagram' | 'friend' | 'tv' | 'x' | 'facebook' | 'google' | 'tiktok' | null;
  hasTriedOtherApps: boolean | null;
  birthDate: Date | null;
  goal: 'lose' | 'maintain' | 'gain' | null;
  desiredWeight: number | null;
  lossSpeed: number | null;
  obstacle: string | null;
  diet: string | null;
  accomplish: string | null;
  connectHealth: boolean | null;
  addBurnedCalories: boolean | null;
  rolloverCalories: boolean | null;
  allowNotifications: boolean | null;
  referralCode: string | null;
}

const stepNames = [
  'Género', 'Ejercicio', 'Fuente', 'Experiencia', 'Resultados',
  'Fecha Nacimiento', 'Objetivo', 'Peso Deseado', 'Motivación', 'Velocidad',
  'Comparación', 'Obstáculos', 'Dieta', 'Logros', 'Potencial',
  'Confianza', 'Health Connect', 'Calorías Quemadas', 'Rollover', 'Rating',
  'Notificaciones', 'Referidos', 'Todo Listo', 'Generando', 'Completado',
  'Oferta Trial', 'Recordatorio Trial', 'Planes Precio', 'Timeline Trial', 'Bienvenida Dashboard'
];

const OnboardingPreview = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    gender: null,
    workouts: null,
    source: null,
    hasTriedOtherApps: null,
    birthDate: null,
    goal: null,
    desiredWeight: null,
    lossSpeed: null,
    obstacle: null,
    diet: null,
    accomplish: null,
    connectHealth: null,
    addBurnedCalories: null,
    rolloverCalories: null,
    allowNotifications: null,
    referralCode: null,
  });

  // Force light mode for onboarding
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('light');
    root.classList.remove('dark');
    root.style.colorScheme = 'light';
    
    return () => {
      root.classList.remove('light');
      root.style.colorScheme = '';
    };
  }, []);

  const totalSteps = 30;

  const updateData = (field: keyof OnboardingData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
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
      case 6:
        return (
          <DateStep
            selected={data.birthDate}
            onSelect={(birthDate) => updateData('birthDate', birthDate)}
            onNext={handleNext}
          />
        );
      case 7:
        return (
          <GoalStep
            selected={data.goal}
            onSelect={(goal) => updateData('goal', goal)}
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
        return <MotivationStep onNext={handleNext} />;
      case 10:
        return (
          <SpeedStep
            selected={data.lossSpeed}
            onSelect={(speed) => updateData('lossSpeed', speed)}
            onNext={handleNext}
          />
        );
      case 11:
        return <ComparisonStep onNext={handleNext} />;
      case 12:
        return (
          <ObstaclesStep
            selected={data.obstacle}
            onSelect={(obstacle) => updateData('obstacle', obstacle)}
            onNext={handleNext}
          />
        );
      case 13:
        return (
          <DietStep
            selected={data.diet}
            onSelect={(diet) => updateData('diet', diet)}
            onNext={handleNext}
          />
        );
      case 14:
        return (
          <AccomplishStep
            selected={data.accomplish}
            onSelect={(accomplish) => updateData('accomplish', accomplish)}
            onNext={handleNext}
          />
        );
      case 15:
        return <PotentialStep onNext={handleNext} />;
      case 16:
        return <TrustStep onNext={handleNext} />;
      case 17:
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
      case 18:
        return (
          <CaloriesBurnedStep
            onSelect={(addBack) => {
              updateData('addBurnedCalories', addBack);
              handleNext();
            }}
          />
        );
      case 19:
        return (
          <RolloverStep
            onSelect={(rollover) => {
              updateData('rolloverCalories', rollover);
              handleNext();
            }}
          />
        );
      case 20:
        return <RatingStep onNext={handleNext} />;
      case 21:
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
      case 22:
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
      case 23:
        return <AllDoneStep onNext={handleNext} />;
      case 24:
        return <GeneratingStep onComplete={handleNext} />;
      case 25:
        return <CompletionStep onGetStarted={handleNext} />;
      case 26:
        return <TrialOfferStep onNext={handleNext} />;
      case 27:
        return <TrialReminderStep onNext={handleNext} />;
      case 28:
        return <PricingPlansStep onNext={handleNext} />;
      case 29:
        return <TrialTimelineStep onNext={handleNext} />;
      case 30:
        return <WelcomeDashboardStep onComplete={() => console.log('Dashboard!')} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col light">
      {/* Preview Header */}
      <div className="bg-muted/50 border-b p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Vista Previa Onboarding</h1>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-muted rounded-full h-2 mt-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${getProgressWidth()}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 relative">
        {renderStep()}
        
        {/* Previous button */}
        {currentStep > 1 && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Anterior</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingPreview;