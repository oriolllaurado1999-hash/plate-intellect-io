import { Button } from '@/components/ui/button';
import FixedContinueButton from './FixedContinueButton';

interface MotivationStepProps {
  onNext: () => void;
  currentWeight: { weight: number; unit: 'kg' | 'lbs' } | null;
  desiredWeight: number | null;
  goal: 'lose' | 'maintain' | 'gain' | null;
}

const MotivationStep = ({ onNext, currentWeight, desiredWeight, goal }: MotivationStepProps) => {
  const getMotivationText = () => {
    if (!currentWeight || !desiredWeight || !goal) {
      return {
        action: "Losing",
        amount: "6 kg",
        message: "is a realistic target. It's not hard at all!"
      };
    }

    const currentWeightValue = currentWeight.weight;
    const weightDifference = Math.abs(currentWeightValue - desiredWeight);
    const unit = currentWeight.unit;
    
    let action = "";
    let message = "";
    
    if (goal === 'lose') {
      action = "Losing";
      message = "is a realistic target. It's not hard at all!";
    } else if (goal === 'gain') {
      action = "Gaining";
      message = "is a realistic target. You can do it!";
    } else {
      action = "Maintaining";
      message = "is a smart choice. Keep it up!";
    }

    return {
      action,
      amount: `${weightDifference.toFixed(1)} ${unit}`,
      message
    };
  };

  const motivationText = getMotivationText();

  return (
    <>
      <div className="px-6 py-8 h-full bg-gradient-to-br from-background via-background to-secondary/20">
        <div className="flex-1 flex flex-col justify-center text-center">
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-foreground mb-8">
              {motivationText.action} <span className="text-orange-500">{motivationText.amount}</span> {motivationText.message}
            </h1>
            
            <p className="text-muted-foreground text-lg leading-relaxed">
              90% of users notice a clear difference after using Kalore, with minimal rebound.
            </p>
            
            {/* Photo frame */}
            <div className="mt-8 max-w-xs mx-auto">
              <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-200">
                <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <div className="w-12 h-12 mx-auto mb-2 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-2xl">📷</span>
                    </div>
                    <p className="text-sm">Photo placeholder</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FixedContinueButton 
        onClick={onNext}
      />
    </>
  );
};

export default MotivationStep;