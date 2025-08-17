import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Share, MoreHorizontal, Edit3, ThumbsUp, ThumbsDown, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface FoodItem {
  name: string;
  quantity: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  confidence: number;
}

interface FoodAnalysis {
  foods: FoodItem[];
  overall_confidence: number;
  meal_name: string;
}

interface FoodNutritionDetailProps {
  analysis: FoodAnalysis;
  imageUrl: string;
  onSave: () => void;
  onCancel: () => void;
}

const FoodNutritionDetail = ({ analysis, imageUrl, onSave, onCancel }: FoodNutritionDetailProps) => {
  const [foods, setFoods] = useState<FoodItem[]>(analysis.foods);
  const [mealName, setMealName] = useState(analysis.meal_name);
  const [servings, setServings] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [currentMacroIndex, setCurrentMacroIndex] = useState(0);
  const { user } = useAuth();
  const { toast } = useToast();

  const calculateTotals = () => {
    return foods.reduce(
      (totals, food) => ({
        calories: totals.calories + food.calories,
        protein: totals.protein + food.protein,
        carbs: totals.carbs + food.carbs,
        fat: totals.fat + food.fat,
        fiber: totals.fiber + food.fiber,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
    );
  };

  const totals = calculateTotals();
  const adjustedTotals = {
    calories: Math.round(totals.calories * servings),
    protein: Math.round(totals.protein * servings),
    carbs: Math.round(totals.carbs * servings),
    fat: Math.round(totals.fat * servings),
    fiber: Math.round(totals.fiber * servings),
  };

  const macros = [
    { name: 'Protein', value: adjustedTotals.protein, unit: 'g', color: 'hsl(var(--protein))' },
    { name: 'Carbs', value: adjustedTotals.carbs, unit: 'g', color: 'hsl(var(--carbs))' },
    { name: 'Fats', value: adjustedTotals.fat, unit: 'g', color: 'hsl(var(--fat))' },
  ];

  const handleSave = async () => {
    if (!user) return;
    
    setIsSaving(true);
    
    try {
      // Create the meal record
      const { data: meal, error: mealError } = await supabase
        .from('meals')
        .insert({
          user_id: user.id,
          name: mealName,
          meal_type: 'lunch', // Default to lunch
          image_url: imageUrl,
          total_calories: adjustedTotals.calories,
          total_protein: adjustedTotals.protein,
          total_carbs: adjustedTotals.carbs,
          total_fat: adjustedTotals.fat,
          total_fiber: adjustedTotals.fiber,
          ai_analyzed: true,
          ai_confidence: analysis.overall_confidence
        })
        .select()
        .single();

      if (mealError) throw mealError;

      // Create meal items
      const mealItems = foods.map(food => ({
        meal_id: meal.id,
        food_name: food.name,
        quantity: food.quantity * servings,
        calories: food.calories * servings,
        protein: food.protein * servings,
        carbs: food.carbs * servings,
        fat: food.fat * servings,
        fiber: food.fiber * servings,
        confidence: food.confidence
      }));

      const { error: itemsError } = await supabase
        .from('meal_items')
        .insert(mealItems);

      if (itemsError) throw itemsError;

      toast({
        title: "Meal Saved",
        description: `${mealName} has been added to your diary`
      });

      onSave();
    } catch (error) {
      console.error('Error saving meal:', error);
      toast({
        title: "Save Failed",
        description: "Unable to save meal. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/20">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
            className="rounded-full bg-card shadow-sm"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <span className="text-sm text-muted-foreground">21:06</span>
        </div>
        <h1 className="font-semibold">Nutrition</h1>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full bg-card shadow-sm">
            <Share className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full bg-card shadow-sm">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Food Image */}
      <div className="relative h-64 bg-muted">
        <img
          src={imageUrl}
          alt="Food"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          {/* Meal Name and Servings */}
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground mb-1">{mealName}</h2>
            </div>
            <div className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 shadow-sm">
              <span className="text-2xl font-bold">{servings}</span>
              <Button
                variant="ghost"
                size="icon"
                className="w-6 h-6"
                onClick={() => setServings(Math.max(1, servings - 0.5))}
              >
                <Edit3 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Main Calories */}
          <div className="text-center py-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Calories</div>
                <div className="text-4xl font-bold text-foreground">{adjustedTotals.calories}</div>
              </div>
            </div>
          </div>

          {/* Macro Breakdown */}
          <div className="grid grid-cols-3 gap-6">
            {macros.map((macro, index) => (
              <div key={macro.name} className="text-center">
                <div className="w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center" style={{ backgroundColor: macro.color + '20' }}>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: macro.color }}></div>
                </div>
                <div className="text-sm text-muted-foreground mb-1">{macro.name}</div>
                <div className="text-xl font-bold text-foreground">{macro.value}{macro.unit}</div>
              </div>
            ))}
          </div>

          {/* Macro Indicators */}
          <div className="flex justify-center gap-2">
            {macros.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentMacroIndex ? 'bg-foreground' : 'bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>

          <Separator className="my-6" />

          {/* Ingredients */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Ingredients</h3>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                + Add More
              </Button>
            </div>

            <div className="space-y-3">
              {foods.map((food, index) => (
                <div key={index} className="flex items-center justify-between py-3">
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{food.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {Math.round(food.calories * servings)} cal
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {food.quantity * servings}g
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          {/* AI Feedback */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">How did Cal AI do?</span>
            </div>
            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-12 h-12"
              >
                <ThumbsDown className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-12 h-12"
              >
                <ThumbsUp className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-border/20 bg-background">
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onCancel}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Fix Issue
          </Button>
          <Button
            className="flex-1"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Done"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FoodNutritionDetail;