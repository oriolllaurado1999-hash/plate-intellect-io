import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Heart } from 'lucide-react';
import { useHealthKit } from '@/hooks/useHealthKit';

interface HealthConnectStepProps {
  onConnect: () => void;
  onSkip: () => void;
}

const HealthConnectStep = ({ onConnect, onSkip }: HealthConnectStepProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();
  const { isAvailable, requestPermissions } = useHealthKit();

  const handleConnectHealth = async () => {
    setIsConnecting(true);
    
    try {
      if (isAvailable) {
        // Request HealthKit permissions on iOS
        const granted = await requestPermissions();
        
        if (granted) {
          toast({
            title: "Connected to Apple Health",
            description: "Your health data will now be synced with Kalore.",
          });
        }
      } else {
        // Web platform or Android - show info message
        toast({
          title: "Apple Health Available on Mobile",
          description: "Apple Health integration is available when using the iOS app.",
        });
      }
      
      // Continue to next step regardless of connection result
      onConnect();
    } catch (error) {
      console.error('Health connection error:', error);
      toast({
        title: "Connection Failed",
        description: "Unable to connect to Apple Health. You can set this up later in settings.",
        variant: "destructive",
      });
      // Even if failed, continue to next step
      onConnect();
    } finally {
      setIsConnecting(false);
    }
  };

  const handleNotNow = () => {
    toast({
      title: "Skipped",
      description: "You can connect to Apple Health later in your profile settings.",
    });
    onSkip();
  };

  return (
    <div className="max-w-md mx-auto px-4 pt-16">
      {/* Heart Icon */}
      <div className="flex justify-center mb-8">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
          <Heart className="h-10 w-10 text-red-500 fill-red-500" />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">
        Connect to Apple Health
      </h1>

      {/* Description */}
      <p className="text-center text-gray-600 mb-12 leading-relaxed">
        Sync your daily activity between Kalore and the Health app to have the most thorough data.
      </p>

      {/* Buttons */}
      <div className="space-y-4">
        {/* Continue Button */}
        <Button
          onClick={handleConnectHealth}
          disabled={isConnecting}
          className="w-full h-14 text-white font-semibold rounded-full text-lg"
          style={{ backgroundColor: '#4AD4B2' }}
        >
          {isConnecting ? 'Connecting...' : 'Continue'}
        </Button>

        {/* Not Now Button */}
        <div className="text-center">
          <button
            onClick={handleNotNow}
            disabled={isConnecting}
            className="text-gray-600 hover:text-gray-800 font-medium"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HealthConnectStep;