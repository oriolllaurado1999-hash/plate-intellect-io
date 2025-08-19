import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import { CheckCircle, Flame, Edit3, Beef, Wheat, Leaf, Heart } from 'lucide-react';

interface CompletionStepProps {
  onGetStarted: () => void;
  currentWeight?: { weight: number; unit: 'kg' | 'lbs' } | null;
  desiredWeight?: number | null;
  lossSpeed?: number | null;
  goal?: 'lose' | 'maintain' | 'gain' | null;
}

const CompletionStep = ({ onGetStarted, currentWeight, desiredWeight, lossSpeed, goal }: CompletionStepProps) => {
  const checkRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [currentPhase, setCurrentPhase] = useState<'1month' | '3months' | '6months'>('1month');

  useEffect(() => {
    const check = checkRef.current;
    const cards = cardsRef.current;

    if (check) {
      // Animate check icon
      check.style.opacity = '0';
      check.style.transform = 'scale(0.5)';
      
      setTimeout(() => {
        check.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        check.style.opacity = '1';
        check.style.transform = 'scale(1)';
      }, 300);
    }

    if (cards) {
      // Animate metric cards
      const cardElements = cards.querySelectorAll('.metric-card');
      cardElements.forEach((card, index) => {
        const element = card as HTMLElement;
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px) scale(0.95)';
        
        setTimeout(() => {
          element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
          element.style.opacity = '1';
          element.style.transform = 'translateY(0) scale(1)';
        }, 800 + (index * 150));
      });
    }

    // Phase transitions
    const phase1Timer = setTimeout(() => {
      setCurrentPhase('3months');
    }, 2500);

    const phase2Timer = setTimeout(() => {
      setCurrentPhase('6months');
    }, 5000);

    return () => {
      clearTimeout(phase1Timer);
      clearTimeout(phase2Timer);
    };
  }, []);

  // Calculate weight loss projections
  const calculateWeightLoss = () => {
    if (!currentWeight || !desiredWeight || !lossSpeed || !goal) {
      return {
        oneMonth: { amount: 6, unit: 'kg' },
        threeMonths: { amount: 12, unit: 'kg' },
        sixMonths: { amount: 18, unit: 'kg' }
      };
    }

    const unit = currentWeight.unit;
    const totalWeightToLose = Math.abs(currentWeight.weight - desiredWeight);
    
    // lossSpeed is a value from 1-5, where 1 is slowest and 5 is fastest
    // Convert to kg per week (average values)
    const weeklyLossRates = {
      1: 0.25, // Very slow
      2: 0.5,  // Slow  
      3: 0.75, // Moderate
      4: 1.0,  // Fast
      5: 1.25  // Very fast
    };

    let weeklyLoss = weeklyLossRates[lossSpeed as keyof typeof weeklyLossRates] || 0.75;
    
    // Convert to lbs if needed
    if (unit === 'lbs') {
      weeklyLoss = weeklyLoss * 2.20462;
    }

    // Calculate projections
    const oneMonthLoss = Math.min(weeklyLoss * 4, totalWeightToLose);
    const threeMonthsLoss = Math.min(weeklyLoss * 12, totalWeightToLose);
    const sixMonthsLoss = Math.min(weeklyLoss * 24, totalWeightToLose);

    return {
      oneMonth: { amount: Math.round(oneMonthLoss * 10) / 10, unit },
      threeMonths: { amount: Math.round(threeMonthsLoss * 10) / 10, unit },
      sixMonths: { amount: Math.round(sixMonthsLoss * 10) / 10, unit }
    };
  };

  const projections = calculateWeightLoss();
  
  const getCurrentProjection = () => {
    switch (currentPhase) {
      case '1month':
        return projections.oneMonth;
      case '3months':
        return projections.threeMonths;
      case '6months':
        return projections.sixMonths;
      default:
        return projections.oneMonth;
    }
  };

  const getTimeframe = () => {
    const now = new Date();
    switch (currentPhase) {
      case '1month':
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        return `by ${endOfMonth.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`;
      case '3months':
        const threeMonthsLater = new Date(now.getFullYear(), now.getMonth() + 3, now.getDate());
        return `in 3 months (${threeMonthsLater.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })})`;
      case '6months':
        const sixMonthsLater = new Date(now.getFullYear(), now.getMonth() + 6, now.getDate());
        return `in 6 months (${sixMonthsLater.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })})`;
      default:
        return 'by month end';
    }
  };

  const currentProjection = getCurrentProjection();
  const timeframe = getTimeframe();

  const metrics = [
    { icon: Flame, label: 'Calories', value: '1960', color: 'text-gray-600' },
    { icon: Wheat, label: 'Carbs', value: '221g', color: 'text-orange-500' },
    { icon: Beef, label: 'Protein', value: '146g', color: 'text-red-500' },
    { icon: Leaf, label: 'Fats', value: '54g', color: 'text-blue-500' }
  ];

  return (
    <div className="flex flex-col h-full px-6 py-8 bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="flex-1 flex flex-col justify-center">
        {/* Success header */}
        <div className="text-center mb-8">
          <div ref={checkRef} className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#4AD4B2' }}>
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Congratulations
          </h1>
          <h2 className="text-3xl font-bold text-foreground mb-6">
            your custom plan is ready!
          </h2>
          
          <div className="bg-muted/30 rounded-xl p-4 mb-6 shadow-lg">
            <div className="text-lg font-semibold text-foreground mb-1">
              You should lose:
            </div>
            <div 
              key={currentPhase}
              className="text-xl font-bold text-primary animate-fade-in transition-opacity duration-500"
            >
              {currentProjection.amount} {currentProjection.unit} {timeframe}
            </div>
          </div>
        </div>

        {/* Daily recommendations */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-foreground">Daily recommendation</h3>
          </div>
          <p className="text-muted-foreground text-sm mb-6">You can edit this anytime</p>
          
          <div ref={cardsRef} className="grid grid-cols-2 gap-4 mb-6">
            {metrics.map((metric, index) => (
              <div key={metric.label} className="metric-card bg-muted/30 rounded-2xl p-4 relative shadow-lg">
                <div className="flex items-center space-x-2 mb-3">
                  {typeof metric.icon === 'string' ? (
                    <span className="text-lg">{metric.icon}</span>
                  ) : (
                    <metric.icon className={`h-5 w-5 ${metric.color}`} />
                  )}
                  <span className="font-medium text-foreground">{metric.label}</span>
                </div>
                
                <div className="relative w-16 h-16 mb-2">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="32"
                      cy="32"
                      r="24"
                      stroke="hsl(var(--muted))"
                      strokeWidth="4"
                      fill="none"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="24"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray="150"
                      strokeDashoffset="30"
                      strokeLinecap="round"
                      className={metric.color}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-foreground">{metric.value}</span>
                  </div>
                </div>
                
                <button className="absolute top-3 right-3 p-1 hover:bg-muted/50 rounded">
                  <Edit3 className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            ))}
          </div>
          
          {/* Health Score */}
          <div className="metric-card bg-muted/30 rounded-2xl p-4 flex items-center justify-between shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <Heart className="h-5 w-5 text-red-500" />
              </div>
              <span className="font-medium text-foreground">Health Score</span>
            </div>
            <span className="text-xl font-bold text-foreground">7/10</span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-background border-t border-border">
        <Button
          onClick={onGetStarted}
          className="w-full h-14 text-lg font-medium rounded-full"
        >
          Let's get started!
        </Button>
      </div>
    </div>
  );
};

export default CompletionStep;