import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

interface WeeklyChartProps {
  data: Array<{
    date: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  }>;
}

const WeeklyChart = ({ data }: WeeklyChartProps) => {
  const formatData = data.map((item, index) => {
    const date = new Date(item.date);
    const dayName = date.toLocaleDateString('en', { weekday: 'short' });
    
    return {
      day: dayName,
      calories: item.calories,
      protein: item.protein,
      carbs: item.carbs,
      fat: item.fat,
      isToday: index === data.length - 1, // Last item is today
    };
  });

  const maxCalories = Math.max(...formatData.map(d => d.calories), 2500);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Weekly Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={formatData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                className="text-xs"
              />
              <YAxis hide />
              <Bar dataKey="calories" radius={[4, 4, 0, 0]}>
                {formatData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.isToday ? "hsl(var(--primary))" : "hsl(var(--muted))"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Stacked macro bars */}
        <div className="mt-4 space-y-2">
          {formatData.map((day, index) => {
            const total = day.protein + day.carbs + day.fat;
            const proteinPercent = total > 0 ? (day.protein / total) * 100 : 0;
            const carbsPercent = total > 0 ? (day.carbs / total) * 100 : 0;
            const fatPercent = total > 0 ? (day.fat / total) * 100 : 0;
            
            return (
              <div key={day.day} className="flex items-center gap-2">
                <span className="text-xs w-8 text-center font-medium">{day.day}</span>
                <div className="flex-1 h-6 bg-muted rounded-sm overflow-hidden flex">
                  <div 
                    className="h-full" 
                    style={{ 
                      width: `${proteinPercent}%`, 
                      backgroundColor: 'hsl(var(--protein))' 
                    }} 
                  />
                  <div 
                    className="h-full" 
                    style={{ 
                      width: `${carbsPercent}%`, 
                      backgroundColor: 'hsl(var(--carbs))' 
                    }} 
                  />
                  <div 
                    className="h-full" 
                    style={{ 
                      width: `${fatPercent}%`, 
                      backgroundColor: 'hsl(var(--fat))' 
                    }} 
                  />
                </div>
                <span className="text-xs w-12 text-right">{day.calories}</span>
              </div>
            );
          })}
        </div>
        
        {/* Legend */}
        <div className="flex justify-center gap-4 mt-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(var(--protein))' }} />
            <span>Protein</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(var(--carbs))' }} />
            <span>Carbs</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'hsl(var(--fat))' }} />
            <span>Fat</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyChart;