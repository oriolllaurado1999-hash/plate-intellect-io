import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MealItem {
  name: string;
  amount: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  time: string;
}

interface ExpandedNutritionCardProps {
  type: 'calories' | 'protein' | 'carbs' | 'fat';
  isOpen: boolean;
  onClose: () => void;
  meals: MealItem[];
  totalValue: number;
  goalValue: number;
  unit: string;
  color: string;
  icon: React.ReactNode;
}

const ExpandedNutritionCard: React.FC<ExpandedNutritionCardProps> = ({
  type,
  isOpen,
  onClose,
  meals,
  totalValue,
  goalValue,
  unit,
  color,
  icon
}) => {
  if (!isOpen) return null;

  const getFilteredMeals = () => {
    if (type === 'calories') return meals;
    
    return meals.filter(meal => {
      if (!meal.protein || !meal.carbs || !meal.fat) return false;
      
      // Find which macronutrient is the highest in this meal
      const macros = {
        protein: meal.protein,
        carbs: meal.carbs,
        fat: meal.fat
      };
      
      const primaryMacro = Object.keys(macros).reduce((a, b) => 
        macros[a] > macros[b] ? a : b
      );
      
      return primaryMacro === type;
    });
  };

  const filteredMeals = getFilteredMeals();

  const getValueForMeal = (meal: MealItem) => {
    switch (type) {
      case 'calories': return meal.calories || 0;
      case 'protein': return meal.protein || 0;
      case 'carbs': return meal.carbs || 0;
      case 'fat': return meal.fat || 0;
      default: return 0;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-card rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-hidden animate-scale-in shadow-xl dark:shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
              {icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground capitalize">{type}</h3>
              <p className="text-sm text-muted-foreground">
                {totalValue}{unit} of {goalValue}{unit}
              </p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${Math.min((totalValue / goalValue) * 100, 100)}%`,
                backgroundColor: color
              }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            {Math.round((totalValue / goalValue) * 100)}% of daily goal
          </p>
        </div>

        {/* Meals List */}
        <div className="space-y-3 max-h-[40vh] overflow-y-auto">
          {filteredMeals.length > 0 ? (
            filteredMeals.map((meal, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-foreground">{meal.name}</p>
                  <p className="text-sm text-muted-foreground">{meal.amount} • {meal.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold" style={{ color }}>
                    {getValueForMeal(meal)}{unit}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No {type} recorded today</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpandedNutritionCard;