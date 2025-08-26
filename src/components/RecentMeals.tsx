import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Camera, Flame, Beef, Wheat, Leaf } from 'lucide-react';
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
  const { t, currentLanguage } = useTranslation();

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

        // Translate meal names if not in English
        if (data && currentLanguage !== 'en') {
          const translatedMeals = await Promise.all(
            data.map(async (meal) => {
              try {
                const { data: translationData } = await supabase.functions.invoke('translate-food', {
                  body: { 
                    foodName: meal.name,
                    language: currentLanguage 
                  }
                });
                
                return {
                  ...meal,
                  name: translationData?.translatedName || meal.name
                };
              } catch (error) {
                console.error('Translation error:', error);
                return meal; // Return original if translation fails
              }
            })
          );
          setRecentMeals(translatedMeals);
        } else {
          setRecentMeals(data || []);
        }
      } catch (error) {
        console.error('Error fetching recent meals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentMeals();
  }, [user, currentLanguage]);

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
      <div>
        {/* Title outside of cards */}
        <div className="flex items-center gap-2 mb-4 px-1">
          <Clock className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">{t.recentlyUploaded}</h2>
        </div>
        
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="rounded-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-center animate-pulse">
                  <div className="w-24 h-24 bg-muted"></div>
                  <div className="flex-1 p-4 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Title outside of cards */}
      <div className="flex items-center gap-2 mb-4 px-1">
        <Clock className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">{t.recentlyUploaded}</h2>
      </div>

      {recentMeals.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Camera className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">{t.noRecentMeals}</p>
              <p className="text-sm text-muted-foreground mt-1">{t.startScanning}</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {recentMeals.map((meal) => (
            <Card 
              key={meal.id}
              className="hover:bg-muted/50 transition-colors cursor-pointer rounded-2xl overflow-hidden"
              onClick={() => setSelectedMeal(meal)}
            >
              <CardContent className="p-0">
                <div className="flex items-center">
                  {/* Large Food Image - Full Height without borders */}
                  <div className="w-24 h-24 overflow-hidden flex-shrink-0">
                    {meal.image_url ? (
                      <img 
                        src={meal.image_url} 
                        alt={meal.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                        <Camera className="h-12 w-12 text-primary" />
                      </div>
                    )}
                  </div>
                  
                  {/* Food Info */}
                  <div className="flex-1 min-w-0 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-base truncate text-foreground">{meal.name}</h4>
                      <span className="text-sm text-muted-foreground ml-2 flex-shrink-0">
                        {formatTime(meal.created_at)}
                      </span>
                    </div>
                    
                    {/* Calories prominently displayed */}
                    <div className="flex items-center gap-1 mb-3">
                      <Flame className="h-4 w-4" style={{ color: '#4AD4B2' }} />
                      <span className="font-semibold text-foreground">{Math.round(meal.total_calories)} calories</span>
                    </div>
                    
                    {/* Macronutrients with Lucide React icons */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Beef className="h-4 w-4 text-red-500" />
                        <span className="text-sm text-muted-foreground">{Math.round(meal.total_protein)}g</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Wheat className="h-4 w-4 text-orange-500" />
                        <span className="text-sm text-muted-foreground">{Math.round(meal.total_carbs)}g</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Leaf className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-muted-foreground">{Math.round(meal.total_fat)}g</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

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
    </div>
  );
}