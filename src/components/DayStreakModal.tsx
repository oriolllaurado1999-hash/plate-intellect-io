import { X, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DayStreakModalProps {
  isOpen: boolean;
  onClose: () => void;
  streakCount: number;
}

const DayStreakModal = ({ isOpen, onClose, streakCount }: DayStreakModalProps) => {
  if (!isOpen) return null;

  // Get current week days
  const getCurrentWeek = () => {
    const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    const today = new Date();
    const currentDay = today.getDay();
    const mondayOffset = currentDay === 0 ? 6 : currentDay - 1; // Sunday = 0, so we need to adjust
    
    return days.map((day, index) => {
      const isCompleted = index < mondayOffset; // For demo, show first few days as completed
      return { day, isCompleted };
    });
  };

  const weekDays = getCurrentWeek();

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-background">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClose}
          className="p-2"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold text-foreground">DAY STREAK</h1>
        <div className="w-9" /> {/* Spacer for centering */}
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col items-center px-6 py-8">
          {/* Fire Icon */}
          <div className="mb-8">
            <img 
              src="/lovable-uploads/64f451b3-7d36-415a-8c22-4713cf3dd73c.png" 
              alt="Fire streak" 
              className="w-32 h-32 object-contain"
            />
          </div>

          {/* Streak Number */}
          <div className="text-center mb-8">
            <div className="text-6xl font-bold text-foreground mb-2">
              {streakCount}
            </div>
            <div className="text-muted-foreground font-medium tracking-wider">
              DAY STREAK
            </div>
          </div>

          {/* Description Card */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border/50 shadow-sm w-full max-w-sm">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Consistency unlocks clarity
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Your consistency is working. Using Kalore every day helps capture uninterrupted data so 
              you can better understand how your body recovers, performs, and adapts over time.
            </p>
          </div>

          {/* This Week Card */}
          <div className="bg-card rounded-xl p-6 border border-border/50 shadow-sm w-full max-w-sm">
            <h4 className="text-sm font-medium text-muted-foreground mb-4 tracking-wider">
              THIS WEEK
            </h4>
            <div className="flex justify-between items-center">
              {weekDays.map(({ day, isCompleted }, index) => (
                <div key={index} className="text-center">
                  <div className="text-xs text-muted-foreground mb-3 font-medium">
                    {day}
                  </div>
                  <div className="w-8 h-8 flex items-center justify-center">
                    {isCompleted ? (
                      <img 
                        src="/lovable-uploads/64f451b3-7d36-415a-8c22-4713cf3dd73c.png" 
                        alt="Completed day" 
                        className="w-6 h-6 object-contain"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-dashed border-muted-foreground/30"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DayStreakModal;