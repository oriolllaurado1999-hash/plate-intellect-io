import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Settings, HelpCircle, Monitor, Moon, Sun, Users, Target, Scale, Clock, Globe, FileText, Shield, Mail, RefreshCw, Trash2, LogOut, Activity, Calculator } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';
import { LanguageSelector } from '@/components/LanguageSelector';
import { PersonalDetailsModal } from '@/components/PersonalDetailsModal';
import { NutritionGoalsModal } from '@/components/NutritionGoalsModal';
import { GoalsWeightModal } from '@/components/GoalsWeightModal';
import { WeightHistoryModal } from '@/components/WeightHistoryModal';
import { useTranslation } from '@/hooks/useTranslation';

const Profile = () => {
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const { t, currentLanguage, changeLanguage } = useTranslation();
  const [liveActivity, setLiveActivity] = useState(false);
  const [addBurnedCalories, setAddBurnedCalories] = useState(true);
  const [rolloverCalories, setRolloverCalories] = useState(true);
  const [autoAdjustMacros, setAutoAdjustMacros] = useState(true);
  const [isLanguageSelectorOpen, setIsLanguageSelectorOpen] = useState(false);
  const [isPersonalDetailsOpen, setIsPersonalDetailsOpen] = useState(false);
  const [isNutritionGoalsOpen, setIsNutritionGoalsOpen] = useState(false);
  const [isGoalsWeightOpen, setIsGoalsWeightOpen] = useState(false);
  const [isWeightHistoryOpen, setIsWeightHistoryOpen] = useState(false);

  const languageNames = {
    en: 'English',
    es: 'Español',
    zh: '中国人',
    pt: 'Português',
    fr: 'Français',
    de: 'Deutsch',
    it: 'Italiano',
    ru: 'Русский',
  };

  const handleLanguageSelect = (languageCode: string) => {
    changeLanguage(languageCode);
    console.log('Language selected:', languageCode);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user?.user_metadata?.avatar_url} alt="Profile" />
              <AvatarFallback>
                <User className="w-8 h-8" />
              </AvatarFallback>
            </Avatar>
          </div>
          <h2 className="text-3xl font-bold mb-2">{t.profile}</h2>
          <p className="text-muted-foreground">{t.accountInformation}</p>
        </div>

        {/* Profile Cards */}
        <div className="grid gap-6">
          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                {t.accountInformation}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-lg">{user?.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Details */}
          <Card>
            <CardContent className="p-4">
              <Button 
                variant="ghost" 
                className="w-full justify-start p-4"
                onClick={() => setIsPersonalDetailsOpen(true)}
              >
                <User className="h-5 w-5 text-primary mr-3" />
                <span>{t.personalDetails}</span>
              </Button>
            </CardContent>
          </Card>

          {/* Edit Nutrition Goals */}
          <Card>
            <CardContent className="p-4">
              <Button 
                variant="ghost" 
                className="w-full justify-start p-4"
                onClick={() => setIsNutritionGoalsOpen(true)}
              >
                <Target className="h-5 w-5 text-primary mr-3" />
                <span>{t.editNutritionGoals}</span>
              </Button>
            </CardContent>
          </Card>

          {/* Goals & Current Weight */}
          <Card>
            <CardContent className="p-4">
              <Button 
                variant="ghost" 
                className="w-full justify-start p-4"
                onClick={() => setIsGoalsWeightOpen(true)}
              >
                <Scale className="h-5 w-5 text-primary mr-3" />
                <span>{t.goalsCurrentWeight}</span>
              </Button>
            </CardContent>
          </Card>

          {/* Weight History */}
          <Card>
            <CardContent className="p-4">
              <Button 
                variant="ghost" 
                className="w-full justify-start p-4"
                onClick={() => setIsWeightHistoryOpen(true)}
              >
                <Clock className="h-5 w-5 text-primary mr-3" />
                <span>{t.weightHistory}</span>
              </Button>
            </CardContent>
          </Card>

          {/* Language */}
          <Card>
            <CardContent className="p-4">
              <Button 
                variant="ghost" 
                className="w-full justify-between p-4"
                onClick={() => setIsLanguageSelectorOpen(true)}
              >
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-primary mr-3" />
                  <span>{t.language}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {languageNames[currentLanguage as keyof typeof languageNames]}
                </span>
              </Button>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                {t.preferences}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Appearance */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h4 className="font-medium">{t.appearance}</h4>
                    <p className="text-sm text-muted-foreground">{t.chooseAppearance}</p>
                  </div>
                  <div className="text-sm text-muted-foreground capitalize">{theme}</div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant={theme === 'light' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTheme('light')}
                    className="flex flex-col items-center gap-2 h-auto py-3"
                  >
                    <Sun className="h-4 w-4" />
                    <span className="text-xs">{t.light}</span>
                  </Button>
                  <Button
                    variant={theme === 'dark' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTheme('dark')}
                    className="flex flex-col items-center gap-2 h-auto py-3"
                  >
                    <Moon className="h-4 w-4" />
                    <span className="text-xs">{t.dark}</span>
                  </Button>
                  <Button
                    variant={theme === 'system' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTheme('system')}
                    className="flex flex-col items-center gap-2 h-auto py-3"
                  >
                    <Monitor className="h-4 w-4" />
                    <span className="text-xs">{t.system}</span>
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Live Activity */}
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{t.liveActivity}</h4>
                  <p className="text-sm text-muted-foreground">{t.liveActivityDesc}</p>
                </div>
                <Switch checked={liveActivity} onCheckedChange={setLiveActivity} />
              </div>

              <Separator />

              {/* Add Burned Calories */}
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{t.addBurnedCalories}</h4>
                  <p className="text-sm text-muted-foreground">{t.addBurnedCaloriesDesc}</p>
                </div>
                <Switch checked={addBurnedCalories} onCheckedChange={setAddBurnedCalories} />
              </div>

              <Separator />

              {/* Rollover Calories */}
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{t.rolloverCalories}</h4>
                  <p className="text-sm text-muted-foreground">{t.rolloverCaloriesDesc}</p>
                </div>
                <Switch checked={rolloverCalories} onCheckedChange={setRolloverCalories} />
              </div>

              <Separator />

              {/* Auto Adjust Macros */}
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{t.autoAdjustMacros}</h4>
                  <p className="text-sm text-muted-foreground">{t.autoAdjustMacrosDesc}</p>
                </div>
                <Switch checked={autoAdjustMacros} onCheckedChange={setAutoAdjustMacros} />
              </div>
            </CardContent>
          </Card>


          {/* Support & Legal */}
          <Card>
            <CardContent className="p-0">
              <div className="space-y-0">
                <Button variant="ghost" className="w-full justify-start p-4 rounded-none">
                  <FileText className="h-5 w-5 text-primary mr-3" />
                  <span>{t.termsConditions}</span>
                </Button>
                <Separator />
                <Button variant="ghost" className="w-full justify-start p-4 rounded-none">
                  <Shield className="h-5 w-5 text-primary mr-3" />
                  <span>{t.privacyPolicy}</span>
                </Button>
                <Separator />
                <Button variant="ghost" className="w-full justify-start p-4 rounded-none">
                  <Mail className="h-5 w-5 text-primary mr-3" />
                  <span>{t.supportEmail}</span>
                </Button>
                <Separator />
                <Button variant="ghost" className="w-full justify-between p-4 rounded-none">
                  <div className="flex items-center">
                    <RefreshCw className="h-5 w-5 text-primary mr-3" />
                    <span>{t.syncData}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{t.lastSynced}: 12:54 AM</span>
                </Button>
                <Separator />
                <Button variant="ghost" className="w-full justify-start p-4 rounded-none text-destructive hover:text-destructive">
                  <Trash2 className="h-5 w-5 mr-3" />
                  <span>{t.deleteAccount}</span>
                </Button>
                <Separator />
                <Button 
                  variant="ghost" 
                  className="w-full justify-start p-4 rounded-none text-destructive hover:text-destructive"
                  onClick={() => signOut()}
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  <span>{t.logout}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Modals */}
        <LanguageSelector
          isOpen={isLanguageSelectorOpen}
          onClose={() => setIsLanguageSelectorOpen(false)}
          currentLanguage={currentLanguage}
          onLanguageSelect={handleLanguageSelect}
        />
        
        <PersonalDetailsModal
          isOpen={isPersonalDetailsOpen}
          onClose={() => setIsPersonalDetailsOpen(false)}
        />
        
        <NutritionGoalsModal
          isOpen={isNutritionGoalsOpen}
          onClose={() => setIsNutritionGoalsOpen(false)}
        />
        
        <GoalsWeightModal
          isOpen={isGoalsWeightOpen}
          onClose={() => setIsGoalsWeightOpen(false)}
        />
        
        <WeightHistoryModal
          isOpen={isWeightHistoryOpen}
          onClose={() => setIsWeightHistoryOpen(false)}
        />
      </div>
    </div>
  );
};

export default Profile;