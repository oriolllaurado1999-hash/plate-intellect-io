import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from '@/hooks/useTranslation';
import { useDateDashboard } from '@/hooks/useDateDashboard';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useCoachMessages } from '@/hooks/useCoachMessages';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Camera, User, Calendar, Target, Flame, Beef, Wheat, Leaf, Bell, UtensilsCrossed, Home, BarChart3, Settings, Grape, Candy, Salad, Activity, Footprints, Heart, Droplets, GlassWater } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import CameraScanner from '@/components/CameraScanner';
import FoodNutritionDetail from '@/components/FoodNutritionDetail';
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
import WaterGlass from '@/components/WaterGlass';
import ExpandedNutritionCard from '@/components/ExpandedNutritionCard';
import VirtualTrainer from '@/components/VirtualTrainer';
import { useCameraContext } from '@/contexts/CameraContext';

const Index = () => {
  const { t, currentLanguage } = useTranslation();
  const { user } = useAuth();
  const { setIsCameraActive } = useCameraContext();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { data: dashboardData, loading } = useDateDashboard(selectedDate);
  const { data: realDashboardData } = useDashboardData();
  const { generateDailyMessage, regenerateDailyMessage } = useCoachMessages();
  const [showScanner, setShowScanner] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showDayStreak, setShowDayStreak] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [capturedImage, setCapturedImage] = useState('');
  const [dayStreak] = useState(0); // This would come from user data in real app
  const [expandedCard, setExpandedCard] = useState<'calories' | 'protein' | 'carbs' | 'fat' | 'fiber' | 'sugar' | 'sodium' | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAddOptions, setShowAddOptions] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeCarouselSection, setActiveCarouselSection] = useState(0);
  const [waterConsumed, setWaterConsumed] = useState(0); // ml de agua consumida
  const [hasMealsToday, setHasMealsToday] = useState(false);

  // Mock meal data - in real app this would come from the dashboard data
  const mockMeals = [
    { name: 'Grilled Chicken Breast', amount: '150g', calories: 165, protein: 31, carbs: 0, fat: 3.6, time: '08:30' },
    { name: 'Brown Rice', amount: '100g', calories: 111, protein: 2.6, carbs: 23, fat: 0.9, time: '12:15' },
    { name: 'Avocado', amount: '1 medium', calories: 234, protein: 2.9, carbs: 12, fat: 21, time: '12:15' },
    { name: 'Greek Yogurt', amount: '200g', calories: 130, protein: 10, carbs: 9, fat: 5, time: '16:00' },
    { name: 'Almonds', amount: '30g', calories: 174, protein: 6.4, carbs: 6.1, fat: 15, time: '16:00' }
  ];

  // Health Score calculation functions
  const interpolateColor = (score: number): string => {
    // Clamp score between 1 and 10
    const clampedScore = Math.max(1, Math.min(10, score));
    
    // Convert score from 1-10 range to 0-1 range
    const normalized = (clampedScore - 1) / 9;
    
    // Red color: #D44949 (RGB: 212, 73, 73)
    // Green color: #4AD4B2 (RGB: 74, 212, 178)
    const red = Math.round(212 + (74 - 212) * normalized);
    const green = Math.round(73 + (212 - 73) * normalized);
    const blue = Math.round(73 + (178 - 73) * normalized);
    
    return `rgb(${red}, ${green}, ${blue})`;
  };

  const calculateHealthScore = (): number => {
    if (!realDashboardData) return 7; // Default score when no data
    
    const { weeklyCalories, calorieGoal } = realDashboardData;
    
    // Calculate weekly averages
    const weeklyAvg = {
      calories: weeklyCalories.reduce((sum, day) => sum + day.calories, 0) / 7,
      protein: weeklyCalories.reduce((sum, day) => sum + day.protein, 0) / 7,
      carbs: weeklyCalories.reduce((sum, day) => sum + day.carbs, 0) / 7,
      fat: weeklyCalories.reduce((sum, day) => sum + day.fat, 0) / 7,
    };
    
    // Define goals based on calorie goal (rough estimates)
    const proteinGoal = calorieGoal * 0.25 / 4; // 25% of calories from protein (4 cal/g)
    const carbsGoal = calorieGoal * 0.45 / 4; // 45% of calories from carbs (4 cal/g)
    const fatGoal = calorieGoal * 0.30 / 9; // 30% of calories from fat (9 cal/g)
    
    // Calculate compliance percentages
    const calculateCompliance = (actual: number, goal: number): number => {
      if (goal === 0) return 10; // Perfect score if no goal set
      
      const percentage = actual / goal;
      
      // Optimal range: 90-110% = 10 points
      if (percentage >= 0.9 && percentage <= 1.1) return 10;
      
      // Good range: 80-89% or 111-120% = 8 points
      if ((percentage >= 0.8 && percentage < 0.9) || (percentage > 1.1 && percentage <= 1.2)) return 8;
      
      // Fair range: 70-79% or 121-130% = 6 points
      if ((percentage >= 0.7 && percentage < 0.8) || (percentage > 1.2 && percentage <= 1.3)) return 6;
      
      // Poor range: 60-69% or 131-140% = 4 points
      if ((percentage >= 0.6 && percentage < 0.7) || (percentage > 1.3 && percentage <= 1.4)) return 4;
      
      // Very poor: <60% or >140% = 2 points
      if (percentage < 0.6 || percentage > 1.4) return 2;
      
      return 1; // Fallback
    };
    
    // Calculate weighted scores
    const calorieScore = calculateCompliance(weeklyAvg.calories, calorieGoal) * 0.4; // 40% weight
    const proteinScore = calculateCompliance(weeklyAvg.protein, proteinGoal) * 0.3; // 30% weight
    const carbsScore = calculateCompliance(weeklyAvg.carbs, carbsGoal) * 0.15; // 15% weight
    const fatScore = calculateCompliance(weeklyAvg.fat, fatGoal) * 0.15; // 15% weight
    
    // Total score
    const totalScore = calorieScore + proteinScore + carbsScore + fatScore;
    
    // Round to nearest integer and ensure it's between 1-10
    return Math.max(1, Math.min(10, Math.round(totalScore)));
  };

  const healthScore = calculateHealthScore();
  const healthScoreColor = interpolateColor(healthScore);

  // Water handling functions
  const addWater = () => {
    setWaterConsumed(prev => Math.min(prev + 250, 2000)); // Añadir 250ml, máximo 2000ml
  };

  const removeWater = () => {
    setWaterConsumed(prev => Math.max(prev - 250, 0)); // Quitar 250ml, mínimo 0ml
  };

  // Check if user has meals today
  useEffect(() => {
    const checkMealsToday = async () => {
      if (!user) return;
      
      try {
        const today = new Date().toISOString().split('T')[0];
        const { data, error } = await supabase
          .from('meals')
          .select('id')
          .eq('user_id', user.id)
          .eq('meal_date', today)
          .limit(1);
        
        if (error) throw error;
        setHasMealsToday(data && data.length > 0);
      } catch (error) {
        console.error('Error checking meals today:', error);
        setHasMealsToday(false);
      }
    };

    checkMealsToday();
  }, [user, refreshKey]);

  // Generate daily coach message when user enters the app
  useEffect(() => {
    const generateCoachMessage = async () => {
      if (user?.id && !loading) {
        try {
          const appLanguage = currentLanguage;
          await generateDailyMessage(appLanguage);
        } catch (error) {
          console.error('Error generating daily coach message:', error);
        }
      }
    };

    generateCoachMessage();
  }, [user?.id, loading, generateDailyMessage]);

  // Regenerate coach message when language changes
  useEffect(() => {
    const regenerateOnLanguageChange = async () => {
      if (user?.id && !loading && currentLanguage) {
        try {
          await regenerateDailyMessage(currentLanguage);
        } catch (error) {
          console.error('Error regenerating coach message for language change:', error);
        }
      }
    };

    regenerateOnLanguageChange();
  }, [currentLanguage, user?.id, loading, regenerateDailyMessage]);


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
    // Force re-fetch data by updating the date state and refresh key
    setSelectedDate(new Date(selectedDate));
    setRefreshKey(prev => prev + 1);
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
                      <div className="text-muted-foreground">{t.caloriesLeft}</div>
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
                    className="bg-card rounded-xl p-4 text-center shadow-lg dark:shadow-xl border border-border/50 hover-scale transition-all duration-200"
                  >
                    <div className="text-lg font-bold text-foreground mb-1">
                      {Math.max(0, Math.round(dashboardData.todayProtein * 4 - dashboardData.todayProtein))}g
                    </div>
                    <div className="text-xs text-muted-foreground mb-3">{t.proteinLeft}</div>
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
                    className="bg-card rounded-xl p-4 text-center shadow-lg dark:shadow-xl border border-border/50 hover-scale transition-all duration-200"
                  >
                    <div className="text-lg font-bold text-foreground mb-1">
                      {Math.max(0, Math.round(dashboardData.todayCarbs * 2.5 - dashboardData.todayCarbs))}g
                    </div>
                    <div className="text-xs text-muted-foreground mb-3">{t.carbsLeft}</div>
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
                    className="bg-card rounded-xl p-4 text-center shadow-lg dark:shadow-xl border border-border/50 hover-scale transition-all duration-200"
                  >
                    <div className="text-lg font-bold text-foreground mb-1">
                      {Math.max(0, Math.round(dashboardData.todayFat * 1.5 - dashboardData.todayFat))}g
                    </div>
                    <div className="text-xs text-muted-foreground mb-3">{t.fatLeft}</div>
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
                {/* Health Score Section */}
                <div className="w-full bg-card rounded-2xl p-6 shadow-lg dark:shadow-xl border border-border/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-4xl font-bold text-foreground mb-1" style={{ color: healthScoreColor }}>
                        {healthScore}
                      </div>
                      <div className="text-muted-foreground">{t.healthScore}</div>
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
                          stroke={healthScoreColor}
                          strokeWidth="2"
                          strokeDasharray={`${healthScore * 10}, 100`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Heart className="w-5 h-5" style={{ color: healthScoreColor }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Micronutrient Cards */}
                <div className="grid grid-cols-3 gap-3 pb-4">
                  {/* Fiber */}
                  <button 
                    onClick={() => setExpandedCard('fiber')}
                    className="bg-card rounded-xl p-4 text-center shadow-lg dark:shadow-xl border border-border/50 hover-scale transition-all duration-200"
                  >
                    <div className="text-lg font-bold text-foreground mb-1">38g</div>
                    <div className="text-xs text-muted-foreground mb-3">{t.fiberLeft}</div>
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
                  </button>

                  {/* Sugar */}
                  <button 
                    onClick={() => setExpandedCard('sugar')}
                    className="bg-card rounded-xl p-4 text-center shadow-lg dark:shadow-xl border border-border/50 hover-scale transition-all duration-200"
                  >
                    <div className="text-lg font-bold text-foreground mb-1">96g</div>
                    <div className="text-xs text-muted-foreground mb-3">{t.sugarLeft}</div>
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
                  </button>

                  {/* Sodium */}
                  <button 
                    onClick={() => setExpandedCard('sodium')}
                    className="bg-card rounded-xl p-4 text-center shadow-lg dark:shadow-xl border border-border/50 hover-scale transition-all duration-200"
                  >
                    <div className="text-lg font-bold text-foreground mb-1">2300mg</div>
                    <div className="text-xs text-muted-foreground mb-3">{t.sodiumLeft}</div>
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
                  </button>
                </div>
              </div>
            </CarouselItem>

            {/* Section 3: Activity & Fitness */}
            <CarouselItem>
              <div className="space-y-4">
                {/* Steps Today - Large Card */}
                <div className="w-full bg-card rounded-2xl p-6 shadow-lg dark:shadow-xl border border-border/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-4xl font-bold text-foreground mb-1">0</div>
                      <div className="text-muted-foreground">{t.stepsToday}</div>
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
                </div>

                {/* Water Intake Card */}
                <div className="w-full bg-card rounded-2xl p-6 shadow-lg dark:shadow-xl border border-border/50">
                  <div className="flex items-center gap-4">
                    {/* Large Water Icon with Dynamic Level - Left Side */}
                    <div className="flex-shrink-0">
                      <WaterGlass currentWater={waterConsumed} maxWater={2000} className="w-16 h-16" style={{ color: '#3B82F6' }} />
                    </div>
                    
                    {/* Content - Right Side */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-lg font-semibold text-foreground">{t.water}</div>
                        <button className="w-6 h-6 flex items-center justify-center">
                          <Settings className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-foreground">{waterConsumed} ml</div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={removeWater}
                            className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                          >
                            <span className="text-foreground text-lg">−</span>
                          </button>
                          <button 
                            onClick={addWater}
                            className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center hover:opacity-80 transition-opacity"
                          >
                            <span className="text-background text-lg">+</span>
                          </button>
                        </div>
                      </div>
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

        {/* Recently Uploaded and Add Meal Section */}
        <div className="mb-6">
          {/* Show Recently Uploaded only if user has meals today */}
          {hasMealsToday && (
            <RecentMeals key={refreshKey} />
          )}
          
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
          
          {/* Add First Meal Card - only shown when user has no meals today */}
          {!hasMealsToday && (
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
                <p className="text-muted-foreground text-sm">{t.tapToAddFirstMeal}</p>
              </div>
            </button>
          )}
        </div>

        {/* Virtual Trainer */}
        <div className="mb-6">
          <VirtualTrainer />
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
        <FoodNutritionDetail
          analysis={analysisData}
          imageUrl={capturedImage}
          onClose={() => {
            setShowReview(false);
            setAnalysisData(null);
            setCapturedImage('');
            setIsAnalyzing(false);
          }}
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

      <ExpandedNutritionCard
        type="fiber"
        isOpen={expandedCard === 'fiber'}
        onClose={() => setExpandedCard(null)}
        meals={mockMeals}
        totalValue={10}
        goalValue={38}
        unit="g"
        color="#8B5FBF"
        icon={<Grape className="w-4 h-4" style={{ color: '#8B5FBF' }} />}
      />

      <ExpandedNutritionCard
        type="sugar"
        isOpen={expandedCard === 'sugar'}
        onClose={() => setExpandedCard(null)}
        meals={mockMeals}
        totalValue={50}
        goalValue={96}
        unit="g"
        color="#FF6B9D"
        icon={<Candy className="w-4 h-4" style={{ color: '#FF6B9D' }} />}
      />

      <ExpandedNutritionCard
        type="sodium"
        isOpen={expandedCard === 'sodium'}
        onClose={() => setExpandedCard(null)}
        meals={mockMeals}
        totalValue={1800}
        goalValue={2300}
        unit="mg"
        color="#FFB366"
        icon={<Salad className="w-4 h-4" style={{ color: '#FFB366' }} />}
      />
    </div>
  );
};

export default Index;
