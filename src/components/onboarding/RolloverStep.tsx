import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';
import { Flame, Clock } from 'lucide-react';

interface RolloverStepProps {
  onSelect: (rollover: boolean) => void;
}

const RolloverStep = ({ onSelect }: RolloverStepProps) => {
  const circlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const circles = circlesRef.current;
    if (!circles) return;

    const leftCircle = circles.querySelector('.left-circle') as HTMLElement;
    const rightCircle = circles.querySelector('.right-circle') as HTMLElement;

    if (leftCircle && rightCircle) {
      // Initial state
      leftCircle.style.opacity = '0';
      leftCircle.style.transform = 'translateX(-20px) scale(0.9)';
      rightCircle.style.opacity = '0';
      rightCircle.style.transform = 'translateX(20px) scale(0.9)';

      // Animate left circle
      setTimeout(() => {
        leftCircle.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        leftCircle.style.opacity = '1';
        leftCircle.style.transform = 'translateX(0) scale(1)';
      }, 400);

      // Animate right circle
      setTimeout(() => {
        rightCircle.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        rightCircle.style.opacity = '1';
        rightCircle.style.transform = 'translateX(0) scale(1)';
      }, 700);

      // Animate progress fills
      setTimeout(() => {
        const leftProgress = leftCircle.querySelector('.progress-fill') as HTMLElement;
        const rightProgress = rightCircle.querySelector('.progress-fill') as HTMLElement;
        
        if (leftProgress) {
          leftProgress.style.transition = 'stroke-dashoffset 1.5s ease-out';
          leftProgress.style.strokeDashoffset = '50';
        }
        
        if (rightProgress) {
          rightProgress.style.transition = 'stroke-dashoffset 1.5s ease-out';
          rightProgress.style.strokeDashoffset = '30';
        }
      }, 1200);
    }
  }, []);

  return (
    <div className="flex flex-col h-full px-6 py-8">
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Rollover extra calories to the next day?
          </h1>
          <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full">
            <span className="text-blue-600 font-medium">Rollover up to</span>
            <span className="text-blue-700 font-bold">200 cals</span>
          </div>
        </div>

        <div ref={circlesRef} className="flex justify-center space-x-8 mb-12">
          {/* Yesterday */}
          <div className="left-circle text-center">
            <div className="flex items-center space-x-2 mb-4">
              <Flame className="h-5 w-5 text-orange-500" />
              <span className="text-sm font-medium text-muted-foreground">Yesterday</span>
            </div>
            
            <div className="relative w-24 h-24">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="36"
                  stroke="hsl(var(--muted))"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  className="progress-fill"
                  cx="48"
                  cy="48"
                  r="36"
                  stroke="hsl(var(--primary))"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="226"
                  strokeDashoffset="226"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-lg font-bold text-foreground">350</div>
                <div className="text-xs text-muted-foreground">/500</div>
              </div>
            </div>
            
            <div className="mt-2 bg-foreground text-background px-3 py-1 rounded-lg text-sm font-medium">
              Cals left 150
            </div>
          </div>

          {/* Today */}
          <div className="right-circle text-center">
            <div className="flex items-center space-x-2 mb-4">
              <Flame className="h-5 w-5 text-orange-500" />
              <span className="text-sm font-medium text-muted-foreground">Today</span>
            </div>
            
            <div className="relative w-24 h-24">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="36"
                  stroke="hsl(var(--muted))"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  className="progress-fill"
                  cx="48"
                  cy="48"
                  r="36"
                  stroke="hsl(var(--primary))"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="226"
                  strokeDashoffset="226"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-lg font-bold text-foreground">350</div>
                <div className="text-xs text-muted-foreground">/650</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-1 mt-2">
              <Clock className="h-3 w-3 text-blue-500" />
              <span className="text-xs text-blue-500">150</span>
            </div>
            
            <div className="mt-1 bg-foreground text-background px-3 py-1 rounded-lg text-sm font-medium">
              Cals left 150+150
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto flex space-x-3">
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
  );
};

export default RolloverStep;