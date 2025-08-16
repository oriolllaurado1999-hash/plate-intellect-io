-- Create table to track daily coach messages
CREATE TABLE public.daily_coach_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  message_date DATE NOT NULL DEFAULT CURRENT_DATE,
  message_type TEXT NOT NULL, -- 'morning', 'midday', 'afternoon', 'night'
  message_content TEXT NOT NULL,
  message_preview TEXT NOT NULL, -- First 2 lines for preview
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.daily_coach_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own coach messages" 
ON public.daily_coach_messages 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own coach messages" 
ON public.daily_coach_messages 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own coach messages" 
ON public.daily_coach_messages 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own coach messages" 
ON public.daily_coach_messages 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_daily_coach_messages_updated_at
BEFORE UPDATE ON public.daily_coach_messages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance
CREATE INDEX idx_daily_coach_messages_user_date 
ON public.daily_coach_messages(user_id, message_date);

CREATE INDEX idx_daily_coach_messages_unread 
ON public.daily_coach_messages(user_id, is_read) 
WHERE is_read = false;