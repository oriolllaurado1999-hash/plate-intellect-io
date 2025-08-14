import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress as ProgressBar } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { BarChart3, HelpCircle } from 'lucide-react';

const Progress = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('90 Days');
  const [selectedWeek, setSelectedWeek] = useState('This week');

  const periodOptions = ['90 Days', '6 Months', '1 Year', 'All time'];
  const weekOptions = ['This week', 'Last week', '2 wks. ago', '3 wks. ago'];

  // Mock data for the weight progress chart
  const weightData = [
    { date: 'Aug 1', weight: 82 },
    { date: 'Aug 4', weight: 78 },
    { date: 'Aug 7', weight: 71 },
    { date: 'Aug 10', weight: 65 },
    { date: 'Aug 14', weight: 55 },
  ];

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
    <div className="container mx-auto px-4 py-6 max-w-lg space-y-6">
      {/* Header */}
      <div className="text-left">
        <h1 className="text-3xl font-bold text-foreground">Progress</h1>
      </div>

      {/* Weight and Streak Cards */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">My Weight</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">55 kg</div>
            <p className="text-sm text-muted-foreground mb-2">Goal 75 kg</p>
            <p className="text-sm text-muted-foreground">Next weigh-in: 7d</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              STREAK
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-4 text-center">2 days</div>
            <div className="grid grid-cols-7 gap-2 px-2">
              {currentWeek.map((day, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div className="text-xs text-muted-foreground font-medium">{day.day}</div>
                  <div className="flex justify-center items-center h-6 w-6">
                    {day.completed ? (
                      <span className="text-sm">🔥</span>
                    ) : (
                      <div className="w-4 h-4 border-2 border-dashed border-muted-foreground/30 rounded-full"></div>
                    )}
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
      <Card>
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
      <Card>
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
      <Card>
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
  );
};

export default Progress;