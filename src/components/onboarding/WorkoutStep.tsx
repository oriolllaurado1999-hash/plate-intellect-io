import { Button } from '@/components/ui/button';
import FixedContinueButton from './FixedContinueButton';

interface WorkoutStepProps {
  selected: '0-2' | '3-5' | '6+' | null;
  onSelect: (workouts: '0-2' | '3-5' | '6+') => void;
  onNext: () => void;
}

const WorkoutStep = ({ selected, onSelect, onNext }: WorkoutStepProps) => {
  const handleContinue = () => {
    if (selected) {
      onNext();
    }
  };

  return (
    <div className="px-6 pt-4 pb-8 h-full flex flex-col bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">How many workouts do you do per week?</h1>
        <p className="text-muted-foreground">
          This will be used to calibrate your custom plan.
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-center pt-8">
        <div className="space-y-4 flex-shrink-0 max-w-sm mx-auto w-full">
          <Button
            variant="ghost"
            className={`w-full h-12 text-lg justify-start rounded-2xl relative ${
              selected === '0-2' ? 'bg-continue text-continue-foreground' : 'bg-continue/5'
            }`}
            onClick={() => onSelect('0-2')}
          >
            <div className="absolute left-4 flex items-center justify-center w-8">
              <div className="w-2 h-2 bg-current rounded-full opacity-60"></div>
            </div>
            <span className="font-light flex-1 text-center">0-2 workouts per week</span>
          </Button>

          <Button
            variant="ghost"
            className={`w-full h-12 text-lg justify-start rounded-2xl relative ${
              selected === '3-5' ? 'bg-continue text-continue-foreground' : 'bg-continue/5'
            }`}
            onClick={() => onSelect('3-5')}
          >
            <div className="absolute left-4 flex items-center justify-center w-8">
              <div className="flex flex-col items-center space-y-0.5">
                <div className="w-1.5 h-1.5 bg-current rounded-full opacity-60"></div>
                <div className="flex space-x-0.5">
                  <div className="w-1.5 h-1.5 bg-current rounded-full opacity-60"></div>
                  <div className="w-1.5 h-1.5 bg-current rounded-full opacity-60"></div>
                </div>
              </div>
            </div>
            <span className="font-light flex-1 text-center">3-5 workouts per week</span>
          </Button>

          <Button
            variant="ghost"
            className={`w-full h-12 text-lg justify-start rounded-2xl relative ${
              selected === '6+' ? 'bg-continue text-continue-foreground' : 'bg-continue/5'
            }`}
            onClick={() => onSelect('6+')}
          >
            <div className="absolute left-4 flex items-center justify-center w-8">
              <div className="grid grid-cols-3 gap-0.5">
                <div className="w-1.5 h-1.5 bg-current rounded-full opacity-60"></div>
                <div className="w-1.5 h-1.5 bg-current rounded-full opacity-60"></div>
                <div className="w-1.5 h-1.5 bg-current rounded-full opacity-60"></div>
                <div className="w-1.5 h-1.5 bg-current rounded-full opacity-60"></div>
                <div className="w-1.5 h-1.5 bg-current rounded-full opacity-60"></div>
                <div className="w-1.5 h-1.5 bg-current rounded-full opacity-60"></div>
              </div>
            </div>
            <span className="font-light flex-1 text-center">6+ workouts per week</span>
          </Button>
        </div>
      </div>

      <FixedContinueButton
        onClick={handleContinue}
        disabled={!selected}
      />
    </div>
  );
};

export default WorkoutStep;