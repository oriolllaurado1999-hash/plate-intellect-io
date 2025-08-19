import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import FixedContinueButton from './FixedContinueButton';

interface DesiredWeightStepProps {
  selected: number | null;
  onSelect: (weight: number) => void;
  onNext: () => void;
  weightUnit: 'kg' | 'lbs';
}

const DesiredWeightStep = ({ selected, onSelect, onNext, weightUnit }: DesiredWeightStepProps) => {
  // Set default weight based on unit
  const defaultWeight = weightUnit === 'kg' ? 70 : 154; // 154 lbs ≈ 70 kg
  const [weight, setWeight] = useState(selected || defaultWeight);
  
  // Set min/max based on unit
  const minWeight = weightUnit === 'kg' ? 40 : 88;   // 88 lbs ≈ 40 kg
  const maxWeight = weightUnit === 'kg' ? 150 : 330;  // 330 lbs ≈ 150 kg

  const handleWeightChange = (value: number[]) => {
    const newWeight = value[0];
    setWeight(newWeight);
    onSelect(newWeight);
  };

  const handleContinue = () => {
    if (weight) {
      onNext();
    }
  };

  // Generate ruler marks
  const generateRulerMarks = () => {
    const marks = [];
    const totalMarks = 50;
    for (let i = 0; i < totalMarks; i++) {
      const height = i % 5 === 0 ? 'h-8' : i % 2 === 0 ? 'h-6' : 'h-4';
      marks.push(
        <div key={i} className={`w-0.5 ${height} bg-muted-foreground/30`} />
      );
    }
    return marks;
  };

  return (
    <>
      <div className="px-6 py-8 h-full bg-gradient-to-br from-background via-background to-secondary/20">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            What is your desired weight?
          </h1>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-center mb-8">
            <div className="text-sm text-muted-foreground mb-2">Lose weight</div>
            <div className="text-4xl font-bold text-foreground">
              {weight.toFixed(1)} {weightUnit}
            </div>
          </div>

          {/* Ruler visualization */}
          <div className="flex items-end justify-center space-x-1 mb-8 h-12">
            {generateRulerMarks()}
          </div>

          {/* Weight slider */}
          <div className="w-full max-w-sm px-4">
            <Slider
              value={[weight]}
              onValueChange={handleWeightChange}
              max={maxWeight}
              min={minWeight}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>{minWeight} {weightUnit}</span>
              <span>{maxWeight} {weightUnit}</span>
            </div>
          </div>
        </div>
      </div>

      <FixedContinueButton 
        onClick={handleContinue}
      />
    </>
  );
};

export default DesiredWeightStep;