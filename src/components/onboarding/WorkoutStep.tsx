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
    <div className="px-6 py-8 h-full flex flex-col bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-4">How many workouts do you do per week?</h1>
        <p className="text-muted-foreground mb-12">
          This will be used to calibrate your custom plan.
        </p>

        <div className="space-y-4 mb-16">
          <Button
            variant={selected === '0-2' ? 'default' : 'outline'}
            className="w-full h-20 text-left flex flex-col items-start justify-center px-6 rounded-2xl"
            onClick={() => onSelect('0-2')}
          >
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-current rounded-full"></div>
              <div>
                <div className="text-lg font-semibold">0-2</div>
                <div className="text-sm text-muted-foreground">Workouts now and then</div>
              </div>
            </div>
          </Button>

          <Button
            variant={selected === '3-5' ? 'default' : 'outline'}
            className="w-full h-20 text-left flex flex-col items-start justify-center px-6 rounded-2xl"
            onClick={() => onSelect('3-5')}
          >
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-current rounded-full"></div>
                <div className="w-2 h-2 bg-current rounded-full"></div>
                <div className="w-2 h-2 bg-current rounded-full"></div>
              </div>
              <div>
                <div className="text-lg font-semibold">3-5</div>
                <div className="text-sm text-muted-foreground">A few workouts per week</div>
              </div>
            </div>
          </Button>

          <Button
            variant={selected === '6+' ? 'default' : 'outline'}
            className="w-full h-20 text-left flex flex-col items-start justify-center px-6 rounded-2xl"
            onClick={() => onSelect('6+')}
          >
            <div className="flex items-center space-x-3">
              <div className="grid grid-cols-2 gap-1">
                <div className="w-2 h-2 bg-current rounded-full"></div>
                <div className="w-2 h-2 bg-current rounded-full"></div>
                <div className="w-2 h-2 bg-current rounded-full"></div>
                <div className="w-2 h-2 bg-current rounded-full"></div>
              </div>
              <div>
                <div className="text-lg font-semibold">6+</div>
                <div className="text-sm text-muted-foreground">Dedicated athlete</div>
              </div>
            </div>
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