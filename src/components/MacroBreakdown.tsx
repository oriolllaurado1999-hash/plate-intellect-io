import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MacroProgressBarProps {
  label: string;
  value: number;
  unit: string;
  color: string;
  maxValue?: number;
}

const MacroProgressBar = ({ label, value, unit, color, maxValue = 100 }: MacroProgressBarProps) => {
  const percentage = maxValue > 0 ? Math.min((value / maxValue) * 100, 100) : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: color }} />
          {label}
        </span>
        <span className="text-sm font-bold">{value}{unit}</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div
          className="h-2 rounded-full transition-all duration-300"
          style={{ 
            width: `${percentage}%`,
            backgroundColor: color
          }}
        />
      </div>
    </div>
  );
};

interface MacroBreakdownProps {
  protein: number;
  carbs: number;
  fat: number;
}

const MacroBreakdown = ({ protein, carbs, fat }: MacroBreakdownProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Today's Macros</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <MacroProgressBar
          label="Protein"
          value={protein}
          unit="g"
          color="hsl(var(--protein))"
          maxValue={120}
        />
        <MacroProgressBar
          label="Carbs"
          value={carbs}
          unit="g"
          color="hsl(var(--carbs))"
          maxValue={300}
        />
        <MacroProgressBar
          label="Fat"
          value={fat}
          unit="g"
          color="hsl(var(--fat))"
          maxValue={85}
        />
      </CardContent>
    </Card>
  );
};

export default MacroBreakdown;