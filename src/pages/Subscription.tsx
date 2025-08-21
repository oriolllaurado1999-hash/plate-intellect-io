import React from 'react';
import SubscriptionPlans from '@/components/SubscriptionPlans';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Subscription = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
          <h1 className="font-semibold">Subscription</h1>
          <div className="w-16" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Content */}
      <SubscriptionPlans />
    </div>
  );
};

export default Subscription;