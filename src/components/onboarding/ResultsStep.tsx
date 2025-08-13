import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

interface ResultsStepProps {
  onNext: () => void;
}

const ResultsStep = ({ onNext }: ResultsStepProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const width = rect.width;
    const height = rect.height;

    // Animation variables
    let animationProgress = 0;
    const animationDuration = 2000; // 2 seconds
    let startTime: number | null = null;

    // Chart data points
    const kaloreLine = [
      { x: 0, y: 0.3 },
      { x: 0.2, y: 0.35 },
      { x: 0.4, y: 0.25 },
      { x: 0.6, y: 0.2 },
      { x: 0.8, y: 0.15 },
      { x: 1, y: 0.1 }
    ];

    const traditionalLine = [
      { x: 0, y: 0.3 },
      { x: 0.2, y: 0.4 },
      { x: 0.4, y: 0.6 },
      { x: 0.6, y: 0.5 },
      { x: 0.8, y: 0.7 },
      { x: 1, y: 0.8 }
    ];

    const drawChart = (progress: number) => {
      ctx.clearRect(0, 0, width, height);

      // Chart area
      const chartMargin = 40;
      const chartWidth = width - chartMargin * 2;
      const chartHeight = height - chartMargin * 2 - 60;
      const chartY = chartMargin + 50;

      // Draw legend at the top
      if (progress >= 1) {
        ctx.textAlign = 'left';
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 16px system-ui';
        ctx.fillText('Traditional Diet', chartMargin, chartMargin - 10);
        
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 16px system-ui';
        ctx.fillText('Kalore', chartMargin + 200, chartMargin - 10);
      }

      // Draw grid lines (subtle)
      ctx.strokeStyle = 'rgba(156, 163, 175, 0.2)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        const y = chartY + (chartHeight / 4) * i;
        ctx.beginPath();
        ctx.moveTo(chartMargin, y);
        ctx.lineTo(chartMargin + chartWidth, y);
        ctx.stroke();
      }

      // Draw lines with animation
      const drawLine = (points: typeof kaloreLine, color: string) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.beginPath();

        for (let i = 0; i < points.length - 1; i++) {
          const currentPoint = points[i];
          const nextPoint = points[i + 1];
          
          const segmentProgress = Math.max(0, Math.min(1, (progress * points.length) - i));
          
          if (segmentProgress <= 0) break;

          const startX = chartMargin + currentPoint.x * chartWidth;
          const startY = chartY + currentPoint.y * chartHeight;
          
          const endX = chartMargin + nextPoint.x * chartWidth;
          const endY = chartY + nextPoint.y * chartHeight;
          
          const animatedEndX = startX + (endX - startX) * segmentProgress;
          const animatedEndY = startY + (endY - startY) * segmentProgress;

          if (i === 0) {
            ctx.moveTo(startX, startY);
          }
          ctx.lineTo(animatedEndX, animatedEndY);
        }
        
        ctx.stroke();

        // Draw end point if animation is complete
        if (progress >= 1) {
          const lastPoint = points[points.length - 1];
          const pointX = chartMargin + lastPoint.x * chartWidth;
          const pointY = chartY + lastPoint.y * chartHeight;
          
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(pointX, pointY, 6, 0, Math.PI * 2);
          ctx.fill();
          
          // Draw border
          ctx.strokeStyle = 'white';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      };

      // Draw traditional diet line (red)
      drawLine(traditionalLine, '#ef4444');
      
      // Draw Kalore line (black)
      drawLine(kaloreLine, '#000000');

      // Draw month labels
      if (progress >= 1) {
        ctx.fillStyle = '#374151';
        ctx.font = 'bold 14px system-ui';
        ctx.textAlign = 'left';
        ctx.fillText('Month 1', chartMargin, chartY + chartHeight + 25);
        
        ctx.textAlign = 'right';
        ctx.fillText('Month 6', chartMargin + chartWidth, chartY + chartHeight + 25);
      }
    };

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      animationProgress = Math.min(elapsed / animationDuration, 1);

      drawChart(animationProgress);

      if (animationProgress < 1) {
        requestAnimationFrame(animate);
      }
    };

    // Start animation after a small delay
    setTimeout(() => {
      requestAnimationFrame(animate);
    }, 500);

  }, []);

  return (
    <div className="px-6 py-8 h-full flex flex-col">
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-3xl font-bold mb-8 text-center">Kalore creates long-term results</h1>

        <div className="bg-muted/30 rounded-2xl p-6 mb-8 mx-auto max-w-md">
          <canvas
            ref={canvasRef}
            className="w-full h-64"
            style={{ width: '100%', height: '256px' }}
          />
        </div>

        <div className="text-center mb-12">
          <p className="text-lg font-medium text-muted-foreground">
            80% of Kalore users maintain their weight loss even 6 months later
          </p>
        </div>

        <div className="text-center mb-16">
          <p className="text-lg font-medium text-muted-foreground">
            Kalore makes it easy and holds you accountable.
          </p>
        </div>
      </div>

      <div className="mt-auto pt-4 pb-16">
        <Button
          onClick={onNext}
          className="w-full h-12 text-base font-semibold"
          size="lg"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ResultsStep;
