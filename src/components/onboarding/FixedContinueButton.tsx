import { Button } from '@/components/ui/button';

interface FixedContinueButtonProps {
  onClick: () => void;
  disabled?: boolean;
  text?: string;
}

const FixedContinueButton = ({ onClick, disabled = false, text = "Continue" }: FixedContinueButtonProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-6 bg-background border-t border-border z-20">
      <Button
        onClick={onClick}
        disabled={disabled}
        className="w-full h-12 text-base font-semibold bg-continue text-continue-foreground hover:bg-continue/90 rounded-2xl"
        size="lg"
      >
        {text}
      </Button>
    </div>
  );
};

export default FixedContinueButton;