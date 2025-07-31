import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Watch, Smartphone, Activity, Zap, Wifi, WifiOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ActivityData {
  steps: number;
  calories: number;
  heartRate: number;
  lastSync: Date;
}

export default function WearableSync() {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [activityData, setActivityData] = useState<ActivityData | null>(null);
  const { toast } = useToast();

  // Simulate connection status and data
  useEffect(() => {
    if (connected && !activityData) {
      // Simulate fetching data
      setTimeout(() => {
        setActivityData({
          steps: Math.floor(Math.random() * 5000) + 3000,
          calories: Math.floor(Math.random() * 300) + 200,
          heartRate: Math.floor(Math.random() * 30) + 70,
          lastSync: new Date(),
        });
      }, 1000);
    }
  }, [connected, activityData]);

  const connectDevice = async () => {
    setConnecting(true);
    
    // Simulate connection process
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setConnected(true);
      toast({
        title: "Device Connected",
        description: "Successfully connected to your wearable device",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Unable to connect to wearable device",
        variant: "destructive",
      });
    } finally {
      setConnecting(false);
    }
  };

  const disconnect = () => {
    setConnected(false);
    setActivityData(null);
    toast({
      title: "Device Disconnected",
      description: "Wearable device has been disconnected",
    });
  };

  const syncData = async () => {
    if (!connected) return;
    
    // Simulate data sync
    setActivityData(prev => prev ? {
      ...prev,
      steps: prev.steps + Math.floor(Math.random() * 100),
      calories: prev.calories + Math.floor(Math.random() * 20),
      heartRate: Math.floor(Math.random() * 30) + 70,
      lastSync: new Date(),
    } : null);

    toast({
      title: "Data Synced",
      description: "Activity data has been updated",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Watch className="h-5 w-5 text-primary" />
          Wearable Device
          <Badge 
            variant={connected ? "default" : "secondary"}
            className="ml-auto"
          >
            {connected ? (
              <><Wifi className="h-3 w-3 mr-1" /> Connected</>
            ) : (
              <><WifiOff className="h-3 w-3 mr-1" /> Disconnected</>
            )}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!connected ? (
          <div className="text-center py-6">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Smartphone className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-medium mb-2">Connect Your Device</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Sync your activity data from smartwatch or fitness tracker
            </p>
            <Button onClick={connectDevice} disabled={connecting} className="w-full">
              {connecting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Connecting...
                </>
              ) : (
                <>
                  <Watch className="h-4 w-4 mr-2" />
                  Connect Device
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {activityData && (
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{activityData.steps.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Steps</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">{activityData.calories}</div>
                  <div className="text-xs text-muted-foreground">Active Cal</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-500">{activityData.heartRate}</div>
                  <div className="text-xs text-muted-foreground">BPM</div>
                </div>
              </div>
            )}
            
            <div className="flex gap-2">
              <Button onClick={syncData} variant="outline" size="sm" className="flex-1">
                <Activity className="h-4 w-4 mr-2" />
                Sync Now
              </Button>
              <Button onClick={disconnect} variant="outline" size="sm" className="flex-1">
                <WifiOff className="h-4 w-4 mr-2" />
                Disconnect
              </Button>
            </div>
            
            {activityData && (
              <div className="text-xs text-muted-foreground text-center">
                Last sync: {activityData.lastSync.toLocaleTimeString()}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}