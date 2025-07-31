import { Card, CardContent } from '@/components/ui/card';

interface CalorieCircleProps {
  consumed: number;
  goal: number;
}

const CalorieCircle = ({ consumed, goal }: CalorieCircleProps) => {
  const percentage = Math.min((consumed / goal) * 100, 100);
  const remaining = Math.max(goal - consumed, 0);
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Card className="relative">
      <CardContent className="p-6">
        <div className="flex items-center justify-center">
          <div className="relative w-32 h-32">
            {/* Background circle */}
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="hsl(var(--muted))"
                strokeWidth="8"
                fill="transparent"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="hsl(var(--primary))"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-500 ease-in-out"
              />
            </svg>
            
            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold">{remaining}</span>
              <span className="text-sm text-muted-foreground">Cal left</span>
            </div>
          </div>
        </div>
        
        {/* Goal text */}
        <div className="text-center mt-4">
          <p className="text-sm text-muted-foreground">{goal} kcal</p>
          <p className="text-xs text-muted-foreground">Daily goal</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalorieCircle;