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
          leftProgress.style.strokeDashoffset = '60'; // 350/500 = 70% remaining
        }
        
        if (rightProgress) {
          rightProgress.style.transition = 'stroke-dashoffset 1.5s ease-out';
          rightProgress.style.strokeDashoffset = '92'; // 350/650 = ~46% remaining
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

        <div ref={circlesRef} className="flex justify-center items-start space-x-6 mb-12">
          {/* Yesterday */}
          <div className="left-circle flex flex-col items-center bg-white rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-center space-x-1 mb-3">
              <Flame className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium text-muted-foreground">Yesterday</span>
            </div>
            
            <div className="relative mb-4">
              <div className="text-3xl font-bold text-foreground mb-1">350<span className="text-lg text-muted-foreground">/500</span></div>
              
              <div className="relative w-20 h-20">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    stroke="hsl(var(--muted))"
                    strokeWidth="6"
                    fill="none"
                  />
                  <circle
                    className="progress-fill"
                    cx="40"
                    cy="40"
                    r="32"
                    stroke="hsl(var(--foreground))"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray="201"
                    strokeDashoffset="201"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute -left-6 top-1/2 transform -translate-y-1/2">
                  <div className="bg-foreground text-background px-2 py-1 rounded text-xs font-medium whitespace-nowrap relative">
                    Cals left<br />150
                    <div className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2 w-0 h-0 border-l-4 border-l-foreground border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Today */}
          <div className="right-circle flex flex-col items-center bg-white rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-center space-x-1 mb-3">
              <Flame className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium text-muted-foreground">Today</span>
            </div>
            
            <div className="relative mb-4">
              <div className="text-3xl font-bold text-foreground mb-1">350<span className="text-lg text-muted-foreground">/650</span></div>
              
              <div className="relative w-20 h-20">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    stroke="hsl(var(--muted))"
                    strokeWidth="6"
                    fill="none"
                  />
                  <circle
                    className="progress-fill"
                    cx="40"
                    cy="40"
                    r="32"
                    stroke="hsl(var(--foreground))"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray="201"
                    strokeDashoffset="201"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute -right-8 top-1/2 transform -translate-y-1/2">
                  <div className="bg-foreground text-background px-2 py-1 rounded text-xs font-medium whitespace-nowrap relative">
                    Cals left<br />150+<span className="text-blue-300">150</span>
                    <div className="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2 w-0 h-0 border-r-4 border-r-foreground border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
                  </div>
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

export default RolloverStep;