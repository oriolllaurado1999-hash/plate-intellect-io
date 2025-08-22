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
                <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                  <img 
                    src="/lovable-uploads/ef9e7c93-9cf5-4253-86ff-dcf58c17cca4.png" 
                    alt="Before and after transformation results" 
                    className="w-full h-full object-cover"
                  />
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