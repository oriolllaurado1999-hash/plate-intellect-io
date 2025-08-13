import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, Unlock, Bell, Crown } from 'lucide-react';

interface PricingPlansStepProps {
  onNext: () => void;
}

const PricingPlansStep = ({ onNext }: PricingPlansStepProps) => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const featuresRef = useRef<HTMLDivElement>(null);
  const plansRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      title: "Easy food scanning",
      description: "Track your calories with just a photo"
    },
    {
      title: "Get your dream body",
      description: "We keep it simple so getting results is easy"
    },
    {
      title: "Track your progress",
      description: "Stay on track with personalized insights and smart reminders"
    }
  ];

  useEffect(() => {
    // Animate features
    if (featuresRef.current) {
      const featureElements = featuresRef.current.querySelectorAll('.feature-item');
      featureElements.forEach((element, index) => {
        const el = element as HTMLElement;
        el.style.opacity = '0';
        el.style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
          el.style.transition = 'all 0.6s ease-out';
          el.style.opacity = '1';
          el.style.transform = 'translateX(0)';
        }, 200 + index * 150);
      });
    }

    // Animate plans
    if (plansRef.current) {
      const planElements = plansRef.current.querySelectorAll('.plan-card');
      planElements.forEach((element, index) => {
        const el = element as HTMLElement;
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px) scale(0.95)';
        
        setTimeout(() => {
          el.style.transition = 'all 0.5s ease-out';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0) scale(1)';
        }, 800 + index * 100);
      });
    }
  }, []);

  return (
    <div className="flex flex-col h-full px-6 py-8">
      <div className="mb-8">
        {selectedPlan === 'monthly' ? (
          <>
            <h1 className="text-3xl font-bold text-foreground text-center mb-1 whitespace-nowrap">
              Unlock Kalore to reach
            </h1>
            <h2 className="text-3xl font-bold text-foreground text-center mb-8 whitespace-nowrap">
              your goals <span className="italic">faster</span>
            </h2>
          </>
        ) : (
          <h1 className="text-3xl font-bold text-foreground text-center mb-8">
            Start your 7-Day FREE Trial to continue
          </h1>
        )}

        {/* Features or Timeline based on selection */}
        <div className="h-64 mb-2">
          {selectedPlan === 'yearly' ? (
            // Timeline for Annual plan
            <div className="animate-fade-in space-y-4">
              <div className="space-y-4">
                {/* Today */}
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <Unlock className="w-4 h-4 text-white" />
                    </div>
                    <div className="w-0.5 h-6 bg-orange-400 mx-auto mt-1"></div>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-foreground">Today</div>
                    <div className="text-sm text-muted-foreground">
                      Unlock all the app's features like AI calorie scanning and more.
                    </div>
                  </div>
                </div>

                {/* In 5 Days - Reminder */}
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <Bell className="w-4 h-4 text-white" />
                    </div>
                    <div className="w-0.5 h-6 bg-gray-300 mx-auto mt-1"></div>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-foreground">In 5 Days - Reminder</div>
                    <div className="text-sm text-muted-foreground">
                      We'll send you a reminder that your trial is ending soon.
                    </div>
                  </div>
                </div>

                {/* In 7 Days - Billing Starts */}
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                      <Crown className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-foreground">In 7 Days - Billing Starts</div>
                    <div className="text-sm text-muted-foreground">
                      You'll be charged unless you cancel anytime before.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Features for Monthly plan
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="feature-item flex items-start space-x-3">
                  <div className="mt-1">
                    <Check className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{feature.title}</div>
                    <div className="text-sm text-muted-foreground">{feature.description}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pricing Plans */}
      <div ref={plansRef} className="flex-1">
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card 
            className={`plan-card p-4 cursor-pointer transition-all duration-300 shadow-lg ${
              selectedPlan === 'monthly' 
                ? 'border-2 border-primary bg-primary text-primary-foreground' 
                : 'border border-border bg-muted/20'
            }`}
            onClick={() => setSelectedPlan('monthly')}
          >
            <div className="text-center">
              <div className={`font-bold text-lg ${selectedPlan === 'monthly' ? 'text-primary-foreground' : 'text-foreground'}`}>Monthly</div>
              <div className={`text-2xl font-bold ${selectedPlan === 'monthly' ? 'text-primary-foreground' : 'text-foreground'}`}>$9.99 <span className="text-base font-normal">/month</span></div>
              <div className="mt-2">
                {selectedPlan === 'monthly' ? (
                  <div className="w-6 h-6 bg-primary-foreground rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                ) : (
                  <div className="w-6 h-6 border-2 border-muted rounded-full mx-auto"></div>
                )}
              </div>
            </div>
          </Card>

          <Card 
            className={`plan-card p-4 cursor-pointer transition-all duration-300 relative shadow-lg ${
              selectedPlan === 'yearly' 
                ? 'border-2 border-primary bg-primary text-primary-foreground' 
                : 'border border-border bg-muted/20'
            }`}
            onClick={() => setSelectedPlan('yearly')}
          >
            <div className={`absolute -top-5 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium shadow-lg text-center ${
              selectedPlan === 'yearly' ? 'bg-primary-foreground text-primary' : 'bg-foreground text-background'
            }`}>
              7 DAYS <span className="font-bold">FREE</span>
            </div>
            <div className="text-center pt-2">
              <div className={`font-bold text-lg ${selectedPlan === 'yearly' ? 'text-primary-foreground' : 'text-foreground'}`}>Annual</div>
              <div className={`text-2xl font-bold ${selectedPlan === 'yearly' ? 'text-primary-foreground' : 'text-foreground'}`}>$2.99 <span className="text-base font-normal">/month</span></div>
              <div className="mt-2">
                {selectedPlan === 'yearly' ? (
                  <div className="w-6 h-6 bg-primary-foreground rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                ) : (
                  <div className="w-6 h-6 border-2 border-muted rounded-full mx-auto"></div>
                )}
              </div>
            </div>
          </Card>
        </div>

        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-2 text-green-600 mb-2">
            <span>✓</span>
            <span className="font-medium">No Commitment - Cancel Anytime</span>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-4 pb-16">
        <Button
          onClick={onNext}
          className="w-full h-14 text-lg font-medium rounded-full mb-4"
        >
          Start My Journey
        </Button>
        <div className="text-center text-sm text-muted-foreground">
          {selectedPlan === 'monthly' 
            ? 'Only $9.99 per month' 
            : '7 days free, then $35.88 per year ($2.99/month)'
          }
        </div>
      </div>
    </div>
  );
};

export default PricingPlansStep;