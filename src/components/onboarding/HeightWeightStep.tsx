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
  const [height, setHeight] = useState(selectedHeight?.height || (isMetric ? 170 : 5.6));
  const [weight, setWeight] = useState(selectedWeight?.weight || (isMetric ? 70 : 154));

  // Generate height options
  const heightOptions = isMetric 
    ? Array.from({ length: 131 }, (_, i) => 100 + i) // 100-230 cm
    : Array.from({ length: 51 }, (_, i) => 3.3 + (i * 0.1)).map(h => parseFloat(h.toFixed(1))); // 3.3-8.2 ft

  // Generate weight options
  const weightOptions = isMetric
    ? Array.from({ length: 191 }, (_, i) => 10 + i) // 10-200 kg
    : Array.from({ length: 419 }, (_, i) => 22 + i); // 22-440 lbs

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
    <div className="min-h-screen bg-white p-6 pb-32">
      <div className="max-w-md mx-auto pt-4">
        {/* Header */}
        <div className="mb-8">
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

        {/* Height and Weight Container with Border */}
        <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-lg p-6 mx-4">
          <div className="grid grid-cols-2 gap-8">
            {/* Height Column */}
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Height</h3>
              <div className="relative w-full max-w-32">
                {/* Fade overlay top */}
                <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none rounded-t-xl" />
                
                {/* Scrollable options */}
                <div 
                  className="h-60 overflow-y-auto space-y-1 px-2"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#e5e7eb #f9fafb'
                  }}
                >
                  {heightOptions.map((option, index) => (
                    <button
                      key={option}
                      onClick={() => setHeight(option)}
                      className={`w-full p-3 rounded-xl text-center transition-all duration-200 ${
                        height === option
                          ? 'bg-[#4AD4B2] text-white font-semibold border-2 border-[#3BC4A2] shadow-md scale-105'
                          : 'text-gray-600 hover:bg-gray-50 hover:scale-102'
                      }`}
                    >
                      {option} {isMetric ? 'cm' : 'ft'}
                    </button>
                  ))}
                </div>
                
                {/* Fade overlay bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none rounded-b-xl" />
              </div>
            </div>

            {/* Weight Column */}
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Weight</h3>
              <div className="relative w-full max-w-32">
                {/* Fade overlay top */}
                <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none rounded-t-xl" />
                
                {/* Scrollable options */}
                <div 
                  className="h-60 overflow-y-auto space-y-1 px-2"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#e5e7eb #f9fafb'
                  }}
                >
                  {weightOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setWeight(option)}
                      className={`w-full p-3 rounded-xl text-center transition-all duration-200 ${
                        weight === option
                          ? 'bg-[#4AD4B2] text-white font-semibold border-2 border-[#3BC4A2] shadow-md scale-105'
                          : 'text-gray-600 hover:bg-gray-50 hover:scale-102'
                      }`}
                    >
                      {option} {isMetric ? 'kg' : 'lbs'}
                    </button>
                  ))}
                </div>
                
                {/* Fade overlay bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none rounded-b-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <FixedContinueButton onClick={handleContinue} />
    </div>
  );
};

export default HeightWeightStep;