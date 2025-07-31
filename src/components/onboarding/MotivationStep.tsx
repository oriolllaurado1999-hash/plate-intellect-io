import { Button } from '@/components/ui/button';

interface MotivationStepProps {
  onNext: () => void;
  weightLoss?: number;
}

const MotivationStep = ({ onNext, weightLoss = 6 }: MotivationStepProps) => {
  return (
    <div className="flex flex-col h-full px-6 py-8">
      <div className="flex-1 flex flex-col justify-center text-center">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-8">
            Losing <span className="text-orange-500">{weightLoss} kg</span> is a realistic
            target. It's not hard at all!
          </h1>
          
          <p className="text-muted-foreground text-lg leading-relaxed">
            90% of users say that the change is obvious after using Kalore and it is not
            easy to rebound.
          </p>
        </div>
      </div>

      <div className="mt-auto">
        <Button
          onClick={onNext}
          className="w-full h-14 text-lg font-medium rounded-full"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default MotivationStep;