import React, { useState } from 'react';
import { Flame, Beef, Wheat, Leaf, Grape, Candy, Salad, Heart } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { useTranslation } from '@/hooks/useTranslation';

interface NutritionCarouselProps {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  healthScore: number;
}

const NutritionCarousel = ({
  calories,
  protein,
  carbs,
  fat,
  fiber,
  sugar,
  sodium,
  healthScore
}: NutritionCarouselProps) => {
  const { t } = useTranslation();
  const [activeSlide, setActiveSlide] = useState(0);

  // Health score color interpolation
  const getHealthScoreColor = (score: number): string => {
    const clampedScore = Math.max(1, Math.min(10, score));
    const normalized = (clampedScore - 1) / 9;
    
    const red = Math.round(212 + (74 - 212) * normalized);
    const green = Math.round(73 + (212 - 73) * normalized);
    const blue = Math.round(73 + (178 - 73) * normalized);
    
    return `rgb(${red}, ${green}, ${blue})`;
  };

  const healthScoreColor = getHealthScoreColor(healthScore);

  return (
    <div className="space-y-4">
      <Carousel 
        className="w-full"
        setApi={(api) => {
          if (!api) return;
          setActiveSlide(api.selectedScrollSnap());
          api.on('select', () => {
            setActiveSlide(api.selectedScrollSnap());
          });
        }}
      >
        <CarouselContent>
          {/* Slide 1: Main Macros */}
          <CarouselItem>
            <div className="space-y-4">
              {/* Calories */}
              <div className="bg-card rounded-2xl p-6 shadow-lg border border-border/50">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-4xl font-bold text-foreground mb-1">
                      {calories}
                    </div>
                    <div className="text-muted-foreground">Calories</div>
                  </div>
                  <div className="w-20 h-20 relative">
                    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                        fill="none"
                        stroke="hsl(var(--border))"
                        strokeWidth="2"
                      />
                      <path
                        d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                        fill="none"
                        stroke="#4AD4B2"
                        strokeWidth="2"
                        strokeDasharray="100, 100"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Flame className="w-5 h-5" style={{ color: '#4AD4B2' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Macros Grid */}
              <div className="grid grid-cols-3 gap-3">
                {/* Protein */}
                <div className="bg-card rounded-xl p-4 text-center shadow-lg border border-border/50">
                  <div className="text-lg font-bold text-foreground mb-1">{protein}g</div>
                  <div className="text-xs text-muted-foreground mb-3">Protein</div>
                  <div className="w-12 h-12 mx-auto relative">
                    <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                        fill="none"
                        stroke="hsl(var(--border))"
                        strokeWidth="3"
                      />
                      <path
                        d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                        fill="none"
                        stroke="hsl(var(--protein))"
                        strokeWidth="3"
                        strokeDasharray="100, 100"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Beef className="w-4 h-4 text-protein" />
                    </div>
                  </div>
                </div>

                {/* Carbs */}
                <div className="bg-card rounded-xl p-4 text-center shadow-lg border border-border/50">
                  <div className="text-lg font-bold text-foreground mb-1">{carbs}g</div>
                  <div className="text-xs text-muted-foreground mb-3">Carbs</div>
                  <div className="w-12 h-12 mx-auto relative">
                    <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                        fill="none"
                        stroke="hsl(var(--border))"
                        strokeWidth="3"
                      />
                      <path
                        d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                        fill="none"
                        stroke="hsl(var(--carbs))"
                        strokeWidth="3"
                        strokeDasharray="100, 100"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Wheat className="w-4 h-4 text-carbs" />
                    </div>
                  </div>
                </div>

                {/* Fats */}
                <div className="bg-card rounded-xl p-4 text-center shadow-lg border border-border/50">
                  <div className="text-lg font-bold text-foreground mb-1">{fat}g</div>
                  <div className="text-xs text-muted-foreground mb-3">Fats</div>
                  <div className="w-12 h-12 mx-auto relative">
                    <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                        fill="none"
                        stroke="hsl(var(--border))"
                        strokeWidth="3"
                      />
                      <path
                        d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                        fill="none"
                        stroke="hsl(var(--fat))"
                        strokeWidth="3"
                        strokeDasharray="100, 100"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Leaf className="w-4 h-4 text-fat" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>

          {/* Slide 2: Micronutrients + Health Score */}
          <CarouselItem>
            <div className="space-y-4">
              {/* Health Score */}
              <div className="bg-card rounded-2xl p-6 shadow-lg border border-border/50">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-4xl font-bold text-foreground mb-1" style={{ color: healthScoreColor }}>
                      {healthScore > 0 ? healthScore : 'N/A'}
                    </div>
                    <div className="text-muted-foreground">Health Score</div>
                  </div>
                  <div className="w-20 h-20 relative">
                    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                        fill="none"
                        stroke="hsl(var(--border))"
                        strokeWidth="2"
                      />
                      {healthScore > 0 && (
                        <path
                          d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                          fill="none"
                          stroke={healthScoreColor}
                          strokeWidth="2"
                          strokeDasharray={`${healthScore * 10}, 100`}
                        />
                      )}
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Heart className="w-5 h-5" style={{ color: healthScore > 0 ? healthScoreColor : 'hsl(var(--muted-foreground))' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Micronutrients Grid */}
              <div className="grid grid-cols-3 gap-3">
                {/* Fiber */}
                <div className="bg-card rounded-xl p-4 text-center shadow-lg border border-border/50">
                  <div className="text-lg font-bold text-foreground mb-1">{fiber}g</div>
                  <div className="text-xs text-muted-foreground mb-3">Fiber</div>
                  <div className="w-12 h-12 mx-auto relative">
                    <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                        fill="none"
                        stroke="hsl(var(--border))"
                        strokeWidth="3"
                      />
                      <path
                        d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                        fill="none"
                        stroke="#8B5FBF"
                        strokeWidth="3"
                        strokeDasharray="100, 100"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Grape className="w-4 h-4" style={{ color: '#8B5FBF' }} />
                    </div>
                  </div>
                </div>

                {/* Sugar */}
                <div className="bg-card rounded-xl p-4 text-center shadow-lg border border-border/50">
                  <div className="text-lg font-bold text-foreground mb-1">{sugar}g</div>
                  <div className="text-xs text-muted-foreground mb-3">Sugar</div>
                  <div className="w-12 h-12 mx-auto relative">
                    <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                        fill="none"
                        stroke="hsl(var(--border))"
                        strokeWidth="3"
                      />
                      <path
                        d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                        fill="none"
                        stroke="#FF6B9D"
                        strokeWidth="3"
                        strokeDasharray="100, 100"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Candy className="w-4 h-4" style={{ color: '#FF6B9D' }} />
                    </div>
                  </div>
                </div>

                {/* Sodium */}
                <div className="bg-card rounded-xl p-4 text-center shadow-lg border border-border/50">
                  <div className="text-lg font-bold text-foreground mb-1">{sodium}mg</div>
                  <div className="text-xs text-muted-foreground mb-3">Sodium</div>
                  <div className="w-12 h-12 mx-auto relative">
                    <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                        fill="none"
                        stroke="hsl(var(--border))"
                        strokeWidth="3"
                      />
                      <path
                        d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                        fill="none"
                        stroke="#FFB366"
                        strokeWidth="3"
                        strokeDasharray="100, 100"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Salad className="w-4 h-4" style={{ color: '#FFB366' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      {/* Carousel Indicators */}
      <div className="flex justify-center gap-2">
        <div 
          className={`w-2 h-2 rounded-full transition-all duration-200 ${
            activeSlide === 0 ? 'bg-primary' : 'bg-muted'
          }`}
        />
        <div 
          className={`w-2 h-2 rounded-full transition-all duration-200 ${
            activeSlide === 1 ? 'bg-primary' : 'bg-muted'
          }`}
        />
      </div>
    </div>
  );
};

export default NutritionCarousel;