import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { LanguageSelector } from '@/components/LanguageSelector';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { X } from 'lucide-react';

const Auth = () => {
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t, currentLanguage, changeLanguage } = useTranslation();
  const { signInWithGoogle, signInWithApple } = useAuth();
  const { toast } = useToast();

  const handleGetStarted = () => {
    navigate('/onboarding');
  };

  const handleSignIn = () => {
    setShowSignInModal(true);
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const { error } = await signInWithGoogle();
      
      if (error) {
        toast({
          title: "Error",
          description: "Could not sign in with Google. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome!",
          description: "Successfully signed in with Google.",
        });
        navigate('/');
      }
    } catch (err) {
      console.error('Google sign-in error:', err);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    setIsLoading(true);
    try {
      const { error } = await signInWithApple();
      
      if (error) {
        toast({
          title: "Error",
          description: "Could not sign in with Apple. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome!",
          description: "Successfully signed in with Apple.",
        });
        navigate('/');
      }
    } catch (err) {
      console.error('Apple sign-in error:', err);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Get current language display info
  const getCurrentLanguageInfo = () => {
    const languages = [
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'es', name: 'Español', flag: '🇪🇸' },
      { code: 'zh', name: '中国人', flag: '🇨🇳' },
      { code: 'pt', name: 'Português', flag: '🇧🇷' },
      { code: 'fr', name: 'Français', flag: '🇫🇷' },
      { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
      { code: 'it', name: 'Italiano', flag: '🇮🇹' },
      { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    ];
    return languages.find(lang => lang.code === currentLanguage) || languages[0];
  };

  const currentLangInfo = getCurrentLanguageInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 flex flex-col items-center justify-center p-4 light relative">
      {/* Language Selector */}
      <div className="absolute top-4 right-4">
        <button 
          onClick={() => setShowLanguageSelector(true)}
          className="flex items-center gap-1.5 px-2 py-1.5 bg-white rounded-full shadow-sm border border-gray-200 hover:bg-gray-50"
        >
          <span className="text-sm">{currentLangInfo.flag}</span>
          <span className="text-xs font-medium text-gray-700">{currentLangInfo.code.toUpperCase()}</span>
        </button>
      </div>
      
      <div className="w-full max-w-sm">
        {/* iPhone Image - to be provided */}
        <div className="relative mx-auto mb-8">
          {/* Placeholder for iPhone image */}
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t.calorieTracking}<br />{t.madeEasy}
          </h1>
        </div>

        {/* Get Started Button */}
        <Button
          onClick={handleGetStarted}
          className="w-full h-14 text-white font-medium rounded-full text-lg mb-4 hover:opacity-90"
          style={{ backgroundColor: '#4AD4B2' }}
        >
          {t.getStarted}
        </Button>

        {/* Sign In Link */}
        <div className="text-center">
          <button
            onClick={handleSignIn}
            className="text-gray-600 hover:text-gray-800"
          >
            {t.alreadyHaveAccount} <span className="font-medium">{t.signIn}</span>
          </button>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          {t.termsPrivacy}
        </p>
      </div>

      <LanguageSelector
        isOpen={showLanguageSelector}
        onClose={() => setShowLanguageSelector(false)}
        currentLanguage={currentLanguage}
        onLanguageSelect={changeLanguage}
      />

      {/* Sign In Modal */}
      <Dialog open={showSignInModal} onOpenChange={setShowSignInModal}>
        <DialogContent className="sm:max-w-sm mx-4 rounded-3xl bg-white border-none shadow-2xl">
          <DialogHeader className="pb-2">
            <DialogTitle className="text-2xl font-bold text-center text-gray-900 pt-2">
              Sign In
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 pt-4 pb-6">
            {/* Apple Sign In Button */}
            <Button
              onClick={handleAppleSignIn}
              disabled={isLoading}
              className="w-full bg-black text-white hover:bg-black/90 h-12 text-base font-semibold rounded-2xl flex items-center justify-center gap-3 border-none"
            >
              <svg className="h-5 w-5 fill-white" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              {isLoading ? 'Signing in...' : 'Sign in with Apple'}
            </Button>

            {/* Google Sign In Button */}
            <Button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              variant="outline"
              className="w-full bg-white text-gray-800 border-2 border-gray-300 hover:bg-gray-50 h-12 text-base font-semibold rounded-2xl flex items-center justify-center gap-3"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {isLoading ? 'Signing in...' : 'Sign in with Google'}
            </Button>

            {/* Continue with Email Button */}
            <Button
              variant="outline"
              className="w-full bg-white text-gray-800 border-2 border-gray-300 hover:bg-gray-50 h-12 text-base font-semibold rounded-2xl flex items-center justify-center gap-3"
              onClick={() => {
                setShowSignInModal(false);
                toast({
                  title: "Coming Soon",
                  description: "Email sign in will be available soon.",
                });
              }}
            >
              <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Continue with email
            </Button>
          </div>

          {/* Terms and Conditions */}
          <div className="text-center text-xs text-gray-600 pb-4 px-4">
            By continuing you agree to Kalore's{' '}
            <span className="underline cursor-pointer hover:text-gray-800">
              Terms and Conditions
            </span>{' '}
            and{' '}
            <span className="underline cursor-pointer hover:text-gray-800">
              Privacy Policy
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Auth;