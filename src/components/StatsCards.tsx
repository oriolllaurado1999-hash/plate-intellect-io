import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Target } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface StatsCardsProps {
  totalCaloriesWeek: number;
  avgCaloriesDaily: number;
}

const StatsCards = ({ totalCaloriesWeek, avgCaloriesDaily }: StatsCardsProps) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            {t.totalCalories}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCaloriesWeek.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-1">{t.thisWeek}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Target className="h-4 w-4" />
            {t.dailyAvg}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgCaloriesDaily.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-1">{t.perDay}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;