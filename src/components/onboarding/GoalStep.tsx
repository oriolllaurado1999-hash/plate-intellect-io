import { Button } from '@/components/ui/button';
import FixedContinueButton from './FixedContinueButton';

interface GoalStepProps {
  selected: 'lose' | 'maintain' | 'gain' | null;
  onSelect: (goal: 'lose' | 'maintain' | 'gain') => void;
  onNext: () => void;
}

const GoalStep = ({ selected, onSelect, onNext }: GoalStepProps) => {
  const goals = [
    { id: 'lose', label: 'Lose weight' },
    { id: 'maintain', label: 'Maintain' },
    { id: 'gain', label: 'Gain weight' },
  ] as const;

  const handleGoalSelect = (goal: 'lose' | 'maintain' | 'gain') => {
    onSelect(goal);
  };

  const handleContinue = () => {
    if (selected) {
      onNext();
    }
  };

  return (
      <div className="px-6 pt-4 pb-8 h-full flex flex-col bg-gradient-to-br from-background via-background to-secondary/20">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-4">What is your goal?</h1>
          <p className="text-muted-foreground">
            This helps us generate a plan for your calorie intake.
          </p>
        </div>

        <div className="flex-1 flex flex-col justify-center pt-4">
          <div className="space-y-4 flex-shrink-0 max-w-sm mx-auto w-full">
            {goals.map((goal) => (
              <Button
                key={goal.id}
                variant="ghost"
                className={`w-full h-12 text-lg justify-center rounded-2xl ${
                  selected === goal.id ? 'bg-continue text-continue-foreground' : 'bg-continue/5'
                }`}
                onClick={() => handleGoalSelect(goal.id)}
              >
                <span className="font-light">{goal.label}</span>
              </Button>
            ))}
          </div>
        </div>

        <FixedContinueButton 
          onClick={handleContinue}
          disabled={!selected}
        />
      </div>
  );
};

export default GoalStep;