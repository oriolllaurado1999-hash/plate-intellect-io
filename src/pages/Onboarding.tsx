import { useState } from 'react';
import OnboardingFlow from '@/components/OnboardingFlow';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface OnboardingData {
  gender: 'male' | 'female' | 'other' | null;
  workouts: '0-2' | '3-5' | '6+' | null;
  source: 'instagram' | 'friend' | 'tv' | 'x' | 'facebook' | 'google' | 'tiktok' | null;
  hasTriedOtherApps: boolean | null;
}

const Onboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleComplete = async (data: OnboardingData) => {
    try {
      // TODO: Save onboarding data to Supabase
      console.log('Onboarding data:', data);
      
      toast({
        title: "Welcome to Kalore!",
        description: "Your personalized nutrition plan is ready.",
      });

      // Navigate to main dashboard
      navigate('/');
    } catch (error) {
      console.error('Error saving onboarding data:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return <OnboardingFlow onComplete={handleComplete} />;
};

export default Onboarding;