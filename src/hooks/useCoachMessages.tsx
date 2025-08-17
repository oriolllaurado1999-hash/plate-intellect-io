import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface CoachMessage {
  id: string;
  message_type: string;
  message_content: string;
  message_preview: string;
  is_read: boolean;
  created_at: string;
}

export const useCoachMessages = () => {
  const [unreadMessages, setUnreadMessages] = useState<CoachMessage[]>([]);
  const [latestMessage, setLatestMessage] = useState<CoachMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchUnreadMessages = async () => {
    if (!user?.id) return;

    try {
      const { data, error } = await supabase
        .from('daily_coach_messages')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_read', false)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setUnreadMessages(data || []);
      setLatestMessage(data?.[0] || null);
    } catch (error) {
      console.error('Error fetching unread messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateDailyMessage = async (language: string = 'es') => {
    if (!user?.id) return null;

    try {
      const response = await supabase.functions.invoke('daily-coach-message', {
        body: {
          userId: user.id,
          language
        }
      });

      if (response.error) throw response.error;

      const { message, isNew } = response.data;
      
      if (isNew) {
        // Refresh unread messages if new message was created
        await fetchUnreadMessages();
      }

      return message;
    } catch (error) {
      console.error('Error generating daily message:', error);
      return null;
    }
  };

  const markAsRead = async (messageId: string) => {
    if (!user?.id) return;

    try {
      const { error } = await supabase
        .from('daily_coach_messages')
        .update({ is_read: true })
        .eq('id', messageId)
        .eq('user_id', user.id);

      if (error) throw error;

      // Update local state
      setUnreadMessages(prev => prev.filter(msg => msg.id !== messageId));
      if (latestMessage?.id === messageId) {
        setLatestMessage(null);
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const markAllAsRead = async () => {
    if (!user?.id || unreadMessages.length === 0) return;

    try {
      const { error } = await supabase
        .from('daily_coach_messages')
        .update({ is_read: true })
        .eq('user_id', user.id)
        .eq('is_read', false);

      if (error) throw error;

      setUnreadMessages([]);
      setLatestMessage(null);
    } catch (error) {
      console.error('Error marking all messages as read:', error);
    }
  };

  useEffect(() => {
    fetchUnreadMessages();
  }, [user?.id]);

  // Add a method to regenerate daily message for a specific time and language
  const regenerateDailyMessage = async (language: string = 'es') => {
    if (!user?.id) return null;

    try {
      // Force regeneration by creating a new message for current time
      const response = await supabase.functions.invoke('daily-coach-message', {
        body: {
          userId: user.id,
          language
        }
      });

      if (response.error) throw response.error;

      const { message, isNew } = response.data;
      
      // Always refresh unread messages
      await fetchUnreadMessages();

      return message;
    } catch (error) {
      console.error('Error regenerating daily message:', error);
      return null;
    }
  };

  return {
    unreadMessages,
    latestMessage,
    loading,
    generateDailyMessage,
    regenerateDailyMessage,
    markAsRead,
    markAllAsRead,
    fetchUnreadMessages
  };
};