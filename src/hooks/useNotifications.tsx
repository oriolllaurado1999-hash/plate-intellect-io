import { useState, useEffect } from 'react';
import { LocalNotifications } from '@capacitor/local-notifications';
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { useToast } from '@/hooks/use-toast';

export const useNotifications = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [isNative, setIsNative] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsNative(Capacitor.isNativePlatform());
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    if (Capacitor.isNativePlatform()) {
      try {
        const result = await LocalNotifications.checkPermissions();
        setHasPermission(result.display === 'granted');
      } catch (error) {
        console.error('Error checking permissions:', error);
      }
    } else {
      // Web notifications
      setHasPermission(Notification.permission === 'granted');
    }
  };

  const requestPermissions = async () => {
    try {
      if (Capacitor.isNativePlatform()) {
        // Native platform (iOS/Android)
        const result = await LocalNotifications.requestPermissions();
        
        if (result.display === 'granted') {
          setHasPermission(true);
          
          // Also request push notification permissions
          await PushNotifications.requestPermissions();
          
          toast({
            title: "Notifications Enabled",
            description: "You'll now receive helpful reminders and tips from Kalore.",
          });
          
          return true;
        } else {
          toast({
            title: "Notifications Disabled",
            description: "You can enable notifications later in your device settings.",
            variant: "destructive",
          });
          return false;
        }
      } else {
        // Web platform
        const permission = await Notification.requestPermission();
        
        if (permission === 'granted') {
          setHasPermission(true);
          
          toast({
            title: "Notifications Enabled",
            description: "You'll now receive helpful reminders and tips from Kalore.",
          });
          
          return true;
        } else {
          toast({
            title: "Notifications Disabled",
            description: "You can enable notifications later in your browser settings.",
            variant: "destructive",
          });
          return false;
        }
      }
    } catch (error) {
      console.error('Error requesting permissions:', error);
      
      toast({
        title: "Error",
        description: "Could not request notification permissions. Please try again.",
        variant: "destructive",
      });
      
      return false;
    }
  };

  const scheduleNotification = async (title: string, body: string, id: number = 1) => {
    if (!hasPermission) {
      console.warn('No notification permission');
      return;
    }

    try {
      if (Capacitor.isNativePlatform()) {
        await LocalNotifications.schedule({
          notifications: [
            {
              title,
              body,
              id,
              schedule: { at: new Date(Date.now() + 1000) }, // 1 second from now for testing
              sound: 'default',
              attachments: undefined,
              actionTypeId: '',
              extra: null
            }
          ]
        });
      } else {
        // Web notification
        new Notification(title, {
          body,
          icon: '/favicon.ico'
        });
      }
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  };

  const scheduleDailyReminders = async () => {
    if (!hasPermission || !Capacitor.isNativePlatform()) {
      return;
    }

    try {
      // Schedule daily nutrition tracking reminder
      await LocalNotifications.schedule({
        notifications: [
          {
            title: "Track your nutrition",
            body: "Don't forget to log your meals today!",
            id: 100,
            schedule: {
              on: {
                hour: 9,
                minute: 0
              }
            },
            sound: 'default',
            attachments: undefined,
            actionTypeId: '',
            extra: null
          },
          {
            title: "Evening check-in",
            body: "How did your nutrition goals go today?",
            id: 101,
            schedule: {
              on: {
                hour: 20,
                minute: 0
              }
            },
            sound: 'default',
            attachments: undefined,
            actionTypeId: '',
            extra: null
          }
        ]
      });
    } catch (error) {
      console.error('Error scheduling daily reminders:', error);
    }
  };

  return {
    hasPermission,
    isNative,
    requestPermissions,
    scheduleNotification,
    scheduleDailyReminders,
    checkPermissions
  };
};