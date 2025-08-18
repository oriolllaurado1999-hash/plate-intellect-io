import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';
import { Shield } from 'lucide-react';
import FixedContinueButton from './FixedContinueButton';

interface TrustStepProps {
  onNext: () => void;
}

const TrustStep = ({ onNext }: TrustStepProps) => {
  const handsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hands = handsRef.current;
    const text = textRef.current;

    if (hands && text) {
      // Initial state
      hands.style.opacity = '0';
      hands.style.transform = 'scale(0.8)';
      text.style.opacity = '0';
      text.style.transform = 'translateY(20px)';

      // Animate hands first
      setTimeout(() => {
        hands.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        hands.style.opacity = '1';
        hands.style.transform = 'scale(1)';
      }, 300);

      // Animate text after
      setTimeout(() => {
        text.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        text.style.opacity = '1';
        text.style.transform = 'translateY(0)';
      }, 800);
    }
  }, []);

  return (
    <>
      <div className="px-6 py-8 h-full">
        <div className="flex-1 flex flex-col justify-center items-center">
          {/* Hands illustration */}
          <div ref={handsRef} className="mb-12">
            <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
              <div className="text-6xl handshake-animation">🤝</div>
              {/* Floating dots animation */}
              <div className="absolute inset-0 rounded-full">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-primary rounded-full animate-pulse"
                    style={{
                      top: `${20 + Math.sin(i * 0.785) * 30 + 30}%`,
                      left: `${20 + Math.cos(i * 0.785) * 30 + 30}%`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div ref={textRef} className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Thank you for trusting us
            </h1>
            <p className="text-muted-foreground text-lg mb-12">
              Now let's personalize Kalore for you...
            </p>

            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-muted/30 rounded-full">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-foreground mb-2">
                  Your privacy and security matter to us.
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We promise to always keep your personal information private and secure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FixedContinueButton 
        onClick={onNext}
      />
    </>
  );
};

export default TrustStep;