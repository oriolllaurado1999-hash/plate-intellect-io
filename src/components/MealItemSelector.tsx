import React, { useState, useEffect } from 'react';
import { Search, ArrowLeft, Plus, Loader2 } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import FoodItemCard from './FoodItemCard';
import FoodDetailModal from './FoodDetailModal';
import { CustomFoodModal } from './CustomFoodModal';
import foodBasketImage from '@/assets/food-basket.png';

interface MealItemSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onItemsSelected: (selectedItems: FoodItem[], servings: number) => void;
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

const MealItemSelector = ({ isOpen, onClose, onItemsSelected }: MealItemSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [isCustomFoodModalOpen, setIsCustomFoodModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<FoodItem[]>([]);

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
      const [usdaResponse, offResponse] = await Promise.allSettled([
        supabase.functions.invoke('usda-food-search', {
          body: { query: query.trim(), pageSize: 10 }
        }),
        supabase.functions.invoke('openfoodfacts-search', {
          body: { query: query.trim(), pageSize: 10 }
        })
      ]);

      let allFoods: FoodItem[] = [];

      if (usdaResponse.status === 'fulfilled' && !usdaResponse.value.error) {
        const usdaFoods = usdaResponse.value.data?.foods || [];
        allFoods = [...allFoods, ...usdaFoods];
      }

      if (offResponse.status === 'fulfilled' && !offResponse.value.error) {
        const offFoods = offResponse.value.data?.foods || [];
        allFoods = [...allFoods, ...offFoods];
      }

      const uniqueFoods = allFoods.filter((food, index, arr) => {
        return index === arr.findIndex(f => 
          f.name.toLowerCase().trim() === food.name.toLowerCase().trim()
        );
      });

      setSearchResults(uniqueFoods.slice(0, 20));
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchUSDAFoods(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleFoodClick = (food: FoodItem) => {
    setSelectedFood(food);
    setIsModalOpen(true);
  };

  const handleLogFood = (food: FoodItem, servings: number) => {
    setSelectedItems(prev => [...prev, food]);
    setIsModalOpen(false);
    setSelectedFood(null);
  };

  const handleAddSelectedItems = () => {
    if (selectedItems.length > 0) {
      onItemsSelected(selectedItems, 1); // Default to 1 serving
      setSelectedItems([]);
    }
  };

  const removeSelectedItem = (index: number) => {
    setSelectedItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleCustomFoodCreated = (customFood: any) => {
    const foodItem: FoodItem = {
      id: `custom-${Date.now()}`,
      name: customFood.description,
      brand: customFood.brandName,
      calories: parseFloat(customFood.calories) || 0,
      protein: parseFloat(customFood.protein) || 0,
      carbs: parseFloat(customFood.carbs) || 0,
      fat: parseFloat(customFood.totalFat) || 0,
      fiber: parseFloat(customFood.fiber) || 0,
      sugar: parseFloat(customFood.sugar) || 0,
      sodium: parseFloat(customFood.sodium) || 0,
      servingSize: customFood.servingSize,
      servingUnit: 'serving',
    };
    setSelectedItems(prev => [...prev, foodItem]);
    setIsCustomFoodModalOpen(false);
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
            <h2 className="text-lg font-semibold">Add Food Items</h2>
            <div className="w-10" />
          </div>

          {/* Selected Items Counter */}
          {selectedItems.length > 0 && (
            <div className="px-4 py-2 bg-card border-b">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected
                </span>
                <Button
                  size="sm"
                  onClick={handleAddSelectedItems}
                  className="h-8"
                >
                  Add to Meal
                </Button>
              </div>
            </div>
          )}

          <div className="flex-1 flex flex-col">
            {/* Search Bar */}
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search for foods..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
                {isSearching && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  </div>
                )}
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <TabsList className="grid w-full grid-cols-2 mx-4 mt-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="my-meals">My Foods</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="flex-1 mt-4">
                <ScrollArea className="flex-1 px-4">
                  <div className="space-y-4">
                    {/* Create Custom Food Button */}
                    <Button
                      variant="outline"
                      onClick={() => setIsCustomFoodModalOpen(true)}
                      className="w-full justify-start gap-3 h-auto p-4"
                    >
                      <Plus className="h-5 w-5" />
                      <span>Create Custom Food</span>
                    </Button>

                    {searchQuery && searchResults.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-3">Search Results</h3>
                        <div className="space-y-2">
                          {searchResults.map((food) => (
                            <FoodItemCard
                              key={food.id}
                              food={food}
                              onClick={() => handleFoodClick(food)}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {!searchQuery && (
                      <div>
                        <h3 className="font-semibold mb-3">Suggested Foods</h3>
                        <div className="space-y-2">
                          {suggestedFoods.map((food) => (
                            <FoodItemCard
                              key={food.id}
                              food={food}
                              onClick={() => handleFoodClick(food)}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {searchQuery && searchResults.length === 0 && !isSearching && (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>No foods found for "{searchQuery}"</p>
                        <p className="text-sm mt-1">Try a different search term</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="my-meals" className="flex-1 mt-4">
                <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
                  <img 
                    src={foodBasketImage} 
                    alt="My Foods" 
                    className="w-24 h-24 mb-6 opacity-50"
                  />
                  <h3 className="text-lg font-semibold text-muted-foreground mb-2">No saved foods yet</h3>
                  <p className="text-sm text-muted-foreground">
                    Foods you save will appear here for quick access
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Selected Items */}
          {selectedItems.length > 0 && (
            <div className="border-t bg-card p-4">
              <h4 className="font-semibold mb-2">Selected Items</h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {selectedItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between bg-background rounded p-2">
                    <span className="text-sm font-medium">{item.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSelectedItem(index)}
                      className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Food Detail Modal */}
      {selectedFood && (
        <FoodDetailModal
          food={selectedFood}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedFood(null);
          }}
          onLog={handleLogFood}
        />
      )}

      {/* Custom Food Modal */}
      <CustomFoodModal
        open={isCustomFoodModalOpen}
        onOpenChange={setIsCustomFoodModalOpen}
      />
    </>
  );
};

export default MealItemSelector;