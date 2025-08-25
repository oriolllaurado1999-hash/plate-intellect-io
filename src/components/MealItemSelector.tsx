import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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

interface MealItemSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onItemsSelected: (items: MealItem[]) => void;
}

// Mock food database
const mockFoods = [
  {
    id: '1',
    name: 'Grilled Chicken Breast',
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    fiber: 0,
    sugar: 0,
    sodium: 74,
    unit: 'g'
  },
  {
    id: '2',
    name: 'Brown Rice',
    calories: 111,
    protein: 2.6,
    carbs: 23,
    fat: 0.9,
    fiber: 1.8,
    sugar: 0.4,
    sodium: 5,
    unit: 'g'
  },
  {
    id: '3',
    name: 'Avocado',
    calories: 160,
    protein: 2,
    carbs: 8.5,
    fat: 14.7,
    fiber: 6.7,
    sugar: 0.7,
    sodium: 7,
    unit: 'piece'
  },
  {
    id: '4',
    name: 'Greek Yogurt',
    calories: 59,
    protein: 10,
    carbs: 3.6,
    fat: 0.4,
    fiber: 0,
    sugar: 3.2,
    sodium: 36,
    unit: 'g'
  },
  {
    id: '5',
    name: 'Broccoli',
    calories: 34,
    protein: 2.8,
    carbs: 7,
    fat: 0.4,
    fiber: 2.6,
    sugar: 1.5,
    sodium: 33,
    unit: 'g'
  },
  {
    id: '6',
    name: 'Salmon Fillet',
    calories: 208,
    protein: 22,
    carbs: 0,
    fat: 12,
    fiber: 0,
    sugar: 0,
    sodium: 59,
    unit: 'g'
  }
];

const MealItemSelector = ({ isOpen, onClose, onItemsSelected }: MealItemSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: { quantity: number } }>({});

  const filteredFoods = mockFoods.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleQuantityChange = (foodId: string, quantity: number) => {
    if (quantity <= 0) {
      const newSelected = { ...selectedItems };
      delete newSelected[foodId];
      setSelectedItems(newSelected);
    } else {
      setSelectedItems({
        ...selectedItems,
        [foodId]: { quantity }
      });
    }
  };

  const handleAddSelected = () => {
    const itemsToAdd: MealItem[] = Object.entries(selectedItems).map(([foodId, { quantity }]) => {
      const food = mockFoods.find(f => f.id === foodId)!;
      return {
        ...food,
        quantity
      };
    });

    onItemsSelected(itemsToAdd);
    setSelectedItems({});
    setSearchTerm('');
  };

  const selectedCount = Object.keys(selectedItems).length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md mx-auto max-h-[90vh] overflow-hidden p-0 gap-0">
        <div className="bg-card flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <button onClick={onClose} className="p-2 hover:bg-muted rounded-full">
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
            <h2 className="text-lg font-semibold text-foreground">Add Food Items</h2>
            <div className="w-9" />
          </div>

          {/* Search */}
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search food..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Food List */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-3">
              {filteredFoods.map((food) => (
                <div key={food.id} className="bg-muted rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-foreground">{food.name}</h3>
                    <div className="text-sm text-muted-foreground">
                      {food.calories} cal per {food.unit}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      P: {food.protein}g • C: {food.carbs}g • F: {food.fat}g
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {selectedItems[food.id] ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQuantityChange(food.id, selectedItems[food.id].quantity - 1)}
                            className="w-8 h-8 bg-background rounded-full flex items-center justify-center hover:bg-border transition-colors"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-medium">
                            {selectedItems[food.id].quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(food.id, selectedItems[food.id].quantity + 1)}
                            className="w-8 h-8 bg-background rounded-full flex items-center justify-center hover:bg-border transition-colors"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleQuantityChange(food.id, 1)}
                          className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          {selectedCount > 0 && (
            <div className="p-4 border-t border-border">
              <Button
                onClick={handleAddSelected}
                className="w-full"
              >
                Add {selectedCount} Item{selectedCount !== 1 ? 's' : ''}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MealItemSelector;