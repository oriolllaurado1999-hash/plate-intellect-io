import { Button } from '@/components/ui/button';
import { Utensils, Fish, Carrot, Leaf } from 'lucide-react';

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
    <div className="flex flex-col h-full px-6 py-8">
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Do you follow a specific diet?
          </h1>
        </div>

        <div className="space-y-4 mb-12">
          {diets.map((diet) => {
            const IconComponent = diet.icon;
            return (
              <button
                key={diet.id}
                onClick={() => onSelect(diet.id)}
                className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-200 flex items-center space-x-4 ${
                  selected === diet.id
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background hover:border-primary/50'
                }`}
              >
                <IconComponent className="h-6 w-6" />
                <span className="text-lg font-medium">
                  {diet.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-auto pt-4 pb-16">
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

export default DietStep;