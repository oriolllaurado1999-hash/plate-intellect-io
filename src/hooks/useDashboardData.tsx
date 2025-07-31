import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface DashboardData {
  todayCalories: number;
  todayProtein: number;
  todayCarbs: number;
  todayFat: number;
  calorieGoal: number;
  weeklyCalories: Array<{
    date: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  }>;
  totalCaloriesWeek: number;
  avgCaloriesDaily: number;
}

export const useDashboardData = () => {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardData>({
    todayCalories: 0,
    todayProtein: 0,
    todayCarbs: 0,
    todayFat: 0,
    calorieGoal: 2000,
    weeklyCalories: [],
    totalCaloriesWeek: 0,
    avgCaloriesDaily: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Get user profile for calorie goal
        const { data: profile } = await supabase
          .from('profiles')
          .select('daily_calorie_goal')
          .eq('user_id', user.id)
          .single();

        const calorieGoal = profile?.daily_calorie_goal || 2000;

        // Get today's date
        const today = new Date().toISOString().split('T')[0];

        // Get today's meals
        const { data: todayMeals } = await supabase
          .from('meals')
          .select('total_calories, total_protein, total_carbs, total_fat')
          .eq('user_id', user.id)
          .eq('meal_date', today);

        // Calculate today's totals
        const todayTotals = todayMeals?.reduce(
          (acc, meal) => ({
            calories: acc.calories + (meal.total_calories || 0),
            protein: acc.protein + (meal.total_protein || 0),
            carbs: acc.carbs + (meal.total_carbs || 0),
            fat: acc.fat + (meal.total_fat || 0),
          }),
          { calories: 0, protein: 0, carbs: 0, fat: 0 }
        ) || { calories: 0, protein: 0, carbs: 0, fat: 0 };

        // Get last 7 days of data
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
        const startDate = sevenDaysAgo.toISOString().split('T')[0];

        const { data: weeklyMeals } = await supabase
          .from('meals')
          .select('meal_date, total_calories, total_protein, total_carbs, total_fat')
          .eq('user_id', user.id)
          .gte('meal_date', startDate)
          .order('meal_date');

        // Group by date and sum totals
        const dailyTotals = new Map();
        
        // Initialize all 7 days with 0 values
        for (let i = 0; i < 7; i++) {
          const date = new Date();
          date.setDate(date.getDate() - (6 - i));
          const dateStr = date.toISOString().split('T')[0];
          dailyTotals.set(dateStr, {
            date: dateStr,
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
          });
        }

        // Add actual data
        weeklyMeals?.forEach(meal => {
          const existing = dailyTotals.get(meal.meal_date) || {
            date: meal.meal_date,
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
          };
          
          dailyTotals.set(meal.meal_date, {
            ...existing,
            calories: existing.calories + (meal.total_calories || 0),
            protein: existing.protein + (meal.total_protein || 0),
            carbs: existing.carbs + (meal.total_carbs || 0),
            fat: existing.fat + (meal.total_fat || 0),
          });
        });

        const weeklyCalories = Array.from(dailyTotals.values());
        const totalCaloriesWeek = weeklyCalories.reduce((sum, day) => sum + day.calories, 0);
        const avgCaloriesDaily = Math.round(totalCaloriesWeek / 7);

        setData({
          todayCalories: Math.round(todayTotals.calories),
          todayProtein: Math.round(todayTotals.protein),
          todayCarbs: Math.round(todayTotals.carbs),
          todayFat: Math.round(todayTotals.fat),
          calorieGoal,
          weeklyCalories,
          totalCaloriesWeek: Math.round(totalCaloriesWeek),
          avgCaloriesDaily,
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  return { data, loading };
};