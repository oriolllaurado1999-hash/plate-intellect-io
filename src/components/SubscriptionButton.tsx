import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Check } from 'lucide-react';
import { useInAppPurchases } from '@/hooks/useInAppPurchases';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const SubscriptionButton = () => {
  const { subscription, loading } = useInAppPurchases();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubscribe = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    navigate('/subscription');
  };

  if (subscription?.isActive) {
    return (
      <div className="flex items-center space-x-2 px-3 py-2 bg-green-50 text-green-700 rounded-lg border border-green-200">
        <Check className="w-4 h-4" />
        <span className="text-sm font-medium">Premium Active</span>
        <Badge variant="secondary" className="text-xs">
          {subscription.tier}
        </Badge>
      </div>
    );
  }

  return (
    <Button
      onClick={handleSubscribe}
      disabled={loading}
      className="flex items-center space-x-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
    >
      <Crown className="w-4 h-4" />
      <span>Upgrade to Premium</span>
    </Button>
  );
};

export default SubscriptionButton;