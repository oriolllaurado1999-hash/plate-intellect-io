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
      <div className="flex items-center justify-between p-4 bg-background">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClose}
          className="p-2"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold text-foreground font-inter tracking-wide">DAY STREAK</h1>
        <div className="w-9" /> {/* Spacer for centering */}
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col items-center px-6 py-8">
          {/* Fire Icon */}
          <div className="mb-8">
            <img 
              src="/lovable-uploads/7d142eb3-f8e4-4a19-9101-57f54c233e78.png" 
              alt="Fire streak" 
              className="w-32 h-32 object-contain filter drop-shadow-none fire-emoji"
              style={{ imageRendering: 'crisp-edges' }}
            />
          </div>

          {/* Streak Number */}
          <div className="text-center mb-8">
            <div className="text-6xl font-bold text-foreground mb-2">
              {streakCount}
            </div>
          <div className="text-muted-foreground font-medium tracking-wider font-inter">
            DAY STREAK
          </div>
          </div>

          {/* Description Card */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border/50 shadow-lg w-full max-w-sm">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Consistency unlocks clarity
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Your consistency is paying off. Using Kalore every day helps you track your calorie intake 
              with precision, giving you a clearer picture of your daily nutrition so you can reach your 
              goals faster and with greater success.
            </p>
          </div>

          {/* This Week Card */}
          <div className="bg-card rounded-xl p-6 border border-border/50 shadow-lg w-full max-w-sm">
            <h4 className="text-sm font-medium text-muted-foreground mb-4 tracking-wider font-inter">
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
                        src="/lovable-uploads/7d142eb3-f8e4-4a19-9101-57f54c233e78.png" 
                        alt="Completed day" 
                        className="w-6 h-6 object-contain fire-emoji"
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