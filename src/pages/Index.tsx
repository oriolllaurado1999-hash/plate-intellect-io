import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, User, Calendar, Target, LogOut } from 'lucide-react';

const Index = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <header className="border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Camera className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-xl font-bold">Cal Tracker</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {user?.email}
            </span>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Welcome to Cal Tracker
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Snap a photo of your meal and let AI analyze the nutrition content instantly
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-dashed border-primary/30 hover:border-primary/50">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit mb-2">
                  <Camera className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-lg">Scan Food</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">Take a photo to analyze nutrition</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto p-3 bg-secondary/10 rounded-full w-fit mb-2">
                  <Calendar className="h-8 w-8 text-secondary-foreground" />
                </div>
                <CardTitle className="text-lg">View History</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">Track your daily intake</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto p-3 bg-accent/10 rounded-full w-fit mb-2">
                  <Target className="h-8 w-8 text-accent-foreground" />
                </div>
                <CardTitle className="text-lg">Goals</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">Set calorie targets</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto p-3 bg-muted/50 rounded-full w-fit mb-2">
                  <User className="h-8 w-8 text-muted-foreground" />
                </div>
                <CardTitle className="text-lg">Profile</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">Manage your account</p>
              </CardContent>
            </Card>
          </div>

          {/* Today's Summary */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Today's Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">No meals logged yet today</p>
                <p className="text-sm text-muted-foreground mt-2">Start by scanning your first meal!</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
