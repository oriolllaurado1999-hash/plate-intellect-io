import { Outlet, useLocation, Link } from 'react-router-dom';
import { Home, BarChart3, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const Layout = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
  };

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: BarChart3, label: 'Progress', path: '/goals' },
    { icon: Settings, label: 'Settings', path: '/profile' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex flex-col">

      {/* Main Content */}
      <main className="flex-1 pb-20">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 border-t z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-around h-16">
            {navItems.map(({ icon: Icon, label, path }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={cn(
                    "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors min-w-[60px]",
                    isActive 
                      ? "text-primary" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Layout;