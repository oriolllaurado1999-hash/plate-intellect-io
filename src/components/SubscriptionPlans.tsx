import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useInAppPurchases } from '@/hooks/useInAppPurchases';
import { useAuth } from '@/hooks/useAuth';
import { Loader2, Crown, Check, Smartphone } from 'lucide-react';

const SubscriptionPlans = () => {
  const { products, purchaseProduct, restorePurchases, loading, subscription } = useInAppPurchases();
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('annual');

  const getPlanInfo = (productId: string) => {
    if (productId.includes('annual')) {
      return {
        name: 'Annual Plan',
        duration: 'year',
        savings: 'Save 58%',
        features: ['AI Food Analysis', 'Personal Coach', 'Advanced Tracking', 'Premium Support'],
        recommended: true
      };
    }
    return {
      name: 'Monthly Plan',
      duration: 'month',
      savings: null,
      features: ['AI Food Analysis', 'Personal Coach', 'Advanced Tracking'],
      recommended: false
    };
  };

  const formatPrice = (product: any) => {
    if (product.price) {
      return product.price;
    }
    // Fallback pricing
    return product.productId.includes('annual') ? '$59.88/year' : '$9.99/month';
  };

  const handlePurchase = async (productId: string) => {
    if (!user) {
      // Redirect to auth or show login modal
      return;
    }
    await purchaseProduct(productId);
  };

  if (loading && products.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span className="ml-2 text-muted-foreground">Loading subscription plans...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 mb-4">
          <Crown className="w-6 h-6 text-primary" />
          <h1 className="text-3xl font-bold">Choose Your Plan</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Unlock the full power of AI-driven nutrition tracking
        </p>
      </div>

      {/* Current Subscription Status */}
      {subscription?.isActive && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <Check className="w-5 h-5 text-green-600" />
            <span className="font-medium text-green-800">
              Active {subscription.tier} subscription
            </span>
            {subscription.expiryDate && (
              <span className="text-green-600 text-sm">
                - Expires {subscription.expiryDate.toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Plan Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {products.length > 0 ? (
          products.map((product) => {
            const planInfo = getPlanInfo(product.productId);
            const isSelected = product.productId.includes(selectedPlan);
            
            return (
              <Card 
                key={product.productId}
                className={`relative p-6 cursor-pointer transition-all duration-200 ${
                  isSelected 
                    ? 'border-primary shadow-lg ring-2 ring-primary/20' 
                    : 'border-border hover:border-primary/50'
                } ${planInfo.recommended ? 'border-primary' : ''}`}
                onClick={() => setSelectedPlan(product.productId.includes('annual') ? 'annual' : 'monthly')}
              >
                {planInfo.recommended && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary">
                    Most Popular
                  </Badge>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">{planInfo.name}</h3>
                  <div className="text-3xl font-bold text-primary mb-1">
                    {formatPrice(product)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    per {planInfo.duration}
                  </div>
                  {planInfo.savings && (
                    <div className="text-sm font-medium text-green-600 mt-2">
                      {planInfo.savings}
                    </div>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  {planInfo.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-3">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full"
                  variant={isSelected ? "default" : "outline"}
                  onClick={() => handlePurchase(product.productId)}
                  disabled={loading || subscription?.isActive}
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : subscription?.isActive ? (
                    'Current Plan'
                  ) : (
                    'Choose Plan'
                  )}
                </Button>
              </Card>
            );
          })
        ) : (
          // Fallback UI when products haven't loaded
          <div className="col-span-full text-center p-8">
            <Smartphone className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-semibold mb-2">Mobile App Required</h3>
            <p className="text-muted-foreground mb-4">
              Subscriptions are available through our mobile app using Apple Pay or Google Pay.
            </p>
            <p className="text-sm text-muted-foreground">
              Download the Kalore app from the App Store or Google Play to get started.
            </p>
          </div>
        )}
      </div>

      {/* Restore Purchases */}
      {user && (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={restorePurchases}
            disabled={loading}
            className="text-muted-foreground"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : null}
            Restore Previous Purchases
          </Button>
        </div>
      )}

      {/* Features Grid */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">📸</span>
          </div>
          <h4 className="font-semibold mb-1">AI Photo Analysis</h4>
          <p className="text-sm text-muted-foreground">
            Snap a photo and get instant nutrition facts
          </p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">🤖</span>
          </div>
          <h4 className="font-semibold mb-1">Personal Coach</h4>
          <p className="text-sm text-muted-foreground">
            24/7 AI nutritionist chat support
          </p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">📊</span>
          </div>
          <h4 className="font-semibold mb-1">Advanced Analytics</h4>
          <p className="text-sm text-muted-foreground">
            Detailed progress tracking and insights
          </p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">🎯</span>
          </div>
          <h4 className="font-semibold mb-1">Goal Setting</h4>
          <p className="text-sm text-muted-foreground">
            Personalized nutrition and fitness goals
          </p>
        </div>
      </div>

      {/* Terms */}
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>
          Subscriptions auto-renew. Cancel anytime through your App Store or Google Play account settings.
        </p>
        <div className="mt-2 space-x-4">
          <a href="#" className="underline hover:no-underline">Privacy Policy</a>
          <a href="#" className="underline hover:no-underline">Terms of Service</a>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;