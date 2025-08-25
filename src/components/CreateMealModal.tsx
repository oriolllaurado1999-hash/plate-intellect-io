import React, { useState } from 'react';
import { X, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import NutritionCarousel from './NutritionCarousel';
import MealItemSelector from './MealItemSelector';

interface MealItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  quantity: number;
  unit: string;
}

interface CreateMealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateMeal: (mealName: string, items: MealItem[]) => void;
}

const CreateMealModal = ({ isOpen, onClose, onCreateMeal }: CreateMealModalProps) => {
  const [mealName, setMealName] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [mealItems, setMealItems] = useState<MealItem[]>([]);
  const [showItemSelector, setShowItemSelector] = useState(false);

  // Calculate total nutrition
  const totalNutrition = mealItems.reduce(
    (total, item) => ({
      calories: total.calories + (item.calories * item.quantity),
      protein: total.protein + (item.protein * item.quantity),
      carbs: total.carbs + (item.carbs * item.quantity),
      fat: total.fat + (item.fat * item.quantity),
      fiber: total.fiber + (item.fiber * item.quantity),
      sugar: total.sugar + (item.sugar * item.quantity),
      sodium: total.sodium + (item.sodium * item.quantity),
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0, sodium: 0 }
  );

  // Calculate health score (simplified)
  const calculateHealthScore = () => {
    if (mealItems.length === 0) return 'N/A';
    
    let score = 7; // Base score
    
    // Adjust based on nutrition balance
    const proteinRatio = totalNutrition.protein * 4 / totalNutrition.calories;
    const fiberContent = totalNutrition.fiber;
    const sugarContent = totalNutrition.sugar;
    
    if (proteinRatio > 0.15) score += 1; // Good protein
    if (fiberContent > 5) score += 1; // Good fiber
    if (sugarContent < 10) score += 1; // Low sugar
    else if (sugarContent > 20) score -= 1; // High sugar
    
    return Math.min(10, Math.max(1, Math.round(score)));
  };

  const healthScore = calculateHealthScore();

  const handleNameSubmit = () => {
    setIsEditingName(false);
  };

  const handleAddItems = () => {
    setShowItemSelector(true);
  };

  const handleItemsSelected = (items: MealItem[]) => {
    setMealItems([...mealItems, ...items]);
    setShowItemSelector(false);
  };

  const handleRemoveItem = (itemId: string) => {
    setMealItems(mealItems.filter(item => item.id !== itemId));
  };

  const handleCreateMeal = () => {
    if (mealName.trim() && mealItems.length > 0) {
      onCreateMeal(mealName, mealItems);
      // Reset form
      setMealName('');
      setMealItems([]);
      setIsEditingName(false);
      onClose();
    }
  };

  const isCreateDisabled = !mealName.trim() || mealItems.length === 0;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md mx-auto max-h-[90vh] overflow-y-auto p-0 gap-0">
          <div className="bg-card">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <button onClick={onClose} className="p-2 hover:bg-muted rounded-full">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
              <h2 className="text-lg font-semibold text-foreground">Create Meal</h2>
              <div className="w-9" /> {/* Spacer */}
            </div>

            <div className="p-4 pb-6">
              {/* Meal Name */}
              <div className="mb-6">
                {isEditingName ? (
                  <div className="flex items-center gap-2">
                    <Input
                      value={mealName}
                      onChange={(e) => setMealName(e.target.value)}
                      placeholder="Enter meal name"
                      className="flex-1"
                      onBlur={handleNameSubmit}
                      onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
                      autoFocus
                    />
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="flex items-center justify-between w-full p-4 bg-muted rounded-xl hover:bg-muted/80 transition-colors"
                  >
                    <span className="text-lg font-medium text-foreground">
                      {mealName || 'Tap to Name'}
                    </span>
                    <Edit3 className="w-5 h-5 text-muted-foreground" />
                  </button>
                )}
              </div>

              {/* Nutrition Carousel */}
              <div className="mb-6">
                <NutritionCarousel
                  calories={Math.round(totalNutrition.calories)}
                  protein={Math.round(totalNutrition.protein * 10) / 10}
                  carbs={Math.round(totalNutrition.carbs * 10) / 10}
                  fat={Math.round(totalNutrition.fat * 10) / 10}
                  fiber={Math.round(totalNutrition.fiber * 10) / 10}
                  sugar={Math.round(totalNutrition.sugar * 10) / 10}
                  sodium={Math.round(totalNutrition.sodium)}
                  healthScore={healthScore}
                />
              </div>

              {/* Meal Items */}
              <div className="mb-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-2">
                      <span className="text-2xl">🍽️</span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Meal Items</h3>
                  </div>
                </div>

                {/* Meal Items List */}
                {mealItems.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {mealItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium text-foreground">{item.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {item.quantity} {item.unit} • {Math.round(item.calories * item.quantity)} cal
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="p-1 hover:bg-background rounded"
                        >
                          <X className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Items Button */}
                <button
                  onClick={handleAddItems}
                  className="flex items-center gap-3 w-full p-4 text-left hover:bg-muted rounded-xl transition-colors"
                >
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <span className="text-xl">+</span>
                  </div>
                  <span className="text-foreground font-medium">Add items to this meal</span>
                </button>
              </div>

              {/* Create Meal Button */}
              <Button
                onClick={handleCreateMeal}
                disabled={isCreateDisabled}
                className="w-full h-12 text-lg font-medium"
                style={{
                  backgroundColor: isCreateDisabled ? 'hsl(var(--muted))' : 'hsl(var(--primary))',
                  color: isCreateDisabled ? 'hsl(var(--muted-foreground))' : 'hsl(var(--primary-foreground))',
                  opacity: isCreateDisabled ? 0.5 : 1,
                }}
              >
                Create Meal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Meal Item Selector Modal */}
      <MealItemSelector
        isOpen={showItemSelector}
        onClose={() => setShowItemSelector(false)}
        onItemsSelected={handleItemsSelected}
      />
    </>
  );
};

export default CreateMealModal;