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
    <>
      <div className="px-6 py-8 h-full flex flex-col bg-gradient-to-br from-background via-background to-secondary/20">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-4">Choose your Gender</h1>
          <p className="text-muted-foreground">
            This will be used to calibrate your custom plan.
          </p>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <div className="space-y-4">
            <Button
              variant={selected === 'male' ? 'default' : 'outline'}
              className="w-full h-12 text-lg justify-center rounded-2xl"
              onClick={() => onSelect('male')}
            >
              Male
            </Button>

            <Button
              variant={selected === 'female' ? 'default' : 'outline'}
              className="w-full h-12 text-lg justify-center rounded-2xl"
              onClick={() => onSelect('female')}
            >
              Female
            </Button>
          </div>
        </div>
      </div>

      <FixedContinueButton 
        onClick={handleContinue}
        disabled={!selected}
      />
    </>
  );
};

export default GenderStep;