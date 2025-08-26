import React, { useState, useEffect } from 'react';
import { Search, ArrowLeft, Edit, Loader2, Plus, Flame, Bookmark } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client';
import FoodItemCard from './FoodItemCard';
import FoodDetailModal from './FoodDetailModal';
import { CustomFoodModal } from './CustomFoodModal';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import foodBasketImage from '@/assets/food-basket.png';
import mealPlateImage from '@/assets/meal-plate-transparent.png';

interface FoodDatabaseProps {
  onClose: () => void;
}

interface FoodItem {
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
  servingOptions?: Array<{
    label: string;
    amount: number;
    unit: string;
  }>;
}

const FoodDatabase = ({ onClose }: FoodDatabaseProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [isCustomFoodModalOpen, setIsCustomFoodModalOpen] = useState(false);
  const [savedFoods, setSavedFoods] = useState<FoodItem[]>([]);
  const [isLoadingSavedFoods, setIsLoadingSavedFoods] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const suggestedFoods: FoodItem[] = [
    { id: "1", name: "Chicken Breast", calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, sugar: 0, sodium: 74, servingSize: "100", servingUnit: "g", brand: "Fresh" },
    { id: "2", name: "Brown Rice", calories: 123, protein: 2.6, carbs: 23, fat: 0.9, fiber: 1.8, sugar: 0.4, sodium: 7, servingSize: "100", servingUnit: "g" },
    { id: "3", name: "Broccoli", calories: 34, protein: 2.8, carbs: 7, fat: 0.4, fiber: 2.6, sugar: 1.5, sodium: 33, servingSize: "100", servingUnit: "g" },
    { id: "4", name: "Salmon", calories: 208, protein: 20, carbs: 0, fat: 13, fiber: 0, sugar: 0, sodium: 59, servingSize: "100", servingUnit: "g" },
    { id: "5", name: "Avocado", calories: 160, protein: 2, carbs: 9, fat: 15, fiber: 7, sugar: 0.7, sodium: 7, servingSize: "100", servingUnit: "g" },
    { id: "6", name: "Greek Yogurt", calories: 100, protein: 10, carbs: 6, fat: 0.4, fiber: 0, sugar: 6, sodium: 36, servingSize: "100", servingUnit: "g" },
    { id: "7", name: "Quinoa", calories: 120, protein: 4.4, carbs: 22, fat: 1.9, fiber: 2.8, sugar: 0.9, sodium: 7, servingSize: "100", servingUnit: "g" },
    { id: "8", name: "Sweet Potato", calories: 86, protein: 1.6, carbs: 20, fat: 0.1, fiber: 3, sugar: 4.2, sodium: 5, servingSize: "100", servingUnit: "g" },
  ];

  const searchUSDAFoods = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      // Search both USDA and Open Food Facts APIs in parallel
      const [usdaResponse, offResponse] = await Promise.allSettled([
        supabase.functions.invoke('usda-food-search', {
          body: { query: query.trim(), pageSize: 10 }
        }),
        supabase.functions.invoke('openfoodfacts-search', {
          body: { query: query.trim(), pageSize: 10 }
        })
      ]);

      let allFoods: FoodItem[] = [];

      // Process USDA results
      if (usdaResponse.status === 'fulfilled' && !usdaResponse.value.error) {
        const usdaFoods = usdaResponse.value.data?.foods || [];
        allFoods = [...allFoods, ...usdaFoods];
        console.log(`Found ${usdaFoods.length} USDA foods`);
      } else {
        console.error('USDA search failed:', usdaResponse.status === 'fulfilled' ? usdaResponse.value.error : usdaResponse.reason);
      }

      // Process Open Food Facts results
      if (offResponse.status === 'fulfilled' && !offResponse.value.error) {
        const offFoods = offResponse.value.data?.foods || [];
        allFoods = [...allFoods, ...offFoods];
        console.log(`Found ${offFoods.length} Open Food Facts foods`);
      } else {
        console.error('Open Food Facts search failed:', offResponse.status === 'fulfilled' ? offResponse.value.error : offResponse.reason);
      }

      // Remove duplicates based on name similarity and sort by relevance
      const uniqueFoods = allFoods.filter((food, index, arr) => {
        return index === arr.findIndex(f => 
          f.name.toLowerCase().trim() === food.name.toLowerCase().trim()
        );
      });

      // Sort by name relevance to query
      const sortedFoods = uniqueFoods.sort((a, b) => {
        const queryLower = query.toLowerCase();
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();
        
        // Exact matches first
        if (aName.includes(queryLower) && !bName.includes(queryLower)) return -1;
        if (!aName.includes(queryLower) && bName.includes(queryLower)) return 1;
        
        // Then by name length (shorter names are usually more relevant)
        return aName.length - bName.length;
      });

      setSearchResults(sortedFoods.slice(0, 20)); // Limit to 20 results
    } catch (error) {
      console.error('Error searching foods:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        searchUSDAFoods(searchQuery);
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Load saved foods when switching to saved-foods tab
  useEffect(() => {
    if (activeTab === 'saved-foods') {
      loadSavedFoods();
    }
  }, [activeTab]);

  const loadSavedFoods = async () => {
    setIsLoadingSavedFoods(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.log('No user found');
        setSavedFoods([]);
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

      // Convert saved foods to FoodItem format
      const convertedFoods: FoodItem[] = (data || []).map(savedFood => ({
        id: savedFood.food_id,
        name: savedFood.food_name,
        brand: savedFood.food_brand || undefined,
        calories: Number(savedFood.calories),
        protein: Number(savedFood.protein),
        carbs: Number(savedFood.carbs),
        fat: Number(savedFood.fat),
        fiber: Number(savedFood.fiber),
        sugar: Number(savedFood.sugar),
        sodium: Number(savedFood.sodium),
        servingSize: savedFood.serving_size,
        servingUnit: savedFood.serving_unit,
      }));

      setSavedFoods(convertedFoods);
    } catch (error) {
      console.error('Error loading saved foods:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingSavedFoods(false);
    }
  };

  const handleFoodSelect = (food: FoodItem) => {
    setSelectedFood(food);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFood(null);
  };

  const handleLogFood = async (food: FoodItem, servings: number, size: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to save food items.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Calculate nutritional values based on servings
      const totalCalories = Math.round(food.calories * servings);
      const totalProtein = Math.round(food.protein * servings);
      const totalCarbs = Math.round(food.carbs * servings);
      const totalFat = Math.round(food.fat * servings);
      const totalFiber = Math.round(food.fiber * servings);

      // Create a new meal entry
      const { data: meal, error: mealError } = await supabase
        .from('meals')
        .insert({
          user_id: user.id,
          name: food.name,
          meal_type: 'snack', // Default to snack for manually added foods
          meal_date: new Date().toISOString().split('T')[0], // Today's date
          total_calories: totalCalories,
          total_protein: totalProtein,
          total_carbs: totalCarbs,
          total_fat: totalFat,
          total_fiber: totalFiber,
        })
        .select()
        .single();

      if (mealError) throw mealError;

      // Create meal item entry
      const { error: itemError } = await supabase
        .from('meal_items')
        .insert({
          meal_id: meal.id,
          food_name: food.name,
          quantity: servings,
          calories: totalCalories,
          protein: totalProtein,
          carbs: totalCarbs,
          fat: totalFat,
          fiber: totalFiber,
        });

      if (itemError) throw itemError;

      toast({
        title: "Food Logged Successfully!",
        description: `${food.name} has been added to your recently uploaded foods.`,
      });
      
      // Close the modal and Food Database
      handleCloseModal();
      onClose();
      
    } catch (error) {
      console.error('Error logging food:', error);
      toast({
        title: "Error",
        description: "Failed to log food. Please try again.",
        variant: "destructive",
      });
    }
  };

  const EmptyState = ({ title, description, buttonText, onButtonClick }: {
    title: string; 
    description: string; 
    buttonText: string;
    onButtonClick?: () => void;
  }) => (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {title === "My Foods" ? (
        <div className="w-24 h-24 mb-4 flex items-center justify-center">
          <img 
            src={foodBasketImage} 
            alt="Food basket" 
            className="w-24 h-24 object-contain"
          />
        </div>
      ) : title === "My Meals" ? (
        <div className="w-24 h-24 mb-4 flex items-center justify-center">
          <img 
            src={mealPlateImage} 
            alt="Meal plate" 
            className="w-24 h-24 object-contain"
          />
        </div>
      ) : (
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <div className="w-8 h-8 bg-muted-foreground/20 rounded-full"></div>
        </div>
      )}
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-xs">{description}</p>
      {buttonText && (
        <Button 
          className="w-full max-w-xs rounded-full" 
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-background z-[80] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <button
          onClick={onClose}
          className="w-10 h-10 bg-muted rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-lg font-semibold text-foreground">Food Database</h1>
        <div className="w-10 h-10" /> {/* Spacer */}
      </div>

      {/* Tabs */}
      <div className="flex-1 flex flex-col min-h-0">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
          <TabsList className="mx-4 mt-4 grid w-auto grid-cols-4 bg-transparent p-0 h-auto flex-shrink-0">
            <TabsTrigger 
              value="all" 
              className="text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-foreground data-[state=active]:bg-transparent rounded-none pb-3"
            >
              All
            </TabsTrigger>
            <TabsTrigger 
              value="my-foods"
              className="text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-foreground data-[state=active]:bg-transparent rounded-none pb-3"
            >
              My foods
            </TabsTrigger>
            <TabsTrigger 
              value="my-meals"
              className="text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-foreground data-[state=active]:bg-transparent rounded-none pb-3"
            >
              My meals
            </TabsTrigger>
            <TabsTrigger 
              value="saved-foods"
              className="text-muted-foreground data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-foreground data-[state=active]:bg-transparent rounded-none pb-3"
            >
              Saved foods
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 min-h-0 overflow-hidden">
            <TabsContent value="all" className="h-full m-0 overflow-y-auto">
              <div className="p-4 pb-32">
                {/* Search */}
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Add your food here"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 rounded-xl bg-primary/5 border-0"
                  />
                  {isSearching && (
                    <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground animate-spin" />
                  )}
                </div>

                {/* Results */}
                <div className="space-y-2">
                {searchQuery ? (
                  <>
                    {isSearching ? (
                      <div className="flex justify-center py-8">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                        <span className="ml-2 text-muted-foreground">Searching food databases...</span>
                      </div>
                    ) : searchResults.length > 0 ? (
                      <>
                        <h3 className="text-lg font-semibold text-foreground mb-4">
                          Search Results ({searchResults.length})
                        </h3>
                        <div className="text-xs text-muted-foreground mb-4 flex gap-4">
                          <span>🇺🇸 USDA Database</span>
                          <span>🌍 Open Food Facts</span>
                        </div>
                        {searchResults.map((food) => (
                          <FoodItemCard key={food.id} food={food} onClick={() => handleFoodSelect(food)} />
                        ))}
                      </>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <p className="text-lg mb-2">No foods found</p>
                        <p className="text-sm">Try a different search term</p>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Suggestions</h3>
                    {suggestedFoods.map((food) => (
                      <FoodItemCard key={food.id} food={food} onClick={() => handleFoodSelect(food)} />
                    ))}
                  </>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="my-foods" className="h-full m-0 overflow-y-auto">
              <div className="p-4">
                <EmptyState
                  title="My Foods"
                  description="Add a custom food to your personal list."
                  buttonText="Add food"
                  onButtonClick={() => setIsCustomFoodModalOpen(true)}
                />
              </div>
            </TabsContent>

            <TabsContent value="my-meals" className="h-full m-0 overflow-y-auto">
              <div className="p-4 pb-32">
                <EmptyState
                  title="My Meals"
                  description="Quickly log your go-to meal combinations."
                  buttonText="Create meal"
                />
              </div>
            </TabsContent>

            <TabsContent value="saved-foods" className="h-full m-0 overflow-y-auto">
              <div className="p-4 pb-32">
                {isLoadingSavedFoods ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Loading saved foods...</span>
                  </div>
                ) : savedFoods.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Bookmark className="w-12 h-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No saved foods yet</h3>
                    <p className="text-muted-foreground text-center">
                      Tap 🔖 on any food detail to save here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {savedFoods.map((food) => (
                      <FoodItemCard
                        key={food.id}
                        food={food}
                        onClick={() => handleFoodSelect(food)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Fixed bottom button - only show in "all" tab */}
      {activeTab === 'all' && (
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-background border-t border-border z-20">
          <Button className="w-full h-12 text-base font-semibold rounded-full flex items-center gap-2" variant="outline">
            <Edit className="w-4 h-4" />
            Manual Add
          </Button>
        </div>
      )}

      {/* Food Detail Modal */}
      <FoodDetailModal
        food={selectedFood}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onLog={handleLogFood}
      />

      {/* Custom Food Modal */}
      <CustomFoodModal
        open={isCustomFoodModalOpen}
        onOpenChange={setIsCustomFoodModalOpen}
      />
    </div>
  );
};

export default FoodDatabase;