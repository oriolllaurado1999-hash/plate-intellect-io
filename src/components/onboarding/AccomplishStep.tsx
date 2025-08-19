import { Button } from '@/components/ui/button';
import { Apple, Sun, Target, Heart } from 'lucide-react';
import FixedContinueButton from './FixedContinueButton';

interface AccomplishStepProps {
  selected: string[];
  onSelect: (goals: string[]) => void;
  onNext: () => void;
}

const AccomplishStep = ({ selected, onSelect, onNext }: AccomplishStepProps) => {
  const goals = [
    { id: 'healthier', label: 'Eat and live healthier', icon: Apple },
    { id: 'energy', label: 'Boost my energy and mood', icon: Sun },
    { id: 'consistency', label: 'Stay motivated and consistent', icon: Target },
    { id: 'body', label: 'Feel better about my body', icon: Heart },
  ];

  const handleGoalSelect = (goalId: string) => {
    const isSelected = selected.includes(goalId);
    let newSelected;
    
    if (isSelected) {
      newSelected = selected.filter(id => id !== goalId);
    } else {
      newSelected = [...selected, goalId];
    }
    
    onSelect(newSelected);
  };

  const handleContinue = () => {
    if (selected.length > 0) {
      onNext();
    }
  };

  return (
    <>
      <div className="px-6 py-8 h-full bg-gradient-to-br from-background via-background to-secondary/20">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            What would you like to accomplish?
          </h1>
        </div>

        <div className="space-y-4">
          {goals.map((goal) => {
            const IconComponent = goal.icon;
            const isSelected = selected.includes(goal.id);
            return (
              <button
                key={goal.id}
                onClick={() => handleGoalSelect(goal.id)}
                className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-200 flex items-center space-x-4 ${
                  isSelected
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background hover:border-primary/50 hover:bg-primary/5'
                }`}
              >
                <IconComponent className={`h-6 w-6 ${isSelected ? 'text-primary-foreground' : ''}`} />
                <span className={`text-lg font-medium ${isSelected ? 'text-primary-foreground' : 'text-foreground'}`}>
                  {goal.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <FixedContinueButton 
        onClick={handleContinue}
        disabled={selected.length === 0}
      />
    </>
  );
};

export default AccomplishStep;