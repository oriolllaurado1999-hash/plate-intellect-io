import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useDashboardData } from '@/hooks/useDashboardData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, User, Calendar, Target } from 'lucide-react';
import CameraScanner from '@/components/CameraScanner';
import NutritionReview from '@/components/NutritionReview';
import CalorieCircle from '@/components/CalorieCircle';
import MacroBreakdown from '@/components/MacroBreakdown';
import WeeklyChart from '@/components/WeeklyChart';
import StatsCards from '@/components/StatsCards';

const Index = () => {
  const { user } = useAuth();
  const { data: dashboardData, loading } = useDashboardData();
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
    // Refresh dashboard data
    window.location.reload();
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
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Welcome back!
          </h2>
          <p className="text-muted-foreground">
            Here's your nutrition progress for today
          </p>
        </div>

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

        {/* Quick Action - Scan Food */}
        <Card 
          className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-dashed border-primary/30 hover:border-primary/50"
          onClick={() => setShowScanner(true)}
        >
          <CardHeader className="text-center pb-2">
            <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit mb-2">
              <Camera className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-lg">Scan Food</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground">Take a photo to analyze nutrition</p>
          </CardContent>
        </Card>
      </div>

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
