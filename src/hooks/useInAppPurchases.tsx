import { useState, useEffect, createContext, useContext } from 'react';
import { InAppPurchases, IAPProduct, PurchaseResult } from '@capacitor-community/in-app-purchases';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

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
  products: IAPProduct[];
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
  const [products, setProducts] = useState<IAPProduct[]>([]);
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
      
      // Initialize the plugin
      await InAppPurchases.initialize();
      
      // Set up purchase update listener
      InAppPurchases.addListener('purchaseUpdated', (data) => {
        console.log('Purchase updated:', data);
        handlePurchaseUpdate(data.purchases);
      });

      // Load products
      await loadProducts();
      
      setLoading(false);
    } catch (error) {
      console.error('Failed to initialize In-App Purchases:', error);
      setLoading(false);
    }
  };

  const loadProducts = async () => {
    try {
      const productIds = Object.values(PRODUCT_IDS);
      const result = await InAppPurchases.getProducts({ productIds });
      
      console.log('Loaded products:', result.products);
      setProducts(result.products);
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

      const result = await InAppPurchases.purchaseProduct({ productId });
      console.log('Purchase result:', result);
      
      // The purchase will be handled by the purchaseUpdated listener
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

  const handlePurchaseUpdate = async (purchases: PurchaseResult[]) => {
    for (const purchase of purchases) {
      if (purchase.state === 'purchased') {
        await processPurchase(purchase);
      }
    }
    setLoading(false);
  };

  const processPurchase = async (purchase: PurchaseResult) => {
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
          platform: purchase.platform
        }
      });

      if (error) {
        console.error('Receipt validation failed:', error);
        return;
      }

      console.log('Purchase validated successfully:', data);
      
      // Update local subscription state
      await refreshSubscription();
      
      toast({
        title: "Purchase Successful! 🎉",
        description: "Your subscription has been activated.",
      });

      // Acknowledge/finish the purchase
      await InAppPurchases.acknowledgePurchase({
        transactionId: purchase.transactionId
      });

    } catch (error) {
      console.error('Failed to process purchase:', error);
      toast({
        title: "Processing Error",
        description: "Purchase completed but failed to activate. Please contact support.",
        variant: "destructive",
      });
    }
  };

  const restorePurchases = async () => {
    if (!user) return;

    try {
      setLoading(true);
      console.log('Restoring purchases...');
      
      const result = await InAppPurchases.restorePurchases();
      console.log('Restore result:', result);
      
      if (result.purchases.length === 0) {
        toast({
          title: "No Purchases Found",
          description: "No previous purchases found for this account.",
        });
      } else {
        await handlePurchaseUpdate(result.purchases);
        toast({
          title: "Purchases Restored",
          description: "Your previous purchases have been restored.",
        });
      }
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