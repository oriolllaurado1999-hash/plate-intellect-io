import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface DateDashboardData {
  todayCalories: number;
  todayProtein: number;
  todayCarbs: number;
  todayFat: number;
  totalCaloriesWeek: number;
  avgCaloriesDaily: number;
  calorieGoal: number;
  weeklyCalories: Array<{ date: string; calories: number; protein: number; carbs: number; fat: number }>;
}

export const useDateDashboard = (selectedDate: Date) => {
  const [data, setData] = useState<DateDashboardData>({
    todayCalories: 0,
    todayProtein: 0,
    todayCarbs: 0,
    todayFat: 0,
    totalCaloriesWeek: 0,
    avgCaloriesDaily: 0,
    calorieGoal: 2000,
    weeklyCalories: []
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        // Get user profile for calorie goal
        const { data: profile } = await supabase
          .from('profiles')
          .select('daily_calorie_goal')
          .eq('user_id', user.id)
          .single();

        const calorieGoal = profile?.daily_calorie_goal || 2000;

        // Format selected date for database query
        const dateStr = selectedDate.toISOString().split('T')[0];

        // Get selected date's meals
        const { data: todayMeals } = await supabase
          .from('meals')
          .select('total_calories, total_protein, total_carbs, total_fat')
          .eq('user_id', user.id)
          .eq('meal_date', dateStr);

        // Calculate today's totals
        const todayTotals = todayMeals?.reduce((acc, meal) => ({
          calories: acc.calories + (meal.total_calories || 0),
          protein: acc.protein + (meal.total_protein || 0),
          carbs: acc.carbs + (meal.total_carbs || 0),
          fat: acc.fat + (meal.total_fat || 0),
        }), { calories: 0, protein: 0, carbs: 0, fat: 0 }) || { calories: 0, protein: 0, carbs: 0, fat: 0 };

        // Get last 7 days for weekly chart (including selected date)
        const endDate = new Date(selectedDate);
        const startDate = new Date(selectedDate);
        startDate.setDate(startDate.getDate() - 6);

        const { data: weekMeals } = await supabase
          .from('meals')
          .select('meal_date, total_calories, total_protein, total_carbs, total_fat')
          .eq('user_id', user.id)
          .gte('meal_date', startDate.toISOString().split('T')[0])
          .lte('meal_date', endDate.toISOString().split('T')[0]);

        // Process weekly data
        const weeklyCalories = [];
        const dailyTotals: { [key: string]: { calories: number; protein: number; carbs: number; fat: number } } = {};

        weekMeals?.forEach(meal => {
          const date = meal.meal_date;
          if (!dailyTotals[date]) {
            dailyTotals[date] = { calories: 0, protein: 0, carbs: 0, fat: 0 };
          }
          dailyTotals[date].calories += meal.total_calories || 0;
          dailyTotals[date].protein += meal.total_protein || 0;
          dailyTotals[date].carbs += meal.total_carbs || 0;
          dailyTotals[date].fat += meal.total_fat || 0;
        });

        // Create 7-day array
        for (let i = 6; i >= 0; i--) {
          const date = new Date(selectedDate);
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          const dayData = dailyTotals[dateStr] || { calories: 0, protein: 0, carbs: 0, fat: 0 };
          
          weeklyCalories.push({
            date: dateStr,
            calories: dayData.calories,
            protein: dayData.protein,
            carbs: dayData.carbs,
            fat: dayData.fat
          });
        }

        const totalCaloriesWeek = Object.values(dailyTotals).reduce((sum, day) => sum + day.calories, 0);
        const avgCaloriesDaily = totalCaloriesWeek / 7;

        setData({
          todayCalories: todayTotals.calories,
          todayProtein: todayTotals.protein,
          todayCarbs: todayTotals.carbs,
          todayFat: todayTotals.fat,
          totalCaloriesWeek,
          avgCaloriesDaily,
          calorieGoal,
          weeklyCalories
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, selectedDate]);

  return { data, loading };
};