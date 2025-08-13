import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';
import { CheckCircle, Flame, Edit3 } from 'lucide-react';

interface CompletionStepProps {
  onGetStarted: () => void;
}

const CompletionStep = ({ onGetStarted }: CompletionStepProps) => {
  const checkRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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
  }, []);

  const metrics = [
    { icon: Flame, label: 'Calories', value: '1960', color: 'text-gray-600' },
    { icon: '🥖', label: 'Carbs', value: '221g', color: 'text-orange-500' },
    { icon: '🥩', label: 'Protein', value: '146g', color: 'text-red-500' },
    { icon: '🥑', label: 'Fats', value: '54g', color: 'text-blue-500' }
  ];

  return (
    <div className="flex flex-col h-full px-6 py-8">
      <div className="flex-1 flex flex-col justify-center">
        {/* Success header */}
        <div className="text-center mb-8">
          <div ref={checkRef} className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Congratulations
          </h1>
          <h2 className="text-3xl font-bold text-foreground mb-6">
            your custom plan is ready!
          </h2>
          
          <div className="bg-muted/30 rounded-xl p-4 mb-6">
            <div className="text-lg font-semibold text-foreground mb-1">
              You should lose:
            </div>
            <div className="text-xl font-bold text-primary">
              6 kg by August 30
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
                <span className="text-red-500">💖</span>
              </div>
              <span className="font-medium text-foreground">Health Score</span>
            </div>
            <span className="text-xl font-bold text-foreground">7/10</span>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-4 pb-16">
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