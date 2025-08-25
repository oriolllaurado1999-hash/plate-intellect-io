import React from 'react';
import { Flame, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

interface FoodItemCardProps {
  food: FoodItem;
  onClick?: () => void;
}

const FoodItemCard = ({ food, onClick }: FoodItemCardProps) => {
  const formatServing = () => {
    // Handle different serving types
    if (food.servingUnit === 'g') {
      return `${food.servingSize}g`;
    } else if (food.servingUnit === 'serving') {
      return 'serving';
    } else if (food.servingUnit === 'tbsp') {
      return 'tablespoon';
    } else if (['large', 'medium', 'small'].includes(food.servingSize.toLowerCase())) {
      return food.servingSize.toLowerCase();
    } else {
      return `${food.servingSize}${food.servingUnit}`;
    }
  };

  return (
    <div 
      onClick={onClick}
      className="flex items-center justify-between p-4 bg-primary/10 rounded-3xl border border-primary/20 cursor-pointer hover:bg-primary/15 transition-colors"
    >
      <div className="flex items-center gap-3 flex-1">
        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
          <Flame className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-foreground mb-1">{food.name}</h4>
              {food.brand && (
                <p className="text-xs text-muted-foreground mb-1">{food.brand}</p>
              )}
              <p className="text-sm text-muted-foreground">
                {food.calories} cal · {formatServing()}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Button 
        size="icon" 
        variant="ghost" 
        className="w-8 h-8 shrink-0 hover:bg-primary/20"
        onClick={(e) => {
          e.stopPropagation();
          // Handle quick add functionality here
        }}
      >
        <Plus className="w-4 h-4 text-primary" />
      </Button>
    </div>
  );
};

export default FoodItemCard;