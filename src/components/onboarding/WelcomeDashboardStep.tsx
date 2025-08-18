import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Sparkles } from 'lucide-react';

interface WelcomeDashboardStepProps {
  onComplete: () => void;
}

const WelcomeDashboardStep = ({ onComplete }: WelcomeDashboardStepProps) => {
  const heartRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate heart icon
    if (heartRef.current) {
      heartRef.current.style.opacity = '0';
      heartRef.current.style.transform = 'scale(0.3)';
      
      setTimeout(() => {
        if (heartRef.current) {
          heartRef.current.style.transition = 'all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
          heartRef.current.style.opacity = '1';
          heartRef.current.style.transform = 'scale(1)';
        }
      }, 300);

      // Add heartbeat animation
      setTimeout(() => {
        if (heartRef.current) {
          heartRef.current.style.animation = 'heartbeat 2s ease-in-out infinite';
        }
      }, 1500);
    }

    // Animate text
    if (textRef.current) {
      textRef.current.style.opacity = '0';
      textRef.current.style.transform = 'translateY(40px)';
      
      setTimeout(() => {
        if (textRef.current) {
          textRef.current.style.transition = 'all 1s ease-out';
          textRef.current.style.opacity = '1';
          textRef.current.style.transform = 'translateY(0)';
        }
      }, 800);
    }

    // Animate sparkles
    if (sparklesRef.current) {
      const sparkleElements = sparklesRef.current.querySelectorAll('.sparkle');
      sparkleElements.forEach((sparkle, index) => {
        const element = sparkle as HTMLElement;
        element.style.opacity = '0';
        element.style.transform = 'scale(0) rotate(0deg)';
        
        setTimeout(() => {
          element.style.transition = 'all 0.8s ease-out';
          element.style.opacity = '1';
          element.style.transform = 'scale(1) rotate(180deg)';
          
          // Add floating animation
          setTimeout(() => {
            element.style.animation = `float-sparkle-${index} 3s ease-in-out infinite`;
          }, 800);
        }, 1200 + index * 200);
      });
    }

    // Add keyframes for animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes heartbeat {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }
      @keyframes float-sparkle-0 {
        0%, 100% { transform: scale(1) rotate(180deg) translateY(0px); }
        50% { transform: scale(1.1) rotate(360deg) translateY(-10px); }
      }
      @keyframes float-sparkle-1 {
        0%, 100% { transform: scale(1) rotate(180deg) translateY(0px); }
        50% { transform: scale(0.9) rotate(270deg) translateY(-8px); }
      }
      @keyframes float-sparkle-2 {
        0%, 100% { transform: scale(1) rotate(180deg) translateY(0px); }
        50% { transform: scale(1.2) rotate(450deg) translateY(-12px); }
      }
      @keyframes float-sparkle-3 {
        0%, 100% { transform: scale(1) rotate(180deg) translateY(0px); }
        50% { transform: scale(0.8) rotate(315deg) translateY(-6px); }
      }
    `;
    document.head.appendChild(style);

    // Auto-proceed to dashboard after 4 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => {
      clearTimeout(timer);
      document.head.removeChild(style);
    };
  }, [onComplete]);

  return (
    <div className="flex flex-col h-full px-6 py-8 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="flex-1 flex flex-col justify-center items-center">
        {/* Illustration area */}
        <div className="relative mb-12">
          <div ref={heartRef} className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/10 via-primary/5 to-background flex items-center justify-center">
              {/* Icon removed */}
            </div>
          </div>
        </div>

        <div ref={textRef} className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-6">
            Gracias por tu tiempo
          </h1>
          <h2 className="text-2xl font-semibold text-muted-foreground mb-8">
            Bienvenido a tu dashboard personalizado
          </h2>
          
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-6 py-3">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-primary font-medium">Preparando tu experiencia...</span>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-4 pb-16">
        <Button
          onClick={onComplete}
          variant="ghost"
          className="w-full h-12 text-muted-foreground"
        >
          Continuar al Dashboard
        </Button>
      </div>
    </div>
  );
};

export default WelcomeDashboardStep;