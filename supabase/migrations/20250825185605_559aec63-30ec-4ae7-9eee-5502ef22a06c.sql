-- Create table for saved foods (favorites)
CREATE TABLE public.saved_foods (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  food_id TEXT NOT NULL,
  food_name TEXT NOT NULL,
  food_brand TEXT,
  calories NUMERIC NOT NULL,
  protein NUMERIC DEFAULT 0,
  carbs NUMERIC DEFAULT 0,
  fat NUMERIC DEFAULT 0,
  fiber NUMERIC DEFAULT 0,
  sugar NUMERIC DEFAULT 0,
  sodium NUMERIC DEFAULT 0,
  serving_size TEXT NOT NULL,
  serving_unit TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, food_id)
);

-- Enable Row Level Security
ALTER TABLE public.saved_foods ENABLE ROW LEVEL SECURITY;

-- Create policies for saved foods
CREATE POLICY "Users can view their own saved foods" 
ON public.saved_foods 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own saved foods" 
ON public.saved_foods 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved foods" 
ON public.saved_foods 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_saved_foods_updated_at
BEFORE UPDATE ON public.saved_foods
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();