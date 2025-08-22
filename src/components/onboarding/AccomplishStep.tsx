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
            What's your main target right now?
          </h1>
        </div>

        <div className="space-y-3">
          {goals.map((goal) => {
            const IconComponent = goal.icon;
            const isSelected = selected.includes(goal.id);
            return (
              <button
                key={goal.id}
                onClick={() => handleGoalSelect(goal.id)}
                className={`w-full p-3 text-left rounded-2xl transition-all duration-200 flex items-center space-x-3 ${
                  isSelected
                    ? 'bg-continue text-continue-foreground'
                    : 'bg-continue/5 hover:bg-continue/10'
                }`}
              >
                <IconComponent className={`h-5 w-5 ${isSelected ? 'text-continue-foreground' : ''}`} />
                <span className={`text-base font-light ${isSelected ? 'text-continue-foreground' : 'text-foreground'}`}>
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