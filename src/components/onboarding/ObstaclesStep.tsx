import { Button } from '@/components/ui/button';
import { BarChart3, Utensils, HandHeart, Calendar, Apple } from 'lucide-react';
import FixedContinueButton from './FixedContinueButton';

interface ObstaclesStepProps {
  selected: string[];
  onSelect: (obstacles: string[]) => void;
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

  const handleObstacleSelect = (obstacleId: string) => {
    const isSelected = selected.includes(obstacleId);
    let newSelected;
    
    if (isSelected) {
      newSelected = selected.filter(id => id !== obstacleId);
    } else {
      newSelected = [...selected, obstacleId];
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
      <div className="px-6 py-8 h-full">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            What's stopping you from reaching your goals?
          </h1>
        </div>

        <div className="space-y-4">
          {obstacles.map((obstacle) => {
            const IconComponent = obstacle.icon;
            const isSelected = selected.includes(obstacle.id);
            return (
              <button
                key={obstacle.id}
                onClick={() => handleObstacleSelect(obstacle.id)}
                className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-200 flex items-center space-x-4 ${
                  isSelected
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background hover:border-primary/50 hover:bg-primary/5'
                }`}
              >
                <IconComponent className={`h-6 w-6 ${isSelected ? 'text-primary-foreground' : ''}`} />
                <span className={`text-lg font-medium ${isSelected ? 'text-primary-foreground' : 'text-foreground'}`}>
                  {obstacle.label}
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

export default ObstaclesStep;