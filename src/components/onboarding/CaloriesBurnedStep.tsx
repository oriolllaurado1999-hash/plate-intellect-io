import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';
import { Flame, Activity } from 'lucide-react';

interface CaloriesBurnedStepProps {
  onSelect: (addBack: boolean) => void;
}

const CaloriesBurnedStep = ({ onSelect }: CaloriesBurnedStepProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const goalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const goal = goalRef.current;

    if (card && goal) {
      // Initial state
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px) scale(0.95)';
      goal.style.opacity = '0';
      goal.style.transform = 'scale(0.9)';

      // Animate goal first
      setTimeout(() => {
        goal.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        goal.style.opacity = '1';
        goal.style.transform = 'scale(1)';
      }, 300);

      // Animate card
      setTimeout(() => {
        card.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
      }, 600);
    }
  }, []);

  return (
    <div className="flex flex-col h-full px-6 py-8">
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Add calories burned back to your daily goal?
          </h1>
        </div>

        <div className="flex flex-col items-center space-y-6">
          {/* Goal display */}
          <div ref={goalRef} className="text-center">
            <div className="inline-flex items-center space-x-2 bg-muted/50 px-4 py-2 rounded-full">
              <Flame className="h-5 w-5 text-orange-500" />
              <span className="font-semibold text-foreground">Today's Goal</span>
            </div>
            <div className="text-4xl font-bold text-foreground mt-2">500 Cals</div>
          </div>

          {/* Activity card */}
          <div ref={cardRef} className="relative">
            <div className="w-80 h-48 bg-muted/30 rounded-2xl overflow-hidden relative">
              {/* Background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
              
              {/* Running figure illustration */}
              <div className="absolute right-4 top-4 bottom-4 w-24 bg-gradient-to-b from-gray-400 to-gray-600 rounded-lg opacity-60" />
              
              {/* Activity info overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-background rounded-xl p-4 shadow-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-foreground rounded-full flex items-center justify-center">
                      <Activity className="h-4 w-4 text-background" />
                    </div>
                    <span className="font-medium text-muted-foreground">Running</span>
                  </div>
                  <div className="text-xl font-bold" style={{ color: '#4AD4B2' }}>+100 cals</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-background border-t border-border">
        <div className="flex space-x-3">
          <Button
            onClick={() => onSelect(false)}
            variant="outline"
            className="flex-1 h-14 text-lg font-medium rounded-full"
          >
            No
          </Button>
          <Button
            onClick={() => onSelect(true)}
            className="flex-1 h-14 text-lg font-medium rounded-full"
          >
            Yes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CaloriesBurnedStep;