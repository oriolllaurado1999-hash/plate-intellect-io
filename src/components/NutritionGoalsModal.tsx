import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowUp, ArrowDown, Sparkles, Flame, Beef, Wheat, Leaf, Grape, Candy, Salad, Minus, Plus } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface NutritionGoalsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MacroCircleProps {
  Icon: any;
  label: string;
  value: number;
  color: string;
  percentage: number;
  onValueChange: (newValue: number) => void;
}

const MacroCircle = ({ Icon, label, value, color, percentage, onValueChange }: MacroCircleProps) => {
  const strokeDasharray = 2 * Math.PI * 30; // r = 30 (smaller)
  const strokeDashoffset = strokeDasharray - (strokeDasharray * percentage) / 100;

  return (
    <div className="flex items-center gap-3">
      <div className="relative w-14 h-14">
        <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 70 70">
          <circle
            cx="35"
            cy="35"
            r="30"
            stroke="currentColor"
            strokeWidth="6"
            fill="none"
            className="text-muted-foreground/20"
          />
          <circle
            cx="35"
            cy="35"
            r="30"
            stroke={color}
            strokeWidth="6"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className="w-4 h-4" style={{ color }} />
        </div>
      </div>
      <div className="flex-1">
        <p className="text-sm text-muted-foreground mb-1">{label}</p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => onValueChange(Math.max(0, value - (label.includes('Calorie') ? 50 : 5)))}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <Input
            type="number"
            value={value}
            onChange={(e) => onValueChange(Math.max(0, Number(e.target.value)))}
            className="h-7 w-16 text-center text-sm font-bold px-1"
          />
          <Button
            variant="outline"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => onValueChange(value + (label.includes('Calorie') ? 50 : 5))}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export const NutritionGoalsModal = ({ isOpen, onClose }: NutritionGoalsModalProps) => {
  const { t } = useTranslation();
  const [showMicronutrients, setShowMicronutrients] = useState(false);
  
  // State for editable goals
  const [goals, setGoals] = useState({
    calories: 2580,
    protein: 157,
    carbs: 326,
    fat: 71,
    fiber: 38,
    sugar: 96,
    sodium: 2300,
  });

  const updateGoal = (nutrient: keyof typeof goals, value: number) => {
    setGoals(prev => ({ ...prev, [nutrient]: value }));
  };

  const macroData = [
    { Icon: Flame, label: 'Calorie goal', value: goals.calories, color: '#4AD4B2', percentage: 75, nutrient: 'calories' as const },
    { Icon: Beef, label: 'Protein goal', value: goals.protein, color: 'hsl(var(--protein))', percentage: 60, nutrient: 'protein' as const },
    { Icon: Wheat, label: 'Carb goal', value: goals.carbs, color: 'hsl(var(--carbs))', percentage: 80, nutrient: 'carbs' as const },
    { Icon: Leaf, label: 'Fat goal', value: goals.fat, color: 'hsl(var(--fat))', percentage: 45, nutrient: 'fat' as const },
  ];

  const microData = [
    { Icon: Grape, label: 'Fiber goal', value: goals.fiber, color: 'hsl(280, 80%, 60%)', percentage: 50, nutrient: 'fiber' as const },
    { Icon: Candy, label: 'Sugar goal', value: goals.sugar, color: 'hsl(350, 80%, 60%)', percentage: 30, nutrient: 'sugar' as const },
    { Icon: Salad, label: 'Sodium goal', value: goals.sodium, color: 'hsl(30, 80%, 60%)', percentage: 40, nutrient: 'sodium' as const },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-left">Edit nutrition goals</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 p-2">
          {/* Macro Goals */}
          <div className="space-y-3">
            {macroData.map((macro, index) => (
              <MacroCircle 
                key={index} 
                {...macro} 
                onValueChange={(value) => updateGoal(macro.nutrient, value)}
              />
            ))}
          </div>

          {/* Hide/Show Micronutrients */}
          <div className="flex justify-center py-2">
            <Button
              variant="ghost"
              onClick={() => setShowMicronutrients(!showMicronutrients)}
              className="text-muted-foreground flex items-center gap-2 text-sm"
            >
              {showMicronutrients ? 'Hide micronutrients' : 'Show micronutrients'}
              {showMicronutrients ? (
                <ArrowUp className="h-3 w-3" />
              ) : (
                <ArrowDown className="h-3 w-3" />
              )}
            </Button>
          </div>

          {/* Micronutrient Goals */}
          {showMicronutrients && (
            <div className="space-y-3">
              {microData.map((micro, index) => (
                <MacroCircle 
                  key={index} 
                  {...micro} 
                  onValueChange={(value) => updateGoal(micro.nutrient, value)}
                />
              ))}
            </div>
          )}

          {/* Auto Generate Goals Button */}
          <div className="pt-2 space-y-2">
            <Button
              variant="outline"
              className="w-full flex items-center gap-2 py-4 text-sm"
            >
              <Sparkles className="h-4 w-4" />
              Auto Generate Goals
            </Button>
            
            <Button
              className="w-full py-4 text-sm"
              onClick={onClose}
            >
              Save Goals
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};