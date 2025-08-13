import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface DesiredWeightStepProps {
  selected: number | null;
  onSelect: (weight: number) => void;
  onNext: () => void;
}

const DesiredWeightStep = ({ selected, onSelect, onNext }: DesiredWeightStepProps) => {
  const [weight, setWeight] = useState(selected || 70);
  
  const minWeight = 40;
  const maxWeight = 150;

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
    <div className="flex flex-col h-full px-6 py-8">
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            What is your desired weight?
          </h1>
        </div>

        <div className="flex flex-col items-center mb-12">
          <div className="text-center mb-8">
            <div className="text-sm text-muted-foreground mb-2">Lose weight</div>
            <div className="text-4xl font-bold text-foreground">
              {weight.toFixed(1)} kg
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
              <span>{minWeight} kg</span>
              <span>{maxWeight} kg</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-4 pb-16">
        <Button
          onClick={handleContinue}
          className="w-full h-14 text-lg font-medium rounded-full"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default DesiredWeightStep;