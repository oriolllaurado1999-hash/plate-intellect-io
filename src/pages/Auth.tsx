import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Camera, Utensils } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    
    const { error } = await signInWithGoogle();
    
    if (error) {
      setError(error.message);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } else {
      navigate('/');
    }
    
    setLoading(false);
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    const { error } = isSignUp 
      ? await signUpWithEmail(email, password)
      : await signInWithEmail(email, password);

    if (error) {
      setError(error.message);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } else {
      if (isSignUp) {
        toast({
          title: "Success",
          description: "Account created successfully! You can now sign in.",
        });
        setIsSignUp(false);
      } else {
        navigate('/');
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 flex flex-col items-center justify-center p-4 light">
      <div className="w-full max-w-sm">
        {/* iPhone Mockup with Dashboard */}
        <div className="relative mx-auto mb-8">
          <div className="w-64 h-[520px] bg-black rounded-[3rem] p-2 shadow-2xl">
            <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
              {/* iPhone Status Bar */}
              <div className="flex justify-between items-center px-6 py-2 text-xs font-medium">
                <span>2:10</span>
                <div className="flex items-center gap-1">
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-black rounded-full"></div>
                    <div className="w-1 h-1 bg-black rounded-full"></div>
                    <div className="w-1 h-1 bg-black rounded-full"></div>
                  </div>
                  <div className="w-4 h-2 border border-black rounded-sm">
                    <div className="w-2 h-1 bg-black rounded-sm m-0.5"></div>
                  </div>
                </div>
              </div>
              
              {/* App Header */}
              <div className="flex items-center justify-center gap-2 px-6 py-4">
                <div className="w-6 h-6 rounded-full overflow-hidden">
                  <img 
                    src="/lovable-uploads/8d5a420d-5831-46b7-ae7a-d0a1aa371262.png" 
                    alt="Kalore Logo" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-lg font-bold text-[#00D4AA]">Kalore</span>
              </div>

              {/* Navigation Pills */}
              <div className="flex justify-center gap-8 px-6 mb-6">
                <div className="text-sm font-medium text-black border-b-2 border-black pb-1">Today</div>
                <div className="text-sm text-gray-400">Yesterday</div>
              </div>

              {/* Calorie Circle */}
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-black">2199</div>
                <div className="text-xs text-gray-500">Calories left</div>
                <div className="w-20 h-20 mx-auto mt-2 border-4 border-gray-200 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Macro Cards */}
              <div className="flex justify-between px-6 mb-6">
                <div className="text-center">
                  <div className="text-lg font-bold">161g</div>
                  <div className="text-xs text-gray-500">Protein left</div>
                  <div className="w-8 h-8 mx-auto mt-2 bg-red-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold">251g</div>
                  <div className="text-xs text-gray-500">Carbs left</div>
                  <div className="w-8 h-8 mx-auto mt-2 bg-orange-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold">61g</div>
                  <div className="text-xs text-gray-500">Fat left</div>
                  <div className="w-8 h-8 mx-auto mt-2 bg-blue-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Recently eaten */}
              <div className="px-6">
                <div className="text-sm font-medium mb-3">Recently eaten</div>
                <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-3">
                  <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Analyzing food...</div>
                    <div className="text-xs text-gray-500 mt-1">We'll notify you when done!</div>
                  </div>
                  <div className="text-xs font-medium">8%</div>
                </div>
              </div>

              {/* Bottom Navigation */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-between px-8">
                <div className="text-center">
                  <div className="w-6 h-6 mx-auto mb-1 bg-gray-800 rounded"></div>
                  <div className="text-xs">Home</div>
                </div>
                <div className="text-center">
                  <div className="w-6 h-6 mx-auto mb-1 bg-gray-300 rounded"></div>
                  <div className="text-xs text-gray-400">Analytics</div>
                </div>
                <div className="text-center">
                  <div className="w-6 h-6 mx-auto mb-1 bg-gray-300 rounded"></div>
                  <div className="text-xs text-gray-400">Settings</div>
                </div>
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                  <div className="text-white text-xl">+</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Calorie tracking<br />made easy
          </h1>
        </div>

        {/* Get Started Button */}
        <Button
          onClick={() => setIsSignUp(true)}
          className="w-full h-14 bg-black text-white font-medium rounded-full text-lg hover:bg-gray-800 mb-4"
        >
          Get Started
        </Button>

        {/* Sign In Link */}
        <div className="text-center">
          <button
            onClick={() => setIsSignUp(false)}
            className="text-gray-600 hover:text-gray-800"
          >
            Already have an account? <span className="font-medium">Sign In</span>
          </button>
        </div>

        {/* Auth Modal/Form */}
        {(isSignUp || email || password) && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md shadow-xl border-0 bg-white/95 backdrop-blur">
              <CardHeader className="space-y-1 pb-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl text-gray-800 font-bold">
                    {isSignUp ? 'Create Account' : 'Welcome Back'}
                  </CardTitle>
                  <button
                    onClick={() => {
                      setIsSignUp(false);
                      setEmail('');
                      setPassword('');
                      setError('');
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Google Sign In */}
                <Button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  variant="outline"
                  className="w-full h-12 font-medium bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  )}
                  Continue with Google
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">or</span>
                  </div>
                </div>

                {/* Email Form */}
                <form onSubmit={handleEmailAuth} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      className="h-12 bg-white border-gray-300"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      className="h-12 bg-white border-gray-300"
                    />
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full h-12 font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    {isSignUp ? 'Create Account' : 'Sign In'}
                  </Button>
                </form>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-sm text-gray-700 hover:text-gray-900 hover:underline font-medium"
                    disabled={loading}
                  >
                    {isSignUp 
                      ? 'Already have an account? Sign in' 
                      : "Don't have an account? Sign up"
                    }
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <p className="text-center text-xs text-gray-500 mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Auth;