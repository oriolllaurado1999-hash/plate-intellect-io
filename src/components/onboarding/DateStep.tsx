import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
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
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      onSelect(date);
      setIsOpen(false);
      // Update manual inputs when calendar is used
      setDay(date.getDate().toString().padStart(2, '0'));
      setMonth((date.getMonth() + 1).toString().padStart(2, '0'));
      setYear(date.getFullYear().toString());
    }
  };

  const handleManualDateInput = (field: 'day' | 'month' | 'year', value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    let newValue = value;
    
    if (field === 'day') {
      if (value.length <= 2 && (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 31))) {
        setDay(newValue);
      }
    } else if (field === 'month') {
      if (value.length <= 2 && (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 12))) {
        setMonth(newValue);
      }
    } else if (field === 'year') {
      if (value.length <= 4 && (value === '' || parseInt(value) >= 1900)) {
        setYear(newValue);
      }
    }

    // Create date if all fields are filled
    if (field === 'day' && newValue && month && year) {
      tryCreateDate(newValue, month, year);
    } else if (field === 'month' && day && newValue && year) {
      tryCreateDate(day, newValue, year);
    } else if (field === 'year' && day && month && newValue) {
      tryCreateDate(day, month, newValue);
    }
  };

  const tryCreateDate = (dayStr: string, monthStr: string, yearStr: string) => {
    if (dayStr.length >= 1 && monthStr.length >= 1 && yearStr.length === 4) {
      const dayNum = parseInt(dayStr);
      const monthNum = parseInt(monthStr);
      const yearNum = parseInt(yearStr);
      
      // Basic validation
      if (dayNum >= 1 && dayNum <= 31 && monthNum >= 1 && monthNum <= 12 && yearNum >= 1900 && yearNum <= new Date().getFullYear()) {
        const newDate = new Date(yearNum, monthNum - 1, dayNum);
        // Check if the date is valid (e.g., not Feb 30)
        if (newDate.getDate() === dayNum && newDate.getMonth() === monthNum - 1 && newDate.getFullYear() === yearNum) {
          onSelect(newDate);
        }
      }
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

        <div className="space-y-8">
          {/* Manual Date Input */}
          <div className="flex justify-center">
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">Enter your birth date</p>
              </div>
              <div className="flex justify-center space-x-3">
                <div className="text-center">
                  <Input
                    value={day}
                    onChange={(e) => handleManualDateInput('day', e.target.value)}
                    placeholder="DD"
                    className="w-16 h-12 text-center text-lg font-medium"
                    maxLength={2}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Día</p>
                </div>
                <div className="text-center">
                  <Input
                    value={month}
                    onChange={(e) => handleManualDateInput('month', e.target.value)}
                    placeholder="MM"
                    className="w-16 h-12 text-center text-lg font-medium"
                    maxLength={2}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Mes</p>
                </div>
                <div className="text-center">
                  <Input
                    value={year}
                    onChange={(e) => handleManualDateInput('year', e.target.value)}
                    placeholder="AAAA"
                    className="w-20 h-12 text-center text-lg font-medium"
                    maxLength={4}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Año</p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center">
            <div className="flex-1 border-t border-muted"></div>
            <span className="px-4 text-sm text-muted-foreground">o</span>
            <div className="flex-1 border-t border-muted"></div>
          </div>

          {/* Calendar Option */}
          <div className="flex justify-center">
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
                  {selected ? format(selected, "MMMM d, yyyy") : "Select from calendar"}
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
      </div>

      <div className="mt-auto pt-8">
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