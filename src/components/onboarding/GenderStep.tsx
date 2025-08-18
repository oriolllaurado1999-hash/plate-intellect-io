import { Button } from '@/components/ui/button';
import FixedContinueButton from './FixedContinueButton';

interface GenderStepProps {
  selected: 'male' | 'female' | 'other' | null;
  onSelect: (gender: 'male' | 'female' | 'other') => void;
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
      <div className="px-6 py-8 h-full">
        <h1 className="text-3xl font-bold mb-4">Choose your Gender</h1>
        <p className="text-muted-foreground mb-12">
          This will be used to calibrate your custom plan.
        </p>

        <div className="space-y-4">
          <Button
            variant={selected === 'male' ? 'default' : 'outline'}
            className="w-full h-16 text-lg justify-center"
            onClick={() => onSelect('male')}
          >
            Male
          </Button>

          <Button
            variant={selected === 'female' ? 'default' : 'outline'}
            className="w-full h-16 text-lg justify-center"
            onClick={() => onSelect('female')}
          >
            Female
          </Button>

          <Button
            variant={selected === 'other' ? 'default' : 'outline'}
            className="w-full h-16 text-lg justify-center"
            onClick={() => onSelect('other')}
          >
            Other
          </Button>
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