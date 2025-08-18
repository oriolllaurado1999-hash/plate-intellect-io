import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';

interface HealthConnectStepProps {
  onConnect: () => void;
  onSkip: () => void;
}

const HealthConnectStep = ({ onConnect, onSkip }: HealthConnectStepProps) => {
  const appIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const appIcon = appIconRef.current;

    if (appIcon) {
      // Animate app icon
      appIcon.style.opacity = '0';
      appIcon.style.transform = 'scale(0.5)';
      
      setTimeout(() => {
        appIcon.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        appIcon.style.opacity = '1';
        appIcon.style.transform = 'scale(1)';
      }, 300);
    }
  }, []);

  return (
    <div className="flex flex-col h-full px-6 py-8">
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-center mb-12">
          {/* Apple Health Logo */}
          <div ref={appIconRef} className="flex justify-center mb-8">
            <img 
              src="/lovable-uploads/5034b135-3dfb-4ae8-bcbb-9cfbc5d7868e.png" 
              alt="Apple Health Logo" 
              className="w-24 h-24 drop-shadow-lg"
            />
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

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-background border-t border-border">
        <div className="space-y-3">
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
    </div>
  );
};

export default HealthConnectStep;