import React from 'react';
import { ArrowLeft, Edit, Share, MoreHorizontal, Flame, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface MealDetailViewProps {
  meal: {
    id: string;
    name: string;
    total_calories: number;
    total_protein: number;
    total_carbs: number;
    total_fat: number;
    created_at: string;
    image_url?: string;
  };
  onClose: () => void;
}

const MealDetailView = ({ meal, onClose }: MealDetailViewProps) => {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit',
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: meal.image_url ? `url(${meal.image_url})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20" />
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

      {/* Bottom Card */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <Card className="rounded-t-3xl border-0 shadow-2xl min-h-[60vh]">
          <CardContent className="p-6 space-y-6">
            {/* Meal Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-primary rounded-full" />
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

            {/* Calories */}
            <div className="flex items-center gap-3 py-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Flame className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Calories</div>
                <div className="text-3xl font-bold text-foreground">
                  {Math.round(meal.total_calories)}
                </div>
              </div>
            </div>

            {/* Macronutrients */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-sm text-muted-foreground">Protein</span>
                </div>
                <div className="text-xl font-semibold text-foreground">
                  {Math.round(meal.total_protein)}g
                </div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <span className="text-sm text-muted-foreground">Carbs</span>
                </div>
                <div className="text-xl font-semibold text-foreground">
                  {Math.round(meal.total_carbs)}g
                </div>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-sm text-muted-foreground">Fats</span>
                </div>
                <div className="text-xl font-semibold text-foreground">
                  {Math.round(meal.total_fat)}g
                </div>
              </div>
            </div>

            {/* Page Indicators */}
            <div className="flex justify-center gap-2 py-4">
              <div className="w-2 h-2 rounded-full bg-foreground" />
              <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
            </div>

            {/* Ingredients Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Ingredients</h3>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Plus className="w-4 h-4 mr-2" />
                  Add More
                </Button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between py-3 border-b">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-muted rounded-full" />
                    <div>
                      <div className="font-medium text-foreground">{meal.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {Math.round(meal.total_calories)} cal
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">1 serving</div>
                </div>
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