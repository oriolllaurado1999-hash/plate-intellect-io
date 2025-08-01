import { Button } from '@/components/ui/button';
import { BarChart3, Utensils, HandHeart, Calendar, Apple } from 'lucide-react';

interface ObstaclesStepProps {
  selected: string | null;
  onSelect: (obstacle: string) => void;
  onNext: () => void;
}

const ObstaclesStep = ({ selected, onSelect, onNext }: ObstaclesStepProps) => {
  const obstacles = [
    { id: 'consistency', label: 'Lack of consistency', icon: BarChart3 },
    { id: 'eating', label: 'Unhealthy eating habits', icon: Utensils },
    { id: 'support', label: 'Lack of support', icon: HandHeart },
    { id: 'schedule', label: 'Busy schedule', icon: Calendar },
    { id: 'inspiration', label: 'Lack of meal inspiration', icon: Apple },
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
            What's stopping you from reaching your goals?
          </h1>
        </div>

        <div className="space-y-4 mb-12">
          {obstacles.map((obstacle) => {
            const IconComponent = obstacle.icon;
            return (
              <button
                key={obstacle.id}
                onClick={() => onSelect(obstacle.id)}
                className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-200 flex items-center space-x-4 ${
                  selected === obstacle.id
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background hover:border-primary/50'
                }`}
              >
                <IconComponent className="h-6 w-6" />
                <span className="text-lg font-medium">
                  {obstacle.label}
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

export default ObstaclesStep;