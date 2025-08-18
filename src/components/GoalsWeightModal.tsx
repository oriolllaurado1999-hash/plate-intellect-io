import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Edit } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';

interface GoalsWeightModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoalsWeightModal = ({ isOpen, onClose }: GoalsWeightModalProps) => {
  const { t } = useTranslation();
  const [goalWeight, setGoalWeight] = useState('75');
  const [currentWeight, setCurrentWeight] = useState('55');
  const [height, setHeight] = useState('185');
  const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date(1999, 7, 3));
  const [gender, setGender] = useState('Male');
  const [dailyStepGoal, setDailyStepGoal] = useState('10000');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center">{t.personalDetails}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 p-4">
          {/* Goal Weight */}
          <div className="bg-card rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Goal Weight</Label>
                <p className="text-2xl font-bold">{goalWeight} kg</p>
              </div>
              <Button size="sm" className="bg-black text-white rounded-full px-4">
                Change Goal
              </Button>
            </div>
          </div>

          {/* Current Weight */}
          <div className="flex items-center justify-between py-4 border-b">
            <Label className="text-base">Current weight</Label>
            <div className="flex items-center gap-2">
              <span className="text-base font-medium">{currentWeight} kg</span>
              <Edit className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {/* Height */}
          <div className="flex items-center justify-between py-4 border-b">
            <Label className="text-base">Height</Label>
            <div className="flex items-center gap-2">
              <span className="text-base font-medium">{height} cm</span>
              <Edit className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {/* Date of Birth */}
          <div className="flex items-center justify-between py-4 border-b">
            <Label className="text-base">Date of birth</Label>
            <div className="flex items-center gap-2">
              <span className="text-base font-medium">{format(dateOfBirth, "d/M/yyyy")}</span>
              <Edit className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {/* Gender */}
          <div className="flex items-center justify-between py-4 border-b">
            <Label className="text-base">Gender</Label>
            <div className="flex items-center gap-2">
              <span className="text-base font-medium">{gender}</span>
              <Edit className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {/* Daily Step Goal */}
          <div className="flex items-center justify-between py-4">
            <Label className="text-base">Daily step goal</Label>
            <div className="flex items-center gap-2">
              <span className="text-base font-medium">{dailyStepGoal} steps</span>
              <Edit className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};