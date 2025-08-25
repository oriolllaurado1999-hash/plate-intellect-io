import React from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Flame, Beef, Wheat, Droplets } from 'lucide-react';

interface NutritionCarouselProps {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  healthScore: number | string;
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
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {/* First View: Main Macros */}
        <CarouselItem>
          <div className="space-y-4">
            {/* Calories Card */}
            <div className="bg-card rounded-xl p-6 text-center shadow-sm border border-border/50">
              <div className="flex items-center justify-center mb-2">
                <Flame className="w-6 h-6 mr-2" style={{ color: '#4AD4B2' }} />
                <span className="text-sm font-medium text-muted-foreground">Calories</span>
              </div>
              <div className="text-3xl font-bold text-foreground">{calories}</div>
            </div>

            {/* Macros Grid */}
            <div className="grid grid-cols-3 gap-3">
              {/* Protein */}
              <div className="bg-card rounded-xl p-4 text-center shadow-sm border border-border/50">
                <div className="flex items-center justify-center mb-2">
                  <Beef className="w-4 h-4 mr-1 text-protein" />
                </div>
                <div className="text-xs text-muted-foreground mb-1">Protein</div>
                <div className="text-lg font-bold text-foreground">{protein}g</div>
              </div>

              {/* Carbs */}
              <div className="bg-card rounded-xl p-4 text-center shadow-sm border border-border/50">
                <div className="flex items-center justify-center mb-2">
                  <Wheat className="w-4 h-4 mr-1 text-carbs" />
                </div>
                <div className="text-xs text-muted-foreground mb-1">Carbs</div>
                <div className="text-lg font-bold text-foreground">{carbs}g</div>
              </div>

              {/* Fats */}
              <div className="bg-card rounded-xl p-4 text-center shadow-sm border border-border/50">
                <div className="flex items-center justify-center mb-2">
                  <Droplets className="w-4 h-4 mr-1 text-fat" />
                </div>
                <div className="text-xs text-muted-foreground mb-1">Fats</div>
                <div className="text-lg font-bold text-foreground">{fat}g</div>
              </div>
            </div>
          </div>
        </CarouselItem>

        {/* Second View: Additional Nutrients + Health Score */}
        <CarouselItem>
          <div className="space-y-4">
            {/* Additional Nutrients Grid */}
            <div className="grid grid-cols-3 gap-3">
              {/* Fiber */}
              <div className="bg-card rounded-xl p-4 text-center shadow-sm border border-border/50">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-lg">🍇</span>
                </div>
                <div className="text-xs text-muted-foreground mb-1">Fiber</div>
                <div className="text-lg font-bold text-foreground">{fiber}g</div>
              </div>

              {/* Sugar */}
              <div className="bg-card rounded-xl p-4 text-center shadow-sm border border-border/50">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-lg">🍬</span>
                </div>
                <div className="text-xs text-muted-foreground mb-1">Sugar</div>
                <div className="text-lg font-bold text-foreground">{sugar}g</div>
              </div>

              {/* Sodium */}
              <div className="bg-card rounded-xl p-4 text-center shadow-sm border border-border/50">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-lg">🧂</span>
                </div>
                <div className="text-xs text-muted-foreground mb-1">Sodium</div>
                <div className="text-lg font-bold text-foreground">{sodium}mg</div>
              </div>
            </div>

            {/* Health Score Card */}
            <div className="bg-card rounded-xl p-6 shadow-sm border border-border/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-lg mr-3">💖</span>
                  <span className="text-lg font-semibold text-foreground">Health Score</span>
                </div>
                <div className="text-2xl font-bold text-foreground">{healthScore}</div>
              </div>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default NutritionCarousel;