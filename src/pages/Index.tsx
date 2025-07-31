import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useDateDashboard } from '@/hooks/useDateDashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, User, Calendar, Target } from 'lucide-react';
import CameraScanner from '@/components/CameraScanner';
import NutritionReview from '@/components/NutritionReview';
import CalorieCircle from '@/components/CalorieCircle';
import MacroBreakdown from '@/components/MacroBreakdown';
import WeeklyChart from '@/components/WeeklyChart';
import StatsCards from '@/components/StatsCards';
import RecentMeals from '@/components/RecentMeals';
import DateNavigation from '@/components/DateNavigation';
import FloatingAddButton from '@/components/FloatingAddButton';
import WearableSync from '@/components/WearableSync';

const Index = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { data: dashboardData, loading } = useDateDashboard(selectedDate);
  const [showScanner, setShowScanner] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [capturedImage, setCapturedImage] = useState('');


  const handleAnalysisComplete = (analysis: any, imageUrl: string) => {
    setAnalysisData(analysis);
    setCapturedImage(imageUrl);
    setShowScanner(false);
    setShowReview(true);
  };

  const handleMealSaved = () => {
    setShowReview(false);
    setAnalysisData(null);
    setCapturedImage('');
    // Force re-fetch data by updating the date state
    setSelectedDate(new Date(selectedDate));
  };

  const handleReviewCancel = () => {
    setShowReview(false);
    setAnalysisData(null);
    setCapturedImage('');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-2">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Date Navigation */}
        <DateNavigation 
          currentDate={selectedDate}
          onDateChange={setSelectedDate}
        />

        {/* Stats Cards */}
        <StatsCards 
          totalCaloriesWeek={dashboardData.totalCaloriesWeek}
          avgCaloriesDaily={dashboardData.avgCaloriesDaily}
        />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calorie Circle */}
          <CalorieCircle 
            consumed={dashboardData.todayCalories}
            goal={dashboardData.calorieGoal}
          />

          {/* Macro Breakdown */}
          <MacroBreakdown 
            protein={dashboardData.todayProtein}
            carbs={dashboardData.todayCarbs}
            fat={dashboardData.todayFat}
          />
        </div>

        {/* Weekly Chart */}
        <WeeklyChart data={dashboardData.weeklyCalories} />

        {/* Bottom Grid - Recent Meals and Wearable */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentMeals />
          <WearableSync />
        </div>
      </div>

      {/* Floating Add Button */}
      <FloatingAddButton onClick={() => setShowScanner(true)} />

      {/* Modals */}
      {showScanner && (
        <CameraScanner
          onAnalysisComplete={handleAnalysisComplete}
          onClose={() => setShowScanner(false)}
        />
      )}

      {showReview && analysisData && (
        <NutritionReview
          analysis={analysisData}
          imageUrl={capturedImage}
          onSave={handleMealSaved}
          onCancel={handleReviewCancel}
        />
      )}
    </div>
  );
};

export default Index;
