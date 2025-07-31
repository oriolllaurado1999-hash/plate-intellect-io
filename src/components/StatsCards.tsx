import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Target } from 'lucide-react';

interface StatsCardsProps {
  totalCaloriesWeek: number;
  avgCaloriesDaily: number;
}

const StatsCards = ({ totalCaloriesWeek, avgCaloriesDaily }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Total calories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCaloriesWeek.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-1">This week</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Target className="h-4 w-4" />
            Daily avg
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgCaloriesDaily.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-1">Per day</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;