import { Button } from '@/components/ui/button';
import FixedContinueButton from './FixedContinueButton';

interface GenderStepProps {
  selected: 'male' | 'female' | null;
  onSelect: (gender: 'male' | 'female') => void;
  onNext: () => void;
}

const GenderStep = ({ selected, onSelect, onNext }: GenderStepProps) => {
  const handleContinue = () => {
    if (selected) {
      onNext();
    }
  };

  return (
    <div className="px-6 pt-4 pb-8 h-full flex flex-col bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-4">Choose your Gender</h1>
        <p className="text-muted-foreground">
          This helps set up your personalized plan.
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-center pt-8">
        <div className="space-y-4 flex-shrink-0 max-w-sm mx-auto w-full">
            <Button
              variant="ghost"
              className={`w-full h-12 text-lg justify-center rounded-2xl ${
                selected === 'male' ? 'bg-continue text-continue-foreground' : 'bg-continue/5'
              }`}
              onClick={() => onSelect('male')}
            >
              <span className="font-light">Male</span>
            </Button>

            <Button
              variant="ghost"
              className={`w-full h-12 text-lg justify-center rounded-2xl ${
                selected === 'female' ? 'bg-continue text-continue-foreground' : 'bg-continue/5'
              }`}
              onClick={() => onSelect('female')}
            >
              <span className="font-light">Female</span>
            </Button>
        </div>
      </div>

      <FixedContinueButton 
        onClick={handleContinue}
        disabled={!selected}
      />
    </div>
  );
};

export default GenderStep;