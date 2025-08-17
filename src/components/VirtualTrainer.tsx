import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, Bot, User, ChevronDown, ChevronUp, Sparkles, Bell } from 'lucide-react';
import VoiceRecorder from '@/components/VoiceRecorder';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useCoachMessages } from '@/hooks/useCoachMessages';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from '@/hooks/useTranslation';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface LanguageTexts {
  es: {
    title: string;
    subtitle: string;
    readyToHelp: string;
    welcomeMessage: string;
    quickQuestions: string[];
    quickQuestionsLabel: string;
    placeholder: string;
    error: string;
    errorDescription: string;
    errorMessage: string;
  };
  en: {
    title: string;
    subtitle: string;
    readyToHelp: string;
    welcomeMessage: string;
    quickQuestions: string[];
    quickQuestionsLabel: string;
    placeholder: string;
    error: string;
    errorDescription: string;
    errorMessage: string;
  };
}

const VirtualTrainer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t, currentLanguage } = useTranslation();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { unreadMessages, latestMessage, markAsRead, markAllAsRead } = useCoachMessages();

  const texts: LanguageTexts = {
    es: {
      title: "Kalore Coach",
      subtitle: "Tu entrenador virtual personalizado",
      readyToHelp: "Tu entrenador virtual está listo para ayudarte",
      welcomeMessage: "¡Hola! 👋 Soy tu entrenador virtual Kalore Coach. Estoy aquí para ayudarte con tus objetivos nutricionales. ¿Cómo puedo ayudarte hoy?",
      quickQuestions: [
        "¿Qué debería comer ahora?",
        "¿Cómo voy con mis objetivos hoy?",
        "Sugerencias para la cena",
        "¿Necesito más proteína?"
      ],
      quickQuestionsLabel: "Preguntas rápidas:",
      placeholder: "Escribe tu pregunta...",
      error: "Error",
      errorDescription: "No pude procesar tu mensaje. Por favor intenta de nuevo.",
      errorMessage: "Lo siento, hubo un problema procesando tu mensaje. ¿Podrías intentar de nuevo? 😔"
    },
    en: {
      title: "Kalore Coach",
      subtitle: "Your personalized virtual trainer",
      readyToHelp: "Your virtual trainer is ready to help you",
      welcomeMessage: "Hello! 👋 I'm your virtual trainer Kalore Coach. I'm here to help you with your nutritional goals. How can I help you today?",
      quickQuestions: [
        "What should I eat now?",
        "How am I doing with my goals today?",
        "Dinner suggestions",
        "Do I need more protein?"
      ],
      quickQuestionsLabel: "Quick questions:",
      placeholder: "Type your question...",
      error: "Error",
      errorDescription: "I couldn't process your message. Please try again.",
      errorMessage: "Sorry, there was a problem processing your message. Could you try again? 😔"
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, []);

  useEffect(() => {
    if (isExpanded && messages.length === 0) {
      // Add coach message first if available, then welcome message
      const messagesToAdd: Message[] = [];
      
      if (latestMessage) {
        messagesToAdd.push({
          id: latestMessage.id,
          content: latestMessage.message_content,
          role: 'assistant',
          timestamp: new Date(latestMessage.created_at)
        });
      } else {
        messagesToAdd.push({
          id: '1',
          content: texts[currentLanguage].welcomeMessage,
          role: 'assistant',
          timestamp: new Date()
        });
      }
      
      setMessages(messagesToAdd);
      
      // Mark coach message as read when opened
      if (latestMessage) {
        markAsRead(latestMessage.id);
      }
      // Mark all unread messages as read when chat is opened
      if (unreadMessages.length > 0) {
        markAllAsRead();
      }
    }
  }, [isExpanded, currentLanguage, latestMessage]);

  const sendMessage = async (message?: string) => {
    const messageToSend = message || inputMessage;
    if (!messageToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageToSend,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    if (!message) setInputMessage(''); // Only clear if it's from input, not voice
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('virtual-trainer', {
        body: { message: messageToSend }
      });

      if (error) {
        throw error;
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        role: 'assistant',
        timestamp: new Date()
      };

      // Update language if detected from response
      if (data.language && data.language !== currentLanguage) {
        setCurrentLanguage(data.language);
      }

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling virtual trainer:', error);
      toast({
        title: texts[currentLanguage].error,
        description: texts[currentLanguage].errorDescription,
        variant: "destructive"
      });

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: texts[currentLanguage].errorMessage,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatMessage = (content: string) => {
    // Convert **text** to <strong>text</strong> for bold formatting
    const formattedContent = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    return formattedContent;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendTextMessage();
    }
  };

  const handleSendTextMessage = () => {
    sendMessage();
  };


  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  if (!isExpanded) {
    return (
      <Card 
        className="shadow-lg dark:shadow-xl cursor-pointer hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 border-2 relative"
        style={{ borderColor: '#4AD4B2' }}
        onClick={() => setIsExpanded(true)}
      >
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center relative"
              style={{ backgroundColor: 'rgba(74, 212, 178, 0.15)' }}
            >
              <Bot className="w-6 h-6" style={{ color: '#4AD4B2' }} />
              {unreadMessages.length > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs"
                  style={{ backgroundColor: '#EF4444', color: 'white' }}
                >
                  1
                </Badge>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-foreground">Kalore Coach</h3>
                <Sparkles className="w-4 h-4" style={{ color: '#4AD4B2' }} />
                {unreadMessages.length > 0 && (
                  <Bell className="w-4 h-4 text-orange-500 animate-pulse" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {latestMessage ? latestMessage.message_preview : texts[currentLanguage].readyToHelp}
              </p>
            </div>
            <MessageCircle className="w-5 h-5 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg dark:shadow-xl border-2" style={{ borderColor: '#4AD4B2' }}>
      <CardHeader 
        className="pb-3 cursor-pointer"
        onClick={() => setIsExpanded(false)}
        style={{ backgroundColor: 'rgba(74, 212, 178, 0.05)' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'rgba(74, 212, 178, 0.15)' }}
            >
              <Bot className="w-5 h-5" style={{ color: '#4AD4B2' }} />
            </div>
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                {texts[currentLanguage].title}
                <Sparkles className="w-4 h-4" style={{ color: '#4AD4B2' }} />
              </CardTitle>
              <p className="text-xs text-muted-foreground">{texts[currentLanguage].subtitle}</p>
            </div>
          </div>
          <ChevronUp className="w-5 h-5 text-muted-foreground" />
        </div>
      </CardHeader>

      <CardContent className="p-4">
        {/* Messages */}
        <div className="h-80 overflow-y-auto mb-4 space-y-3 pr-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                  style={{ backgroundColor: 'rgba(74, 212, 178, 0.15)' }}
                >
                  <Bot className="w-4 h-4" style={{ color: '#4AD4B2' }} />
                </div>
              )}
              
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  message.role === 'user'
                    ? 'text-white rounded-br-md'
                    : 'bg-muted text-foreground rounded-bl-md'
                }`}
                style={message.role === 'user' ? { backgroundColor: '#4AD4B2' } : {}}
              >
                <div 
                  className="whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                />
                <p className={`text-xs mt-1 ${
                  message.role === 'user' ? 'text-white/70' : 'text-muted-foreground'
                }`}>
                  {message.timestamp.toLocaleTimeString('es-ES', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>

              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'rgba(74, 212, 178, 0.15)' }}
              >
                <Bot className="w-4 h-4" style={{ color: '#4AD4B2' }} />
              </div>
              <div className="bg-muted p-3 rounded-2xl rounded-bl-md">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length <= 1 && (
          <div className="mb-4">
            <p className="text-xs text-muted-foreground mb-2">{texts[currentLanguage].quickQuestionsLabel}</p>
            <div className="grid grid-cols-1 gap-2">
              {texts[currentLanguage].quickQuestions.map((question) => (
                <Button
                  key={question}
                  variant="outline"
                  size="sm"
                  className="text-xs h-auto py-2 px-3 justify-start text-left whitespace-normal"
                  onClick={() => handleQuickQuestion(question)}
                  disabled={isLoading}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={texts[currentLanguage].placeholder}
            disabled={isLoading}
            className="flex-1"
          />
          <VoiceRecorder 
            onSendMessage={sendMessage} 
            isLoading={isLoading} 
            variant="inline"
            buttonStyle={{ backgroundColor: '#4AD4B2' }}
          />
          <Button
            onClick={handleSendTextMessage}
            disabled={isLoading || !inputMessage.trim()}
            size="sm"
            style={{ backgroundColor: '#4AD4B2' }}
            className="text-white hover:opacity-90"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VirtualTrainer;