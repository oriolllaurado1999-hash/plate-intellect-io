-- Add missing fields to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS date_of_birth DATE,
ADD COLUMN IF NOT EXISTS gender TEXT,
ADD COLUMN IF NOT EXISTS daily_step_goal INTEGER DEFAULT 10000;