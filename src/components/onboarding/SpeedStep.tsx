import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import FixedContinueButton from './FixedContinueButton';

interface SpeedStepProps {
  selected: number | null;
  onSelect: (speed: number) => void;
  onNext: () => void;
}

const SpeedStep = ({ selected, onSelect, onNext }: SpeedStepProps) => {
  const [speed, setSpeed] = useState(selected || 0.8);
  
  const minSpeed = 0.1;
  const maxSpeed = 1.5;

  const handleSpeedChange = (value: number[]) => {
    const newSpeed = value[0];
    setSpeed(newSpeed);
    onSelect(newSpeed);
  };

  const handleContinue = () => {
    onNext();
  };

  // Determine which animal should be active based on speed
  const getAnimalOpacity = (animalSpeed: number) => {
    const tolerance = 0.2;
    return Math.abs(speed - animalSpeed) < tolerance ? 1 : 0.3;
  };

  const getAnimalScale = (animalSpeed: number) => {
    const tolerance = 0.2;
    return Math.abs(speed - animalSpeed) < tolerance ? 'scale-110' : 'scale-100';
  };

  // Get informative message based on current speed
  const getInformativeMessage = () => {
    if (speed <= 0.3) {
      return "Very calm pace. Ideal for maintaining energy and being consistent long-term.";
    } else if (speed <= 0.6) {
      return "Moderate and sustainable pace. Perfect balance between results and well-being.";
    } else if (speed <= 1.0) {
      return "Optimal pace for most people. Good results while maintaining moderate energy.";
    } else if (speed <= 1.2) {
      return "Accelerated pace. Fast results but requires more discipline and energy.";
    } else {
      return "You may feel very tired and develop loose skin.";
    }
  };

  return (
    <>
      <div className="px-6 py-8 h-full">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-8">
            How fast do you want to reach your goal?
          </h1>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-center mb-8">
            <div className="text-sm text-muted-foreground mb-2">Loss weight speed per week</div>
            <div className="text-4xl font-bold text-foreground">
              {speed.toFixed(1)} kg
            </div>
          </div>

          {/* Animals */}
          <div className="flex justify-between items-center w-full max-w-sm mb-8 px-4">
            <div 
              className={`text-4xl transition-all duration-300 ${getAnimalScale(0.1)}`}
              style={{ opacity: getAnimalOpacity(0.1) }}
            >
              🦥
            </div>
            <div 
              className={`text-4xl transition-all duration-300 ${getAnimalScale(0.8)}`}
              style={{ opacity: getAnimalOpacity(0.8) }}
            >
              🐰
            </div>
            <div 
              className={`text-4xl transition-all duration-300 ${getAnimalScale(1.5)}`}
              style={{ opacity: getAnimalOpacity(1.5) }}
            >
              🐆
            </div>
          </div>

          {/* Speed slider */}
          <div className="w-full max-w-sm px-4 mb-6">
            <Slider
              value={[speed]}
              onValueChange={handleSpeedChange}
              max={maxSpeed}
              min={minSpeed}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>{minSpeed} kg</span>
              <span>0.8 kg</span>
              <span>{maxSpeed} kg</span>
            </div>
          </div>

          {/* Informative message */}
          <div className="bg-muted/50 rounded-xl p-4 mx-4">
            <p className="text-sm text-muted-foreground text-center">
              {getInformativeMessage()}
            </p>
          </div>
        </div>
      </div>

      <FixedContinueButton 
        onClick={handleContinue}
      />
    </>
  );
};

export default SpeedStep;