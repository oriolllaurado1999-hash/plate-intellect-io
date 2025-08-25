import React, { useState, useEffect } from 'react';
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
  servingOptions?: Array<{
    label: string;
    amount: number;
    unit: string;
  }>;
}

interface FoodDetailModalProps {
  food: FoodItem | null;
  isOpen: boolean;
  onClose: () => void;
  onLog?: (food: FoodItem, servings: number, size: string) => void;
}

const FoodDetailModal = ({ food, isOpen, onClose, onLog }: FoodDetailModalProps) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [servings, setServings] = useState(1);
  const [showNutritionFacts, setShowNutritionFacts] = useState(false);
  const [activeCarouselSection, setActiveCarouselSection] = useState(0);

  if (!food) return null;

  // Generate serving options based on food type and database info
  const getServingOptions = (food: FoodItem) => {
    // If the food has predefined serving options, use those
    if (food.servingOptions && food.servingOptions.length > 0) {
      return food.servingOptions;
    }

    const foodName = food.name.toLowerCase();
    const baseAmount = parseFloat(food.servingSize) || 100;
    
    // Generate options based on food type
    if (foodName.includes('apple') || foodName.includes('banana') || foodName.includes('orange') || 
        foodName.includes('pear') || foodName.includes('peach') || foodName.includes('fruit')) {
      return [
        { label: 'Small', amount: baseAmount * 0.6, unit: food.servingUnit },
        { label: 'Medium', amount: baseAmount, unit: food.servingUnit },
        { label: 'Large', amount: baseAmount * 1.4, unit: food.servingUnit }
      ];
    }
    
    if (foodName.includes('chicken') || foodName.includes('beef') || foodName.includes('salmon') || 
        foodName.includes('fish') || foodName.includes('meat')) {
      return [
        { label: '50g', amount: 50, unit: 'g' },
        { label: '100g', amount: 100, unit: 'g' },
        { label: '150g', amount: 150, unit: 'g' },
        { label: '200g', amount: 200, unit: 'g' }
      ];
    }
    
    if (foodName.includes('rice') || foodName.includes('pasta') || foodName.includes('quinoa') || 
        foodName.includes('grain')) {
      return [
        { label: '50g (dry)', amount: 50, unit: 'g' },
        { label: '75g (dry)', amount: 75, unit: 'g' },
        { label: '100g (dry)', amount: 100, unit: 'g' }
      ];
    }
    
    if (foodName.includes('bread') || foodName.includes('toast')) {
      return [
        { label: '1 slice', amount: 30, unit: 'g' },
        { label: '2 slices', amount: 60, unit: 'g' },
        { label: '3 slices', amount: 90, unit: 'g' }
      ];
    }
    
    if (foodName.includes('milk') || foodName.includes('juice') || foodName.includes('water') || 
        foodName.includes('drink') || foodName.includes('beverage')) {
      return [
        { label: '100ml', amount: 100, unit: 'ml' },
        { label: '200ml', amount: 200, unit: 'ml' },
        { label: '250ml (1 cup)', amount: 250, unit: 'ml' }
      ];
    }
    
    // Default serving options for other foods
    return [
      { label: '50g', amount: 50, unit: 'g' },
      { label: '100g', amount: 100, unit: 'g' },
      { label: '150g', amount: 150, unit: 'g' }
    ];
  };

  const servingOptions = getServingOptions(food);
  
  // Set initial selected size when food changes
  useEffect(() => {
    if (food && servingOptions.length > 0) {
      const defaultOption = servingOptions.find(option => option.amount === parseFloat(food.servingSize)) || servingOptions[1] || servingOptions[0];
      setSelectedSize(defaultOption.label);
    }
  }, [food?.id]); // Only run when food changes

  // Calculate nutrition multiplier based on selected serving size
  const getServingMultiplier = () => {
    const selectedOption = servingOptions.find(option => option.label === selectedSize);
    if (!selectedOption) return 1;
    
    const baseAmount = parseFloat(food.servingSize) || 100;
    return selectedOption.amount / baseAmount;
  };

  const servingMultiplier = getServingMultiplier();

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
            <div className="flex gap-2 flex-wrap">
              {servingOptions.map((option) => (
                <Button
                  key={option.label}
                  variant={selectedSize === option.label ? "default" : "outline"}
                  className={`px-6 py-2 rounded-full ${
                    selectedSize === option.label 
                      ? "bg-foreground text-background" 
                      : "bg-transparent border-muted-foreground/20 text-foreground"
                  }`}
                  onClick={() => setSelectedSize(option.label)}
                >
                  {option.label}
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
                   <div className="space-y-4 pb-8">
                    {/* Main Calorie Card */}
                    <Card className="shadow-lg dark:shadow-xl border border-border/50">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground mb-1">Calories</p>
                            <p className="text-3xl font-bold text-foreground">{Math.round(food.calories * servingMultiplier * servings)}</p>
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
                     <Card className="shadow-lg dark:shadow-xl border border-border/50">
                        <CardContent className="p-4 text-center">
                          <div className="w-12 h-12 mx-auto mb-3 bg-protein/10 rounded-full flex items-center justify-center">
                            <Beef className="w-6 h-6" style={{ color: 'hsl(var(--protein))' }} />
                          </div>
                           <div className="text-lg font-bold text-foreground mb-1">
                             {Math.round(food.protein * servingMultiplier * servings)}g
                           </div>
                          <div className="text-xs text-muted-foreground">Protein</div>
                        </CardContent>
                      </Card>

                      {/* Carbs */}
                     <Card className="shadow-lg dark:shadow-xl border border-border/50">
                       <CardContent className="p-4 text-center">
                         <div className="w-12 h-12 mx-auto mb-3 bg-carbs/10 rounded-full flex items-center justify-center">
                           <Wheat className="w-6 h-6" style={{ color: 'hsl(var(--carbs))' }} />
                         </div>
                          <div className="text-lg font-bold text-foreground mb-1">
                            {Math.round(food.carbs * servingMultiplier * servings)}g
                          </div>
                         <div className="text-xs text-muted-foreground">Carbs</div>
                       </CardContent>
                     </Card>

                     {/* Fats */}
                     <Card className="shadow-lg dark:shadow-xl border border-border/50">
                       <CardContent className="p-4 text-center">
                         <div className="w-12 h-12 mx-auto mb-3 bg-fat/10 rounded-full flex items-center justify-center">
                           <Leaf className="w-6 h-6" style={{ color: 'hsl(var(--fat))' }} />
                         </div>
                          <div className="text-lg font-bold text-foreground mb-1">
                            {Math.round(food.fat * servingMultiplier * servings)}g
                          </div>
                         <div className="text-xs text-muted-foreground">Fats</div>
                       </CardContent>
                     </Card>
                    </div>
                  </div>
                </CarouselItem>

                {/* Section 2: Additional Nutrients */}
                 <CarouselItem>
                   <div className="space-y-4 pb-8">
                    {/* Health Score - Large Card */}
                     <Card className="shadow-lg dark:shadow-xl border border-border/50">
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
                       <Card className="shadow-lg dark:shadow-xl border border-border/50">
                         <CardContent className="p-4 text-center">
                           <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: '#8B5FBF20' }}>
                             <Grape className="w-6 h-6" style={{ color: '#8B5FBF' }} />
                           </div>
                            <div className="text-lg font-bold text-foreground mb-1">
                              {Math.round(food.fiber * servingMultiplier * servings)}g
                            </div>
                           <div className="text-xs text-muted-foreground">Fiber</div>
                         </CardContent>
                       </Card>

                       {/* Sugar */}
                       <Card className="shadow-lg dark:shadow-xl border border-border/50">
                         <CardContent className="p-4 text-center">
                           <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FF6B9D20' }}>
                             <Candy className="w-6 h-6" style={{ color: '#FF6B9D' }} />
                           </div>
                            <div className="text-lg font-bold text-foreground mb-1">
                              {Math.round(food.sugar * servingMultiplier * servings)}g
                            </div>
                           <div className="text-xs text-muted-foreground">Sugar</div>
                         </CardContent>
                       </Card>

                       {/* Sodium */}
                       <Card className="shadow-lg dark:shadow-xl border border-border/50">
                         <CardContent className="p-4 text-center">
                           <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFB36620' }}>
                             <Salad className="w-6 h-6" style={{ color: '#FFB366' }} />
                           </div>
                            <div className="text-lg font-bold text-foreground mb-1">
                              {Math.round(food.sodium * servingMultiplier * servings)}mg
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
                   { label: 'Saturated Fat', value: `${Math.round(food.fat * 0.3 * servingMultiplier * servings)}g` },
                   { label: 'Polyunsaturated Fat', value: `${Math.round(food.fat * 0.1 * servingMultiplier * servings)}g` },
                   { label: 'Monounsaturated Fat', value: `${Math.round(food.fat * 0.4 * servingMultiplier * servings)}g` },
                   { label: 'Cholesterol', value: `${Math.round(food.protein * 10 * servingMultiplier * servings)}mg` },
                   { label: 'Sodium', value: `${Math.round(food.sodium * servingMultiplier * servings)}mg` },
                   { label: 'Fiber', value: `${Math.round(food.fiber * servingMultiplier * servings)}g` },
                   { label: 'Sugar', value: `${Math.round(food.sugar * servingMultiplier * servings)}g` },
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
