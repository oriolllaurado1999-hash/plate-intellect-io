import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import { Bell, BellRing } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';

interface NotificationStepProps {
  onAllow: () => void;
  onDeny: () => void;
}

const NotificationStep = ({ onAllow, onDeny }: NotificationStepProps) => {
  const [showModal, setShowModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const bellRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const { requestPermissions, scheduleDailyReminders } = useNotifications();

  const handleAllow = async () => {
    setIsProcessing(true);
    
    try {
      const granted = await requestPermissions();
      
      if (granted) {
        // Schedule daily reminders if permission was granted
        await scheduleDailyReminders();
      }
      
      // Continue to next step regardless of permission result
      onAllow();
    } catch (error) {
      console.error('Error handling notification permission:', error);
      onAllow(); // Continue even if there's an error
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeny = () => {
    onDeny();
  };

  useEffect(() => {
    const bell = bellRef.current;
    
    if (bell) {
      // Animate bell
      bell.style.opacity = '0';
      bell.style.transform = 'scale(0.8) translateY(-20px)';
      
      setTimeout(() => {
        bell.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        bell.style.opacity = '1';
        bell.style.transform = 'scale(1) translateY(0)';
      }, 400);
    }

    // Show modal after bell animation
    setTimeout(() => {
      setShowModal(true);
    }, 1200);
  }, []);

  useEffect(() => {
    if (showModal && modalRef.current) {
      const modal = modalRef.current;
      modal.style.opacity = '0';
      modal.style.transform = 'scale(0.9) translateY(20px)';
      
      setTimeout(() => {
        modal.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        modal.style.opacity = '1';
        modal.style.transform = 'scale(1) translateY(0)';
      }, 100);
    }
  }, [showModal]);

  return (
    <div className="flex flex-col h-full px-6 py-8 relative bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="flex-1 flex flex-col justify-center items-center">
        <div ref={bellRef} className="mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <BellRing className="h-12 w-12 text-primary animate-pulse" />
            </div>
            {/* Notification rings */}
            <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-primary" />
            <div className="absolute inset-2 rounded-full animate-ping opacity-30 bg-primary" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Reach your goals with notifications
          </h1>
        </div>

        {/* Native-style notification modal */}
        {showModal && (
          <div ref={modalRef} className="w-full max-w-sm">
            <div className="bg-muted/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl">
              <div className="p-6 text-center">
                <div className="text-lg font-semibold text-foreground mb-2">
                  Kalore would like to send you Notifications
                </div>
              </div>
              
              <div className="flex">
                <button
                  onClick={handleDeny}
                  disabled={isProcessing}
                  className="flex-1 bg-muted/50 hover:bg-muted/70 transition-colors py-4 text-muted-foreground font-medium disabled:opacity-50"
                >
                  Don't Allow
                </button>
                <button
                  onClick={handleAllow}
                  disabled={isProcessing}
                  className="flex-1 bg-foreground hover:bg-foreground/90 transition-colors py-4 text-background font-medium disabled:opacity-50"
                >
                  {isProcessing ? 'Processing...' : 'Allow'}
                </button>
              </div>
            </div>
            
            {/* Pointing finger */}
            <div className="flex justify-end mt-4 mr-8">
              <div className="text-3xl animate-bounce">👆</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationStep;