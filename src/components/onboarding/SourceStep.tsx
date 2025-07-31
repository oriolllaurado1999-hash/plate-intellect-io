import { Button } from '@/components/ui/button';
import { Instagram, Users, Tv, Twitter, Facebook, Chrome } from 'lucide-react';

interface SourceStepProps {
  selected: 'instagram' | 'friend' | 'tv' | 'x' | 'facebook' | 'google' | 'tiktok' | null;
  onSelect: (source: 'instagram' | 'friend' | 'tv' | 'x' | 'facebook' | 'google' | 'tiktok') => void;
  onNext: () => void;
}

const SourceStep = ({ selected, onSelect, onNext }: SourceStepProps) => {
  const handleContinue = () => {
    if (selected) {
      onNext();
    }
  };

  const sources = [
    { id: 'instagram' as const, label: 'Instagram', icon: Instagram, highlight: true },
    { id: 'friend' as const, label: 'Friend or family', icon: Users, highlight: false },
    { id: 'tv' as const, label: 'TV', icon: Tv, highlight: false },
    { id: 'x' as const, label: 'X', icon: Twitter, highlight: false },
    { id: 'facebook' as const, label: 'Facebook', icon: Facebook, highlight: false },
    { id: 'google' as const, label: 'Google', icon: Chrome, highlight: false },
    { id: 'tiktok' as const, label: 'TikTok', icon: Tv, highlight: false },
  ];

  return (
    <div className="px-6 py-8 h-full flex flex-col">
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-8">Where did you hear about us?</h1>

        <div className="space-y-4">
          {sources.map((source) => {
            const Icon = source.icon;
            const isSelected = selected === source.id;
            const isHighlighted = source.highlight && !selected;
            
            return (
              <Button
                key={source.id}
                variant={isSelected ? 'default' : 'outline'}
                className={`w-full h-16 text-left flex items-center justify-start px-6 space-x-4 ${
                  isHighlighted ? 'bg-foreground text-background' : ''
                }`}
                onClick={() => onSelect(source.id as any)}
              >
                <Icon className="h-6 w-6" />
                <span className="text-lg">{source.label}</span>
              </Button>
            );
          })}
        </div>
      </div>

      <Button
        onClick={handleContinue}
        disabled={!selected}
        className="w-full h-12 text-base font-semibold"
        size="lg"
      >
        Continue
      </Button>
    </div>
  );
};

export default SourceStep;