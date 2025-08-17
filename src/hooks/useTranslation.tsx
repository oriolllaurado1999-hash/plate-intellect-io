import { useState, useEffect } from 'react';
import { getTranslations, getCurrentLanguage, setAppLanguage, getDeviceLanguage, type Translations } from '@/lib/i18n';

export const useTranslation = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>(getCurrentLanguage());
  const [t, setT] = useState<Translations>(getTranslations(currentLanguage));

  useEffect(() => {
    // Set initial language based on device language if no language is stored
    const storedLanguage = localStorage.getItem('appLanguage');
    if (!storedLanguage) {
      const deviceLanguage = getDeviceLanguage();
      setAppLanguage(deviceLanguage);
      setCurrentLanguage(deviceLanguage);
    }

    const handleLanguageChange = (event: CustomEvent) => {
      const newLanguage = event.detail;
      setCurrentLanguage(newLanguage);
      setT(getTranslations(newLanguage));
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, []);

  const changeLanguage = (languageCode: string) => {
    setAppLanguage(languageCode);
    setCurrentLanguage(languageCode);
    setT(getTranslations(languageCode));
  };

  return {
    t,
    currentLanguage,
    changeLanguage
  };
};