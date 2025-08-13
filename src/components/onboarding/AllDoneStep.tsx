import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';
import { CheckCircle } from 'lucide-react';

interface AllDoneStepProps {
  onNext: () => void;
}

const AllDoneStep = ({ onNext }: AllDoneStepProps) => {
  const iconRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const icon = iconRef.current;
    const text = textRef.current;

    if (icon) {
      // Animate check icon
      icon.style.opacity = '0';
      icon.style.transform = 'scale(0.5)';
      
      setTimeout(() => {
        icon.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        icon.style.opacity = '1';
        icon.style.transform = 'scale(1)';
      }, 300);
    }

    if (text) {
      // Animate text
      text.style.opacity = '0';
      text.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        text.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        text.style.opacity = '1';
        text.style.transform = 'translateY(0)';
      }, 800);
    }
  }, []);

  return (
    <div className="flex flex-col h-full px-6 py-8">
      <div className="flex-1 flex flex-col justify-center items-center">
        {/* Success illustration */}
        <div ref={iconRef} className="mb-12">
          <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
            {/* Korean finger heart gesture */}
            <div className="text-6xl">🤞</div>
            <div className="absolute top-16 right-20 text-2xl animate-pulse">❤️</div>
            
            {/* Floating dots animation */}
            <div className="absolute inset-0 rounded-full">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-primary rounded-full animate-ping"
                  style={{
                    top: `${20 + Math.sin(i * 0.785) * 30 + 30}%`,
                    left: `${20 + Math.cos(i * 0.785) * 30 + 30}%`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div ref={textRef} className="text-center">
          <div className="inline-flex items-center space-x-2 mb-6">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <span className="text-lg font-semibold text-green-600">All done!</span>
          </div>
          
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Time to generate your custom plan!
          </h1>
        </div>
      </div>

      <div className="mt-auto pt-4 pb-16">
        <Button
          onClick={onNext}
          className="w-full h-14 text-lg font-medium rounded-full"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default AllDoneStep;