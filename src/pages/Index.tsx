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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img 
              src="/lovable-uploads/8d5a420d-5831-46b7-ae7a-d0a1aa371262.png" 
              alt="Kalore Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xl font-bold text-gray-900">Kalore</span>
        </div>
        <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
          <span className="text-lg">🔥</span>
          <span className="font-bold text-gray-900">0</span>
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
                    isToday ? 'border-gray-800' : 'border-gray-300'
                  }`}>
                    <span className={`text-sm font-medium ${isToday ? 'text-gray-800' : 'text-gray-400'}`}>
                      {day}
                    </span>
                  </div>
                  <span className={`text-sm font-medium ${isToday ? 'text-gray-800' : 'text-gray-400'}`}>
                    {date.getDate()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Calorie Card */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-1">
                {dashboardData.calorieGoal - dashboardData.todayCalories}
              </div>
              <div className="text-gray-600">Calories left</div>
            </div>
            <div className="w-20 h-20 relative">
              <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="2"
                />
                <path
                  d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="2"
                  strokeDasharray={`${(dashboardData.todayCalories / dashboardData.calorieGoal) * 100}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl">🔥</span>
              </div>
            </div>
          </div>
        </div>

        {/* Macro Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {/* Protein */}
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-lg font-bold text-gray-900 mb-1">
              {Math.max(0, Math.round(dashboardData.todayProtein * 4 - dashboardData.todayProtein))}g
            </div>
            <div className="text-xs text-gray-600 mb-3">Protein left</div>
            <div className="w-12 h-12 mx-auto relative">
              <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                  fill="none"
                  stroke="#f3f4f6"
                  strokeWidth="3"
                />
                <path
                  d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="3"
                  strokeDasharray="25, 100"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg">🥩</span>
              </div>
            </div>
          </div>

          {/* Carbs */}
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-lg font-bold text-gray-900 mb-1">
              {Math.max(0, Math.round(dashboardData.todayCarbs * 2.5 - dashboardData.todayCarbs))}g
            </div>
            <div className="text-xs text-gray-600 mb-3">Carbs left</div>
            <div className="w-12 h-12 mx-auto relative">
              <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                  fill="none"
                  stroke="#f3f4f6"
                  strokeWidth="3"
                />
                <path
                  d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="3"
                  strokeDasharray="40, 100"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg">🌾</span>
              </div>
            </div>
          </div>

          {/* Fat */}
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-lg font-bold text-gray-900 mb-1">
              {Math.max(0, Math.round(dashboardData.todayFat * 1.5 - dashboardData.todayFat))}g
            </div>
            <div className="text-xs text-gray-600 mb-3">Fat left</div>
            <div className="w-12 h-12 mx-auto relative">
              <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                  fill="none"
                  stroke="#f3f4f6"
                  strokeWidth="3"
                />
                <path
                  d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeDasharray="60, 100"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg">🥑</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page Indicators */}
        <div className="flex justify-center gap-2 mb-6">
          <div className="w-2 h-2 rounded-full bg-gray-800"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        </div>

        {/* Recently Uploaded */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Recently uploaded</h3>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-sm">🔔</span>
              </div>
              <div className="flex-1">
                <p className="text-gray-600 text-sm">
                  You can switch apps or turn off your phone.
                </p>
                <p className="text-gray-600 text-sm">
                  We'll notify you when the analysis is done.
                </p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <span className="text-xl">×</span>
              </button>
            </div>
          </div>
        </div>

        {/* Add Meal Section */}
        <div className="text-center">
          <p className="text-gray-500 text-sm mb-4">Tap + to add your first meal of the day</p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around items-center py-2">
          <div className="flex flex-col items-center py-2">
            <div className="w-6 h-6 mb-1">🏠</div>
            <span className="text-xs font-medium text-gray-900">Home</span>
          </div>
          <div className="flex flex-col items-center py-2">
            <div className="w-6 h-6 mb-1">📊</div>
            <span className="text-xs text-gray-400">Progress</span>
          </div>
          <div className="flex flex-col items-center py-2">
            <div className="w-6 h-6 mb-1">⚙️</div>
            <span className="text-xs text-gray-400">Settings</span>
          </div>
        </div>
      </div>

      {/* Floating Add Button */}
      <button 
        onClick={() => setShowScanner(true)}
        className="fixed bottom-20 right-4 w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center shadow-lg"
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
    </div>
  );
};

export default Index;
