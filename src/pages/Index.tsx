import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, User, Calendar, Target, LogOut } from 'lucide-react';
import CameraScanner from '@/components/CameraScanner';
import NutritionReview from '@/components/NutritionReview';

const Index = () => {
  const { user, signOut } = useAuth();
  const [showScanner, setShowScanner] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [capturedImage, setCapturedImage] = useState('');

  const handleSignOut = async () => {
    await signOut();
  };

  const handleAnalysisComplete = (analysis: any, imageUrl: string) => {
    setAnalysisData(analysis);
    setCapturedImage(imageUrl);
    setShowScanner(false);
    setShowReview(true);
  };

  const handleMealSaved = () => {
    setShowReview(false);
    setAnalysisData(null);
    setCapturedImage('');
    // TODO: Refresh meals data
  };

  const handleReviewCancel = () => {
    setShowReview(false);
    setAnalysisData(null);
    setCapturedImage('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Welcome to Kalore
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Snap a photo of your meal and let AI analyze the nutrition content instantly
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card 
            className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-dashed border-primary/30 hover:border-primary/50"
            onClick={() => setShowScanner(true)}
          >
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

      {/* Modals */}
      {showScanner && (
        <CameraScanner
          onAnalysisComplete={handleAnalysisComplete}
          onClose={() => setShowScanner(false)}
        />
      )}

      {showReview && analysisData && (
        <NutritionReview
          analysis={analysisData}
          imageUrl={capturedImage}
          onSave={handleMealSaved}
          onCancel={handleReviewCancel}
        />
      )}
    </div>
  );
};

export default Index;
