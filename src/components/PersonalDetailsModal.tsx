import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Edit } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { ChangeGoalWeightModal } from './ChangeGoalWeightModal';

interface PersonalDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PersonalDetailsModal = ({ isOpen, onClose }: PersonalDetailsModalProps) => {
  const { t } = useTranslation();
  const [goalWeight, setGoalWeight] = useState(75);
  const [currentWeight, setCurrentWeight] = useState(55);
  const [height, setHeight] = useState(185);
  const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date(1999, 7, 3));
  const [gender, setGender] = useState('Male');
  const [dailyStepGoal, setDailyStepGoal] = useState(10000);
  const [showChangeGoalModal, setShowChangeGoalModal] = useState(false);

  // Load user profile data on mount
  useEffect(() => {
    if (isOpen) {
      loadUserProfile();
    }
  }, [isOpen]);

  const loadUserProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (profile) {
        setGoalWeight(profile.goal_weight || 75);
        setCurrentWeight(profile.weight || 55);
        setHeight(profile.height || 185);
        setDailyStepGoal(profile.daily_step_goal || 10000);
        
        if (profile.date_of_birth) {
          setDateOfBirth(new Date(profile.date_of_birth));
        }
        
        if (profile.gender) {
          setGender(profile.gender);
        }
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const handleGoalUpdated = (newGoal: number) => {
    setGoalWeight(newGoal);
  };

  return (
    <>
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
                <Button 
                  size="sm" 
                  className="bg-black text-white rounded-full px-4"
                  onClick={() => setShowChangeGoalModal(true)}
                >
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
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className="p-0 h-auto font-medium text-base"
                    >
                      {format(dateOfBirth, "d/M/yyyy")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="single"
                      selected={dateOfBirth}
                      onSelect={(date) => date && setDateOfBirth(date)}
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                <Edit className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            {/* Gender */}
            <div className="flex items-center justify-between py-4 border-b">
              <Label className="text-base">Gender</Label>
              <div className="flex items-center gap-2">
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger className="w-auto border-none p-0 h-auto">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
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

      <ChangeGoalWeightModal
        isOpen={showChangeGoalModal}
        onClose={() => setShowChangeGoalModal(false)}
        currentGoalWeight={goalWeight}
        onGoalUpdated={handleGoalUpdated}
      />
    </>
  );
};