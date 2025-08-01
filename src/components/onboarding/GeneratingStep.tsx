import { useEffect, useRef, useState } from 'react';
import { CheckCircle, Clock } from 'lucide-react';

interface GeneratingStepProps {
  onComplete: () => void;
}

const GeneratingStep = ({ onComplete }: GeneratingStepProps) => {
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  const items = [
    'Calories',
    'Carbs', 
    'Protein',
    'Fats',
    'Health Score'
  ];

  useEffect(() => {
    // Animate progress from 0 to 83%
    let currentProgress = 0;
    const targetProgress = 83;
    const increment = targetProgress / 50; // 50 steps for smooth animation

    const progressInterval = setInterval(() => {
      currentProgress += increment;
      if (currentProgress >= targetProgress) {
        currentProgress = targetProgress;
        clearInterval(progressInterval);
        
        // Complete after reaching 83%
        setTimeout(() => {
          onComplete();
        }, 1500);
      }
      setProgress(Math.floor(currentProgress));
    }, 50);

    // Animate checklist items
    if (itemsRef.current) {
      const itemElements = itemsRef.current.querySelectorAll('.checklist-item');
      itemElements.forEach((item, index) => {
        const element = item as HTMLElement;
        element.style.opacity = '0';
        element.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
          element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
          element.style.opacity = '1';
          element.style.transform = 'translateX(0)';
          
          // Add check mark after animation
          setTimeout(() => {
            const checkmark = element.querySelector('.checkmark') as HTMLElement;
            if (checkmark) {
              checkmark.style.opacity = '1';
              checkmark.style.transform = 'scale(1)';
            }
          }, 300);
        }, 1000 + (index * 400));
      });
    }

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  return (
    <div className="flex flex-col h-full px-6 py-8">
      <div className="flex-1 flex flex-col justify-center">
        {/* Progress percentage */}
        <div className="text-center mb-12">
          <div className="text-6xl font-bold text-foreground mb-4">
            {progress}%
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-8">
            We're setting everything up for you
          </h1>
          
          {/* Progress bar */}
          <div ref={progressRef} className="w-full bg-muted rounded-full h-3 mb-6">
            <div 
              className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="text-muted-foreground">Finalizing results...</div>
        </div>

        {/* Checklist */}
        <div className="bg-muted/30 rounded-2xl p-6">
          <h3 className="font-semibold text-foreground mb-4">
            Daily recommendation for
          </h3>
          
          <div ref={itemsRef} className="space-y-3">
            {items.map((item, index) => (
              <div key={item} className="checklist-item flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-foreground">• {item}</span>
                </div>
                <div 
                  className="checkmark opacity-0 transition-all duration-300"
                  style={{ transform: 'scale(0.5)' }}
                >
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratingStep;