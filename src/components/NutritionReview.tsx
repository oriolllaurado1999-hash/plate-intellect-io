import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, Edit3, Trash2, Loader2 } from 'lucide-react';
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

interface NutritionReviewProps {
  analysis: FoodAnalysis;
  imageUrl: string;
  onSave: () => void;
  onCancel: () => void;
}

const NutritionReview = ({ analysis, imageUrl, onSave, onCancel }: NutritionReviewProps) => {
  const [foods, setFoods] = useState<FoodItem[]>(analysis.foods);
  const [mealName, setMealName] = useState(analysis.meal_name);
  const [mealType, setMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('lunch');
  const [isSaving, setIsSaving] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const updateFoodItem = (index: number, field: keyof FoodItem, value: string | number) => {
    const updatedFoods = [...foods];
    updatedFoods[index] = { ...updatedFoods[index], [field]: value };
    
    // Recalculate nutrition if quantity changes
    if (field === 'quantity') {
      const food = updatedFoods[index];
      const ratio = Number(value) / analysis.foods[index].quantity;
      food.calories = Math.round(analysis.foods[index].calories * ratio);
      food.protein = Math.round(analysis.foods[index].protein * ratio * 10) / 10;
      food.carbs = Math.round(analysis.foods[index].carbs * ratio * 10) / 10;
      food.fat = Math.round(analysis.foods[index].fat * ratio * 10) / 10;
      food.fiber = Math.round(analysis.foods[index].fiber * ratio * 10) / 10;
    }
    
    setFoods(updatedFoods);
  };

  const removeFoodItem = (index: number) => {
    setFoods(foods.filter((_, i) => i !== index));
  };

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

  const saveMeal = async () => {
    if (!user) return;
    
    setIsSaving(true);
    
    try {
      const totals = calculateTotals();
      
      // Create the meal record
      const { data: meal, error: mealError } = await supabase
        .from('meals')
        .insert({
          user_id: user.id,
          name: mealName,
          meal_type: mealType,
          image_url: imageUrl,
          total_calories: totals.calories,
          total_protein: totals.protein,
          total_carbs: totals.carbs,
          total_fat: totals.fat,
          total_fiber: totals.fiber,
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
        quantity: food.quantity,
        calories: food.calories,
        protein: food.protein,
        carbs: food.carbs,
        fat: food.fat,
        fiber: food.fiber,
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

  const totals = calculateTotals();

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Edit3 className="h-5 w-5" />
            Review & Edit Nutrition
          </CardTitle>
          <Badge variant="secondary" className="w-fit">
            AI Confidence: {Math.round(analysis.overall_confidence * 100)}%
          </Badge>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Meal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="meal-name">Meal Name</Label>
              <Input
                id="meal-name"
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
                placeholder="Enter meal name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="meal-type">Meal Type</Label>
              <Select value={mealType} onValueChange={(value: any) => setMealType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select meal type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breakfast">Breakfast</SelectItem>
                  <SelectItem value="lunch">Lunch</SelectItem>
                  <SelectItem value="dinner">Dinner</SelectItem>
                  <SelectItem value="snack">Snack</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Image Preview */}
          <div className="aspect-video bg-muted rounded-lg overflow-hidden">
            <img
              src={imageUrl}
              alt="Food analysis"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Food Items */}
          <div className="space-y-4">
            <h3 className="font-semibold">Detected Foods</h3>
            
            {foods.map((food, index) => (
              <Card key={index} className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1 flex-1">
                      <Input
                        value={food.name}
                        onChange={(e) => updateFoodItem(index, 'name', e.target.value)}
                        className="font-medium"
                      />
                      <Badge variant="outline" className="text-xs">
                        {Math.round(food.confidence * 100)}% confidence
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFoodItem(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
                    <div className="space-y-1">
                      <Label className="text-xs">Quantity (g)</Label>
                      <Input
                        type="number"
                        value={food.quantity}
                        onChange={(e) => updateFoodItem(index, 'quantity', Number(e.target.value))}
                        className="text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Calories</Label>
                      <Input
                        type="number"
                        value={food.calories}
                        onChange={(e) => updateFoodItem(index, 'calories', Number(e.target.value))}
                        className="text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Protein (g)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={food.protein}
                        onChange={(e) => updateFoodItem(index, 'protein', Number(e.target.value))}
                        className="text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Carbs (g)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={food.carbs}
                        onChange={(e) => updateFoodItem(index, 'carbs', Number(e.target.value))}
                        className="text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Fat (g)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={food.fat}
                        onChange={(e) => updateFoodItem(index, 'fat', Number(e.target.value))}
                        className="text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Fiber (g)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={food.fiber}
                        onChange={(e) => updateFoodItem(index, 'fiber', Number(e.target.value))}
                        className="text-sm"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Separator />

          {/* Totals */}
          <Card className="p-4 bg-primary/5">
            <h3 className="font-semibold mb-3">Total Nutrition</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">{Math.round(totals.calories)}</div>
                <div className="text-xs text-muted-foreground">Calories</div>
              </div>
              <div>
                <div className="text-lg font-semibold">{totals.protein.toFixed(1)}g</div>
                <div className="text-xs text-muted-foreground">Protein</div>
              </div>
              <div>
                <div className="text-lg font-semibold">{totals.carbs.toFixed(1)}g</div>
                <div className="text-xs text-muted-foreground">Carbs</div>
              </div>
              <div>
                <div className="text-lg font-semibold">{totals.fat.toFixed(1)}g</div>
                <div className="text-xs text-muted-foreground">Fat</div>
              </div>
              <div>
                <div className="text-lg font-semibold">{totals.fiber.toFixed(1)}g</div>
                <div className="text-xs text-muted-foreground">Fiber</div>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button onClick={saveMeal} disabled={isSaving} className="flex-1">
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Meal
                </>
              )}
            </Button>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NutritionReview;