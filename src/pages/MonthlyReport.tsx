import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import { Calendar, TrendingUp, Target, Award, Utensils, Clock, Apple, Droplets } from 'lucide-react';

const MonthlyReport = () => {
  // Mock data for the report
  const calorieData = [
    { week: 'Week 1', consumed: 1850, goal: 2000 },
    { week: 'Week 2', consumed: 1920, goal: 2000 },
    { week: 'Week 3', consumed: 1780, goal: 2000 },
    { week: 'Week 4', consumed: 1950, goal: 2000 },
  ];

  const macroData = [
    { name: 'Protein', value: 25, color: '#3b82f6' },
    { name: 'Carbs', value: 45, color: '#10b981' },
    { name: 'Fat', value: 30, color: '#f59e0b' },
  ];

  const healthScoreData = [
    { day: 'Day 1', score: 75 },
    { day: 'Day 7', score: 80 },
    { day: 'Day 14', score: 85 },
    { day: 'Day 21', score: 88 },
    { day: 'Day 30', score: 92 },
  ];

  const mealTimingData = [
    { meal: 'Breakfast', time: '7:30', consistency: 85 },
    { meal: 'Lunch', time: '13:00', consistency: 78 },
    { meal: 'Dinner', time: '19:45', consistency: 92 },
    { meal: 'Snacks', time: '16:00', consistency: 65 },
  ];

  const weeklyBreakdown = [
    { week: 'Week 1', calories: 12950, protein: 875, carbs: 1620, fat: 455 },
    { week: 'Week 2', calories: 13440, protein: 910, carbs: 1680, fat: 485 },
    { week: 'Week 3', calories: 12460, protein: 770, carbs: 1540, fat: 420 },
    { week: 'Week 4', calories: 13650, protein: 945, carbs: 1710, fat: 510 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">MONTHLY NUTRITION ASSESSMENT</h1>
              <p className="text-primary-foreground/80 text-lg">JANUARY 2025</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">92</div>
              <div className="text-sm text-primary-foreground/80">Health Score</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-700 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Goal Achievement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">87%</div>
              <p className="text-xs text-green-600 mt-1">27/31 days on track</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-700 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Avg Daily Calories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">1,875</div>
              <p className="text-xs text-blue-600 mt-1">-125 from goal</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-purple-700 flex items-center gap-2">
                <Apple className="h-4 w-4" />
                Food Variety
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-800">156</div>
              <p className="text-xs text-purple-600 mt-1">unique foods</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-orange-700 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Meal Consistency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-800">82%</div>
              <p className="text-xs text-orange-600 mt-1">timing adherence</p>
            </CardContent>
          </Card>
        </div>

        {/* Calorie Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Calorie Performance
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Weekly calorie consumption vs your daily goal of 2,000 calories
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={calorieData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Bar dataKey="goal" fill="#e5e7eb" name="Goal" />
                <Bar dataKey="consumed" fill="#3b82f6" name="Consumed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Macro Balance & Health Score */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="h-5 w-5" />
                Macro Balance
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Average macronutrient distribution this month
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={macroData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {macroData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-4">
                {macroData.map((macro) => (
                  <div key={macro.name} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: macro.color }}
                    />
                    <span className="text-sm">{macro.name} {macro.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Health Score Evolution
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Your nutrition quality improved throughout the month
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={healthScoreData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis domain={[60, 100]} />
                  <Area 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#10b981" 
                    fill="url(#healthGradient)" 
                  />
                  <defs>
                    <linearGradient id="healthGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <div className="text-sm font-medium text-green-800">
                  🎉 Excellent progress! You improved your health score by 17 points this month.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Meal Timing Patterns */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Meal Timing Patterns
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Your eating schedule consistency throughout the month
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mealTimingData.map((meal) => (
                <div key={meal.meal} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="font-medium">{meal.meal}</div>
                    <Badge variant="outline">Avg: {meal.time}</Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-sm text-muted-foreground">Consistency</div>
                    <Progress value={meal.consistency} className="w-24" />
                    <div className="text-sm font-medium">{meal.consistency}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Weekly Nutrition Breakdown
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Detailed view of your nutrition by week
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Week</th>
                    <th className="text-right py-2">Calories</th>
                    <th className="text-right py-2">Protein (g)</th>
                    <th className="text-right py-2">Carbs (g)</th>
                    <th className="text-right py-2">Fat (g)</th>
                    <th className="text-right py-2">Daily Avg</th>
                  </tr>
                </thead>
                <tbody>
                  {weeklyBreakdown.map((week, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-3 font-medium">{week.week}</td>
                      <td className="text-right py-3">{week.calories.toLocaleString()}</td>
                      <td className="text-right py-3">{week.protein}</td>
                      <td className="text-right py-3">{week.carbs}</td>
                      <td className="text-right py-3">{week.fat}</td>
                      <td className="text-right py-3 font-medium">
                        {Math.round(week.calories / 7).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Insights & Recommendations */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">Monthly Insights & Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg border border-blue-200">
                <h4 className="font-semibold text-green-700 mb-2">🎯 What's Working</h4>
                <ul className="text-sm space-y-1 text-green-600">
                  <li>• Consistent dinner timing (92% adherence)</li>
                  <li>• Steady health score improvement</li>
                  <li>• Good food variety (156 unique foods)</li>
                </ul>
              </div>
              <div className="p-4 bg-white rounded-lg border border-blue-200">
                <h4 className="font-semibold text-orange-700 mb-2">🔄 Areas to Improve</h4>
                <ul className="text-sm space-y-1 text-orange-600">
                  <li>• Increase daily calories by ~125</li>
                  <li>• More consistent snack timing</li>
                  <li>• Consider adding 10g more protein</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MonthlyReport;