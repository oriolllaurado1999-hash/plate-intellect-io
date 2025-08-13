import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CurrentWeightStepProps {
  selected: { weight: number; unit: 'kg' | 'lbs' } | null;
  onSelect: (weight: { weight: number; unit: 'kg' | 'lbs' }) => void;
  onNext: () => void;
}

const CurrentWeightStep = ({ selected, onSelect, onNext }: CurrentWeightStepProps) => {
  const [weight, setWeight] = useState(selected?.weight?.toString() || '');
  const [unit, setUnit] = useState<'kg' | 'lbs'>(selected?.unit || 'kg');

  const handleWeightChange = (value: string) => {
    // Only allow numbers and one decimal point
    if (!/^\d*\.?\d*$/.test(value)) return;
    
    setWeight(value);
    
    const weightNum = parseFloat(value);
    if (!isNaN(weightNum) && weightNum > 0) {
      onSelect({ weight: weightNum, unit });
    }
  };

  const handleUnitChange = (newUnit: 'kg' | 'lbs') => {
    setUnit(newUnit);
    
    const weightNum = parseFloat(weight);
    if (!isNaN(weightNum) && weightNum > 0) {
      onSelect({ weight: weightNum, unit: newUnit });
    }
  };

  const handleContinue = () => {
    const weightNum = parseFloat(weight);
    if (!isNaN(weightNum) && weightNum > 0) {
      onNext();
    }
  };

  const isValid = () => {
    const weightNum = parseFloat(weight);
    return !isNaN(weightNum) && weightNum > 0;
  };

  return (
    <div className="px-6 py-8 h-full flex flex-col">
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-4">What's your current weight?</h1>
        <p className="text-muted-foreground mb-12">
          This will help us calculate your personalized plan.
        </p>

        <div className="space-y-6 mb-16">
          {/* Unit Selection */}
          <div className="flex space-x-3">
            <Button
              variant={unit === 'kg' ? 'default' : 'outline'}
              className="flex-1 h-12 text-lg"
              onClick={() => handleUnitChange('kg')}
            >
              Kilograms
            </Button>
            <Button
              variant={unit === 'lbs' ? 'default' : 'outline'}
              className="flex-1 h-12 text-lg"
              onClick={() => handleUnitChange('lbs')}
            >
              Pounds
            </Button>
          </div>

          {/* Weight Input */}
          <div className="flex items-center justify-center space-x-3">
            <Input
              value={weight}
              onChange={(e) => handleWeightChange(e.target.value)}
              placeholder="0"
              className="w-32 h-16 text-center text-2xl font-semibold"
              maxLength={6}
            />
            <span className="text-2xl font-semibold text-muted-foreground">
              {unit}
            </span>
          </div>

          {/* Range indicator */}
          <div className="text-center text-sm text-muted-foreground">
            {unit === 'kg' ? 'Typical range: 40-200 kg' : 'Typical range: 88-440 lbs'}
          </div>
        </div>
      </div>

      <div className="mt-auto pt-4 pb-16">
        <Button
          onClick={handleContinue}
          disabled={!isValid()}
          className="w-full h-12 text-base font-semibold"
          size="lg"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default CurrentWeightStep;