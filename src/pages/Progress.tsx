import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress as ProgressBar } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { BarChart3, HelpCircle } from 'lucide-react';
import DayStreakModal from '@/components/DayStreakModal';

const Progress = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('1 month');
  const [selectedWeek, setSelectedWeek] = useState('This week');
  const [showDayStreak, setShowDayStreak] = useState(false);
  const dayStreak = 2; // This would come from user data in real app

  const periodOptions = ['1 month', '3 months', '6 months', '1 year'];
  const weekOptions = ['This week', 'Last week', '2 wks. ago', '3 wks. ago'];

  // Mock data for different periods
  const getWeightDataForPeriod = (period: string) => {
    switch (period) {
      case '1 month':
        return [
          { date: 'Aug 1', weight: 82 },
          { date: 'Aug 4', weight: 80 },
          { date: 'Aug 7', weight: 78 },
          { date: 'Aug 10', weight: 76 },
          { date: 'Aug 14', weight: 74 },
          { date: 'Aug 18', weight: 72 },
          { date: 'Aug 22', weight: 70 },
          { date: 'Aug 26', weight: 68 },
          { date: 'Aug 30', weight: 66 },
        ];
      case '3 months':
        return [
          { date: 'Jun 1', weight: 85 },
          { date: 'Jun 15', weight: 83 },
          { date: 'Jul 1', weight: 81 },
          { date: 'Jul 15', weight: 79 },
          { date: 'Aug 1', weight: 77 },
          { date: 'Aug 15', weight: 75 },
          { date: 'Aug 30', weight: 73 },
        ];
      case '6 months':
        return [
          { date: 'Mar', weight: 88 },
          { date: 'Apr', weight: 86 },
          { date: 'May', weight: 84 },
          { date: 'Jun', weight: 82 },
          { date: 'Jul', weight: 80 },
          { date: 'Aug', weight: 78 },
        ];
      case '1 year':
        return [
          { date: 'Sep 23', weight: 92 },
          { date: 'Nov 23', weight: 90 },
          { date: 'Jan 24', weight: 88 },
          { date: 'Mar 24', weight: 86 },
          { date: 'May 24', weight: 84 },
          { date: 'Jul 24', weight: 82 },
          { date: 'Aug 24', weight: 80 },
        ];
      default:
        return [];
    }
  };

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

  const currentBMI = 16.0;
  const bmiInfo = getBMIStatus(currentBMI);

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
            <Badge variant="secondary" className="text-xs">0% of goal</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weightData}>
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  domain={[50, 90]}
                />
                <Line 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="hsl(var(--foreground))" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <p className="text-sm text-green-700 font-medium">
              Getting started is the hardest part. You're ready for this!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Week Selection */}
      <div className="flex gap-2 bg-muted rounded-lg p-1">
        {weekOptions.map((week) => (
          <Button
            key={week}
            variant={selectedWeek === week ? "default" : "ghost"}
            size="sm"
            className={`flex-1 text-xs ${
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
          <CardTitle className="text-lg">Total Calories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12">
            <BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No data to show</h3>
            <p className="text-sm text-muted-foreground text-center">
              This will update as you log more food.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* BMI Section */}
      <Card className="shadow-lg dark:shadow-xl">
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
                style={{ left: `${(currentBMI / 40) * 100}%` }}
              />
            </div>
            
            <div className="flex justify-between text-xs">
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
    </div>
  );
};

export default Progress;