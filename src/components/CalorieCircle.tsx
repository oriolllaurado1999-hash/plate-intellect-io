import { Card, CardContent } from '@/components/ui/card';

interface CalorieCircleProps {
  consumed: number;
  goal: number;
}

const CalorieCircle = ({ consumed, goal }: CalorieCircleProps) => {
  const percentage = Math.min((consumed / goal) * 100, 100);
  const remaining = Math.max(goal - consumed, 0);
  const circumference = 2 * Math.PI * 70;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Card className="relative">
      <CardContent className="flex items-center justify-center p-6">
        <div className="relative w-40 h-40">
          {/* Background circle */}
          <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 160 160">
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="8"
              className="text-muted/30"
            />
            {/* Progress circle */}
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="transparent"
              stroke="url(#gradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-500 ease-in-out"
            />
            {/* Gradient definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--primary-glow))" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-primary">{consumed}</div>
            <div className="text-sm text-muted-foreground">of {goal}</div>
            <div className="text-xs text-muted-foreground">kcal</div>
          </div>
        </div>
      </CardContent>
      
      {/* Remaining calories info */}
      <CardContent className="pt-0 text-center">
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="text-lg font-semibold">
            {goal - consumed > 0 ? (
              <span style={{ color: '#4AD4B2' }}>
                {goal - consumed} kcal remaining
              </span>
            ) : (
              <span className="text-orange-600 dark:text-orange-400">
                {consumed - goal} kcal over goal
              </span>
            )}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {Math.round(percentage)}% of daily goal
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalorieCircle;