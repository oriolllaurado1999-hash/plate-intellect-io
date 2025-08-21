import { Button } from '@/components/ui/button';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import FixedContinueButton from './FixedContinueButton';

interface ExperienceStepProps {
  selected: boolean | null;
  onSelect: (hasTriedOtherApps: boolean) => void;
  onNext: () => void;
}

const ExperienceStep = ({ selected, onSelect, onNext }: ExperienceStepProps) => {
  const handleContinue = () => {
    if (selected !== null) {
      onNext();
    }
  };

  return (
      <div className="px-6 pt-4 pb-8 h-full flex flex-col bg-gradient-to-br from-background via-background to-secondary/20">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-4">Have you tried other calorie tracking apps?</h1>
          <p className="text-muted-foreground">
            This will help us tailor your experience.
          </p>
        </div>

        <div className="flex-1 flex flex-col justify-center pt-8">
          <div className="space-y-4 flex-shrink-0 max-w-sm mx-auto w-full">
            <Button
              variant="ghost"
              className={`w-full h-16 text-left flex items-center justify-start px-6 space-x-4 rounded-2xl ${
                selected === false ? 'bg-continue text-continue-foreground' : 'bg-continue/5'
              }`}
              onClick={() => onSelect(false)}
            >
              <ThumbsDown className="h-6 w-6" />
              <span className="text-lg">No</span>
            </Button>

            <Button
              variant="ghost"
              className={`w-full h-16 text-left flex items-center justify-start px-6 space-x-4 rounded-2xl ${
                selected === true ? 'bg-continue text-continue-foreground' : 'bg-continue/5'
              }`}
              onClick={() => onSelect(true)}
            >
              <ThumbsUp className="h-6 w-6" />
              <span className="text-lg">Yes</span>
            </Button>
          </div>
        </div>

        <FixedContinueButton 
          onClick={handleContinue}
          disabled={selected === null}
        />
      </div>
  );
};

export default ExperienceStep;