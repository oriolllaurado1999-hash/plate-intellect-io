import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Bookmark } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import FoodItemCard from '@/components/FoodItemCard';
import FoodDetailModal from '@/components/FoodDetailModal';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SavedFood {
  id: string;
  food_id: string;
  food_name: string;
  food_brand?: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  serving_size: string;
  serving_unit: string;
}

interface SavedFoodsProps {
  isOpen: boolean;
  onClose: () => void;
  onLog?: (food: any, servings: number, size: string) => void;
}

const SavedFoods = ({ isOpen, onClose, onLog }: SavedFoodsProps) => {
  const [savedFoods, setSavedFoods] = useState<SavedFood[]>([]);
  const [filteredFoods, setFilteredFoods] = useState<SavedFood[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFood, setSelectedFood] = useState<any>(null);
  const [showFoodDetail, setShowFoodDetail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Load saved foods when component opens
  useEffect(() => {
    if (isOpen) {
      loadSavedFoods();
    }
  }, [isOpen]);

  // Filter foods based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredFoods(savedFoods);
    } else {
      const filtered = savedFoods.filter(food =>
        food.food_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (food.food_brand && food.food_brand.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredFoods(filtered);
    }
  }, [searchQuery, savedFoods]);

  const loadSavedFoods = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to view saved foods",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase
        .from('saved_foods')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading saved foods:', error);
        toast({
          title: "Error",
          description: "Failed to load saved foods. Please try again.",
          variant: "destructive",
        });
        return;
      }

      setSavedFoods(data || []);
    } catch (error) {
      console.error('Error loading saved foods:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFoodClick = (savedFood: SavedFood) => {
    // Convert saved food to the format expected by FoodDetailModal
    const foodItem = {
      id: savedFood.food_id,
      name: savedFood.food_name,
      brand: savedFood.food_brand,
      calories: savedFood.calories,
      protein: savedFood.protein,
      carbs: savedFood.carbs,
      fat: savedFood.fat,
      fiber: savedFood.fiber,
      sugar: savedFood.sugar,
      sodium: savedFood.sodium,
      servingSize: savedFood.serving_size,
      servingUnit: savedFood.serving_unit,
    };
    
    setSelectedFood(foodItem);
    setShowFoodDetail(true);
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="bottom" className="h-[100vh] rounded-t-none p-0 z-[80] flex flex-col [&>button]:hidden">
          <SheetHeader className="p-6 pb-4 flex-row items-center justify-between space-y-0">
            <button
              onClick={onClose}
              className="w-10 h-10 bg-muted rounded-full flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <h2 className="text-lg font-semibold">Saved Foods</h2>
            <div className="w-10 h-10"></div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto">
            <div className="px-6 pb-6">
              {/* Search Input */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search saved foods..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base rounded-full"
                />
              </div>

              {/* Content */}
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-muted-foreground">Loading saved foods...</div>
                </div>
              ) : filteredFoods.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Bookmark className="w-12 h-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {searchQuery ? 'No matching foods found' : 'No saved foods yet'}
                  </h3>
                  <p className="text-muted-foreground text-center">
                    {searchQuery 
                      ? 'Try adjusting your search terms' 
                      : 'Save foods to your favorites by tapping the bookmark icon when viewing food details'
                    }
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredFoods.map((food) => (
                    <FoodItemCard
                      key={food.id}
                      food={{
                        id: food.food_id,
                        name: food.food_name,
                        brand: food.food_brand,
                        calories: food.calories,
                        protein: food.protein,
                        carbs: food.carbs,
                        fat: food.fat,
                        fiber: food.fiber,
                        sugar: food.sugar,
                        sodium: food.sodium,
                        servingSize: food.serving_size,
                        servingUnit: food.serving_unit,
                      }}
                      onClick={() => handleFoodClick(food)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Food Detail Modal */}
      <FoodDetailModal
        food={selectedFood}
        isOpen={showFoodDetail}
        onClose={() => {
          setShowFoodDetail(false);
          setSelectedFood(null);
        }}
        onLog={onLog}
      />
    </>
  );
};

export default SavedFoods;