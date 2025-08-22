import { Button } from '@/components/ui/button';
import { Utensils, Fish, Carrot, Leaf } from 'lucide-react';
import FixedContinueButton from './FixedContinueButton';

interface DietStepProps {
  selected: string | null;
  onSelect: (diet: string) => void;
  onNext: () => void;
}

const DietStep = ({ selected, onSelect, onNext }: DietStepProps) => {
  const diets = [
    { id: 'classic', label: 'Classic', icon: Utensils },
    { id: 'pescatarian', label: 'Pescatarian', icon: Fish },
    { id: 'vegetarian', label: 'Vegetarian', icon: Carrot },
    { id: 'vegan', label: 'Vegan', icon: Leaf },
  ];

  const handleContinue = () => {
    if (selected) {
      onNext();
    }
  };

  return (
    <>
      <div className="px-6 py-8 h-full bg-gradient-to-br from-background via-background to-secondary/20">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Do you follow a specific diet?
          </h1>
        </div>

        <div className="space-y-3">
          {diets.map((diet) => {
            const IconComponent = diet.icon;
            return (
              <button
                key={diet.id}
                onClick={() => onSelect(diet.id)}
                className={`w-full p-3 text-left rounded-2xl transition-all duration-200 flex items-center space-x-3 ${
                  selected === diet.id
                    ? 'bg-continue text-continue-foreground'
                    : 'bg-continue/5 hover:bg-continue/10'
                }`}
              >
                <IconComponent className={`h-5 w-5 ${selected === diet.id ? 'text-continue-foreground' : ''}`} />
                <span className={`text-lg font-light ${selected === diet.id ? 'text-continue-foreground' : 'text-foreground'}`}>
                  {diet.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <FixedContinueButton 
        onClick={handleContinue}
        disabled={!selected}
      />
    </>
  );
};

export default DietStep;