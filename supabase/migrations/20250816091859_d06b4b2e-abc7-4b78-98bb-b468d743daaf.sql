-- Create coach_preferences table to store user's coach settings
CREATE TABLE public.coach_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tone_style TEXT NOT NULL DEFAULT 'formal' CHECK (tone_style IN ('formal', 'informal')),
  forbidden_words TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE public.coach_preferences ENABLE ROW LEVEL SECURITY;

-- Create policies for coach_preferences
CREATE POLICY "Users can view their own coach preferences" 
ON public.coach_preferences 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own coach preferences" 
ON public.coach_preferences 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own coach preferences" 
ON public.coach_preferences 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own coach preferences" 
ON public.coach_preferences 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_coach_preferences_updated_at
BEFORE UPDATE ON public.coach_preferences
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();