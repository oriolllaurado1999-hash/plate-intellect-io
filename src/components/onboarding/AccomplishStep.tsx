import { Button } from '@/components/ui/button';
import { Apple, Sun, Target, Heart } from 'lucide-react';

interface AccomplishStepProps {
  selected: string | null;
  onSelect: (goal: string) => void;
  onNext: () => void;
}

const AccomplishStep = ({ selected, onSelect, onNext }: AccomplishStepProps) => {
  const goals = [
    { id: 'healthier', label: 'Eat and live healthier', icon: Apple },
    { id: 'energy', label: 'Boost my energy and mood', icon: Sun },
    { id: 'consistency', label: 'Stay motivated and consistent', icon: Target },
    { id: 'body', label: 'Feel better about my body', icon: Heart },
  ];

  const handleContinue = () => {
    if (selected) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col h-full px-6 py-8">
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            What would you like to accomplish?
          </h1>
        </div>

        <div className="space-y-4 mb-12">
          {goals.map((goal) => {
            const IconComponent = goal.icon;
            return (
              <button
                key={goal.id}
                onClick={() => onSelect(goal.id)}
                className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-200 flex items-center space-x-4 ${
                  selected === goal.id
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background hover:border-primary/50'
                }`}
              >
                <IconComponent className="h-6 w-6" />
                <span className="text-lg font-medium">
                  {goal.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-auto">
        <Button
          onClick={handleContinue}
          disabled={!selected}
          className="w-full h-14 text-lg font-medium rounded-full"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default AccomplishStep;