import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Settings, HelpCircle, Monitor, Moon, Sun, Users, Target, Scale, Clock, Globe, FileText, Shield, Mail, RefreshCw, Trash2, LogOut, Activity, Calculator } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { LanguageSelector } from '@/components/LanguageSelector';

const Profile = () => {
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const [liveActivity, setLiveActivity] = useState(false);
  const [addBurnedCalories, setAddBurnedCalories] = useState(true);
  const [rolloverCalories, setRolloverCalories] = useState(true);
  const [autoAdjustMacros, setAutoAdjustMacros] = useState(true);
  const [isLanguageSelectorOpen, setIsLanguageSelectorOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

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
    setSelectedLanguage(languageCode);
    // Here you can add logic to apply the language change globally
    console.log('Language selected:', languageCode);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Profile</h2>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>

        {/* Profile Cards */}
        <div className="grid gap-6">
          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Account Information
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

          {/* Invite Friends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Invite Friends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-4 text-center">
                <h3 className="font-semibold mb-2">The journey is easier together</h3>
                <p className="text-sm text-muted-foreground mb-3">Earn $10 for each friend referred</p>
                <Button className="w-full">Share Invite Link</Button>
              </div>
            </CardContent>
          </Card>

          {/* Personal Details */}
          <Card>
            <CardContent className="p-4">
              <Button variant="ghost" className="w-full justify-start p-4">
                <User className="h-5 w-5 text-primary mr-3" />
                <span>Personal Details</span>
              </Button>
            </CardContent>
          </Card>

          {/* Edit Nutrition Goals */}
          <Card>
            <CardContent className="p-4">
              <Button variant="ghost" className="w-full justify-start p-4">
                <Target className="h-5 w-5 text-primary mr-3" />
                <span>Edit Nutrition Goals</span>
              </Button>
            </CardContent>
          </Card>

          {/* Goals & Current Weight */}
          <Card>
            <CardContent className="p-4">
              <Button variant="ghost" className="w-full justify-start p-4">
                <Scale className="h-5 w-5 text-primary mr-3" />
                <span>Goals & Current Weight</span>
              </Button>
            </CardContent>
          </Card>

          {/* Weight History */}
          <Card>
            <CardContent className="p-4">
              <Button variant="ghost" className="w-full justify-start p-4">
                <Clock className="h-5 w-5 text-primary mr-3" />
                <span>Weight History</span>
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
                  <span>Language</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {languageNames[selectedLanguage as keyof typeof languageNames]}
                </span>
              </Button>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Appearance */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h4 className="font-medium">Appearance</h4>
                    <p className="text-sm text-muted-foreground">Choose light, dark, or system appearance</p>
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
                    <span className="text-xs">Light</span>
                  </Button>
                  <Button
                    variant={theme === 'dark' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTheme('dark')}
                    className="flex flex-col items-center gap-2 h-auto py-3"
                  >
                    <Moon className="h-4 w-4" />
                    <span className="text-xs">Dark</span>
                  </Button>
                  <Button
                    variant={theme === 'system' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTheme('system')}
                    className="flex flex-col items-center gap-2 h-auto py-3"
                  >
                    <Monitor className="h-4 w-4" />
                    <span className="text-xs">System</span>
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Live Activity */}
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Live Activity</h4>
                  <p className="text-sm text-muted-foreground">Show your daily calories and macros on your lock screen and dynamic island</p>
                </div>
                <Switch checked={liveActivity} onCheckedChange={setLiveActivity} />
              </div>

              <Separator />

              {/* Add Burned Calories */}
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Add Burned Calories</h4>
                  <p className="text-sm text-muted-foreground">Add burned calories back to daily goal</p>
                </div>
                <Switch checked={addBurnedCalories} onCheckedChange={setAddBurnedCalories} />
              </div>

              <Separator />

              {/* Rollover Calories */}
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Rollover Calories</h4>
                  <p className="text-sm text-muted-foreground">Add up to 200 left over calories from yesterday into today's daily goal</p>
                </div>
                <Switch checked={rolloverCalories} onCheckedChange={setRolloverCalories} />
              </div>

              <Separator />

              {/* Auto Adjust Macros */}
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Auto Adjust Macros</h4>
                  <p className="text-sm text-muted-foreground">When editing calories or macronutrients, automatically adjust the other values proportionally</p>
                </div>
                <Switch checked={autoAdjustMacros} onCheckedChange={setAutoAdjustMacros} />
              </div>
            </CardContent>
          </Card>

          {/* Widgets Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Widgets</span>
                <Button variant="link" size="sm">How to add?</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <p className="text-muted-foreground text-sm">Widget configuration coming soon</p>
              </div>
            </CardContent>
          </Card>

          {/* Support & Legal */}
          <Card>
            <CardContent className="p-0">
              <div className="space-y-0">
                <Button variant="ghost" className="w-full justify-start p-4 rounded-none">
                  <FileText className="h-5 w-5 text-primary mr-3" />
                  <span>Terms and Conditions</span>
                </Button>
                <Separator />
                <Button variant="ghost" className="w-full justify-start p-4 rounded-none">
                  <Shield className="h-5 w-5 text-primary mr-3" />
                  <span>Privacy Policy</span>
                </Button>
                <Separator />
                <Button variant="ghost" className="w-full justify-start p-4 rounded-none">
                  <Mail className="h-5 w-5 text-primary mr-3" />
                  <span>Support Email</span>
                </Button>
                <Separator />
                <Button variant="ghost" className="w-full justify-between p-4 rounded-none">
                  <div className="flex items-center">
                    <RefreshCw className="h-5 w-5 text-primary mr-3" />
                    <span>Sync Data</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Last Synced: 12:54 AM</span>
                </Button>
                <Separator />
                <Button variant="ghost" className="w-full justify-start p-4 rounded-none text-destructive hover:text-destructive">
                  <Trash2 className="h-5 w-5 mr-3" />
                  <span>Delete Account</span>
                </Button>
                <Separator />
                <Button 
                  variant="ghost" 
                  className="w-full justify-start p-4 rounded-none text-destructive hover:text-destructive"
                  onClick={() => signOut()}
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  <span>Logout</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Language Selector Modal */}
        <LanguageSelector
          isOpen={isLanguageSelectorOpen}
          onClose={() => setIsLanguageSelectorOpen(false)}
          currentLanguage={selectedLanguage}
          onLanguageSelect={handleLanguageSelect}
        />
      </div>
    </div>
  );
};

export default Profile;