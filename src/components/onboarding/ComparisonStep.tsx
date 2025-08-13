import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';

interface ComparisonStepProps {
  onNext: () => void;
}

const ComparisonStep = ({ onNext }: ComparisonStepProps) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    // Animate the chart elements
    const withoutBar = chart.querySelector('.without-bar') as HTMLElement;
    const withBar = chart.querySelector('.with-bar') as HTMLElement;
    
    if (withoutBar && withBar) {
      // Reset initial state
      withoutBar.style.transform = 'scaleY(0)';
      withBar.style.transform = 'scaleY(0)';
      
      // Animate with delay
      setTimeout(() => {
        withoutBar.style.transform = 'scaleY(1)';
      }, 300);
      
      setTimeout(() => {
        withBar.style.transform = 'scaleY(1)';
      }, 600);
    }
  }, []);

  return (
    <div className="flex flex-col h-full px-6 py-8">
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-12">
            Lose twice as much weight with Kalore vs on your own
          </h1>
        </div>

        <div ref={chartRef} className="flex justify-center items-end mb-8 h-64">
          <div className="flex items-end space-x-8">
            {/* Without Kalore */}
            <div className="flex flex-col items-center">
              <div className="text-sm font-medium text-muted-foreground mb-2">
                Without
              </div>
              <div className="text-sm font-medium text-muted-foreground mb-4">
                Kalore
              </div>
              <div className="relative">
                <div 
                  className="without-bar w-24 bg-muted rounded-xl transition-transform duration-700 ease-out origin-bottom"
                  style={{ height: '120px' }}
                />
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-background rounded-lg border-2 border-muted flex items-center justify-center">
                  <span className="text-lg font-bold text-muted-foreground">20%</span>
                </div>
              </div>
            </div>

            {/* With Kalore */}
            <div className="flex flex-col items-center">
              <div className="text-sm font-medium text-muted-foreground mb-2">
                With
              </div>
              <div className="text-sm font-medium text-muted-foreground mb-4">
                Kalore
              </div>
              <div className="relative">
                <div 
                  className="with-bar w-24 bg-foreground rounded-xl transition-transform duration-700 ease-out origin-bottom"
                  style={{ height: '180px' }}
                />
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-foreground rounded-lg flex items-center justify-center">
                  <span className="text-lg font-bold text-background">2X</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-auto mb-8">
        <Button
          onClick={onNext}
          className="w-full h-14 text-lg font-medium rounded-full"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ComparisonStep;