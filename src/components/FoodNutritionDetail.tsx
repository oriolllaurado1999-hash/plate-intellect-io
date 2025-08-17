import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { X, Minus, Plus, ThumbsUp, ThumbsDown, Edit3, Trash2, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/useTranslation';
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
  const [foods, setFoods] = useState<FoodItem[]>(analysis.foods);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [feedbackState, setFeedbackState] = useState<'initial' | 'thanking' | 'hidden'>('initial');
  const { toast } = useToast();
  const { t } = useTranslation();

  const calculateTotals = () => {
    return foods.reduce(
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

  const calculateHealthScore = () => {
    const totalCalories = totals.calories;
    const totalFiber = totals.fiber;
    const totalProtein = totals.protein;
    const totalFat = totals.fat;
    const totalCarbs = totals.carbs;
    
    let score = 5; // Base score
    
    // Fiber bonus (high fiber is good)
    if (totalFiber > 10) score += 2;
    else if (totalFiber > 5) score += 1;
    
    // Protein bonus (adequate protein is good)
    const proteinRatio = (totalProtein * 4) / totalCalories;
    if (proteinRatio > 0.25) score += 1.5;
    else if (proteinRatio > 0.15) score += 1;
    
    // Fat penalty for too much
    const fatRatio = (totalFat * 9) / totalCalories;
    if (fatRatio > 0.35) score -= 1;
    
    // Carb balance
    const carbRatio = (totalCarbs * 4) / totalCalories;
    if (carbRatio > 0.6) score -= 0.5;
    
    // Calorie density (prefer whole foods)
    if (totalCalories < 200 && totalFiber > 3) score += 1;
    
    // Ensure score is between 1-10
    return Math.max(1, Math.min(10, Math.round(score)));
  };

  const healthScore = calculateHealthScore();

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

      const { data: mealResponse, error } = await supabase
        .from('meals')
        .insert([mealData])
        .select()
        .single();

      if (error) throw error;

      // Save individual food items
      const mealId = mealResponse.id;
      const foodItems = foods.map(food => ({

        meal_id: mealId,
        food_name: food.name,
        quantity: food.quantity,
        calories: food.calories,
        protein: food.protein,
        carbs: food.carbs,
        fat: food.fat,
        fiber: food.fiber,
        confidence: food.confidence,
      }));

      const { error: itemsError } = await supabase
        .from('meal_items')
        .insert(foodItems);

      if (itemsError) throw itemsError;

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

  const updateFoodItem = (index: number, field: keyof FoodItem, value: string | number) => {
    const updatedFoods = [...foods];
    if (field === 'quantity') {
      const ratio = Number(value) / updatedFoods[index].quantity;
      updatedFoods[index] = {
        ...updatedFoods[index],
        quantity: Number(value),
        calories: updatedFoods[index].calories * ratio,
        protein: updatedFoods[index].protein * ratio,
        carbs: updatedFoods[index].carbs * ratio,
        fat: updatedFoods[index].fat * ratio,
        fiber: updatedFoods[index].fiber * ratio,
      };
    } else {
      updatedFoods[index] = { ...updatedFoods[index], [field]: value };
    }
    setFoods(updatedFoods);
  };

  const removeFoodItem = (index: number) => {
    const updatedFoods = foods.filter((_, i) => i !== index);
    setFoods(updatedFoods);
  };

  const addFoodItem = () => {
    const newFood: FoodItem = {
      name: 'New Food',
      quantity: 100,
      calories: 100,
      protein: 5,
      carbs: 15,
      fat: 3,
      fiber: 2,
      confidence: 1,
    };
    setFoods([...foods, newFood]);
    setEditingIndex(foods.length);
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHealthScoreLabel = (score: number) => {
    if (score >= 8) return 'Excellent';
    if (score >= 6) return 'Good';
    if (score >= 4) return 'Fair';
    return 'Poor';
  };

  const handleFeedback = (feedbackType: 'accurate' | 'needs_work') => {
    // Save feedback to database (optional)
    console.log('Feedback received:', feedbackType);
    
    // Start fade out animation for initial content, then fade in thank you message
    setFeedbackState('thanking');
    
    // Hide thank you message after 3 seconds with fade out
    setTimeout(() => {
      setFeedbackState('hidden');
    }, 3000);
  };

  const getFeedbackMessages = () => {
    return {
      question: t.feedbackQuestion || "How accurate was this analysis?",
      accurate: t.accurate || "Accurate", 
      needsWork: t.needsWork || "Needs work",
      thankYou: t.feedbackThankYou || "¡Gracias por tu feedback! 🙏",
      explanation: t.feedbackExplanation || "Esta información se utilizará como referencia para que la IA analice más correctamente futuras comidas."
    };
  };

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
      <div className="min-h-screen p-4">
        <Card className="max-w-md mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Nutrition Details</h2>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditing(!isEditing)}
                className={isEditing ? 'bg-primary text-primary-foreground' : ''}
              >
                <Edit3 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
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
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Nutrition Summary</h3>
                <div className="flex items-center gap-2">
                  <span className={`text-lg font-bold ${getHealthScoreColor(healthScore)}`}>
                    {healthScore}/10
                  </span>
                  <Badge variant="outline" className={getHealthScoreColor(healthScore)}>
                    {getHealthScoreLabel(healthScore)}
                  </Badge>
                </div>
              </div>
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
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Ingredients</h3>
                {isEditing && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addFoodItem}
                    className="flex items-center gap-1"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Add Food
                  </Button>
                )}
              </div>
              <div className="space-y-3">
                {foods.map((food, index) => (
                  <div key={index} className="p-3 bg-muted/30 rounded-lg">
                    {isEditing && editingIndex === index ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={food.name}
                            onChange={(e) => updateFoodItem(index, 'name', e.target.value)}
                            className="flex-1 p-2 border rounded text-sm"
                            placeholder="Food name"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFoodItem(index)}
                            className="text-red-500 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <label className="text-xs text-muted-foreground">Quantity (g)</label>
                            <input
                              type="number"
                              value={food.quantity}
                              onChange={(e) => updateFoodItem(index, 'quantity', Number(e.target.value))}
                              className="w-full p-1 border rounded text-xs"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground">Calories</label>
                            <input
                              type="number"
                              value={Math.round(food.calories)}
                              onChange={(e) => updateFoodItem(index, 'calories', Number(e.target.value))}
                              className="w-full p-1 border rounded text-xs"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground">Protein (g)</label>
                            <input
                              type="number"
                              step="0.1"
                              value={food.protein.toFixed(1)}
                              onChange={(e) => updateFoodItem(index, 'protein', Number(e.target.value))}
                              className="w-full p-1 border rounded text-xs"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground">Carbs (g)</label>
                            <input
                              type="number"
                              step="0.1"
                              value={food.carbs.toFixed(1)}
                              onChange={(e) => updateFoodItem(index, 'carbs', Number(e.target.value))}
                              className="w-full p-1 border rounded text-xs"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground">Fat (g)</label>
                            <input
                              type="number"
                              step="0.1"
                              value={food.fat.toFixed(1)}
                              onChange={(e) => updateFoodItem(index, 'fat', Number(e.target.value))}
                              className="w-full p-1 border rounded text-xs"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-muted-foreground">Fiber (g)</label>
                            <input
                              type="number"
                              step="0.1"
                              value={food.fiber.toFixed(1)}
                              onChange={(e) => updateFoodItem(index, 'fiber', Number(e.target.value))}
                              className="w-full p-1 border rounded text-xs"
                            />
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingIndex(null)}
                          className="w-full"
                        >
                          Done Editing
                        </Button>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{food.name}</span>
                            {isEditing && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setEditingIndex(index)}
                                className="h-6 w-6"
                              >
                                <Edit3 className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
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
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* AI Feedback */}
            {feedbackState !== 'hidden' && (
              <div className={`bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4 transition-all duration-700 ease-in-out transform ${
                feedbackState === 'thanking' 
                  ? 'animate-fade-in opacity-100 scale-100' 
                  : 'opacity-100 scale-100'
              }`}>
                {feedbackState === 'initial' ? (
                  <div className="opacity-100 transition-opacity duration-300">
                    <h4 className="font-medium mb-2">{getFeedbackMessages().question}</h4>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 transition-all duration-300 hover:scale-105 hover:shadow-md"
                        onClick={() => handleFeedback('accurate')}
                      >
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        {getFeedbackMessages().accurate}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 transition-all duration-300 hover:scale-105 hover:shadow-md"
                        onClick={() => handleFeedback('needs_work')}
                      >
                        <ThumbsDown className="h-4 w-4 mr-2" />
                        {getFeedbackMessages().needsWork}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center animate-fade-in opacity-0 animate-delay-200">
                    <h4 className="font-medium mb-2">{getFeedbackMessages().thankYou}</h4>
                    <p className="text-sm text-muted-foreground">
                      {getFeedbackMessages().explanation}
                    </p>
                  </div>
                )}
              </div>
            )}

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