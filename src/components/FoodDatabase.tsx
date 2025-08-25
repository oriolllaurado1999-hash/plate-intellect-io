import React, { useState, useEffect } from 'react';
import { Search, ArrowLeft, Plus, Flame, Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

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
}

const FoodDatabase = ({ onClose }: FoodDatabaseProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);

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
      const { data, error } = await supabase.functions.invoke('usda-food-search', {
        body: { query: query.trim(), pageSize: 20 }
      });

      if (error) {
        console.error('Error searching foods:', error);
        setSearchResults([]);
      } else {
        setSearchResults(data?.foods || []);
      }
    } catch (error) {
      console.error('Error calling USDA API:', error);
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

  const FoodItem: React.FC<{ food: FoodItem }> = ({ food }) => (
    <div className="flex items-center justify-between p-4 bg-card rounded-lg border">
      <div className="flex items-center gap-3 flex-1">
        <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
          <Flame className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-medium text-foreground">{food.name}</h4>
              {food.brand && (
                <p className="text-xs text-muted-foreground mb-1">{food.brand}</p>
              )}
              <p className="text-sm text-muted-foreground">{food.calories} cal · {food.servingSize}{food.servingUnit}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-2 text-xs text-muted-foreground">
            <span>P: {food.protein}g</span>
            <span>C: {food.carbs}g</span>
            <span>F: {food.fat}g</span>
          </div>
        </div>
      </div>
      <Button size="icon" variant="ghost" className="w-8 h-8 shrink-0">
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );

  const EmptyState = ({ title, description, buttonText }: { 
    title: string; 
    description: string; 
    buttonText: string;
  }) => (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
        <div className="w-8 h-8 bg-muted-foreground/20 rounded-full"></div>
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-xs">{description}</p>
      {buttonText && (
        <Button className="w-full max-w-xs">
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
        <h1 className="text-lg font-semibold text-foreground">Log Food</h1>
        <div className="w-10 h-10" /> {/* Spacer */}
      </div>

      {/* Tabs */}
      <div className="flex-1 flex flex-col">
        <Tabs defaultValue="all" className="flex-1 flex flex-col">
          <TabsList className="mx-4 mt-4 grid w-auto grid-cols-4 bg-transparent p-0 h-auto">
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

          <div className="flex-1 overflow-auto">
            <TabsContent value="all" className="flex-1 m-0 p-4 pb-24">
              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Add your food here"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 rounded-xl bg-muted border-0"
                />
                {isSearching && (
                  <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground animate-spin" />
                )}
              </div>

              {/* Results */}
              <div className="space-y-2 pb-24">
                {searchQuery ? (
                  <>
                    {isSearching ? (
                      <div className="flex justify-center py-8">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                        <span className="ml-2 text-muted-foreground">Searching USDA database...</span>
                      </div>
                    ) : searchResults.length > 0 ? (
                      <>
                        <h3 className="text-lg font-semibold text-foreground mb-4">
                          Search Results ({searchResults.length})
                        </h3>
                        {searchResults.map((food) => (
                          <FoodItem key={food.id} food={food} />
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
                      <FoodItem key={food.id} food={food} />
                    ))}
                  </>
                )}
              </div>

              {/* Bottom buttons */}
              <div className="fixed bottom-4 left-4 right-4">
                <Button variant="outline" className="w-full h-12 rounded-xl">
                  📝 Manual Add
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="my-foods" className="flex-1 m-0">
              <EmptyState
                title="My Foods"
                description="Add a custom food to your personal list."
                buttonText="Add food"
              />
            </TabsContent>

            <TabsContent value="my-meals" className="flex-1 m-0">
              <EmptyState
                title="My Meals"
                description="Quickly log your go-to meal combinations."
                buttonText="Create meal"
              />
            </TabsContent>

            <TabsContent value="saved-foods" className="flex-1 m-0">
              <div className="p-4">
                {/* Saved food example */}
                <div className="bg-card rounded-xl p-4 mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent"></div>
                  <div className="relative flex items-center justify-between">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">🕘 9 AM</div>
                      <h4 className="font-semibold text-foreground">Smoked Salmon</h4>
                      <h4 className="font-semibold text-foreground">Avocado Salad</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="w-8 h-8">
                        <span className="text-lg">−</span>
                      </Button>
                      <span className="text-foreground font-medium min-w-[20px] text-center">1</span>
                      <Button variant="ghost" size="icon" className="w-8 h-8">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <EmptyState
                  title="No saved foods yet"
                  description="Tap 🔖 on any logged food to save here."
                  buttonText=""
                />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default FoodDatabase;