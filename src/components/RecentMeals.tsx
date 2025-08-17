import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Camera } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface RecentMeal {
  id: string;
  name: string;
  meal_type: string;
  total_calories: number;
  created_at: string;
  image_url?: string;
}

interface RecentMealsProps {
  isAnalyzing?: boolean;
  analysisProgress?: number;
}

export default function RecentMeals({ isAnalyzing = false, analysisProgress = 0 }: RecentMealsProps) {
  const [recentMeals, setRecentMeals] = useState<RecentMeal[]>([]);
  const [loading, setLoading] = useState(true);
  const [internalProgress, setInternalProgress] = useState(0);
  const { user } = useAuth();

  // Simulate analysis progress when isAnalyzing is true
  useEffect(() => {
    if (isAnalyzing) {
      const interval = setInterval(() => {
        setInternalProgress(prev => {
          if (prev >= 85) {
            clearInterval(interval);
            return 85;
          }
          return prev + Math.random() * 15 + 5; // Increment by 5-20% each time
        });
      }, 800);
      
      return () => clearInterval(interval);
    } else {
      setInternalProgress(0);
    }
  }, [isAnalyzing]);

  useEffect(() => {
    const fetchRecentMeals = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('meals')
          .select('id, name, meal_type, total_calories, created_at, image_url')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);

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
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric',
      minute: '2-digit',
      hour12: true 
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
            Recently Eaten
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
          Recently uploaded
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isAnalyzing && (
          <div className="mb-4 p-4 rounded-lg bg-muted/30 border border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/10 animate-pulse"></div>
                <Camera className="h-6 w-6 text-primary relative z-10" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground mb-2">Separating ingredients...</h4>
                <div className="space-y-2">
                  <Progress value={analysisProgress || internalProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground">We'll notify you when done!</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{Math.round(analysisProgress || internalProgress)}%</div>
              </div>
            </div>
          </div>
        )}
        
        {!isAnalyzing && recentMeals.length === 0 ? (
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Camera className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No recent meals found</p>
            <p className="text-sm text-muted-foreground mt-1">Start scanning your food!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentMeals.map((meal) => (
              <div
                key={meal.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
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
                  <div className="flex items-center gap-2 mt-1">
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${getMealTypeColor(meal.meal_type)}`}
                    >
                      {meal.meal_type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(meal.created_at)}
                    </span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-semibold text-sm">{Math.round(meal.total_calories)}</div>
                  <div className="text-xs text-muted-foreground">kcal</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}