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
        <div ref={dashboardRef} className="mb-8">
          <Card className="p-6 bg-card border-2">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-foreground rounded-full"></div>
                <span className="font-semibold">Kalore</span>
              </div>
              <div className="flex space-x-4 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Today</span>
                <span>Yesterday</span>
              </div>
            </div>

            {/* Calories section */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-muted/30 rounded-2xl p-4">
                <div className="text-3xl font-bold text-foreground mb-1">1739</div>
                <div className="text-sm text-muted-foreground">Calories remaining</div>
              </div>
              <div className="bg-muted/30 rounded-2xl p-4 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-4 border-primary relative">
                  <div className="absolute inset-0 rounded-full border-4 border-primary/30"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="text-xs">🔥</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Macros */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="text-center">
                <div className="font-bold text-lg">136g</div>
                <div className="text-xs text-muted-foreground mb-2">Protein remaining</div>
                <div className="w-12 h-12 mx-auto rounded-full border-4 border-red-400 relative">
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs">🥩</span>
                </div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg">206g</div>
                <div className="text-xs text-muted-foreground mb-2">Carbs remaining</div>
                <div className="w-12 h-12 mx-auto rounded-full border-4 border-orange-400 relative">
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs">🌾</span>
                </div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg">41g</div>
                <div className="text-xs text-muted-foreground mb-2">Fat remaining</div>
                <div className="w-12 h-12 mx-auto rounded-full border-4 border-blue-400 relative">
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs">🥑</span>
                </div>
              </div>
            </div>

            {/* Recent meal */}
            <div>
              <h3 className="font-semibold mb-3">Recently eaten</h3>
              <div className="flex items-center space-x-3 bg-muted/20 rounded-xl p-3">
                <div className="w-12 h-12 bg-muted rounded-lg"></div>
                <div className="flex-1">
                  <div className="font-medium text-sm">Turkey Sandwich</div>
                  <div className="text-xs text-muted-foreground">🔥 460 calories</div>
                  <div className="text-xs text-muted-foreground">🥩 25g 🌾 45g 🥑 20g</div>
                </div>
                <div className="text-xs text-muted-foreground">14:10</div>
              </div>
            </div>
          </Card>
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