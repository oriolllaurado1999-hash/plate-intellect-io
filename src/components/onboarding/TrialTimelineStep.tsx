import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, Bell, Crown, Unlock } from 'lucide-react';

interface TrialTimelineStepProps {
  onNext: () => void;
}

const TrialTimelineStep = ({ onNext }: TrialTimelineStepProps) => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');
  const timelineRef = useRef<HTMLDivElement>(null);
  const plansRef = useRef<HTMLDivElement>(null);

  const timelineItems = [
    {
      icon: Unlock,
      title: "Hoy",
      description: "Desbloquea todas las funciones de la app como escaneo IA de calorías y más.",
      color: "text-orange-500"
    },
    {
      icon: Bell,
      title: "En 2 Días - Recordatorio",
      description: "Te enviaremos un recordatorio de que tu prueba está terminando pronto.",
      color: "text-orange-500"
    },
    {
      icon: Crown,
      title: "En 3 Días - Comienza la Facturación",
      description: "Se te cobrará el 4 Ago 2025 a menos que canceles antes.",
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
    <div className="flex flex-col h-full px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground text-center mb-2">
          Inicia tu prueba GRATUITA
        </h1>
        <h2 className="text-3xl font-bold text-foreground text-center mb-8">
          de 3 días para continuar.
        </h2>

        {/* Timeline */}
        <div ref={timelineRef} className="space-y-6 mb-8">
          {timelineItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className="timeline-item flex items-start space-x-4">
                <div className="relative flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center ${
                    index === 2 ? 'bg-foreground' : 'bg-orange-500'
                  }`}>
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
              <div className="font-bold text-lg text-foreground">Mensual</div>
              <div className="text-2xl font-bold text-foreground">9,99 € <span className="text-base font-normal">/mes</span></div>
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
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-foreground text-background px-3 py-1 rounded-full text-xs font-medium">
              3 DÍAS GRATIS
            </div>
            <div className="text-center pt-2">
              <div className="font-bold text-lg text-foreground">Anual</div>
              <div className="text-2xl font-bold text-foreground">2,99 € <span className="text-base font-normal">/mes</span></div>
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
          <div className="flex items-center justify-center space-x-2 text-green-600 mb-2">
            <span>✓</span>
            <span className="font-medium">Sin Pago Inmediato</span>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <Button
          onClick={onNext}
          className="w-full h-14 text-lg font-medium rounded-full mb-4"
        >
          Iniciar Mi Prueba Gratuita de 3 Días
        </Button>
        <div className="text-center text-sm text-muted-foreground">
          {selectedPlan === 'monthly' 
            ? '3 días gratis, luego 9,99 € al mes' 
            : '3 días gratis, luego 35,88 € al año (2,99 €/mes)'
          }
        </div>
      </div>
    </div>
  );
};

export default TrialTimelineStep;