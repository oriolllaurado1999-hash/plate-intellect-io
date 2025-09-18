import React, { useState, useEffect } from 'react';
import { ArrowLeft, Edit3, Plus, Trash2, Flame, Beef, Wheat, Leaf, Cherry, Salad, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from './ui/carousel';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import FoodDatabase from './FoodDatabase';

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
  onMealCreated?: () => void;
}

const CreateMealModal = ({ isOpen, onClose, onMealCreated }: CreateMealModalProps) => {
  const [mealName, setMealName] = useState('Tap to Name');
  const [mealItems, setMealItems] = useState<MealItem[]>([]);
  const [isEditingName, setIsEditingName] = useState(false);
  const [showFoodDatabase, setShowFoodDatabase] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const { toast } = useToast();

  // Carousel effect
  useEffect(() => {
    if (!api) {
      return
    }
 
    setCurrent(api.selectedScrollSnap())
 
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  // Nutrition slides configuration
  const nutritionSlides = [
    {
      items: [
        { icon: Beef, label: 'Protein', key: 'protein', unit: 'g', color: 'hsl(var(--protein))' },
        { icon: Wheat, label: 'Carbs', key: 'carbs', unit: 'g', color: 'hsl(var(--carbs))' },
        { icon: Leaf, label: 'Fats', key: 'fat', unit: 'g', color: 'hsl(var(--fat))' },
      ]
    },
    {
      items: [
        { icon: Leaf, label: 'Fiber', key: 'fiber', unit: 'g', color: '#8B5CF6' },
        { icon: Cherry, label: 'Sugar', key: 'sugar', unit: 'g', color: '#EC4899' },
        { icon: Salad, label: 'Sodium', key: 'sodium', unit: 'mg', color: '#F59E0B' },
      ]
    }
  ];

  // Calculate totals
  const calculateTotals = () => {
    return mealItems.reduce(
      (totals, item) => ({
        calories: totals.calories + item.calories,
        protein: totals.protein + item.protein,
        carbs: totals.carbs + item.carbs,
        fat: totals.fat + item.fat,
        fiber: totals.fiber + item.fiber,
        sugar: totals.sugar + item.sugar,
        sodium: totals.sodium + item.sodium,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0, sodium: 0 }
    );
  };

  const totals = calculateTotals();

  const calculateHealthScore = () => {
    if (mealItems.length === 0) return 0;
    
    const totalCalories = totals.calories;
    if (totalCalories === 0) return 0;
    
    let score = 5;
    
    // Fiber bonus
    if (totals.fiber > 10) score += 2;
    else if (totals.fiber > 5) score += 1;
    
    // Protein bonus
    const proteinRatio = (totals.protein * 4) / totalCalories;
    if (proteinRatio > 0.25) score += 1.5;
    else if (proteinRatio > 0.15) score += 1;
    
    // Fat penalty for too much
    const fatRatio = (totals.fat * 9) / totalCalories;
    if (fatRatio > 0.35) score -= 1;
    
    // Sugar penalty
    if (totals.sugar > 25) score -= 1;
    
    return Math.max(1, Math.min(10, Math.round(score)));
  };

  const healthScore = calculateHealthScore();

  const handleFoodAdded = () => {
    // This callback is called when food is successfully added in FoodDatabase
    // The actual food addition is handled internally by FoodDatabase
    setShowFoodDatabase(false);
  };

  const removeMealItem = (itemId: string) => {
    setMealItems(prev => prev.filter(item => item.id !== itemId));
  };

  const createMeal = async () => {
    if (mealItems.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one item to your meal",
        variant: "destructive",
      });
      return;
    }

    if (mealName === 'Tap to Name' || !mealName.trim()) {
      toast({
        title: "Error", 
        description: "Please give your meal a name",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to create meals",
          variant: "destructive",
        });
        return;
      }

      // Create the meal
      const mealData = {
        user_id: user.id,
        name: mealName,
        meal_type: 'custom',
        total_calories: totals.calories,
        total_protein: totals.protein,
        total_carbs: totals.carbs,
        total_fat: totals.fat,
        total_fiber: totals.fiber,
        meal_date: new Date().toISOString().split('T')[0],
        ai_analyzed: false,
        ai_confidence: 1.0,
      };

      const { data: mealResponse, error } = await supabase
        .from('meals')
        .insert([mealData])
        .select()
        .single();

      if (error) throw error;

      // Create meal items
      const mealItemsData = mealItems.map(item => ({
        meal_id: mealResponse.id,
        food_name: item.name,
        quantity: item.quantity,
        calories: item.calories,
        protein: item.protein,
        carbs: item.carbs,
        fat: item.fat,
        fiber: item.fiber,
        confidence: 1.0,
      }));

      const { error: itemsError } = await supabase
        .from('meal_items')
        .insert(mealItemsData);

      if (itemsError) throw itemsError;

      toast({
        title: "Success",
        description: "Meal created successfully!",
      });

      // Reset form
      setMealName('Tap to Name');
      setMealItems([]);
      onMealCreated?.();
      onClose();
    } catch (error) {
      console.error('Error creating meal:', error);
      toast({
        title: "Error",
        description: "Failed to create meal. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  if (showFoodDatabase) {
    return (
      <FoodDatabase
        onClose={() => setShowFoodDatabase(false)}
        onFoodAdded={handleFoodAdded}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
      <div className="min-h-screen">
        {/* Header */}
        <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b z-10">
          <div className="flex items-center justify-between p-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onClose}
              className="rounded-full w-10 h-10 bg-muted"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold">Create Meal</h1>
            <div className="w-10" />
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Meal Name Section */}
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                {isEditingName ? (
                  <Input
                    value={mealName}
                    onChange={(e) => setMealName(e.target.value)}
                    onBlur={() => setIsEditingName(false)}
                    onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)}
                    className="text-2xl font-bold border-none bg-transparent p-0 h-auto"
                    autoFocus
                  />
                ) : (
                  <h2 
                    className="text-2xl font-bold cursor-pointer hover:text-muted-foreground transition-colors"
                    onClick={() => setIsEditingName(true)}
                  >
                    {mealName}
                  </h2>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditingName(true)}
                  className="rounded-full"
                >
                  <Edit3 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Nutrition Display */}
          <Card>
            <CardContent className="p-6">
              {/* Calories */}
              <div className="flex items-center justify-center mb-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Flame className="h-6 w-6" style={{ color: '#FF6B35' }} />
                    <span className="text-sm text-muted-foreground">Calories</span>
                  </div>
                  <div className="text-4xl font-bold">{Math.round(totals.calories)}</div>
                </div>
              </div>

              {/* Nutrition Carousel */}
              <Carousel setApi={setApi} className="w-full">
                <CarouselContent>
                  {nutritionSlides.map((slide, index) => (
                    <CarouselItem key={index}>
                      <div className="grid grid-cols-3 gap-4">
                        {slide.items.map((item) => (
                          <div key={item.key} className="text-center">
                            <div className="flex items-center justify-center mb-2">
                              <item.icon 
                                className="h-5 w-5" 
                                style={{ color: item.color }} 
                              />
                            </div>
                            <div className="text-sm text-muted-foreground mb-1">{item.label}</div>
                            <div className="text-xl font-bold">
                              {Math.round(totals[item.key as keyof typeof totals])}{item.unit}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* Carousel indicators */}
                <div className="flex justify-center gap-2 mt-4">
                  {nutritionSlides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => api?.scrollTo(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        current === index ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
              </Carousel>

              {/* Health Score */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span className="font-medium">Health Score</span>
                </div>
                <Badge variant="outline">
                  {mealItems.length > 0 ? `${healthScore}/10` : 'N/A'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Meal Items Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Meal Items</h3>
            
            <div className="space-y-3">
              {mealItems.map((item) => (
                <Card key={item.id} className="bg-muted/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Flame className="h-3 w-3" />
                          <span>{Math.round(item.calories)} cal</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeMealItem(item.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Add Items Button */}
              <Button
                variant="outline"
                onClick={() => setShowFoodDatabase(true)}
                className="w-full h-14 border-dashed border-2 text-muted-foreground hover:text-foreground hover:border-primary"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add items to this meal
              </Button>
            </div>
          </div>
        </div>

        {/* Fixed Bottom Button */}
        <div className="sticky bottom-0 p-4 bg-background/95 backdrop-blur-sm border-t">
          <Button
            onClick={createMeal}
            disabled={isLoading || mealItems.length === 0}
            className="w-full h-12 bg-foreground text-background hover:bg-foreground/90"
          >
            {isLoading ? 'Creating Meal...' : 'Create Meal'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateMealModal;