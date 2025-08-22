import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useRef, useState } from 'react';
import { Gift } from 'lucide-react';

interface ReferralStepProps {
  onSubmit: (code: string) => void;
  onSkip: () => void;
}

const ReferralStep = ({ onSubmit, onSkip }: ReferralStepProps) => {
  const [referralCode, setReferralCode] = useState('');
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const form = formRef.current;
    
    if (form) {
      form.style.opacity = '0';
      form.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        form.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        form.style.opacity = '1';
        form.style.transform = 'translateY(0)';
      }, 300);
    }
  }, []);

  const handleSubmit = () => {
    if (referralCode.trim()) {
      onSubmit(referralCode.trim());
    } else {
      onSkip();
    }
  };

  return (
    <div className="flex flex-col h-full px-6 py-8 bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="flex-1 flex flex-col justify-center">
        <div ref={formRef}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-6">
              <Gift className="h-8 w-8 text-white animate-spin" style={{ animationDuration: '3s' }} />
            </div>
            
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Enter referral code
            </h1>
            <h2 className="text-xl text-foreground mb-4">(optional)</h2>
            <p className="text-muted-foreground">
              You can skip this step
            </p>
          </div>

          <div className="space-y-6 mb-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Referral Code"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                className="h-14 text-lg rounded-2xl border-2 focus:border-primary transition-colors"
              />
              {referralCode && (
                <Button
                  onClick={handleSubmit}
                  size="sm"
                  className="absolute right-2 top-2 h-10 px-6 rounded-xl"
                >
                  Submit
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-4 pb-16">
        <Button
          onClick={handleSubmit}
          className="w-full h-14 text-lg font-medium rounded-full"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ReferralStep;