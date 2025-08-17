import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Camera, Flame, Drumstick, Wheat, Droplet } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from '@/hooks/useTranslation';
import FoodNutritionDetail from './FoodNutritionDetail';

interface RecentMeal {
  id: string;
  name: string;
  meal_type: string;
  total_calories: number;
  total_protein: number;
  total_carbs: number;
  total_fat: number;
  created_at: string;
  image_url?: string;
}

export default function RecentMeals() {
  const [recentMeals, setRecentMeals] = useState<RecentMeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMeal, setSelectedMeal] = useState<any>(null);
  const { user } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchRecentMeals = async () => {
      if (!user) return;

      try {
        // Get today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split('T')[0];
        
        const { data, error } = await supabase
          .from('meals')
          .select('id, name, meal_type, total_calories, total_protein, total_carbs, total_fat, created_at, image_url')
          .eq('user_id', user.id)
          .eq('meal_date', today)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setRecentMeals(data || []);
      } catch (error) {
        console.error('Error fetching recent meals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentMeals();
  }, [user]);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit',
      minute: '2-digit',
      hour12: false 
    });
  };

  const getMealTypeColor = (mealType: string) => {
    switch (mealType.toLowerCase()) {
      case 'breakfast': return 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200';
      case 'lunch': return `bg-[#4AD4B2] text-white`;
      case 'dinner': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200';
      case 'snack': return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock className="h-5 w-5 text-primary" />
            {t.recentlyUploaded}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg animate-pulse">
                <div className="w-12 h-12 bg-muted rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
                <div className="h-6 bg-muted rounded w-16"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="h-5 w-5 text-primary" />
          {t.recentlyUploaded}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {recentMeals.length === 0 ? (
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Camera className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">{t.noRecentMeals}</p>
            <p className="text-sm text-muted-foreground mt-1">{t.startScanning}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentMeals.map((meal) => (
              <div
                key={meal.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => setSelectedMeal(meal)}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center overflow-hidden">
                  {meal.image_url ? (
                    <img 
                      src={meal.image_url} 
                      alt={meal.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera className="h-6 w-6 text-primary" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{meal.name}</h4>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs text-muted-foreground">
                      {formatTime(meal.created_at)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1">
                      <Flame className="h-3 w-3 text-orange-500" />
                      <span className="text-xs font-medium">{Math.round(meal.total_calories)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Drumstick className="h-3 w-3 text-red-500" />
                      <span className="text-xs">{Math.round(meal.total_protein)}g</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Wheat className="h-3 w-3 text-yellow-500" />
                      <span className="text-xs">{Math.round(meal.total_carbs)}g</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Droplet className="h-3 w-3 text-blue-500" />
                      <span className="text-xs">{Math.round(meal.total_fat)}g</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      {/* Food Nutrition Detail Modal */}
      {selectedMeal && (
        <FoodNutritionDetail
          analysis={{
            foods: [{
              name: selectedMeal.name,
              quantity: 1,
              calories: selectedMeal.total_calories || 0,
              protein: selectedMeal.total_protein || 0,
              carbs: selectedMeal.total_carbs || 0,
              fat: selectedMeal.total_fat || 0,
              fiber: 0,
              confidence: 0.8
            }],
            overall_confidence: 0.8,
            meal_name: selectedMeal.name
          }}
          imageUrl={selectedMeal.image_url || ''}
          onClose={() => setSelectedMeal(null)}
        />
      )}
    </Card>
  );
}