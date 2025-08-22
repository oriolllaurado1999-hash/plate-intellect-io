import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, Bell, Crown, Unlock } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface TrialTimelineStepProps {
  onNext: () => void;
}

const TrialTimelineStep = ({ onNext }: TrialTimelineStepProps) => {
  const { t } = useTranslation();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');
  const timelineRef = useRef<HTMLDivElement>(null);
  const plansRef = useRef<HTMLDivElement>(null);

  // Helper function to format date
  const formatBillingDate = (daysToAdd: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Dynamic timeline based on selected plan
  const timelineItems = selectedPlan === 'monthly' ? [
    {
      icon: Unlock,
      title: "Today",
      description: "Unlock all app features like AI calorie scanning and more.",
      color: "text-orange-500"
    },
    {
      icon: Bell,
      title: "In 2 Days - Reminder",
      description: "We'll send you a reminder that your trial is ending soon.",
      color: "text-orange-500"
    },
    {
      icon: Crown,
      title: "In 3 Days - Billing Starts",
      description: `You'll be charged on ${formatBillingDate(3)} unless you cancel before.`,
      color: "text-foreground"
    }
  ] : [
    {
      icon: Unlock,
      title: "Today",
      description: "Unlock all app features like AI calorie scanning and more.",
      color: "text-orange-500"
    },
    {
      icon: Bell,
      title: "In 4 Days - Reminder",
      description: "We'll send you a reminder that your trial is ending soon.",
      color: "text-orange-500"
    },
    {
      icon: Crown,
      title: "In 7 Days - Billing Starts",
      description: `You'll be charged on ${formatBillingDate(7)} unless you cancel before.`,
      color: "text-foreground"
    }
  ];

  useEffect(() => {
    // Animate timeline items
    if (timelineRef.current) {
      const items = timelineRef.current.querySelectorAll('.timeline-item');
      items.forEach((item, index) => {
        const element = item as HTMLElement;
        element.style.opacity = '0';
        element.style.transform = 'translateX(-40px)';
        
        setTimeout(() => {
          element.style.transition = 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
          element.style.opacity = '1';
          element.style.transform = 'translateX(0)';
          
          // Animate the connection line
          const line = element.querySelector('.timeline-line') as HTMLElement;
          if (line && index < items.length - 1) {
            setTimeout(() => {
              line.style.transition = 'height 0.6s ease-out';
              line.style.height = '100%';
            }, 300);
          }
        }, 400 + index * 300);
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
        }, 1400 + index * 100);
      });
    }
  }, []);

  return (
    <div className="flex flex-col h-full px-6 py-8 bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground text-center mb-2">
          Start your FREE trial
        </h1>
        <h2 className="text-3xl font-bold text-foreground text-center mb-8">
          of 7 days to continue.
        </h2>

        {/* Timeline */}
        <div ref={timelineRef} className="space-y-6 mb-8">
          {timelineItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className="timeline-item flex items-start space-x-4">
                <div className="relative flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    index === 2 ? 'bg-foreground' : ''
                  }`} style={{ backgroundColor: index !== 2 ? '#4AD4B2' : undefined }}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  {index < timelineItems.length - 1 && (
                    <div 
                      className={`timeline-line w-1 bg-orange-500 mt-2 ${
                        index === 1 ? 'bg-muted' : 'bg-orange-500'
                      }`}
                      style={{ height: '0px' }}
                    />
                  )}
                </div>
                <div className="flex-1 pt-2">
                  <div className="font-bold text-foreground text-lg">{item.title}</div>
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pricing Plans */}
      <div ref={plansRef} className="flex-1">
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card 
            className={`plan-card p-4 cursor-pointer transition-all duration-300 ${
              selectedPlan === 'monthly' 
                ? 'border-2 border-foreground bg-card' 
                : 'border border-border bg-muted/20'
            }`}
            onClick={() => setSelectedPlan('monthly')}
          >
            <div className="text-center">
              <div className="font-bold text-lg text-foreground">Monthly</div>
              <div className="text-2xl font-bold text-foreground">$9.99 <span className="text-base font-normal">/month</span></div>
              <div className="mt-2">
                {selectedPlan === 'monthly' ? (
                  <div className="w-6 h-6 bg-foreground rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-4 h-4 text-background" />
                  </div>
                ) : (
                  <div className="w-6 h-6 border-2 border-muted rounded-full mx-auto"></div>
                )}
              </div>
            </div>
          </Card>

          <Card 
            className={`plan-card p-4 cursor-pointer transition-all duration-300 relative ${
              selectedPlan === 'yearly' 
                ? 'border-2 border-foreground bg-card' 
                : 'border border-border bg-muted/20'
            }`}
            onClick={() => setSelectedPlan('yearly')}
          >
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-foreground text-background px-3 py-1 rounded-full text-xs font-medium flex items-center justify-center">
              7 DAYS FREE
            </div>
            <div className="text-center pt-2">
              <div className="font-bold text-lg text-foreground">Annual</div>
              <div className="text-2xl font-bold text-foreground">$2.99 <span className="text-base font-normal">/month</span></div>
              <div className="mt-2">
                {selectedPlan === 'yearly' ? (
                  <div className="w-6 h-6 bg-foreground rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-4 h-4 text-background" />
                  </div>
                ) : (
                  <div className="w-6 h-6 border-2 border-muted rounded-full mx-auto"></div>
                )}
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

      <div className="mt-auto">
        <Button
          onClick={onNext}
          className="w-full h-14 text-lg font-medium rounded-full mb-4"
        >
          {selectedPlan === 'yearly' ? 'Start My 7-Day Free Trial' : 'Start Now'}
        </Button>
        <div className="text-center text-sm text-muted-foreground pb-2">
          {selectedPlan === 'monthly' 
            ? '3 days free, then $9.99 per month' 
            : '7 days free, then $35.88 per year ($2.99/month)'
          }
        </div>
      </div>
    </div>
  );
};

export default TrialTimelineStep;