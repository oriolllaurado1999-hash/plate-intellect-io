import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';
import { Apple, Activity, Heart, Moon } from 'lucide-react';

interface HealthConnectStepProps {
  onConnect: () => void;
  onSkip: () => void;
}

const HealthConnectStep = ({ onConnect, onSkip }: HealthConnectStepProps) => {
  const iconsRef = useRef<HTMLDivElement>(null);
  const appIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const icons = iconsRef.current;
    const appIcon = appIconRef.current;

    if (icons && appIcon) {
      // Animate app icon first
      appIcon.style.opacity = '0';
      appIcon.style.transform = 'scale(0.5)';
      
      setTimeout(() => {
        appIcon.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        appIcon.style.opacity = '1';
        appIcon.style.transform = 'scale(1)';
      }, 300);

      // Animate connecting icons
      const iconElements = icons.querySelectorAll('.health-icon');
      iconElements.forEach((icon, index) => {
        const element = icon as HTMLElement;
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
          element.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, 800 + (index * 200));
      });
    }
  }, []);

  return (
    <div className="flex flex-col h-full px-6 py-8">
      <div className="flex-1 flex flex-col justify-center">
        <div ref={iconsRef} className="text-center mb-12">
          {/* Health icons with connecting lines */}
          <div className="relative flex items-center justify-center mb-8">
            <div className="health-icon absolute -top-8 -left-8">
              <div className="flex flex-col items-center">
                <div className="p-3 bg-muted rounded-xl mb-2">
                  <Activity className="h-6 w-6 text-foreground" />
                </div>
                <span className="text-sm text-muted-foreground">Walking</span>
              </div>
            </div>

            <div className="health-icon absolute -top-12 left-8">
              <div className="flex flex-col items-center">
                <div className="p-3 bg-muted rounded-xl mb-2">
                  <Activity className="h-6 w-6 text-foreground" />
                </div>
                <span className="text-sm text-muted-foreground">Running</span>
              </div>
            </div>

            <div className="health-icon absolute -bottom-8 -left-4">
              <div className="flex flex-col items-center">
                <div className="p-3 bg-red-100 rounded-xl mb-2">
                  <Heart className="h-6 w-6 text-red-500" />
                </div>
              </div>
            </div>

            <div className="health-icon absolute -top-8 right-8">
              <div className="flex flex-col items-center">
                <span className="text-sm text-muted-foreground mb-2">Yoga</span>
              </div>
            </div>

            <div className="health-icon absolute -bottom-8 right-4">
              <div className="flex flex-col items-center">
                <span className="text-sm text-muted-foreground mb-2">Sleep</span>
                <div className="p-3 bg-muted rounded-xl">
                  <Moon className="h-6 w-6 text-foreground" />
                </div>
              </div>
            </div>

            {/* Central app icon */}
            <div ref={appIconRef} className="relative z-10">
              <div className="w-20 h-20 bg-foreground rounded-2xl flex items-center justify-center shadow-lg">
                <Apple className="h-10 w-10 text-background" />
              </div>
              {/* Connecting lines */}
              <div className="absolute inset-0 -z-10">
                <svg className="w-32 h-32 -translate-x-6 -translate-y-6">
                  <defs>
                    <radialGradient id="connectionGradient">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <circle 
                    cx="64" 
                    cy="64" 
                    r="50" 
                    fill="url(#connectionGradient)"
                    className="animate-pulse"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Connect to Apple Health
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Sync your daily activity between Kalore and the Health app to have the most thorough data.
          </p>
        </div>
      </div>

      <div className="mt-auto pt-4 pb-16 space-y-3">
        <Button
          onClick={onConnect}
          className="w-full h-14 text-lg font-medium rounded-full"
        >
          Continue
        </Button>
        <Button
          onClick={onSkip}
          variant="ghost"
          className="w-full h-12 text-base text-muted-foreground"
        >
          Not now
        </Button>
      </div>
    </div>
  );
};

export default HealthConnectStep;