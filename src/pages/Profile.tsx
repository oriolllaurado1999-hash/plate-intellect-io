import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Settings, HelpCircle, Monitor, Moon, Sun, Users, Target, Scale, Clock, Globe, FileText, Shield, Mail, RefreshCw, Trash2, LogOut, Activity, Calculator, Bot, MessageSquare } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

const Profile = () => {
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [liveActivity, setLiveActivity] = useState(false);
  const [addBurnedCalories, setAddBurnedCalories] = useState(true);
  const [rolloverCalories, setRolloverCalories] = useState(true);
  const [autoAdjustMacros, setAutoAdjustMacros] = useState(true);
  const [coachTone, setCoachTone] = useState<'formal' | 'informal'>('formal');
  const [isLoadingCoachPrefs, setIsLoadingCoachPrefs] = useState(true);

  // Load coach preferences
  useEffect(() => {
    const loadCoachPreferences = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('coach_preferences')
          .select('tone_style')
          .eq('user_id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') { // Not found error is ok
          console.error('Error loading coach preferences:', error);
          return;
        }

        if (data) {
          setCoachTone(data.tone_style as 'formal' | 'informal');
        }
      } catch (error) {
        console.error('Error loading coach preferences:', error);
      } finally {
        setIsLoadingCoachPrefs(false);
      }
    };

    loadCoachPreferences();
  }, [user]);

  // Save coach tone preference
  const saveCoachTone = async (newTone: 'formal' | 'informal') => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('coach_preferences')
        .upsert({
          user_id: user.id,
          tone_style: newTone
        }, {
          onConflict: 'user_id'
        });

      if (error) {
        console.error('Error saving coach preferences:', error);
        toast({
          title: "Error",
          description: "Failed to save coach preferences. Please try again.",
          variant: "destructive"
        });
        return;
      }

      setCoachTone(newTone);
      toast({
        title: "Success",
        description: `Kalore Coach will now use ${newTone} tone.`
      });
    } catch (error) {
      console.error('Error saving coach preferences:', error);
      toast({
        title: "Error",
        description: "Failed to save coach preferences. Please try again.",
        variant: "destructive"
      });
    }
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
              <Button variant="ghost" className="w-full justify-start p-4">
                <Globe className="h-5 w-5 text-primary mr-3" />
                <span>Language</span>
              </Button>
            </CardContent>
          </Card>

          {/* Kalore Coach Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                Kalore Coach Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h4 className="font-medium">Coach Tone</h4>
                    <p className="text-sm text-muted-foreground">Choose how your virtual trainer communicates with you</p>
                  </div>
                  <div className="text-sm text-muted-foreground capitalize">{coachTone}</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant={coachTone === 'formal' ? 'default' : 'outline'}
                    size="sm"
                    onClick={async () => {
                      console.log('Formal button clicked');
                      await saveCoachTone('formal');
                    }}
                    disabled={isLoadingCoachPrefs || !user}
                    className="flex flex-col items-center gap-2 h-auto py-4"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <div className="text-center">
                      <div className="text-xs font-medium">Formal</div>
                      <div className="text-xs text-muted-foreground">Professional and polite</div>
                    </div>
                  </Button>
                  <Button
                    variant={coachTone === 'informal' ? 'default' : 'outline'}
                    size="sm"
                    onClick={async () => {
                      console.log('Informal button clicked');
                      await saveCoachTone('informal');
                    }}
                    disabled={isLoadingCoachPrefs || !user}
                    className="flex flex-col items-center gap-2 h-auto py-4"
                  >
                    <Bot className="h-4 w-4" />
                    <div className="text-center">
                      <div className="text-xs font-medium">Informal</div>
                      <div className="text-xs text-muted-foreground">Casual and adaptive</div>
                    </div>
                  </Button>
                </div>
                <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground">
                    <strong>Formal:</strong> Professional, educational tone with proper grammar and vocabulary.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <strong>Informal:</strong> Casual tone that adapts to your communication style. Tell your coach if you don't like specific language.
                  </p>
                  {/* Debug Info */}
                  <div className="mt-2 text-xs text-muted-foreground">
                    Debug: User: {user ? 'Logged in' : 'Not logged in'} | Loading: {isLoadingCoachPrefs ? 'Yes' : 'No'} | Current tone: {coachTone}
                  </div>
                </div>
              </div>
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
      </div>
    </div>
  );
};

export default Profile;