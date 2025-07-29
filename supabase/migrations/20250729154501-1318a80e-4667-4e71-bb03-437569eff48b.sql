-- Create food items table for nutritional database
CREATE TABLE public.food_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT,
  barcode TEXT,
  calories_per_100g DECIMAL(6,2) NOT NULL,
  protein_per_100g DECIMAL(5,2) DEFAULT 0,
  carbs_per_100g DECIMAL(5,2) DEFAULT 0,
  fat_per_100g DECIMAL(5,2) DEFAULT 0,
  fiber_per_100g DECIMAL(5,2) DEFAULT 0,
  sugar_per_100g DECIMAL(5,2) DEFAULT 0,
  sodium_per_100g DECIMAL(7,2) DEFAULT 0, -- in mg
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create meals table
CREATE TABLE public.meals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  meal_type TEXT CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')) NOT NULL,
  meal_date DATE NOT NULL DEFAULT CURRENT_DATE,
  image_url TEXT,
  total_calories DECIMAL(7,2) DEFAULT 0,
  total_protein DECIMAL(6,2) DEFAULT 0,
  total_carbs DECIMAL(6,2) DEFAULT 0,
  total_fat DECIMAL(6,2) DEFAULT 0,
  total_fiber DECIMAL(6,2) DEFAULT 0,
  ai_analyzed BOOLEAN DEFAULT FALSE,
  ai_confidence DECIMAL(3,2), -- 0.00 to 1.00
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create meal_items table (foods detected in each meal)
CREATE TABLE public.meal_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  meal_id UUID NOT NULL REFERENCES public.meals(id) ON DELETE CASCADE,
  food_item_id UUID REFERENCES public.food_items(id),
  food_name TEXT NOT NULL, -- AI detected name
  quantity DECIMAL(6,2) NOT NULL, -- in grams
  calories DECIMAL(6,2) NOT NULL,
  protein DECIMAL(5,2) DEFAULT 0,
  carbs DECIMAL(5,2) DEFAULT 0,
  fat DECIMAL(5,2) DEFAULT 0,
  fiber DECIMAL(5,2) DEFAULT 0,
  confidence DECIMAL(3,2), -- AI confidence for this item
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.food_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meal_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for food_items (publicly readable, admin writable)
CREATE POLICY "Food items are viewable by everyone" 
ON public.food_items 
FOR SELECT 
USING (true);

-- RLS Policies for meals
CREATE POLICY "Users can view their own meals" 
ON public.meals 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own meals" 
ON public.meals 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own meals" 
ON public.meals 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own meals" 
ON public.meals 
FOR DELETE 
USING (auth.uid() = user_id);

-- RLS Policies for meal_items
CREATE POLICY "Users can view their own meal items" 
ON public.meal_items 
FOR SELECT 
USING (auth.uid() = (SELECT user_id FROM public.meals WHERE id = meal_id));

CREATE POLICY "Users can create meal items for their own meals" 
ON public.meal_items 
FOR INSERT 
WITH CHECK (auth.uid() = (SELECT user_id FROM public.meals WHERE id = meal_id));

CREATE POLICY "Users can update their own meal items" 
ON public.meal_items 
FOR UPDATE 
USING (auth.uid() = (SELECT user_id FROM public.meals WHERE id = meal_id));

CREATE POLICY "Users can delete their own meal items" 
ON public.meal_items 
FOR DELETE 
USING (auth.uid() = (SELECT user_id FROM public.meals WHERE id = meal_id));

-- Add triggers for automatic timestamp updates
CREATE TRIGGER update_food_items_updated_at
BEFORE UPDATE ON public.food_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_meals_updated_at
BEFORE UPDATE ON public.meals
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_meal_items_updated_at
BEFORE UPDATE ON public.meal_items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_meals_user_id_date ON public.meals(user_id, meal_date);
CREATE INDEX idx_meal_items_meal_id ON public.meal_items(meal_id);
CREATE INDEX idx_food_items_name ON public.food_items(name);

-- Insert some sample food items for testing
INSERT INTO public.food_items (name, calories_per_100g, protein_per_100g, carbs_per_100g, fat_per_100g, fiber_per_100g) VALUES
('Apple', 52, 0.3, 14, 0.2, 2.4),
('Banana', 89, 1.1, 23, 0.3, 2.6),
('Chicken Breast', 165, 31, 0, 3.6, 0),
('Brown Rice', 123, 2.6, 23, 0.9, 1.8),
('Broccoli', 34, 2.8, 7, 0.4, 2.6),
('Salmon', 208, 20, 0, 13, 0),
('Eggs', 155, 13, 1.1, 11, 0),
('Avocado', 160, 2, 9, 15, 7),
('Oatmeal', 68, 2.4, 12, 1.4, 1.7),
('Greek Yogurt', 59, 10, 3.6, 0.4, 0);