import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

interface DateStepProps {
  selected: Date | null;
  onSelect: (date: Date) => void;
  onNext: () => void;
}

const DateStep = ({ selected, onSelect, onNext }: DateStepProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      onSelect(date);
      setIsOpen(false);
    }
  };

  const handleContinue = () => {
    if (selected) {
      onNext();
    }
  };

  return (
    <div className="flex flex-col h-full px-6 py-8">
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            When were you born?
          </h1>
          <p className="text-muted-foreground text-lg">
            This will be used to calibrate your custom plan.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-72 h-14 text-lg justify-start text-left font-normal border-2",
                  !selected && "text-muted-foreground",
                  selected && "border-primary"
                )}
              >
                <CalendarIcon className="mr-2 h-5 w-5" />
                {selected ? format(selected, "MMMM d, yyyy") : "Select your birth date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <Calendar
                mode="single"
                selected={selected || undefined}
                onSelect={handleDateSelect}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="mt-auto">
        <Button
          onClick={handleContinue}
          disabled={!selected}
          className="w-full h-14 text-lg font-medium rounded-full"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default DateStep;