import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useDateDashboard } from '@/hooks/useDateDashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Camera, User, Calendar, Target, Flame, Beef, Wheat, Leaf, Bell, UtensilsCrossed, Home, BarChart3, Settings } from 'lucide-react';
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
import DayStreakModal from '@/components/DayStreakModal';
import ExpandedNutritionCard from '@/components/ExpandedNutritionCard';

const Index = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { data: dashboardData, loading } = useDateDashboard(selectedDate);
  const [showScanner, setShowScanner] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showDayStreak, setShowDayStreak] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [capturedImage, setCapturedImage] = useState('');
  const [dayStreak] = useState(0); // This would come from user data in real app
  const [expandedCard, setExpandedCard] = useState<'calories' | 'protein' | 'carbs' | 'fat' | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mock meal data - in real app this would come from the dashboard data
  const mockMeals = [
    { name: 'Grilled Chicken Breast', amount: '150g', calories: 165, protein: 31, carbs: 0, fat: 3.6, time: '08:30' },
    { name: 'Brown Rice', amount: '100g', calories: 111, protein: 2.6, carbs: 23, fat: 0.9, time: '12:15' },
    { name: 'Avocado', amount: '1 medium', calories: 234, protein: 2.9, carbs: 12, fat: 21, time: '12:15' },
    { name: 'Greek Yogurt', amount: '200g', calories: 130, protein: 10, carbs: 9, fat: 5, time: '16:00' },
    { name: 'Almonds', amount: '30g', calories: 174, protein: 6.4, carbs: 6.1, fat: 15, time: '16:00' }
  ];


  const handleAnalysisComplete = (analysis: any, imageUrl: string) => {
    setIsAnalyzing(false);
    setAnalysisData(analysis);
    setCapturedImage(imageUrl);
    setShowScanner(false);
    setShowReview(true);
  };

  const handleMealSaved = () => {
    setShowReview(false);
    setAnalysisData(null);
    setCapturedImage('');
    setIsAnalyzing(false);
    // Force re-fetch data by updating the date state
    setSelectedDate(new Date(selectedDate));
  };

  const handleReviewCancel = () => {
    setShowReview(false);
    setAnalysisData(null);
    setCapturedImage('');
    setIsAnalyzing(false);
  };

  const handleScannerOpen = () => {
    setShowScanner(true);
    setIsAnalyzing(true);
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
          <button 
            onClick={() => setShowDayStreak(true)}
            className="flex items-center gap-1 bg-card px-3 py-1 rounded-full hover:bg-card/90 transition-colors shadow-md dark:shadow-lg"
          >
            <img 
              src="/lovable-uploads/7d142eb3-f8e4-4a19-9101-57f54c233e78.png" 
              alt="Fire icon" 
              className="w-5 h-5 object-contain fire-emoji"
            />
            <span className="font-bold text-foreground">{dayStreak}</span>
          </button>
          <div className="bg-card px-1.5 py-0 rounded-full shadow-md dark:shadow-lg">
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
                    isToday ? '' : 'border-border'
                  }`}
                  style={isToday ? { borderColor: '#4AD4B2' } : {}}>
                    <span className={`text-sm font-medium ${isToday ? '' : 'text-muted-foreground'}`}
                    style={isToday ? { color: '#4AD4B2' } : {}}>
                      {day}
                    </span>
                  </div>
                  <span className={`text-sm font-medium ${isToday ? '' : 'text-muted-foreground'}`}
                  style={isToday ? { color: '#4AD4B2' } : {}}>
                    {date.getDate()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Calorie Card */}
        <button 
          onClick={() => setExpandedCard('calories')}
          className="w-full bg-card rounded-2xl p-6 mb-6 shadow-lg dark:shadow-xl border border-border/50 hover-scale transition-all duration-200 text-left"
        >
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
                  stroke="#4AD4B2"
                  strokeWidth="2"
                  strokeDasharray={`${(dashboardData.todayCalories / dashboardData.calorieGoal) * 100}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Flame className="w-5 h-5" style={{ color: '#4AD4B2' }} />
              </div>
            </div>
          </div>
        </button>

        {/* Macro Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {/* Protein */}
          <button 
            onClick={() => setExpandedCard('protein')}
            className="bg-card rounded-xl p-4 text-center shadow-md dark:shadow-lg border border-border/50 hover-scale transition-all duration-200"
          >
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
                <Beef className="w-4 h-4 text-protein" />
              </div>
            </div>
          </button>

          {/* Carbs */}
          <button 
            onClick={() => setExpandedCard('carbs')}
            className="bg-card rounded-xl p-4 text-center shadow-md dark:shadow-lg border border-border/50 hover-scale transition-all duration-200"
          >
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
                <Wheat className="w-4 h-4 text-carbs" />
              </div>
            </div>
          </button>

          {/* Fat */}
          <button 
            onClick={() => setExpandedCard('fat')}
            className="bg-card rounded-xl p-4 text-center shadow-md dark:shadow-lg border border-border/50 hover-scale transition-all duration-200"
          >
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
                <Leaf className="w-4 h-4 text-fat" />
              </div>
            </div>
          </button>
        </div>

        {/* Page Indicators */}
        <div className="flex justify-center gap-2 mb-6">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <div className="w-2 h-2 rounded-full bg-border"></div>
        </div>

        {/* Recently Uploaded */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-foreground mb-4">Recently uploaded</h3>
          
          {/* Analysis in progress card - only shown when analyzing */}
          {isAnalyzing && (
            <div className="bg-card rounded-xl p-4 shadow-lg dark:shadow-xl border border-border/50 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <Bell className="w-4 h-4 text-info" />
                </div>
                <div className="flex-1">
                  <p className="text-muted-foreground text-sm">
                    Analysis in progress. We'll notify you when done.
                  </p>
                </div>
                <button className="text-muted-foreground hover:text-foreground">
                  <span className="text-xl">×</span>
                </button>
              </div>
            </div>
          )}
          
          {/* Add Meal Card */}
          <button 
            onClick={handleScannerOpen}
            className="w-full bg-card rounded-xl p-4 shadow-lg dark:shadow-xl border border-border/50 hover:shadow-xl transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                <UtensilsCrossed className="w-6 h-6 text-muted-foreground" />
              </div>
              <div className="flex-1 text-left">
                <div className="w-24 h-3 bg-muted rounded mb-2"></div>
                <div className="w-16 h-3 bg-muted rounded"></div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-muted-foreground text-sm">Tap + to add your first meal of the day</p>
            </div>
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border dark:shadow-2xl">
        <div className="flex justify-around items-center py-3">
          <div className="flex flex-col items-center py-2">
            <Home className="w-5 h-5 mb-1 text-foreground" />
            <span className="text-xs font-medium text-foreground">Home</span>
          </div>
          <div className="flex flex-col items-center py-2">
            <BarChart3 className="w-5 h-5 mb-1 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Progress</span>
          </div>
          <div className="flex flex-col items-center py-2">
            <Settings className="w-5 h-5 mb-1 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Settings</span>
          </div>
        </div>
      </div>

      {/* Floating Add Button */}
      <button 
        onClick={handleScannerOpen}
        className="fixed bottom-20 right-4 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:opacity-90 transition-colors"
        style={{ backgroundColor: '#4AD4B2' }}
      >
        <span className="text-white text-2xl">+</span>
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

      <DayStreakModal 
        isOpen={showDayStreak}
        onClose={() => setShowDayStreak(false)}
        streakCount={dayStreak}
      />

      {/* Expanded Nutrition Cards */}
      <ExpandedNutritionCard
        type="calories"
        isOpen={expandedCard === 'calories'}
        onClose={() => setExpandedCard(null)}
        meals={mockMeals}
        totalValue={dashboardData.todayCalories}
        goalValue={dashboardData.calorieGoal}
        unit=""
        color="#4AD4B2"
        icon={<Flame className="w-5 h-5" style={{ color: '#4AD4B2' }} />}
      />

      <ExpandedNutritionCard
        type="protein"
        isOpen={expandedCard === 'protein'}
        onClose={() => setExpandedCard(null)}
        meals={mockMeals}
        totalValue={dashboardData.todayProtein}
        goalValue={dashboardData.todayProtein * 4}
        unit="g"
        color="hsl(var(--protein))"
        icon={<Beef className="w-4 h-4 text-protein" />}
      />

      <ExpandedNutritionCard
        type="carbs"
        isOpen={expandedCard === 'carbs'}
        onClose={() => setExpandedCard(null)}
        meals={mockMeals}
        totalValue={dashboardData.todayCarbs}
        goalValue={dashboardData.todayCarbs * 2.5}
        unit="g"
        color="hsl(var(--carbs))"
        icon={<Wheat className="w-4 h-4 text-carbs" />}
      />

      <ExpandedNutritionCard
        type="fat"
        isOpen={expandedCard === 'fat'}
        onClose={() => setExpandedCard(null)}
        meals={mockMeals}
        totalValue={dashboardData.todayFat}
        goalValue={dashboardData.todayFat * 1.5}
        unit="g"
        color="hsl(var(--fat))"
        icon={<Leaf className="w-4 h-4 text-fat" />}
      />
    </div>
  );
};

export default Index;
