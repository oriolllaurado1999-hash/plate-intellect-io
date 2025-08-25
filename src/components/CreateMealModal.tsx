import React, { useState } from 'react';
import { ArrowLeft, Edit, Plus, UtensilsCrossed } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { useTranslation } from '@/hooks/useTranslation';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import NutritionCarousel from './NutritionCarousel';
import MealItemSelector from './MealItemSelector';

interface MealItem {
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
  quantity: number;
}

interface CreateMealModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateMealModal = ({ isOpen, onClose }: CreateMealModalProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { user } = useAuth();
  const [mealName, setMealName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [mealItems, setMealItems] = useState<MealItem[]>([]);
  const [showItemSelector, setShowItemSelector] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Calculate totals from meal items
  const calculateTotals = () => {
    return mealItems.reduce((totals, item) => ({
      calories: totals.calories + (item.calories * item.quantity),
      protein: totals.protein + (item.protein * item.quantity),
      carbs: totals.carbs + (item.carbs * item.quantity),
      fat: totals.fat + (item.fat * item.quantity),
      fiber: totals.fiber + (item.fiber * item.quantity),
      sugar: totals.sugar + (item.sugar * item.quantity),
      sodium: totals.sodium + (item.sodium * item.quantity),
    }), {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      sugar: 0,
      sodium: 0,
    });
  };

  const totals = calculateTotals();

  // Calculate health score (simplified version)
  const calculateHealthScore = () => {
    if (mealItems.length === 0) return 0;
    
    // Simple health score based on macronutrient balance
    const { calories, protein, carbs, fat, fiber } = totals;
    
    if (calories === 0) return 0;
    
    const proteinPercent = (protein * 4) / calories;
    const carbsPercent = (carbs * 4) / calories;
    const fatPercent = (fat * 9) / calories;
    
    let score = 5; // Base score
    
    // Good protein ratio (15-30%)
    if (proteinPercent >= 0.15 && proteinPercent <= 0.3) score += 2;
    // Good carb ratio (35-65%)
    if (carbsPercent >= 0.35 && carbsPercent <= 0.65) score += 1;
    // Good fat ratio (20-35%)
    if (fatPercent >= 0.2 && fatPercent <= 0.35) score += 1;
    // Fiber bonus
    if (fiber >= 5) score += 1;
    
    return Math.min(10, Math.max(1, Math.round(score)));
  };

  const healthScore = calculateHealthScore();

  const handleNameEdit = () => {
    setIsEditing(true);
  };

  const handleNameSave = () => {
    setIsEditing(false);
  };

  const handleAddItems = () => {
    setShowItemSelector(true);
  };

  const handleItemsSelected = (selectedItems: any[], servings: number) => {
    const newItems: MealItem[] = selectedItems.map(item => ({
      id: item.id || Math.random().toString(),
      name: item.name,
      brand: item.brand,
      calories: item.calories,
      protein: item.protein,
      carbs: item.carbs,
      fat: item.fat,
      fiber: item.fiber,
      sugar: item.sugar,
      sodium: item.sodium,
      servingSize: item.servingSize,
      servingUnit: item.servingUnit,
      quantity: servings,
    }));
    
    setMealItems(prev => [...prev, ...newItems]);
    setShowItemSelector(false);
  };

  const removeItem = (index: number) => {
    setMealItems(prev => prev.filter((_, i) => i !== index));
  };

  const canCreateMeal = mealName.trim() !== '' && mealItems.length > 0;

  const handleCreateMeal = async () => {
    if (!canCreateMeal || !user) return;

    setIsCreating(true);
    try {
      // Create the meal
      const { data: meal, error: mealError } = await supabase
        .from('meals')
        .insert({
          user_id: user.id,
          name: mealName.trim(),
          meal_type: 'custom',
          meal_date: new Date().toISOString().split('T')[0],
          total_calories: Math.round(totals.calories),
          total_protein: Math.round(totals.protein * 10) / 10,
          total_carbs: Math.round(totals.carbs * 10) / 10,
          total_fat: Math.round(totals.fat * 10) / 10,
          total_fiber: Math.round(totals.fiber * 10) / 10,
          total_sugar: Math.round(totals.sugar * 10) / 10,
          total_sodium: Math.round(totals.sodium),
        })
        .select()
        .single();

      if (mealError) throw mealError;

      // Create meal items (using only available fields)
      const mealItemsData = mealItems.map(item => ({
        meal_id: meal.id,
        food_name: item.name,
        quantity: item.quantity,
        calories: Math.round(item.calories * item.quantity),
        protein: Math.round(item.protein * item.quantity * 10) / 10,
        carbs: Math.round(item.carbs * item.quantity * 10) / 10,
        fat: Math.round(item.fat * item.quantity * 10) / 10,
        fiber: Math.round(item.fiber * item.quantity * 10) / 10,
      }));

      const { error: itemsError } = await supabase
        .from('meal_items')
        .insert(mealItemsData);

      if (itemsError) throw itemsError;

      toast({
        title: "Meal created successfully!",
        description: `"${mealName}" has been added to your meals.`,
      });

      // Reset form and close
      setMealName('');
      setMealItems([]);
      setIsEditing(false);
      onClose();
    } catch (error) {
      console.error('Error creating meal:', error);
      toast({
        title: "Error creating meal",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md mx-auto h-[90vh] flex flex-col p-0 gap-0 bg-background">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-10 w-10 rounded-full bg-muted"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-lg font-semibold">Create Meal</h2>
            <div className="w-10" />
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* Meal Name Section */}
            <div className="p-4">
              <div className="bg-card rounded-2xl p-4 shadow-sm">
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <Input
                      value={mealName}
                      onChange={(e) => setMealName(e.target.value)}
                      placeholder="Enter meal name"
                      className="text-2xl font-bold border-none bg-transparent p-0 h-auto focus-visible:ring-0"
                      onBlur={handleNameSave}
                      onKeyPress={(e) => e.key === 'Enter' && handleNameSave()}
                      autoFocus
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-foreground">
                      {mealName || 'Tap to Name'}
                    </h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleNameEdit}
                      className="h-8 w-8"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Nutrition Carousel */}
            <div className="px-4 mb-6">
              <NutritionCarousel
                calories={Math.round(totals.calories)}
                protein={Math.round(totals.protein * 10) / 10}
                carbs={Math.round(totals.carbs * 10) / 10}
                fat={Math.round(totals.fat * 10) / 10}
                fiber={Math.round(totals.fiber * 10) / 10}
                sugar={Math.round(totals.sugar * 10) / 10}
                sodium={Math.round(totals.sodium)}
                healthScore={healthScore}
              />
            </div>

            {/* Meal Items Section */}
            <div className="px-4 pb-4">
              <div className="text-center py-8">
                <UtensilsCrossed className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-4">Meal Items</h3>
                
                {mealItems.length > 0 && (
                  <div className="space-y-2 mb-6">
                    {mealItems.map((item, index) => (
                      <div key={index} className="flex items-center justify-between bg-card rounded-lg p-3">
                        <div className="text-left">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {item.quantity}x {item.servingSize}{item.servingUnit} • {Math.round(item.calories * item.quantity)} cal
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(index)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                <Button
                  variant="outline"
                  onClick={handleAddItems}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add items to this meal
                </Button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t">
            <Button
              onClick={handleCreateMeal}
              disabled={!canCreateMeal || isCreating}
              className="w-full h-12 text-base font-medium"
              style={{ opacity: canCreateMeal ? 1 : 0.5 }}
            >
              {isCreating ? 'Creating...' : 'Create Meal'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Meal Item Selector Modal */}
      {showItemSelector && (
        <MealItemSelector
          isOpen={showItemSelector}
          onClose={() => setShowItemSelector(false)}
          onItemsSelected={handleItemsSelected}
        />
      )}
    </>
  );
};

export default CreateMealModal;