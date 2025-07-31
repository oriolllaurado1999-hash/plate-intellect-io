import { Button } from '@/components/ui/button';
import { ThumbsDown, ThumbsUp } from 'lucide-react';

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
    <div className="px-6 py-8 h-full flex flex-col">
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-16">Have you tried other calorie tracking apps?</h1>

        <div className="space-y-6">
          <Button
            variant={selected === false ? 'default' : 'outline'}
            className="w-full h-20 text-left flex items-center justify-start px-6 space-x-4"
            onClick={() => onSelect(false)}
          >
            <ThumbsDown className="h-6 w-6" />
            <span className="text-xl">No</span>
          </Button>

          <Button
            variant={selected === true ? 'default' : 'outline'}
            className="w-full h-20 text-left flex items-center justify-start px-6 space-x-4"
            onClick={() => onSelect(true)}
          >
            <ThumbsUp className="h-6 w-6" />
            <span className="text-xl">Yes</span>
          </Button>
        </div>
      </div>

      <Button
        onClick={handleContinue}
        disabled={selected === null}
        className="w-full h-12 text-base font-semibold"
        size="lg"
      >
        Continue
      </Button>
    </div>
  );
};

export default ExperienceStep;