import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ChangeGoalWeightModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentGoalWeight?: number;
  onGoalUpdated: (newGoal: number) => void;
}

export const ChangeGoalWeightModal = ({ 
  isOpen, 
  onClose, 
  currentGoalWeight = 75, 
  onGoalUpdated 
}: ChangeGoalWeightModalProps) => {
  const { t } = useTranslation();
  const [goalWeight, setGoalWeight] = useState(currentGoalWeight.toString());
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    const newGoal = parseFloat(goalWeight);
    
    if (isNaN(newGoal) || newGoal < 30 || newGoal > 300) {
      toast.error('Please enter a valid weight between 30-300 kg');
      return;
    }

    setIsLoading(true);

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      console.log('Calling recalculate-nutrition-goals function...');

      // Call the Edge Function to recalculate nutrition goals
      const { data, error } = await supabase.functions.invoke('recalculate-nutrition-goals', {
        body: {
          goalWeight: newGoal,
          userId: user.id
        }
      });

      if (error) {
        console.error('Edge function error:', error);
        throw new Error(error.message || 'Failed to recalculate nutrition goals');
      }

      if (!data?.success) {
        throw new Error(data?.error || 'Failed to update goals');
      }

      console.log('Goals updated successfully:', data.goals);

      toast.success(
        <div>
          <p><strong>Goal weight updated!</strong></p>
          <p className="text-sm text-muted-foreground mt-1">
            Your daily nutrition goals have been automatically recalculated by AI.
          </p>
          {data.reasoning && (
            <p className="text-xs text-muted-foreground mt-2">
              {data.reasoning}
            </p>
          )}
        </div>
      );

      onGoalUpdated(newGoal);
      onClose();

    } catch (error) {
      console.error('Error updating goal weight:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update goal weight');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto bg-background border-border">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <Button variant="ghost" size="icon" onClick={onClose} disabled={isLoading}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <DialogTitle className="text-center">Change Goal Weight</DialogTitle>
          <div className="w-10" />
        </DialogHeader>
        
        <div className="space-y-6 p-4">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Enter your new goal weight. Our AI will automatically recalculate your daily nutrition goals.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="goalWeight">Goal Weight (kg)</Label>
            <Input
              id="goalWeight"
              type="number"
              step="0.1"
              min="30"
              max="300"
              value={goalWeight}
              onChange={(e) => setGoalWeight(e.target.value)}
              placeholder="Enter goal weight"
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground">
              Weight should be between 30-300 kg
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={onClose} 
              className="flex-1"
              disabled={isLoading}
            >
              {t.cancel}
            </Button>
            <Button 
              onClick={handleSave} 
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                'Save & Recalculate'
              )}
            </Button>
          </div>

          {isLoading && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                AI is recalculating your optimal nutrition goals...
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};