import React, { useState, useEffect } from 'react';
import { ArrowLeft, Edit, Share, Trash2, Flame, Plus, Beef, Wheat, Leaf, Activity, Cherry, Salad, X, Bookmark, GripHorizontal } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

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
  onDelete?: () => void;
}

const MealDetailView = ({ meal, onClose, onDelete }: MealDetailViewProps) => {
  const { user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(true);
  const [dragStartY, setDragStartY] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
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

  // Check if meal is bookmarked on component mount
  useEffect(() => {
    const checkBookmarkStatus = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('saved_foods')
          .select('id')
          .eq('user_id', user.id)
          .eq('food_name', meal.name)
          .single();
        
        if (data && !error) {
          setIsBookmarked(true);
        }
      } catch (error) {
        // Meal not bookmarked
        setIsBookmarked(false);
      }
    };

    checkBookmarkStatus();
  }, [user, meal.name]);

  const handleBookmarkToggle = async () => {
    if (!user) {
      toast.error('Please sign in to bookmark meals');
      return;
    }

    try {
      if (isBookmarked) {
        // Remove bookmark
        const { error } = await supabase
          .from('saved_foods')
          .delete()
          .eq('user_id', user.id)
          .eq('food_name', meal.name);

        if (error) throw error;
        
        setIsBookmarked(false);
        toast.success('Meal removed from saved foods');
      } else {
        // Add bookmark
        const { error } = await supabase
          .from('saved_foods')
          .insert({
            user_id: user.id,
            food_id: `meal_${meal.id}`,
            food_name: meal.name,
            calories: meal.total_calories,
            protein: meal.total_protein,
            carbs: meal.total_carbs,
            fat: meal.total_fat,
            fiber: meal.total_fiber || 0,
            serving_size: '1',
            serving_unit: 'serving'
          });

        if (error) throw error;
        
        setIsBookmarked(true);
        toast.success('Meal saved to your favorites');
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      toast.error('Failed to update bookmark');
    }
  };

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

  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setDragStartY(clientY);
  };

  const handleDragMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (dragStartY === 0) return;
    
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const offset = clientY - dragStartY;
    setDragOffset(Math.max(0, offset));
  };

  const handleDragEnd = () => {
    if (dragOffset > 100) {
      setIsExpanded(false);
    } else if (dragOffset < -100) {
      setIsExpanded(true);
    }
    setDragStartY(0);
    setDragOffset(0);
  };

  const togglePanel = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: meal.image_url ? `url(${meal.image_url})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundPosition: meal.image_url ? 'center 20%' : 'center center',
          backgroundSize: meal.image_url ? 'cover' : 'cover',
          transform: meal.image_url ? 'scale(1.05)' : 'none',
        }}
      >
        {/* Overlay */}
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
        
        <h1 className="text-lg font-semibold text-white text-center flex-1">Nutrition</h1>
        
        <div className="flex gap-2">
          <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Share className="w-5 h-5 text-white" />
          </button>
          <button 
            onClick={onDelete}
            className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-500/30 transition-colors"
          >
            <Trash2 className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Bottom Card */}
      <div 
        className={`absolute bottom-0 left-0 right-0 z-10 transition-transform duration-300 ease-out ${
          isExpanded ? 'translate-y-0' : 'translate-y-[40vh]'
        }`}
        style={{ transform: `translateY(${dragOffset}px)` }}
      >
        <Card className="rounded-t-3xl border-0 shadow-2xl h-[60vh] max-h-[60vh] overflow-hidden">
          {/* Drag Handle */}
          <div 
            className="flex justify-center py-3 bg-muted/10 rounded-t-3xl cursor-grab active:cursor-grabbing"
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
            onClick={togglePanel}
          >
            <div className="w-12 h-1 bg-muted-foreground/30 rounded-full"></div>
          </div>
          
          <CardContent className="p-6 space-y-6 h-full overflow-y-auto">
            {/* Meal Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleBookmarkToggle}
                  className="p-1 rounded-full hover:bg-muted/50 transition-colors"
                >
                  <Bookmark 
                    className={`w-4 h-4 transition-colors ${
                      isBookmarked 
                        ? 'text-primary fill-primary' 
                        : 'text-muted-foreground hover:text-primary'
                    }`} 
                  />
                </button>
                <span className="text-sm text-muted-foreground">
                  {formatTime(meal.created_at)}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">{meal.name}</h2>
              <Button variant="outline" size="sm" className="rounded-full px-4">
                <span className="mr-2">1</span>
                <Edit className="w-4 h-4" />
              </Button>
            </div>

            {/* Nutrition Carousel */}
            <Carousel className="w-full">
              <CarouselContent>
                {/* First slide - Calories, Protein, Carbs, Fats */}
                <CarouselItem>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Calories */}
                    <Card className="border-0 shadow-sm bg-muted/20">
                      <CardContent className="p-3 text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <Flame className="w-4 h-4 text-orange-600" />
                          <span className="text-xs text-muted-foreground">Calories</span>
                        </div>
                        <div className="text-lg font-semibold text-foreground">
                          {Math.round(meal.total_calories)}
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Protein */}
                    <Card className="border-0 shadow-sm bg-muted/20">
                      <CardContent className="p-3 text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <Beef className="w-4 h-4 text-red-500" />
                          <span className="text-xs text-muted-foreground">Protein</span>
                        </div>
                        <div className="text-lg font-semibold text-foreground">
                          {Math.round(meal.total_protein)}g
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Carbs */}
                    <Card className="border-0 shadow-sm bg-muted/20">
                      <CardContent className="p-3 text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <Wheat className="w-4 h-4 text-orange-500" />
                          <span className="text-xs text-muted-foreground">Carbs</span>
                        </div>
                        <div className="text-lg font-semibold text-foreground">
                          {Math.round(meal.total_carbs)}g
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Fats */}
                    <Card className="border-0 shadow-sm bg-muted/20">
                      <CardContent className="p-3 text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <Leaf className="w-4 h-4 text-blue-500" />
                          <span className="text-xs text-muted-foreground">Fats</span>
                        </div>
                        <div className="text-lg font-semibold text-foreground">
                          {Math.round(meal.total_fat)}g
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>

                {/* Second slide - Fiber, Sugar, Sodium, Health Score */}
                <CarouselItem>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Fiber */}
                    <Card className="border-0 shadow-sm bg-muted/20">
                      <CardContent className="p-3 text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <Salad className="w-4 h-4 text-green-500" />
                          <span className="text-xs text-muted-foreground">Fiber</span>
                        </div>
                        <div className="text-lg font-semibold text-foreground">
                          {Math.round(meal.total_fiber || 0)}g
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Sugar */}
                    <Card className="border-0 shadow-sm bg-muted/20">
                      <CardContent className="p-3 text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <Cherry className="w-4 h-4 text-pink-500" />
                          <span className="text-xs text-muted-foreground">Sugar</span>
                        </div>
                        <div className="text-lg font-semibold text-foreground">
                          {Math.round(0)}g
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Sodium */}
                    <Card className="border-0 shadow-sm bg-muted/20">
                      <CardContent className="p-3 text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <Activity className="w-4 h-4 text-purple-500" />
                          <span className="text-xs text-muted-foreground">Sodium</span>
                        </div>
                        <div className="text-lg font-semibold text-foreground">
                          {Math.round(0)}mg
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Health Score */}
                    <Card className="border-0 shadow-sm bg-muted/20">
                      <CardContent className="p-3 text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <Activity className="w-4 h-4 text-emerald-500" />
                          <span className="text-xs text-muted-foreground">Health Score</span>
                        </div>
                        <div className="text-lg font-semibold text-foreground">
                          8.5/10
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              </CarouselContent>
            </Carousel>

            {/* Page Indicators */}
            <div className="flex justify-center gap-2 py-4">
              <div className="w-2 h-2 rounded-full bg-foreground" />
              <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
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
                  <div key={index} className="flex items-center justify-between py-3 border-b">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
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
                            className="font-medium text-foreground"
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
                          {Math.round(meal.total_calories / ingredients.length)} cal
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm text-muted-foreground">1 serving</div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveIngredient(index)}
                        className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6">
              <Button variant="outline" className="flex-1 rounded-full">
                <span className="mr-2">⚡</span>
                Fix Issue
              </Button>
              <Button className="flex-1 rounded-full bg-foreground text-background">
                Done
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MealDetailView;