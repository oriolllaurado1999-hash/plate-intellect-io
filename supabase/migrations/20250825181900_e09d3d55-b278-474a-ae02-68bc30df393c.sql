-- Create custom_foods table for user-created foods
CREATE TABLE public.custom_foods (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  brand_name TEXT,
  description TEXT NOT NULL,
  serving_size TEXT NOT NULL,
  serving_per_container TEXT NOT NULL,
  
  -- Nutrition information per serving
  calories NUMERIC NOT NULL,
  protein NUMERIC DEFAULT 0,
  carbs NUMERIC DEFAULT 0,
  total_fat NUMERIC DEFAULT 0,
  saturated_fat NUMERIC DEFAULT 0,
  polyunsaturated_fat NUMERIC DEFAULT 0,
  monounsaturated_fat NUMERIC DEFAULT 0,
  trans_fat NUMERIC DEFAULT 0,
  cholesterol NUMERIC DEFAULT 0,
  sodium NUMERIC DEFAULT 0,
  potassium NUMERIC DEFAULT 0,
  sugar NUMERIC DEFAULT 0,
  fiber NUMERIC DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.custom_foods ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own custom foods" 
ON public.custom_foods 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own custom foods" 
ON public.custom_foods 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own custom foods" 
ON public.custom_foods 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own custom foods" 
ON public.custom_foods 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_custom_foods_updated_at
BEFORE UPDATE ON public.custom_foods
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();