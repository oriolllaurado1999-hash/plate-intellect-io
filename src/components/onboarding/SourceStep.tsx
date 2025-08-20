import { Button } from '@/components/ui/button';
import { Instagram, Users, Play, Twitter, Facebook, Chrome } from 'lucide-react';
import FixedContinueButton from './FixedContinueButton';

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
    { id: 'instagram' as const, label: 'Instagram', icon: Instagram, highlight: false },
    { id: 'friend' as const, label: 'Friend or family', icon: Users, highlight: false },
    { id: 'x' as const, label: 'Twitter', icon: Twitter, highlight: false },
    { id: 'facebook' as const, label: 'Facebook', icon: Facebook, highlight: false },
    { id: 'google' as const, label: 'Google', icon: Chrome, highlight: false },
    { id: 'tiktok' as const, label: 'TikTok', icon: Play, highlight: false },
  ];

  return (
    <>
      <div className="px-6 py-8 h-full bg-gradient-to-br from-background via-background to-secondary/20">
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

      <FixedContinueButton 
        onClick={handleContinue}
        disabled={!selected}
      />
    </>
  );
};

export default SourceStep;