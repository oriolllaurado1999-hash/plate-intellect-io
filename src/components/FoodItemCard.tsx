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
  servingOptions?: Array<{
    label: string;
    amount: number;
    unit: string;
  }>;
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
      className="flex items-center justify-between px-4 py-3 bg-primary/5 rounded-2xl cursor-pointer hover:bg-primary/10 transition-colors"
    >
      <div className="flex items-center gap-3 flex-1">
        <Flame className="w-5 h-5 text-primary" />
        <div className="flex-1">
          <h4 className="font-medium text-foreground text-sm">{food.name}</h4>
          <p className="text-xs text-muted-foreground">
            {food.calories} cal · {formatServing()}
          </p>
        </div>
      </div>
      <Plus className="w-4 h-4 text-primary shrink-0" />
    </div>
  );
};

export default FoodItemCard;