-- Create subscriptions table to track user subscriptions
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id TEXT NOT NULL,
  transaction_id TEXT UNIQUE,
  platform TEXT NOT NULL, -- 'ios' or 'android'
  is_active BOOLEAN NOT NULL DEFAULT false,
  expiry_date TIMESTAMPTZ,
  original_transaction_id TEXT,
  receipt_data TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policies for users to manage their own subscriptions
CREATE POLICY "Users can view their own subscriptions" 
ON public.subscriptions 
FOR SELECT 
USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own subscriptions" 
ON public.subscriptions 
FOR INSERT 
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own subscriptions" 
ON public.subscriptions 
FOR UPDATE 
USING (user_id = auth.uid());

-- Create policy for edge functions to manage subscriptions
CREATE POLICY "Edge functions can manage subscriptions" 
ON public.subscriptions 
FOR ALL
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_subscriptions_updated_at
BEFORE UPDATE ON public.subscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();