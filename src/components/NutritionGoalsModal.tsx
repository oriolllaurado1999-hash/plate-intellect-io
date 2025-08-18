import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowUp, ArrowDown, Sparkles } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface NutritionGoalsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MacroCircleProps {
  emoji: string;
  label: string;
  value: number;
  color: string;
  percentage: number;
}

const MacroCircle = ({ emoji, label, value, color, percentage }: MacroCircleProps) => {
  const strokeDasharray = 2 * Math.PI * 45; // r = 45
  const strokeDashoffset = strokeDasharray - (strokeDasharray * percentage) / 100;

  return (
    <div className="flex items-center gap-4">
      <div className="relative w-20 h-20">
        <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-muted-foreground/20"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-2xl">
          {emoji}
        </div>
      </div>
      <div className="flex-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export const NutritionGoalsModal = ({ isOpen, onClose }: NutritionGoalsModalProps) => {
  const { t } = useTranslation();
  const [showMicronutrients, setShowMicronutrients] = useState(false);

  const macroData = [
    { emoji: '🔥', label: 'Calorie goal', value: 2580, color: 'hsl(var(--primary))', percentage: 75 },
    { emoji: '🥩', label: 'Protein goal', value: 157, color: 'hsl(var(--protein))', percentage: 60 },
    { emoji: '🌾', label: 'Carb goal', value: 326, color: 'hsl(var(--carbs))', percentage: 80 },
    { emoji: '🧈', label: 'Fat goal', value: 71, color: 'hsl(var(--fat))', percentage: 45 },
  ];

  const microData = [
    { emoji: '🍇', label: 'Fiber goal', value: 38, color: 'hsl(280, 80%, 60%)', percentage: 50 },
    { emoji: '🍭', label: 'Sugar goal', value: 96, color: 'hsl(350, 80%, 60%)', percentage: 30 },
    { emoji: '🧂', label: 'Sodium goal', value: 2300, color: 'hsl(30, 80%, 60%)', percentage: 40 },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-left">Edit nutrition goals</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 p-4">
          {/* Macro Goals */}
          <div className="space-y-4">
            {macroData.map((macro, index) => (
              <MacroCircle key={index} {...macro} />
            ))}
          </div>

          {/* Hide/Show Micronutrients */}
          <div className="flex justify-center">
            <Button
              variant="ghost"
              onClick={() => setShowMicronutrients(!showMicronutrients)}
              className="text-muted-foreground flex items-center gap-2"
            >
              {showMicronutrients ? 'Hide micronutrients' : 'Hide micronutrients'}
              {showMicronutrients ? (
                <ArrowUp className="h-4 w-4" />
              ) : (
                <ArrowDown className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Micronutrient Goals */}
          {showMicronutrients && (
            <div className="space-y-4">
              {microData.map((micro, index) => (
                <MacroCircle key={index} {...micro} />
              ))}
            </div>
          )}

          {/* Auto Generate Goals Button */}
          <div className="pt-4">
            <Button
              variant="outline"
              className="w-full flex items-center gap-2 py-6 text-base"
            >
              <Sparkles className="h-5 w-5" />
              Auto Generate Goals
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};