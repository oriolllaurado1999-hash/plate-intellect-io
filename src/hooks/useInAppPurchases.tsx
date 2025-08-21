import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

// Mock types for In-App Purchase products
interface MockIAPProduct {
  productId: string;
  title: string;
  description: string;
  price: string;
  currency: string;
}

interface Subscription {
  id: string;
  productId: string;
  isActive: boolean;
  expiryDate: Date | null;
  tier: 'monthly' | 'annual';
}

interface InAppPurchasesContextType {
  subscription: Subscription | null;
  loading: boolean;
  products: MockIAPProduct[];
  purchaseProduct: (productId: string) => Promise<void>;
  restorePurchases: () => Promise<void>;
  refreshSubscription: () => Promise<void>;
}

const InAppPurchasesContext = createContext<InAppPurchasesContextType | undefined>(undefined);

// Product IDs - estos deben coincidir con los configurados en App Store Connect y Google Play Console
const PRODUCT_IDS = {
  MONTHLY: 'kalore_monthly_subscription',
  ANNUAL: 'kalore_annual_subscription'
};

export function InAppPurchasesProvider({ children }: { children: React.ReactNode }) {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<MockIAPProduct[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    initializeIAP();
  }, []);

  useEffect(() => {
    if (user) {
      refreshSubscription();
    }
  }, [user]);

  const initializeIAP = async () => {
    try {
      console.log('Initializing In-App Purchases...');
      
      // Load mock products for web/development
      await loadProducts();
      
      setLoading(false);
    } catch (error) {
      console.error('Failed to initialize In-App Purchases:', error);
      setLoading(false);
    }
  };

  const loadProducts = async () => {
    try {
      // Mock products for development/web version
      const mockProducts: MockIAPProduct[] = [
        {
          productId: PRODUCT_IDS.MONTHLY,
          title: 'Kalore Monthly',
          description: 'Monthly subscription to Kalore Premium',
          price: '$9.99',
          currency: 'USD'
        },
        {
          productId: PRODUCT_IDS.ANNUAL,
          title: 'Kalore Annual',
          description: 'Annual subscription to Kalore Premium',
          price: '$59.88',
          currency: 'USD'
        }
      ];
      
      console.log('Loaded mock products:', mockProducts);
      setProducts(mockProducts);
    } catch (error) {
      console.error('Failed to load products:', error);
    }
  };

  const purchaseProduct = async (productId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to purchase a subscription.",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log('Purchasing product:', productId);
      setLoading(true);

      // For web/development: simulate purchase with mock data
      const mockPurchase = {
        productId,
        transactionId: `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        originalTransactionId: `original_${Date.now()}`,
        platform: 'web'
      };

      await processPurchase(mockPurchase);
      
    } catch (error) {
      console.error('Purchase failed:', error);
      toast({
        title: "Purchase Failed",
        description: "Failed to complete the purchase. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const processPurchase = async (purchase: any) => {
    if (!user) return;

    try {
      console.log('Processing purchase:', purchase);

      // Validate receipt with our backend
      const { data, error } = await supabase.functions.invoke('validate-purchase', {
        body: {
          userId: user.id,
          productId: purchase.productId,
          transactionId: purchase.transactionId,
          receiptData: purchase.originalTransactionId,
          platform: purchase.platform || 'web'
        }
      });

      if (error) {
        console.error('Receipt validation failed:', error);
        toast({
          title: "Validation Error",
          description: "Failed to validate purchase. Please try again.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      console.log('Purchase validated successfully:', data);
      
      // Update local subscription state
      await refreshSubscription();
      
      toast({
        title: "Purchase Successful! 🎉",
        description: "Your subscription has been activated.",
      });

      setLoading(false);

    } catch (error) {
      console.error('Failed to process purchase:', error);
      toast({
        title: "Processing Error",
        description: "Purchase completed but failed to activate. Please contact support.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const restorePurchases = async () => {
    if (!user) return;

    try {
      setLoading(true);
      console.log('Restoring purchases...');
      
      // For web/development: just refresh current subscription
      await refreshSubscription();
      
      toast({
        title: "Purchases Restored",
        description: "Your subscription status has been refreshed.",
      });
    } catch (error) {
      console.error('Failed to restore purchases:', error);
      toast({
        title: "Restore Failed",
        description: "Failed to restore purchases. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshSubscription = async () => {
    if (!user) return;

    try {
      // Get subscription status from our database
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Failed to fetch subscription:', error);
        return;
      }

      if (data) {
        setSubscription({
          id: data.id,
          productId: data.product_id,
          isActive: data.is_active,
          expiryDate: data.expiry_date ? new Date(data.expiry_date) : null,
          tier: data.product_id.includes('annual') ? 'annual' : 'monthly'
        });
      } else {
        setSubscription(null);
      }
    } catch (error) {
      console.error('Failed to refresh subscription:', error);
    }
  };

  const value = {
    subscription,
    loading,
    products,
    purchaseProduct,
    restorePurchases,
    refreshSubscription
  };

  return (
    <InAppPurchasesContext.Provider value={value}>
      {children}
    </InAppPurchasesContext.Provider>
  );
}

export function useInAppPurchases() {
  const context = useContext(InAppPurchasesContext);
  if (context === undefined) {
    throw new Error('useInAppPurchases must be used within an InAppPurchasesProvider');
  }
  return context;
}