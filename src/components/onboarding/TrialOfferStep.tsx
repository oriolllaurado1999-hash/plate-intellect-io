import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import FixedContinueButton from './FixedContinueButton';

interface TrialOfferStepProps {
  onNext: () => void;
}

const TrialOfferStep = ({ onNext }: TrialOfferStepProps) => {
  const dashboardRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate dashboard preview
    if (dashboardRef.current) {
      dashboardRef.current.style.opacity = '0';
      dashboardRef.current.style.transform = 'translateY(30px) scale(0.95)';
      
      setTimeout(() => {
        if (dashboardRef.current) {
          dashboardRef.current.style.transition = 'all 1s ease-out';
          dashboardRef.current.style.opacity = '1';
          dashboardRef.current.style.transform = 'translateY(0) scale(1)';
        }
      }, 300);
    }

    // Animate heading
    if (headingRef.current) {
      headingRef.current.style.opacity = '0';
      headingRef.current.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        if (headingRef.current) {
          headingRef.current.style.transition = 'all 0.8s ease-out';
          headingRef.current.style.opacity = '1';
          headingRef.current.style.transform = 'translateY(0)';
        }
      }, 100);
    }
  }, []);

  return (
    <div className="flex flex-col h-full px-6 py-8 bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="flex-1 flex flex-col justify-center">
        <div ref={headingRef} className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            We want you to try
          </h1>
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Kalore for free.
          </h2>
        </div>

        {/* Dashboard Preview */}
        <div ref={dashboardRef} className="mb-8 flex justify-center">
          <div className="w-64 max-w-xs mx-auto">
            <img 
              src="/lovable-uploads/31a42e55-22aa-4b0f-b3a9-3c3098915f14.png" 
              alt="Kalore app dashboard preview showing calorie tracking and nutrition goals" 
              className="w-full h-auto rounded-2xl shadow-2xl border border-muted/20"
            />
          </div>
        </div>

        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-2 mb-2" style={{ color: '#4AD4B2' }}>
            <span>✓</span>
            <span className="font-medium">No Immediate Payment</span>
          </div>
        </div>
      </div>

      <FixedContinueButton onClick={onNext} text="Try for $0.00" />
    </div>
  );
};

export default TrialOfferStep;