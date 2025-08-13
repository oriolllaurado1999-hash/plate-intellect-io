import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useDateDashboard } from '@/hooks/useDateDashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ui/theme-toggle';
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
    <div className="min-h-screen" style={{ background: 'var(--kalore-gradient)' }}>
      {/* Header */}
      <header className="px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img 
              src="/lovable-uploads/8d5a420d-5831-46b7-ae7a-d0a1aa371262.png" 
              alt="Kalore Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xl font-bold text-foreground">Kalore</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-muted px-3 py-1 rounded-full">
            <img 
              src="/lovable-uploads/64f451b3-7d36-415a-8c22-4713cf3dd73c.png" 
              alt="Fire icon" 
              className="w-5 h-5 object-contain"
            />
            <span className="font-bold text-foreground">0</span>
          </div>
          <div className="bg-muted px-1.5 py-0 rounded-full">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="px-4 pb-20">
        {/* Week Navigation */}
        <div className="py-4">
          <div className="flex justify-between items-center">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => {
              const date = new Date();
              date.setDate(date.getDate() - (new Date().getDay() - index));
              const isToday = index === new Date().getDay();
              
              return (
                <div key={index} className="text-center">
                  <div className={`w-10 h-10 rounded-full border-2 border-dashed flex items-center justify-center mb-1 ${
                    isToday ? 'border-primary' : 'border-border'
                  }`}>
                    <span className={`text-sm font-medium ${isToday ? 'text-primary' : 'text-muted-foreground'}`}>
                      {day}
                    </span>
                  </div>
                  <span className={`text-sm font-medium ${isToday ? 'text-primary' : 'text-muted-foreground'}`}>
                    {date.getDate()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Calorie Card */}
        <div className="bg-card rounded-2xl p-6 mb-6 shadow-lg border border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-4xl font-bold text-foreground mb-1">
                {dashboardData.calorieGoal - dashboardData.todayCalories}
              </div>
              <div className="text-muted-foreground">Calories left</div>
            </div>
            <div className="w-20 h-20 relative">
              <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeWidth="2"
                />
                <path
                  d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                  fill="none"
                  stroke="hsl(var(--warning))"
                  strokeWidth="2"
                  strokeDasharray={`${(dashboardData.todayCalories / dashboardData.calorieGoal) * 100}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-warning"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Macro Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {/* Protein */}
          <div className="bg-card rounded-xl p-4 text-center shadow-md border border-border/50">
            <div className="text-lg font-bold text-foreground mb-1">
              {Math.max(0, Math.round(dashboardData.todayProtein * 4 - dashboardData.todayProtein))}g
            </div>
            <div className="text-xs text-muted-foreground mb-3">Protein left</div>
            <div className="w-12 h-12 mx-auto relative">
              <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeWidth="3"
                />
                <path
                  d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                  fill="none"
                  stroke="hsl(var(--protein))"
                  strokeWidth="3"
                  strokeDasharray="25, 100"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 rounded-sm bg-protein"></div>
              </div>
            </div>
          </div>

          {/* Carbs */}
          <div className="bg-card rounded-xl p-4 text-center shadow-md border border-border/50">
            <div className="text-lg font-bold text-foreground mb-1">
              {Math.max(0, Math.round(dashboardData.todayCarbs * 2.5 - dashboardData.todayCarbs))}g
            </div>
            <div className="text-xs text-muted-foreground mb-3">Carbs left</div>
            <div className="w-12 h-12 mx-auto relative">
              <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeWidth="3"
                />
                <path
                  d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                  fill="none"
                  stroke="hsl(var(--carbs))"
                  strokeWidth="3"
                  strokeDasharray="40, 100"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 rounded-sm bg-carbs"></div>
              </div>
            </div>
          </div>

          {/* Fat */}
          <div className="bg-card rounded-xl p-4 text-center shadow-md border border-border/50">
            <div className="text-lg font-bold text-foreground mb-1">
              {Math.max(0, Math.round(dashboardData.todayFat * 1.5 - dashboardData.todayFat))}g
            </div>
            <div className="text-xs text-muted-foreground mb-3">Fat left</div>
            <div className="w-12 h-12 mx-auto relative">
              <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeWidth="3"
                />
                <path
                  d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                  fill="none"
                  stroke="hsl(var(--fat))"
                  strokeWidth="3"
                  strokeDasharray="60, 100"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-fat"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Page Indicators */}
        <div className="flex justify-center gap-2 mb-6">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <div className="w-2 h-2 rounded-full bg-border"></div>
        </div>

        {/* Recently Uploaded */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-foreground mb-4">Recently uploaded</h3>
          <div className="bg-card rounded-xl p-4 shadow-sm border border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-info"></div>
              </div>
              <div className="flex-1">
                <p className="text-muted-foreground text-sm">
                  You can switch apps or turn off your phone.
                </p>
                <p className="text-muted-foreground text-sm">
                  We'll notify you when the analysis is done.
                </p>
              </div>
              <button className="text-muted-foreground hover:text-foreground">
                <span className="text-xl">×</span>
              </button>
            </div>
          </div>
        </div>

        {/* Add Meal Section */}
        <div className="text-center">
          <p className="text-muted-foreground text-sm mb-4">Tap + to add your first meal of the day</p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="flex justify-around items-center py-2">
          <div className="flex flex-col items-center py-2">
            <div className="w-6 h-6 mb-1 bg-primary rounded-sm"></div>
            <span className="text-xs font-medium text-foreground">Home</span>
          </div>
          <div className="flex flex-col items-center py-2">
            <div className="w-6 h-6 mb-1 bg-muted rounded-sm"></div>
            <span className="text-xs text-muted-foreground">Progress</span>
          </div>
          <div className="flex flex-col items-center py-2">
            <div className="w-6 h-6 mb-1 bg-muted rounded-sm"></div>
            <span className="text-xs text-muted-foreground">Settings</span>
          </div>
        </div>
      </div>

      {/* Floating Add Button */}
      <button 
        onClick={() => setShowScanner(true)}
        className="fixed bottom-20 right-4 w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
      >
        <span className="text-primary-foreground text-2xl">+</span>
      </button>

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
