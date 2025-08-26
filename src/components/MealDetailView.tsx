import React, { useState } from 'react';
import { ArrowLeft, Edit, Share, MoreHorizontal, Flame, Plus, Beef, Wheat, Droplets, Activity, Cherry, Salad, X, GripHorizontal } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface MealDetailViewProps {
  meal: {
    id: string;
    name: string;
    total_calories: number;
    total_protein: number;
    total_carbs: number;
    total_fat: number;
    total_fiber?: number;
    created_at: string;
    image_url?: string;
  };
  onClose: () => void;
}

const MealDetailView = ({ meal, onClose }: MealDetailViewProps) => {
  const [ingredients, setIngredients] = useState<string[]>(() => {
    // Smart ingredient detection
    const detectIngredients = (name: string): string[] => {
      const commonIngredients = [
        'coffee', 'milk', 'sugar', 'cream', 'water', 'ice', 'vanilla', 'chocolate',
        'chicken', 'beef', 'pork', 'fish', 'salmon', 'tuna', 'rice', 'pasta',
        'bread', 'cheese', 'egg', 'eggs', 'butter', 'oil', 'salt', 'pepper',
        'tomato', 'onion', 'garlic', 'lettuce', 'spinach', 'carrot', 'potato',
        'apple', 'banana', 'orange', 'lemon', 'avocado', 'honey', 'yogurt'
      ];
      
      const lowerName = name.toLowerCase();
      const detected = commonIngredients.filter(ingredient => 
        lowerName.includes(ingredient)
      );
      
      // If no common ingredients detected, use the meal name as the main ingredient
      return detected.length > 0 ? detected : [name];
    };
    
    return detectIngredients(meal.name);
  });
  
  const [editingIngredient, setEditingIngredient] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit',
      minute: '2-digit',
      hour12: false 
    });
  };

  const handleEditIngredient = (index: number) => {
    setEditingIngredient(index);
    setEditValue(ingredients[index]);
  };

  const handleSaveIngredient = (index: number) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = editValue;
    setIngredients(newIngredients);
    setEditingIngredient(null);
  };

  const handleRemoveIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const addNewIngredient = () => {
    setIngredients([...ingredients, 'New ingredient']);
    setEditingIngredient(ingredients.length);
    setEditValue('New ingredient');
  };

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Large Food Image */}
      <div className="relative h-[55vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: meal.image_url ? `url(${meal.image_url})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            backgroundPosition: 'center center',
          }}
        >
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between p-4 pt-12">
          <button
            onClick={onClose}
            className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          
          <h1 className="text-lg font-semibold text-white">Nutrition</h1>
          
          <div className="flex gap-2">
            <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Share className="w-5 h-5 text-white" />
            </button>
            <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <MoreHorizontal className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Panel - Draggable Sheet */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <Sheet open={true} onOpenChange={() => {}}>
          <SheetTrigger asChild>
            <div className="w-full">
              <Card className="rounded-t-3xl border-0 shadow-2xl min-h-[45vh] max-h-[80vh] overflow-hidden">
                {/* Drag Handle */}
                <div className="flex justify-center pt-3 pb-2">
                  <div className="w-12 h-1 bg-muted-foreground/30 rounded-full" />
                </div>
                
                <CardContent className="px-6 pb-6 h-full overflow-y-auto">
                  {/* Meal Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-primary rounded-full" />
                      <span className="text-sm text-muted-foreground">
                        {formatTime(meal.created_at)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-foreground">{meal.name}</h2>
                    <Button variant="outline" size="sm" className="rounded-full px-4">
                      <span className="mr-2">1</span>
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Nutrition Cards Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {/* Calories Card */}
                    <Card className="p-4 bg-muted/30">
                      <CardContent className="p-0">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Flame className="w-4 h-4 text-orange-500" />
                          </div>
                          <span className="text-sm text-muted-foreground">Calories</span>
                        </div>
                        <div className="text-2xl font-bold text-foreground">
                          {Math.round(meal.total_calories)}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Protein Card */}
                    <Card className="p-4 bg-muted/30">
                      <CardContent className="p-0">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center">
                            <Beef className="w-4 h-4 text-red-500" />
                          </div>
                          <span className="text-sm text-muted-foreground">Protein</span>
                        </div>
                        <div className="text-2xl font-bold text-foreground">
                          {Math.round(meal.total_protein)}g
                        </div>
                      </CardContent>
                    </Card>

                    {/* Carbs Card */}
                    <Card className="p-4 bg-muted/30">
                      <CardContent className="p-0">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center">
                            <Wheat className="w-4 h-4 text-orange-500" />
                          </div>
                          <span className="text-sm text-muted-foreground">Carbs</span>
                        </div>
                        <div className="text-2xl font-bold text-foreground">
                          {Math.round(meal.total_carbs)}g
                        </div>
                      </CardContent>
                    </Card>

                    {/* Fats Card */}
                    <Card className="p-4 bg-muted/30">
                      <CardContent className="p-0">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                            <Droplets className="w-4 h-4 text-blue-500" />
                          </div>
                          <span className="text-sm text-muted-foreground">Fats</span>
                        </div>
                        <div className="text-2xl font-bold text-foreground">
                          {Math.round(meal.total_fat)}g
                        </div>
                      </CardContent>
                    </Card>

                    {/* Fiber Card */}
                    <Card className="p-4 bg-muted/30">
                      <CardContent className="p-0">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                            <Salad className="w-4 h-4 text-green-500" />
                          </div>
                          <span className="text-sm text-muted-foreground">Fiber</span>
                        </div>
                        <div className="text-2xl font-bold text-foreground">
                          {Math.round(meal.total_fiber || 0)}g
                        </div>
                      </CardContent>
                    </Card>

                    {/* Sugar Card */}
                    <Card className="p-4 bg-muted/30">
                      <CardContent className="p-0">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-pink-500/10 rounded-lg flex items-center justify-center">
                            <Cherry className="w-4 h-4 text-pink-500" />
                          </div>
                          <span className="text-sm text-muted-foreground">Sugar</span>
                        </div>
                        <div className="text-2xl font-bold text-foreground">
                          {Math.round(0)}g
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Ingredients Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-foreground">Ingredients</h3>
                      <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={addNewIngredient}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add More
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {ingredients.map((ingredient, index) => (
                        <div key={index} className="flex items-center justify-between py-3 border-b border-muted/50">
                          <div className="flex items-center gap-3 flex-1">
                            <div className="w-8 h-8 bg-muted/50 rounded-full flex items-center justify-center">
                              <Salad className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <div className="flex-1">
                              {editingIngredient === index ? (
                                <Input
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  onBlur={() => handleSaveIngredient(index)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      handleSaveIngredient(index);
                                    }
                                  }}
                                  className="font-medium text-foreground border-0 p-0 h-auto bg-transparent focus-visible:ring-0"
                                  autoFocus
                                />
                              ) : (
                                <div 
                                  className="font-medium text-foreground cursor-pointer hover:text-primary"
                                  onClick={() => handleEditIngredient(index)}
                                >
                                  {ingredient}
                                </div>
                              )}
                              <div className="text-sm text-muted-foreground">
                                {Math.round(meal.total_calories / ingredients.length)} cal • 1 serving
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveIngredient(index)}
                            className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-8 pb-4">
                    <Button variant="outline" className="flex-1 rounded-full">
                      <span className="mr-2">⚡</span>
                      Fix Issue
                    </Button>
                    <Button 
                      className="flex-1 rounded-full bg-foreground text-background hover:bg-foreground/90"
                      onClick={onClose}
                    >
                      Done
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </SheetTrigger>
        </Sheet>
      </div>
    </div>
  );
};

export default MealDetailView;