import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { LanguageSelector } from '@/components/LanguageSelector';

const Auth = () => {
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const navigate = useNavigate();
  const { t, currentLanguage, changeLanguage } = useTranslation();

  const handleGetStarted = () => {
    navigate('/onboarding');
  };

  const handleSignIn = () => {
    navigate('/onboarding');
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
          className="w-full h-14 bg-black text-white font-medium rounded-full text-lg hover:bg-gray-800 mb-4"
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
    </div>
  );
};

export default Auth;