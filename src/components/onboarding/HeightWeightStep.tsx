import { useState } from 'react';
import FixedContinueButton from './FixedContinueButton';

interface HeightWeightStepProps {
  selectedHeight: { height: number; unit: 'cm' | 'ft' } | null;
  selectedWeight: { weight: number; unit: 'kg' | 'lbs' } | null;
  onSelect: (data: { height: { height: number; unit: 'cm' | 'ft' }, weight: { weight: number; unit: 'kg' | 'lbs' } }) => void;
  onNext: () => void;
}

const HeightWeightStep = ({ selectedHeight, selectedWeight, onSelect, onNext }: HeightWeightStepProps) => {
  const [isMetric, setIsMetric] = useState(true);
  const [height, setHeight] = useState(selectedHeight?.height || (isMetric ? 170 : 5.7));
  const [weight, setWeight] = useState(selectedWeight?.weight || (isMetric ? 70 : 154));

  // Generate height options
  const heightOptions = isMetric 
    ? Array.from({ length: 51 }, (_, i) => 150 + i) // 150-200 cm
    : Array.from({ length: 25 }, (_, i) => 4.5 + (i * 0.1)).map(h => parseFloat(h.toFixed(1))); // 4.5-7.0 ft

  // Generate weight options
  const weightOptions = isMetric
    ? Array.from({ length: 101 }, (_, i) => 40 + i) // 40-140 kg
    : Array.from({ length: 201 }, (_, i) => 88 + i); // 88-288 lbs

  const handleContinue = () => {
    const heightUnit = isMetric ? 'cm' : 'ft';
    const weightUnit = isMetric ? 'kg' : 'lbs';
    
    onSelect({
      height: { height, unit: heightUnit },
      weight: { weight, unit: weightUnit }
    });
    onNext();
  };

  const handleToggle = () => {
    setIsMetric(!isMetric);
    // Convert current values when toggling
    if (isMetric) {
      // Converting to Imperial
      setHeight(parseFloat((height * 0.0328084).toFixed(1))); // cm to ft
      setWeight(Math.round(weight * 2.20462)); // kg to lbs
    } else {
      // Converting to Metric
      setHeight(Math.round(height * 30.48)); // ft to cm
      setWeight(Math.round(weight * 0.453592)); // lbs to kg
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4AD4B2]/20 via-white to-[#4AD4B2]/10 p-6 pb-32">
      <div className="max-w-md mx-auto pt-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Height & weight
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            This will be used to calibrate your custom plan.
          </p>
        </div>

        {/* Unit Toggle */}
        <div className="flex items-center justify-center mb-8">
          <span className={`mr-4 text-lg ${!isMetric ? 'text-gray-900 font-semibold' : 'text-gray-400'}`}>
            Imperial
          </span>
          <button
            onClick={handleToggle}
            className="relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#4AD4B2] focus:ring-offset-2"
            style={{ backgroundColor: isMetric ? '#4AD4B2' : '#e5e7eb' }}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                isMetric ? 'translate-x-9' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`ml-4 text-lg ${isMetric ? 'text-gray-900 font-semibold' : 'text-gray-400'}`}>
            Metric
          </span>
        </div>

        {/* Height and Weight Inputs */}
        <div className="grid grid-cols-2 gap-6">
          {/* Height Column */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Height</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {heightOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setHeight(option)}
                  className={`w-full p-3 rounded-xl text-left transition-colors ${
                    height === option
                      ? 'bg-gray-200 text-gray-900 font-semibold'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {option} {isMetric ? 'cm' : 'ft'}
                </button>
              ))}
            </div>
          </div>

          {/* Weight Column */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Weight</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {weightOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setWeight(option)}
                  className={`w-full p-3 rounded-xl text-left transition-colors ${
                    weight === option
                      ? 'bg-gray-200 text-gray-900 font-semibold'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {option} {isMetric ? 'kg' : 'lbs'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <FixedContinueButton onClick={handleContinue} />
    </div>
  );
};

export default HeightWeightStep;