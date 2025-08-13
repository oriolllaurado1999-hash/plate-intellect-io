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
      setLoading(true);
      
      // Simulate loading time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      try {
        // Mock data for dashboard - replace with real Supabase queries later
        const mockData = {
          todayCalories: 1847,
          todayProtein: 125,
          todayCarbs: 180,
          todayFat: 65,
          totalCaloriesWeek: 12890,
          avgCaloriesDaily: 1841,
          calorieGoal: 2000,
          weeklyCalories: [
            { date: '2024-01-15', calories: 1850, protein: 120, carbs: 185, fat: 70 },
            { date: '2024-01-16', calories: 1920, protein: 130, carbs: 190, fat: 68 },
            { date: '2024-01-17', calories: 1780, protein: 110, carbs: 170, fat: 62 },
            { date: '2024-01-18', calories: 1950, protein: 135, carbs: 195, fat: 72 },
            { date: '2024-01-19', calories: 1830, protein: 115, carbs: 175, fat: 65 },
            { date: '2024-01-20', calories: 1910, protein: 128, carbs: 188, fat: 69 },
            { date: '2024-01-21', calories: 1650, protein: 100, carbs: 160, fat: 58 },
          ]
        };

        setData(mockData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedDate]);

  return { data, loading };
};