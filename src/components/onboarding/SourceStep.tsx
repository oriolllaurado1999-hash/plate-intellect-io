import { Button } from '@/components/ui/button';
import { Instagram, Users, Twitter, Facebook, Chrome, MoreHorizontal } from 'lucide-react';
import TikTokIcon from '../icons/TikTokIcon';
import FixedContinueButton from './FixedContinueButton';

interface SourceStepProps {
  selected: 'instagram' | 'friend' | 'tv' | 'x' | 'facebook' | 'google' | 'tiktok' | 'others' | null;
  onSelect: (source: 'instagram' | 'friend' | 'tv' | 'x' | 'facebook' | 'google' | 'tiktok' | 'others') => void;
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
    { id: 'x' as const, label: 'X', icon: Twitter, highlight: false },
    { id: 'facebook' as const, label: 'Facebook', icon: Facebook, highlight: false },
    { id: 'google' as const, label: 'Google', icon: Chrome, highlight: false },
    { id: 'tiktok' as const, label: 'TikTok', icon: null, highlight: false },
    { id: 'others' as const, label: 'Others', icon: MoreHorizontal, highlight: false },
  ];

  return (
      <div className="px-6 pt-4 pb-8 h-full flex flex-col bg-gradient-to-br from-background via-background to-secondary/20">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-4">Where did you hear about us?</h1>
          <p className="text-muted-foreground">
            This will help us improve our outreach.
          </p>
        </div>

        <div className="flex-1 flex flex-col justify-center pt-8">
          <div className="space-y-4 flex-shrink-0 max-w-sm mx-auto w-full">
            {sources.map((source) => {
              const Icon = source.icon;
              const isSelected = selected === source.id;
              
              return (
                <Button
                  key={source.id}
                  variant="ghost"
                  className={`w-full h-12 text-left flex items-center justify-start px-6 space-x-4 rounded-2xl ${
                    isSelected ? 'bg-continue text-continue-foreground' : 'bg-continue/5'
                  }`}
                  onClick={() => onSelect(source.id as any)}
                >
                  {source.id === 'tiktok' ? (
                    <TikTokIcon size={20} />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                  <span className="text-base">{source.label}</span>
                </Button>
              );
            })}
          </div>
        </div>

        <FixedContinueButton 
          onClick={handleContinue}
          disabled={!selected}
        />
      </div>
  );
};

export default SourceStep;