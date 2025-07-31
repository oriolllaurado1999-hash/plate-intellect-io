import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DateNavigationProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

export default function DateNavigation({ currentDate, onDateChange }: DateNavigationProps) {
  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isYesterday = (date: Date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return date.toDateString() === yesterday.toDateString();
  };

  const formatDate = (date: Date) => {
    if (isToday(date)) return 'Today';
    if (isYesterday(date)) return 'Yesterday';
    
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
  };

  const goToPreviousDay = () => {
    const previousDay = new Date(currentDate);
    previousDay.setDate(previousDay.getDate() - 1);
    onDateChange(previousDay);
  };

  const goToNextDay = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1);
    onDateChange(nextDay);
  };

  const goToToday = () => {
    onDateChange(new Date());
  };

  const canGoForward = () => {
    const today = new Date();
    return currentDate.toDateString() !== today.toDateString();
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <Button
        variant="ghost"
        size="sm"
        onClick={goToPreviousDay}
        className="h-10"
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        Previous
      </Button>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">{formatDate(currentDate)}</h2>
        </div>
        {!isToday(currentDate) && (
          <Badge 
            variant="outline" 
            className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={goToToday}
          >
            Go to Today
          </Badge>
        )}
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={goToNextDay}
        disabled={!canGoForward()}
        className="h-10"
      >
        Next
        <ChevronRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
}