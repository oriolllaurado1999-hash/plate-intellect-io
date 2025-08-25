import { useState } from 'react';
import { Search, ArrowLeft, Plus, Flame } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface FoodDatabaseProps {
  onClose: () => void;
}

interface FoodItem {
  name: string;
  calories: number;
  unit: string;
}

const FoodDatabase = ({ onClose }: FoodDatabaseProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const suggestedFoods: FoodItem[] = [
    { name: 'Peanut Butter', calories: 94, unit: 'tbsp' },
    { name: 'Avocado', calories: 130, unit: 'serving' },
    { name: 'Egg', calories: 74, unit: 'large' },
    { name: 'Apples', calories: 72, unit: 'medium' },
    { name: 'Spinach', calories: 7, unit: 'cup' },
    { name: 'Bananas', calories: 105, unit: 'medium' },
  ];

  const FoodItem = ({ food }: { food: FoodItem }) => (
    <div className="flex items-center justify-between p-4 bg-card rounded-lg border">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
          <Flame className="w-4 h-4 text-muted-foreground" />
        </div>
        <div>
          <h4 className="font-medium text-foreground">{food.name}</h4>
          <p className="text-sm text-muted-foreground">{food.calories} cal · {food.unit}</p>
        </div>
      </div>
      <Button size="icon" variant="ghost" className="w-8 h-8">
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
      <Button className="w-full max-w-xs">
        {buttonText}
      </Button>
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
            <TabsContent value="all" className="flex-1 m-0 p-4">
              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Describe what you ate"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 rounded-xl bg-muted border-0"
                />
              </div>

              {/* Suggestions */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground mb-4">Suggestions</h3>
                {suggestedFoods.map((food, index) => (
                  <FoodItem key={index} food={food} />
                ))}
              </div>

              {/* Bottom buttons */}
              <div className="fixed bottom-4 left-4 right-4 flex gap-3">
                <Button variant="outline" className="flex-1 h-12 rounded-xl">
                  📝 Manual Add
                </Button>
                <Button variant="outline" className="flex-1 h-12 rounded-xl">
                  🎤 Voice Log
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