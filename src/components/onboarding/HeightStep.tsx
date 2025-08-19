import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import FixedContinueButton from './FixedContinueButton';

interface HeightStepProps {
  selected: { height: number; unit: 'cm' | 'ft' } | null;
  onSelect: (height: { height: number; unit: 'cm' | 'ft' }) => void;
  onNext: () => void;
}

const HeightStep = ({ selected, onSelect, onNext }: HeightStepProps) => {
  const [height, setHeight] = useState(selected?.height?.toString() || '');
  const [unit, setUnit] = useState<'cm' | 'ft'>(selected?.unit || 'cm');
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');

  const handleHeightChange = (value: string) => {
    // Only allow numbers and one decimal point for cm
    if (unit === 'cm') {
      if (!/^\d*\.?\d*$/.test(value)) return;
      
      setHeight(value);
      
      const heightNum = parseFloat(value);
      if (!isNaN(heightNum) && heightNum > 0) {
        onSelect({ height: heightNum, unit });
      }
    }
  };

  const handleFeetChange = (value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    setFeet(value);
    calculateFeetHeight(value, inches);
  };

  const handleInchesChange = (value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    setInches(value);
    calculateFeetHeight(feet, value);
  };

  const calculateFeetHeight = (feetVal: string, inchesVal: string) => {
    const feetNum = parseInt(feetVal) || 0;
    const inchesNum = parseInt(inchesVal) || 0;
    
    if (feetNum > 0 || inchesNum > 0) {
      const totalHeight = feetNum + (inchesNum / 12);
      setHeight(totalHeight.toString());
      onSelect({ height: totalHeight, unit: 'ft' });
    }
  };

  const handleUnitChange = (newUnit: 'cm' | 'ft') => {
    setUnit(newUnit);
    
    if (newUnit === 'cm') {
      setFeet('');
      setInches('');
      setHeight('');
    } else {
      setHeight('');
    }
  };

  const handleContinue = () => {
    if (unit === 'cm') {
      const heightNum = parseFloat(height);
      if (!isNaN(heightNum) && heightNum > 0) {
        onNext();
      }
    } else {
      const feetNum = parseInt(feet) || 0;
      const inchesNum = parseInt(inches) || 0;
      if (feetNum > 0 || inchesNum > 0) {
        onNext();
      }
    }
  };

  const isValid = () => {
    if (unit === 'cm') {
      const heightNum = parseFloat(height);
      return !isNaN(heightNum) && heightNum > 0;
    } else {
      const feetNum = parseInt(feet) || 0;
      const inchesNum = parseInt(inches) || 0;
      return feetNum > 0 || inchesNum > 0;
    }
  };

  return (
    <>
      <div className="px-6 py-8 h-full bg-gradient-to-br from-background via-background to-secondary/20">
        <h1 className="text-3xl font-bold mb-4">What's your height?</h1>
        <p className="text-muted-foreground mb-12">
          This will help us calculate your BMI and daily needs.
        </p>

        <div className="space-y-6">
          {/* Unit Selection */}
          <div className="flex space-x-3">
            <Button
              variant={unit === 'cm' ? 'default' : 'outline'}
              className="flex-1 h-12 text-lg"
              onClick={() => handleUnitChange('cm')}
            >
              Centimeters
            </Button>
            <Button
              variant={unit === 'ft' ? 'default' : 'outline'}
              className="flex-1 h-12 text-lg"
              onClick={() => handleUnitChange('ft')}
            >
              Feet & Inches
            </Button>
          </div>

          {/* Height Input */}
          {unit === 'cm' ? (
            <div className="flex items-center justify-center space-x-3">
              <Input
                value={height}
                onChange={(e) => handleHeightChange(e.target.value)}
                placeholder="0"
                className="w-32 h-16 text-center text-2xl font-semibold"
                maxLength={6}
              />
              <span className="text-2xl font-semibold text-muted-foreground">
                cm
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-3">
              <Input
                value={feet}
                onChange={(e) => handleFeetChange(e.target.value)}
                placeholder="0"
                className="w-20 h-16 text-center text-2xl font-semibold"
                maxLength={1}
              />
              <span className="text-xl font-semibold text-muted-foreground">ft</span>
              <Input
                value={inches}
                onChange={(e) => handleInchesChange(e.target.value)}
                placeholder="0"
                className="w-20 h-16 text-center text-2xl font-semibold"
                maxLength={2}
              />
              <span className="text-xl font-semibold text-muted-foreground">in</span>
            </div>
          )}

          {/* Range indicator */}
          <div className="text-center text-sm text-muted-foreground">
            {unit === 'cm' ? 'Typical range: 140-220 cm' : 'Typical range: 4\'6" - 7\'2"'}
          </div>
        </div>
      </div>

      <FixedContinueButton 
        onClick={handleContinue}
        disabled={!isValid()}
      />
    </>
  );
};

export default HeightStep;