import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronRight, Bookmark, Edit, Flame, Beef, Wheat, Leaf, Grape, Candy, Salad, Heart } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

interface FoodItem {
  id: string;
  name: string;
  brand?: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  servingSize: string;
  servingUnit: string;
}

interface FoodDetailModalProps {
  food: FoodItem | null;
  isOpen: boolean;
  onClose: () => void;
  onLog?: (food: FoodItem, servings: number, size: string) => void;
}

const FoodDetailModal = ({ food, isOpen, onClose, onLog }: FoodDetailModalProps) => {
  const [selectedSize, setSelectedSize] = useState('Large');
  const [servings, setServings] = useState(1);
  const [showNutritionFacts, setShowNutritionFacts] = useState(false);
  const [activeCarouselSection, setActiveCarouselSection] = useState(0);

  if (!food) return null;

  const sizes = ['Large', 'Medium', 'Small'];

  const handleLog = () => {
    onLog?.(food, servings, selectedSize);
    onClose();
  };

  const adjustServings = (increment: boolean) => {
    if (increment) {
      setServings(prev => prev + 1);
    } else if (servings > 1) {
      setServings(prev => prev - 1);
    }
  };

  if (!isOpen || !food) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[100vh] rounded-t-none p-0 z-[90] flex flex-col [&>button]:hidden">
        <SheetHeader className="p-4 pb-0 flex-shrink-0">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="w-10 h-10 bg-muted rounded-full flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <h2 className="text-lg font-semibold text-foreground">Selected food</h2>
            <div className="w-10"></div>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 pb-32">
          {/* Food Name and Bookmark */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-foreground">{food.name}</h1>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <Bookmark className="w-5 h-5" />
            </Button>
          </div>

          {/* Measurement */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">Measurement</h3>
            <div className="flex gap-2">
              {sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  className={`px-6 py-2 rounded-full ${
                    selectedSize === size 
                      ? "bg-foreground text-background" 
                      : "bg-transparent border-muted-foreground/20 text-foreground"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          {/* Number of Servings */}
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-semibold text-foreground">Number of Servings</h3>
            <div className="flex items-center gap-2 border border-muted-foreground/20 rounded-full px-4 py-2">
              <span className="text-lg font-medium text-foreground">{servings}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="w-6 h-6 p-0"
                onClick={() => adjustServings(false)}
              >
                <Edit className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Nutrition Carousel */}
          <div className="mb-8">
            <Carousel 
              className="w-full"
              setApi={(api) => {
                if (!api) return;
                
                // Set initial active section
                setActiveCarouselSection(api.selectedScrollSnap());
                
                // Listen for scroll changes
                api.on('select', () => {
                  setActiveCarouselSection(api.selectedScrollSnap());
                });
              }}
            >
              <CarouselContent>
                {/* Section 1: Main Macros */}
                <CarouselItem>
                  <div className="space-y-4">
                    {/* Main Calorie Card */}
                    <Card className="shadow-lg border border-border/50">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Calories</p>
                            <p className="text-3xl font-bold text-foreground">{Math.round(food.calories * servings)}</p>
                          </div>
                          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                            <Flame className="w-8 h-8 text-primary" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Macro Cards */}
                    <div className="grid grid-cols-3 gap-3">
                      {/* Protein */}
                      <Card className="shadow-xl border border-border/50">
                        <CardContent className="p-4 text-center">
                          <div className="w-12 h-12 mx-auto mb-3 bg-protein/10 rounded-full flex items-center justify-center">
                            <Beef className="w-6 h-6" style={{ color: 'hsl(var(--protein))' }} />
                          </div>
                          <div className="text-lg font-bold text-foreground mb-1">
                            {Math.round(food.protein * servings)}g
                          </div>
                          <div className="text-xs text-muted-foreground">Protein</div>
                        </CardContent>
                      </Card>

                      {/* Carbs */}
                      <Card className="shadow-xl border border-border/50">
                        <CardContent className="p-4 text-center">
                          <div className="w-12 h-12 mx-auto mb-3 bg-carbs/10 rounded-full flex items-center justify-center">
                            <Wheat className="w-6 h-6" style={{ color: 'hsl(var(--carbs))' }} />
                          </div>
                          <div className="text-lg font-bold text-foreground mb-1">
                            {Math.round(food.carbs * servings)}g
                          </div>
                          <div className="text-xs text-muted-foreground">Carbs</div>
                        </CardContent>
                      </Card>

                      {/* Fats */}
                      <Card className="shadow-xl border border-border/50">
                        <CardContent className="p-4 text-center">
                          <div className="w-12 h-12 mx-auto mb-3 bg-fat/10 rounded-full flex items-center justify-center">
                            <Leaf className="w-6 h-6" style={{ color: 'hsl(var(--fat))' }} />
                          </div>
                          <div className="text-lg font-bold text-foreground mb-1">
                            {Math.round(food.fat * servings)}g
                          </div>
                          <div className="text-xs text-muted-foreground">Fats</div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CarouselItem>

                {/* Section 2: Additional Nutrients */}
                <CarouselItem>
                  <div className="space-y-4">
                    {/* Health Score - Large Card */}
                    <Card className="shadow-lg border border-border/50">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Health Score</p>
                            <p className="text-3xl font-bold text-foreground" style={{ color: '#4AD4B2' }}>8.5</p>
                          </div>
                          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#4AD4B220' }}>
                            <Heart className="w-8 h-8" style={{ color: '#4AD4B2' }} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Micronutrient Cards */}
                    <div className="grid grid-cols-3 gap-3">
                      {/* Fiber */}
                      <Card className="shadow-xl border border-border/50">
                        <CardContent className="p-4 text-center">
                          <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: '#8B5FBF20' }}>
                            <Grape className="w-6 h-6" style={{ color: '#8B5FBF' }} />
                          </div>
                          <div className="text-lg font-bold text-foreground mb-1">
                            {Math.round(food.fiber * servings)}g
                          </div>
                          <div className="text-xs text-muted-foreground">Fiber</div>
                        </CardContent>
                      </Card>

                      {/* Sugar */}
                      <Card className="shadow-xl border border-border/50">
                        <CardContent className="p-4 text-center">
                          <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FF6B9D20' }}>
                            <Candy className="w-6 h-6" style={{ color: '#FF6B9D' }} />
                          </div>
                          <div className="text-lg font-bold text-foreground mb-1">
                            {Math.round(food.sugar * servings)}g
                          </div>
                          <div className="text-xs text-muted-foreground">Sugar</div>
                        </CardContent>
                      </Card>

                      {/* Sodium */}
                      <Card className="shadow-xl border border-border/50">
                        <CardContent className="p-4 text-center">
                          <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFB36620' }}>
                            <Salad className="w-6 h-6" style={{ color: '#FFB366' }} />
                          </div>
                          <div className="text-lg font-bold text-foreground mb-1">
                            {Math.round(food.sodium * servings)}mg
                          </div>
                          <div className="text-xs text-muted-foreground">Sodium</div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
            </Carousel>

            {/* Page Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              <div 
                className="w-2 h-2 rounded-full transition-colors duration-200"
                style={{ backgroundColor: activeCarouselSection === 0 ? '#4AD4B2' : 'hsl(var(--border))' }}
              ></div>
              <div 
                className="w-2 h-2 rounded-full transition-colors duration-200"
                style={{ backgroundColor: activeCarouselSection === 1 ? '#4AD4B2' : 'hsl(var(--border))' }}
              ></div>
            </div>
          </div>

          {/* Other nutrition facts */}
          <div className="mb-6">
            <button
              onClick={() => setShowNutritionFacts(!showNutritionFacts)}
              className="flex items-center justify-between w-full py-3"
            >
              <h3 className="text-lg font-semibold text-foreground">Other nutrition facts</h3>
              {showNutritionFacts ? (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              )}
            </button>

            {showNutritionFacts && (
              <div className="space-y-3 mt-4">
                {[
                  { label: 'Saturated Fat', value: `${Math.round(food.fat * 0.3 * servings)}g` },
                  { label: 'Polyunsaturated Fat', value: `${Math.round(food.fat * 0.1 * servings)}g` },
                  { label: 'Monounsaturated Fat', value: `${Math.round(food.fat * 0.4 * servings)}g` },
                  { label: 'Cholesterol', value: `${Math.round(food.protein * 10 * servings)}mg` },
                  { label: 'Sodium', value: `${Math.round(food.sodium * servings)}mg` },
                  { label: 'Fiber', value: `${Math.round(food.fiber * servings)}g` },
                  { label: 'Sugar', value: `${Math.round(food.sugar * servings)}g` },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-3 px-4 bg-muted/30 rounded-xl">
                    <span className="text-foreground">{item.label}</span>
                    <span className="font-semibold text-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          </div>
        </div>

        {/* Fixed bottom button */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-background border-t border-border flex-shrink-0">
          <Button 
            onClick={handleLog}
            className="w-full h-12 text-base font-semibold rounded-full bg-foreground text-background hover:bg-foreground/90"
          >
            Log
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FoodDetailModal;
