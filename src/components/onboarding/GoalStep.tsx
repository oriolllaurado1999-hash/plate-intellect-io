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
    <>
      <div className="px-6 py-8 h-full">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            What is your goal?
          </h1>
          <p className="text-muted-foreground text-lg">
            This helps us generate a plan for your calorie intake.
          </p>
        </div>

        <div className="space-y-4">
          {goals.map((goal) => (
            <button
              key={goal.id}
              onClick={() => handleGoalSelect(goal.id)}
              className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-200 ${
                selected === goal.id
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-background hover:border-primary/50 hover:bg-primary/5'
              }`}
            >
              <span className={`text-lg font-medium ${
                selected === goal.id ? 'text-primary-foreground' : 'text-foreground'
              }`}>
                {goal.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <FixedContinueButton 
        onClick={handleContinue}
        disabled={!selected}
      />
    </>
  );
};

export default GoalStep;