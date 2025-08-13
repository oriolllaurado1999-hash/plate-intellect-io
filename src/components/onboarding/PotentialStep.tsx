import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';

interface PotentialStepProps {
  onNext: () => void;
}

const PotentialStep = ({ onNext }: PotentialStepProps) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    // Get the total length of the path
    const pathLength = path.getTotalLength();
    
    // Set initial state
    path.style.strokeDasharray = `${pathLength}`;
    path.style.strokeDashoffset = `${pathLength}`;
    
    // Animate the path
    setTimeout(() => {
      path.style.transition = 'stroke-dashoffset 2s ease-out';
      path.style.strokeDashoffset = '0';
    }, 500);

    // Animate the points with delays
    const points = chartRef.current?.querySelectorAll('.chart-point');
    points?.forEach((point, index) => {
      const element = point as HTMLElement;
      element.style.opacity = '0';
      element.style.transform = 'scale(0)';
      
      setTimeout(() => {
        element.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        element.style.opacity = '1';
        element.style.transform = 'scale(1)';
      }, 700 + (index * 300));
    });
  }, []);

  return (
    <div className="flex flex-col h-full px-6 py-8">
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-12">
            You have great potential to crush your goal
          </h1>
        </div>

        <div ref={chartRef} className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Your weight transition
          </h2>
          
          <div className="relative h-48 mb-6">
            <svg 
              className="w-full h-full" 
              viewBox="0 0 300 150" 
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Background gradient */}
              <defs>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* Area under the curve */}
              <path
                d="M 50 120 Q 150 90 250 60 L 250 130 L 50 130 Z"
                fill="url(#areaGradient)"
              />
              
              {/* Main curve */}
              <path
                ref={pathRef}
                d="M 50 120 Q 150 90 250 60"
                stroke="hsl(var(--primary))"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              
              {/* Data points */}
              <circle className="chart-point" cx="50" cy="120" r="6" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="2" />
              <circle className="chart-point" cx="150" cy="90" r="6" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="2" />
              <circle className="chart-point" cx="250" cy="60" r="8" fill="hsl(var(--primary))" stroke="hsl(var(--background))" strokeWidth="2" />
              
              {/* Trophy icon at the end */}
              <g className="chart-point" transform="translate(242, 52)">
                <circle r="8" fill="hsl(var(--primary))" />
                <text x="0" y="4" textAnchor="middle" dominantBaseline="central" fill="white" fontSize="10">🏆</text>
              </g>
            </svg>
          </div>

          <div className="flex justify-between text-sm text-muted-foreground px-4">
            <span>3 Days</span>
            <span>7 Days</span>
            <span>30 Days</span>
          </div>
        </div>

        <div className="text-center">
          <p className="text-muted-foreground text-base leading-relaxed">
            Based on Kalore's historical data, weight loss is usually delayed at first, but after 7 days you'll see accelerated results.
          </p>
        </div>
      </div>

      <div className="mt-auto pt-4 pb-16">
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

export default PotentialStep;