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
      <div className="px-6 py-8 h-full bg-gradient-to-br from-background via-background to-secondary/20">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            What's stopping you from reaching your goals?
          </h1>
        </div>

        <div className="space-y-3">
          {obstacles.map((obstacle) => {
            const IconComponent = obstacle.icon;
            const isSelected = selected.includes(obstacle.id);
            return (
              <button
                key={obstacle.id}
                onClick={() => handleObstacleSelect(obstacle.id)}
                className={`w-full p-3 text-left rounded-2xl transition-all duration-200 flex items-center space-x-3 ${
                  isSelected
                    ? 'bg-continue text-continue-foreground'
                    : 'bg-continue/5 hover:bg-continue/10'
                }`}
              >
                <IconComponent className={`h-5 w-5 ${isSelected ? 'text-continue-foreground' : ''}`} />
                <span className={`text-base font-light ${isSelected ? 'text-continue-foreground' : 'text-foreground'}`}>
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