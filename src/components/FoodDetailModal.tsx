import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronRight, Bookmark, Edit } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
      <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl p-0">
        <SheetHeader className="p-4 pb-0">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="w-10 h-10 bg-muted rounded-full flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <h2 className="text-lg font-semibold text-foreground">Selected food</h2>
            <button className="w-10 h-10 bg-muted rounded-full flex items-center justify-between">
              <div className="w-1 h-1 bg-foreground rounded-full"></div>
              <div className="w-1 h-1 bg-foreground rounded-full"></div>
              <div className="w-1 h-1 bg-foreground rounded-full"></div>
            </button>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-auto p-4 pb-24">
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

          {/* Calories */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-lg">🔥</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Calories</p>
                <p className="text-3xl font-bold text-foreground">{Math.round(food.calories * servings)}</p>
              </div>
            </div>

            {/* Macros */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Protein</span>
                </div>
                <p className="text-xl font-semibold text-foreground">{Math.round(food.protein * servings)}g</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Carbs</span>
                </div>
                <p className="text-xl font-semibold text-foreground">{Math.round(food.carbs * servings)}g</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Fats</span>
                </div>
                <p className="text-xl font-semibold text-foreground">{Math.round(food.fat * servings)}g</p>
              </div>
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

        {/* Fixed bottom button */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-background border-t border-border">
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
