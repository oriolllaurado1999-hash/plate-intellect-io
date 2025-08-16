import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface LanguageSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: string;
  onLanguageSelect: (languageCode: string) => void;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'zh', name: '中国人', flag: '🇨🇳' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
];

export const LanguageSelector = ({ isOpen, onClose, currentLanguage, onLanguageSelect }: LanguageSelectorProps) => {
  const handleLanguageSelect = (languageCode: string) => {
    onLanguageSelect(languageCode);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-background border-2 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center text-foreground">
            Select Language
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-2 py-4">
          {languages.map((language) => (
            <Button
              key={language.code}
              variant="ghost"
              className={`w-full h-auto py-4 px-6 justify-start text-left rounded-xl transition-all duration-200 ${
                currentLanguage === language.code
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'hover:bg-muted'
              }`}
              onClick={() => handleLanguageSelect(language.code)}
            >
              <span className="text-2xl mr-4">{language.flag}</span>
              <span className="text-lg font-medium">{language.name}</span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};