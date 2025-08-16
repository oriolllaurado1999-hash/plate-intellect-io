import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress as ProgressBar } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { BarChart3, HelpCircle } from 'lucide-react';
import DayStreakModal from '@/components/DayStreakModal';
import BMIDetailModal from '@/components/BMIDetailModal';

const Progress = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('1 month');
  const [selectedWeek, setSelectedWeek] = useState('This week');
  const [showDayStreak, setShowDayStreak] = useState(false);
  const [showBMIDetail, setShowBMIDetail] = useState(false);
  const dayStreak = 2; // This would come from user data in real app

  const periodOptions = ['1 month', '3 months', '6 months', '1 year'];
  const weekOptions = ['This week', 'Last week', '2 weeks', '1 month'];

  // Mock data for different periods with exactly 5 data points
  const getWeightDataForPeriod = (period: string) => {
    switch (period) {
      case '1 month':
        return [
          { date: 'Aug 1', weight: 82 },
          { date: 'Aug 8', weight: 80 },
          { date: 'Aug 15', weight: 78 },
          { date: 'Aug 22', weight: 76 },
          { date: 'Aug 30', weight: 74 },
        ];
      case '3 months':
        return [
          { date: 'Jun 1', weight: 85 },
          { date: 'Jun 30', weight: 83 },
          { date: 'Jul 15', weight: 81 },
          { date: 'Aug 1', weight: 79 },
          { date: 'Aug 30', weight: 77 },
        ];
      case '6 months':
        return [
          { date: 'Mar 1', weight: 88 },
          { date: 'Apr 15', weight: 86 },
          { date: 'Jun 1', weight: 84 },
          { date: 'Jul 15', weight: 82 },
          { date: 'Aug 30', weight: 80 },
        ];
      case '1 year':
        return [
          { date: 'Sep', weight: 92 },
          { date: 'Dec', weight: 90 },
          { date: 'Mar', weight: 88 },
          { date: 'Jun', weight: 86 },
          { date: 'Aug', weight: 84 },
        ];
      default:
        return [];
    }
  };

  // Mock data for different weeks
  const getWeeklyCalorieData = (week: string) => {
    const baseData = {
      'This week': [
        { day: 'Sun', calories: 0, protein: 0, carbs: 0, fat: 0 },
        { day: 'Mon', calories: 0, protein: 0, carbs: 0, fat: 0 },
        { day: 'Tue', calories: 0, protein: 0, carbs: 0, fat: 0 },
        { day: 'Wed', calories: 0, protein: 0, carbs: 0, fat: 0 },
        { day: 'Thu', calories: 0, protein: 0, carbs: 0, fat: 0 },
        { day: 'Fri', calories: 1224, protein: 89, carbs: 156, fat: 45 },
        { day: 'Sat', calories: 0, protein: 0, carbs: 0, fat: 0 },
      ],
      'Last week': [
        { day: 'Sun', calories: 1850, protein: 125, carbs: 200, fat: 65 },
        { day: 'Mon', calories: 1920, protein: 140, carbs: 180, fat: 70 },
        { day: 'Tue', calories: 1680, protein: 110, carbs: 190, fat: 55 },
        { day: 'Wed', calories: 2100, protein: 150, carbs: 220, fat: 80 },
        { day: 'Thu', calories: 1750, protein: 115, carbs: 185, fat: 60 },
        { day: 'Fri', calories: 1950, protein: 135, carbs: 205, fat: 75 },
        { day: 'Sat', calories: 1600, protein: 105, carbs: 170, fat: 50 },
      ],
      '2 weeks': [
        { day: 'Sun', calories: 1720, protein: 120, carbs: 175, fat: 58 },
        { day: 'Mon', calories: 1890, protein: 130, carbs: 195, fat: 68 },
        { day: 'Tue', calories: 1650, protein: 108, carbs: 182, fat: 52 },
        { day: 'Wed', calories: 2000, protein: 145, carbs: 210, fat: 78 },
        { day: 'Thu', calories: 1780, protein: 118, carbs: 188, fat: 62 },
        { day: 'Fri', calories: 1920, protein: 132, carbs: 198, fat: 72 },
        { day: 'Sat', calories: 1580, protein: 102, carbs: 168, fat: 48 },
      ],
      '1 month': [
        { day: 'Sun', calories: 1800, protein: 115, carbs: 185, fat: 60 },
        { day: 'Mon', calories: 1950, protein: 135, carbs: 200, fat: 70 },
        { day: 'Tue', calories: 1700, protein: 110, carbs: 180, fat: 55 },
        { day: 'Wed', calories: 2050, protein: 148, carbs: 215, fat: 78 },
        { day: 'Thu', calories: 1820, protein: 122, carbs: 190, fat: 65 },
        { day: 'Fri', calories: 1900, protein: 128, carbs: 195, fat: 68 },
        { day: 'Sat', calories: 1650, protein: 108, carbs: 175, fat: 52 },
      ]
    };
    return baseData[week as keyof typeof baseData] || baseData['This week'];
  };

  const weeklyCalorieData = getWeeklyCalorieData(selectedWeek);
  const totalWeeklyCalories = weeklyCalorieData.reduce((sum, day) => sum + day.calories, 0);
  const maxDailyCalories = Math.max(...weeklyCalorieData.map(d => d.calories));
  const weightData = getWeightDataForPeriod(selectedPeriod);

  // Streak data for the current week
  const currentWeek = [
    { day: 'M', completed: true },
    { day: 'T', completed: true },
    { day: 'W', completed: false },
    { day: 'T', completed: false },
    { day: 'F', completed: false },
    { day: 'S', completed: false },
    { day: 'S', completed: false },
  ];

  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return { status: 'Underweight', color: 'bg-blue-500' };
    if (bmi < 25) return { status: 'Healthy', color: 'bg-green-500' };
    if (bmi < 30) return { status: 'Overweight', color: 'bg-yellow-500' };
    return { status: 'Obese', color: 'bg-red-500' };
  };

  // User weight data (this would come from user profile/onboarding)
  const currentWeight = 55; // kg
  const goalWeight = 75; // kg
  const startingWeight = 82; // kg (from onboarding or first entry)
  const userHeight = 1.75; // meters (this would come from user profile/onboarding)
  
  // Calculate Y-axis domain and ticks (always 5 numbers from starting weight to goal weight)
  const yAxisMin = Math.min(startingWeight, goalWeight); // 75
  const yAxisMax = Math.max(startingWeight, goalWeight); // 82
  const yAxisTicks = [75, 76.75, 78.5, 80.25, 82]; // Fixed positions
  
  // Calculate progress percentage towards goal
  const calculateGoalProgress = () => {
    if (Math.abs(startingWeight - goalWeight) < 0.1) return 100;
    
    const totalWeightChange = Math.abs(startingWeight - goalWeight);
    const currentWeightChange = Math.abs(startingWeight - currentWeight);
    const progress = (currentWeightChange / totalWeightChange) * 100;
    
    return Math.min(Math.round(progress), 100);
  };
  
  const goalProgress = calculateGoalProgress();

  // Calculate BMI: weight (kg) / height (m)²
  const currentBMI = Math.round((currentWeight / (userHeight * userHeight)) * 10) / 10;
  const bmiInfo = getBMIStatus(currentBMI);
  
  // Calculate BMI position on scale (BMI range: 15-40)
  const bmiMinRange = 15;
  const bmiMaxRange = 40;
  const bmiPosition = Math.min(Math.max(((currentBMI - bmiMinRange) / (bmiMaxRange - bmiMinRange)) * 100, 0), 100);

  return (
    <div className="min-h-screen" style={{ background: 'var(--kalore-gradient)' }}>
      <div className="container mx-auto px-4 py-6 max-w-lg space-y-6">
      {/* Header */}
      <div className="text-left">
        <h1 className="text-3xl font-bold text-foreground">Progress</h1>
      </div>

      {/* Weight and Streak Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="shadow-lg dark:shadow-xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">My Weight</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">55 kg</div>
            <p className="text-sm text-muted-foreground mb-2">Goal 75 kg</p>
            <p className="text-sm text-muted-foreground">Next weigh-in: 7d</p>
          </CardContent>
        </Card>

        <Card 
          className="shadow-lg dark:shadow-xl cursor-pointer hover:shadow-xl dark:hover:shadow-2xl transition-shadow"
          onClick={() => setShowDayStreak(true)}
        >
          <CardContent className="space-y-4 pt-6">
            <div className="flex flex-col items-center">
              <img 
                src="/lovable-uploads/7d142eb3-f8e4-4a19-9101-57f54c233e78.png" 
                alt="Fire icon" 
                className="w-16 h-16 object-contain mb-2"
              />
              <div className="text-2xl font-bold">{dayStreak} days</div>
            </div>
            <div className="flex justify-center gap-0.5 px-1">
              {currentWeek.map((day, index) => (
                <div key={index} className="flex items-center justify-center">
                  <div 
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      day.completed 
                        ? 'bg-orange-400/70 border-orange-400/70' 
                        : 'border-dashed border-muted-foreground/40'
                    }`}
                  >
                    <span className={`text-[8px] font-medium ${
                      day.completed ? 'text-white' : 'text-muted-foreground'
                    }`}>
                      {day.day}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Period Selection */}
      <div className="flex gap-2 bg-muted rounded-lg p-1">
        {periodOptions.map((period) => (
          <Button
            key={period}
            variant={selectedPeriod === period ? "default" : "ghost"}
            size="sm"
            className={`flex-1 text-xs ${
              selectedPeriod === period 
                ? 'bg-background text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setSelectedPeriod(period)}
          >
            {period}
          </Button>
        ))}
      </div>

      {/* Goal Progress Chart */}
      <Card className="shadow-lg dark:shadow-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Goal Progress</CardTitle>
            <Badge variant="secondary" className="text-xs">{goalProgress}% of goal</Badge>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center px-2">
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
               <LineChart data={weightData}>
                <defs>
                  <linearGradient id="weightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#4AD4B2" />
                    <stop offset="100%" stopColor="#D44949" />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  interval={0}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  domain={[75, 82]}
                  ticks={[75, 76.75, 78.5, 80.25, 82]}
                  type="number"
                  allowDataOverflow={true}
                  allowDecimals={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="url(#weightGradient)" 
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 mb-4 mx-4 p-3 rounded-lg" style={{ backgroundColor: 'rgba(74, 212, 178, 0.15)' }}>
            <p className="text-sm font-medium" style={{ color: '#4AD4B2' }}>
              Getting started is the hardest part. You're ready for this!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Week Selection */}
      <div className="flex gap-1 bg-muted rounded-lg p-1">
        {weekOptions.map((week) => (
          <Button
            key={week}
            variant={selectedWeek === week ? "default" : "ghost"}
            size="sm"
            className={`flex-1 text-xs px-2 ${
              selectedWeek === week 
                ? 'bg-background text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setSelectedWeek(week)}
          >
            {week}
          </Button>
        ))}
      </div>

      {/* Total Calories */}
      <Card className="shadow-lg dark:shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center justify-between">
            <span>Total Calories</span>
            <span className="text-2xl font-bold">{totalWeeklyCalories.toLocaleString()}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Daily calorie bars */}
          <div className="h-32 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyCalorieData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                  domain={[0, maxDailyCalories || 1500]}
                />
                <Bar dataKey="calories" radius={[4, 4, 0, 0]}>
                  {weeklyCalorieData.map((entry, index) => {
                    const total = entry.protein + entry.carbs + entry.fat;
                    return (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.calories > 0 ? "hsl(var(--primary))" : "hsl(var(--muted))"}
                      />
                    );
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Stacked macro bars for each day */}
          <div className="space-y-2 mb-4">
            {weeklyCalorieData.map((day, index) => {
              const total = day.protein + day.carbs + day.fat;
              const proteinPercent = total > 0 ? (day.protein / total) * 100 : 0;
              const carbsPercent = total > 0 ? (day.carbs / total) * 100 : 0;
              const fatPercent = total > 0 ? (day.fat / total) * 100 : 0;
              
              return (
                <div key={day.day} className="flex items-center gap-2">
                  <span className="text-xs w-8 text-center font-medium">{day.day}</span>
                  <div className="flex-1 h-4 bg-muted rounded-sm overflow-hidden flex">
                    {total > 0 && (
                      <>
                        <div 
                          className="h-full bg-red-400" 
                          style={{ width: `${proteinPercent}%` }} 
                        />
                        <div 
                          className="h-full bg-orange-400" 
                          style={{ width: `${carbsPercent}%` }} 
                        />
                        <div 
                          className="h-full bg-blue-400" 
                          style={{ width: `${fatPercent}%` }} 
                        />
                      </>
                    )}
                  </div>
                  <span className="text-xs w-12 text-right text-muted-foreground">
                    {day.calories > 0 ? day.calories : ''}
                  </span>
                </div>
              );
            })}
          </div>
          
          {/* Legend */}
          <div className="flex justify-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <span>Protein</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-orange-400" />
              <span>Carbs</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-blue-400" />
              <span>Fats</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* BMI Section */}
      <Card 
        className="shadow-lg dark:shadow-xl cursor-pointer hover:shadow-xl dark:hover:shadow-2xl transition-shadow"
        onClick={() => setShowBMIDetail(true)}
      >
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Your BMI</CardTitle>
            <HelpCircle className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-4xl font-bold">{currentBMI}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Your weight is</span>
              <Badge className="bg-blue-500 text-white">
                {bmiInfo.status}
              </Badge>
            </div>
          </div>
          
          {/* BMI Scale */}
          <div className="space-y-3">
            <div className="h-2 bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 to-red-500 rounded-full relative">
              <div 
                className="absolute w-1 h-6 bg-foreground rounded-full -top-2"
                style={{ left: `${bmiPosition}%` }}
              />
            </div>
            
            <div className="flex justify-between text-[10px]">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Underweight</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Healthy</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>Overweight</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Obese</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
      
      {/* Day Streak Modal */}
      <DayStreakModal 
        isOpen={showDayStreak}
        onClose={() => setShowDayStreak(false)}
        streakCount={dayStreak}
      />
      
      {/* BMI Detail Modal */}
      <BMIDetailModal 
        isOpen={showBMIDetail}
        onClose={() => setShowBMIDetail(false)}
        bmi={currentBMI}
        bmiStatus={bmiInfo}
        bmiPosition={bmiPosition}
      />
    </div>
  );
};

export default Progress;