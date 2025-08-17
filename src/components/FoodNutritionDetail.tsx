import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { X, Minus, Plus, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useToast } from './ui/use-toast';
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
  onClose: () => void;
}

const FoodNutritionDetail = ({ analysis, imageUrl, onClose }: FoodNutritionDetailProps) => {
  const [servings, setServings] = useState(1);
  const [mealName, setMealName] = useState(analysis.meal_name);
  const [mealType, setMealType] = useState('lunch');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const calculateTotals = () => {
    return analysis.foods.reduce(
      (totals, food) => ({
        calories: totals.calories + (food.calories * servings),
        protein: totals.protein + (food.protein * servings),
        carbs: totals.carbs + (food.carbs * servings),
        fat: totals.fat + (food.fat * servings),
        fiber: totals.fiber + (food.fiber * servings),
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
    );
  };

  const totals = calculateTotals();

  const saveMeal = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to save meals",
          variant: "destructive",
        });
        return;
      }

      const mealData = {
        user_id: user.id,
        name: mealName,
        meal_type: mealType,
        image_url: imageUrl,
        total_calories: totals.calories,
        total_protein: totals.protein,
        total_carbs: totals.carbs,
        total_fat: totals.fat,
        total_fiber: totals.fiber,
        ai_confidence: analysis.overall_confidence,
        ai_analyzed: true,
        meal_date: new Date().toISOString().split('T')[0],
      };

      const { error } = await supabase
        .from('meals')
        .insert([mealData]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Meal saved successfully!",
      });

      onClose();
    } catch (error) {
      console.error('Error saving meal:', error);
      toast({
        title: "Error",
        description: "Failed to save meal. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
      <div className="min-h-screen p-4">
        <Card className="max-w-md mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Nutrition Details</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="p-4 space-y-6">
            {/* Food Image */}
            <div className="relative">
              <img 
                src={imageUrl} 
                alt="Scanned food" 
                className="w-full h-48 object-cover rounded-lg"
              />
              <Badge className="absolute top-2 right-2 bg-white/90 text-foreground">
                {Math.round(analysis.overall_confidence * 100)}% confident
              </Badge>
            </div>

            {/* Meal Name */}
            <div>
              <label className="text-sm font-medium text-muted-foreground">Meal Name</label>
              <input
                type="text"
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md text-base"
              />
            </div>

            {/* Meal Type */}
            <div>
              <label className="text-sm font-medium text-muted-foreground">Meal Type</label>
              <select
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md text-base"
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
              </select>
            </div>

            {/* Servings */}
            <div>
              <label className="text-sm font-medium text-muted-foreground">Servings</label>
              <div className="flex items-center justify-between mt-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setServings(Math.max(0.5, servings - 0.5))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-lg font-semibold">{servings}</span>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setServings(servings + 0.5)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Nutrition Summary */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Nutrition Summary</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{Math.round(totals.calories)}</div>
                  <div className="text-sm text-muted-foreground">Calories</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold">{Math.round(totals.protein)}g</div>
                  <div className="text-sm text-muted-foreground">Protein</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold">{Math.round(totals.carbs)}g</div>
                  <div className="text-sm text-muted-foreground">Carbs</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold">{Math.round(totals.fat)}g</div>
                  <div className="text-sm text-muted-foreground">Fat</div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Food Items */}
            <div>
              <h3 className="font-semibold mb-3">Ingredients</h3>
              <div className="space-y-3">
                {analysis.foods.map((food, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                    <div>
                      <div className="font-medium">{food.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {Math.round(food.quantity * servings)}g
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{Math.round(food.calories * servings)} cal</div>
                      <div className="text-xs text-muted-foreground">
                        {Math.round(food.confidence * 100)}% match
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Feedback */}
            <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4">
              <h4 className="font-medium mb-2">How accurate was this analysis?</h4>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Accurate
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <ThumbsDown className="h-4 w-4 mr-2" />
                  Needs work
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button onClick={saveMeal} disabled={isLoading} className="flex-1">
                {isLoading ? 'Saving...' : 'Done'}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FoodNutritionDetail;