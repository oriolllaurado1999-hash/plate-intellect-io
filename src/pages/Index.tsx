import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useDateDashboard } from '@/hooks/useDateDashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Camera, User, Calendar, Target, Flame, Beef, Wheat, Leaf, Bell, UtensilsCrossed, Home, BarChart3, Settings, Grape, Candy, Salad, Activity, Footprints, Heart, Droplets } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
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
import AddOptionsMenu from '@/components/AddOptionsMenu';
import ExpandedNutritionCard from '@/components/ExpandedNutritionCard';
import { useCameraContext } from '@/contexts/CameraContext';

const Index = () => {
  const { user } = useAuth();
  const { setIsCameraActive } = useCameraContext();
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
  const [showAddOptions, setShowAddOptions] = useState(false);
  const [activeCarouselSection, setActiveCarouselSection] = useState(0);

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
    setIsCameraActive(false);
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

  const handleAddButtonClick = () => {
    setShowAddOptions(true);
  };

  const handleScanFood = () => {
    setIsCameraActive(true);
    setShowScanner(true);
    setIsAnalyzing(true);
  };

  const handleCameraClose = () => {
    setIsCameraActive(false);
    setShowScanner(false);
    setIsAnalyzing(false);
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

        {/* Nutrition Carousel */}
        <Carousel 
          className="mb-6"
          setApi={(api) => {
            if (!api) return;
            
            // Set initial active section
            setActiveCarouselSection(api.selectedScrollSnap());
            
            // Listen for scroll changes
            api.on('select', () => {
              setActiveCarouselSection(api.selectedScrollSnap());
            });
          }}
        >
          <CarouselContent>
            {/* Section 1: Main Macros */}
            <CarouselItem>
              <div className="space-y-4">
                {/* Main Calorie Card */}
                <button 
                  onClick={() => setExpandedCard('calories')}
                  className="w-full bg-card rounded-2xl p-6 shadow-lg dark:shadow-xl border border-border/50 hover-scale transition-all duration-200 text-left"
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
                <div className="grid grid-cols-3 gap-3">
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
              </div>
            </CarouselItem>

            {/* Section 2: Micronutrients */}
            <CarouselItem>
              <div className="space-y-4">
                {/* Micronutrient Cards */}
                <div className="grid grid-cols-3 gap-3">
                  {/* Fiber */}
                  <div className="bg-card rounded-xl p-4 text-center shadow-md dark:shadow-lg border border-border/50">
                    <div className="text-lg font-bold text-foreground mb-1">38g</div>
                    <div className="text-xs text-muted-foreground mb-3">Fiber left</div>
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
                          stroke="#8B5FBF"
                          strokeWidth="3"
                          strokeDasharray="30, 100"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Grape className="w-4 h-4" style={{ color: '#8B5FBF' }} />
                      </div>
                    </div>
                  </div>

                  {/* Sugar */}
                  <div className="bg-card rounded-xl p-4 text-center shadow-md dark:shadow-lg border border-border/50">
                    <div className="text-lg font-bold text-foreground mb-1">96g</div>
                    <div className="text-xs text-muted-foreground mb-3">Sugar left</div>
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
                          stroke="#FF6B9D"
                          strokeWidth="3"
                          strokeDasharray="45, 100"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Candy className="w-4 h-4" style={{ color: '#FF6B9D' }} />
                      </div>
                    </div>
                  </div>

                  {/* Sodium */}
                  <div className="bg-card rounded-xl p-4 text-center shadow-md dark:shadow-lg border border-border/50">
                    <div className="text-lg font-bold text-foreground mb-1">2300mg</div>
                    <div className="text-xs text-muted-foreground mb-3">Sodium left</div>
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
                          stroke="#FFB366"
                          strokeWidth="3"
                          strokeDasharray="20, 100"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Salad className="w-4 h-4" style={{ color: '#FFB366' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Health Score Section */}
                <div className="bg-card rounded-2xl p-6 shadow-lg dark:shadow-xl border border-border/50">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-bold text-foreground">Health Score</h4>
                    <span className="text-lg font-bold text-muted-foreground">N/A</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Track a few foods to generate your health score for today. Your score reflects nutritional content and how processed your meals are.
                  </p>
                </div>
              </div>
            </CarouselItem>

            {/* Section 3: Activity & Fitness */}
            <CarouselItem>
              <div className="space-y-4">
                {/* Steps Today - Large Card */}
                <div className="bg-card rounded-xl p-6 shadow-lg dark:shadow-xl border border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-3xl font-bold text-foreground mb-1">0</div>
                      <div className="text-sm text-muted-foreground">/10,000</div>
                      <div className="text-muted-foreground">Steps today</div>
                    </div>
                    <div className="w-16 h-16 relative">
                      <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                          fill="none"
                          stroke="hsl(var(--border))"
                          strokeWidth="2"
                        />
                        <path
                          d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                          fill="none"
                          stroke="#22C55E"
                          strokeWidth="2"
                          strokeDasharray="0, 100"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Footprints className="w-5 h-5" style={{ color: '#22C55E' }} />
                      </div>
                    </div>
                  </div>
                  
                  {/* Apple Health Connect */}
                  <div className="bg-muted/50 rounded-lg p-3 flex items-center gap-3">
                    <Heart className="w-5 h-5 text-red-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Connect Apple Health to track your steps</p>
                    </div>
                  </div>
                </div>

                {/* Additional Cards Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Calories Burned */}
                  <div className="bg-card rounded-xl p-4 text-center shadow-md dark:shadow-lg border border-border/50">
                    <div className="text-2xl font-bold text-foreground mb-1">0</div>
                    <div className="text-xs text-muted-foreground mb-3">Calories burned</div>
                    <div className="w-10 h-10 mx-auto relative">
                      <Activity className="w-5 h-5" style={{ color: '#F97316' }} />
                    </div>
                  </div>

                  {/* Water Intake */}
                  <div className="bg-card rounded-xl p-4 text-center shadow-md dark:shadow-lg border border-border/50">
                    <div className="text-2xl font-bold text-foreground mb-1">0</div>
                    <div className="text-xs text-muted-foreground mb-3">ml</div>
                    <div className="w-10 h-10 mx-auto relative flex items-center justify-center">
                      <Droplets className="w-5 h-5" style={{ color: '#3B82F6' }} />
                    </div>
                    <div className="mt-2">
                      <div className="text-xs text-muted-foreground">Water</div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>

        {/* Page Indicators */}
        <div className="flex justify-center gap-2 mb-6">
          <div 
            className={`w-2 h-2 rounded-full transition-colors duration-200`}
            style={{ backgroundColor: activeCarouselSection === 0 ? '#4AD4B2' : 'hsl(var(--border))' }}
          ></div>
          <div 
            className={`w-2 h-2 rounded-full transition-colors duration-200`}
            style={{ backgroundColor: activeCarouselSection === 1 ? '#4AD4B2' : 'hsl(var(--border))' }}
          ></div>
          <div 
            className={`w-2 h-2 rounded-full transition-colors duration-200`}
            style={{ backgroundColor: activeCarouselSection === 2 ? '#4AD4B2' : 'hsl(var(--border))' }}
          ></div>
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
            onClick={handleAddButtonClick}
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


      {/* Floating Add Button - Hidden when camera is active */}
      {!showScanner && (
        <button 
          onClick={handleAddButtonClick}
          className="fixed bottom-20 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:opacity-90 transition-colors z-[60]"
          style={{ backgroundColor: '#4AD4B2' }}
        >
          <span className="text-white text-2xl">+</span>
        </button>
      )}

      {/* Add Options Menu */}
      <AddOptionsMenu
        isOpen={showAddOptions}
        onClose={() => setShowAddOptions(false)}
        onScanFood={handleScanFood}
      />

      {/* Modals */}
      {showScanner && (
        <CameraScanner
          onAnalysisComplete={handleAnalysisComplete}
          onClose={handleCameraClose}
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
