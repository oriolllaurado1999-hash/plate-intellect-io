import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';

interface TrialReminderStepProps {
  onNext: () => void;
}

const TrialReminderStep = ({ onNext }: TrialReminderStepProps) => {
  const bellRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate bell icon
    if (bellRef.current) {
      bellRef.current.style.opacity = '0';
      bellRef.current.style.transform = 'scale(0.3) rotate(-20deg)';
      
      setTimeout(() => {
        if (bellRef.current) {
          bellRef.current.style.transition = 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
          bellRef.current.style.opacity = '1';
          bellRef.current.style.transform = 'scale(1) rotate(0deg)';
        }
      }, 300);

      // Add subtle swing animation
      setTimeout(() => {
        if (bellRef.current) {
          bellRef.current.style.animation = 'gentle-swing 3s ease-in-out infinite';
        }
      }, 1300);
    }

    // Animate text
    if (textRef.current) {
      textRef.current.style.opacity = '0';
      textRef.current.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        if (textRef.current) {
          textRef.current.style.transition = 'all 0.8s ease-out';
          textRef.current.style.opacity = '1';
          textRef.current.style.transform = 'translateY(0)';
        }
      }, 600);
    }

    // Add keyframes for swing animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes gentle-swing {
        0%, 100% { transform: scale(1) rotate(0deg); }
        25% { transform: scale(1) rotate(3deg); }
        75% { transform: scale(1) rotate(-3deg); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="flex flex-col h-full px-6 py-8">
      <div className="flex-1 flex flex-col justify-center items-center">
        <div ref={textRef} className="text-center mb-16">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Te enviaremos un
          </h1>
          <h2 className="text-3xl font-bold text-foreground mb-8">
            recordatorio antes de que
          </h2>
          <h3 className="text-3xl font-bold text-foreground">
            termine tu prueba gratuita
          </h3>
        </div>

        {/* Bell illustration */}
        <div ref={bellRef} className="mb-16">
          <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-muted/20 to-muted/40 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-muted/60 flex items-center justify-center relative">
              <Bell className="w-16 h-16 text-muted-foreground" />
              
              {/* Notification badge */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-destructive rounded-full flex items-center justify-center">
                <span className="text-destructive-foreground font-bold text-sm">1</span>
              </div>
              
              {/* Notification lines */}
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-8 bg-primary/30 rounded-full animate-pulse"
                  style={{
                    top: `${-20 - i * 10}px`,
                    right: `${10 + i * 5}px`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-2 text-green-600 mb-2">
            <span>✓</span>
            <span className="font-medium">Sin Pago Inmediato</span>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-4 pb-16">
        <Button
          onClick={onNext}
          className="w-full h-14 text-lg font-medium rounded-full mb-4"
        >
          Continuar GRATIS
        </Button>
        <div className="text-center text-sm text-muted-foreground">
          Solo 35,88 € al año (2,99 €/mes)
        </div>
      </div>
    </div>
  );
};

export default TrialReminderStep;