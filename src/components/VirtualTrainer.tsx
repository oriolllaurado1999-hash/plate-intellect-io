import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, Bot, User, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const VirtualTrainer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isExpanded && messages.length === 0) {
      // Welcome message when first opened
      const welcomeMessage: Message = {
        id: '1',
        content: '¡Hola! 👋 Soy tu entrenador virtual Kalore Coach. Estoy aquí para ayudarte con tus objetivos nutricionales. ¿En qué puedo ayudarte hoy?',
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isExpanded]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('virtual-trainer', {
        body: { message: inputMessage }
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

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling virtual trainer:', error);
      toast({
        title: "Error",
        description: "No pude procesar tu mensaje. Intenta de nuevo.",
        variant: "destructive"
      });

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Lo siento, hubo un problema procesando tu mensaje. ¿Podrías intentar de nuevo? 😔",
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickQuestions = [
    "¿Qué debería comer ahora?",
    "¿Cómo voy con mis objetivos hoy?",
    "Sugerencias para la cena",
    "¿Necesito más proteína?"
  ];

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  if (!isExpanded) {
    return (
      <Card 
        className="shadow-lg dark:shadow-xl cursor-pointer hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 border-2"
        style={{ borderColor: '#4AD4B2' }}
        onClick={() => setIsExpanded(true)}
      >
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'rgba(74, 212, 178, 0.15)' }}
            >
              <Bot className="w-6 h-6" style={{ color: '#4AD4B2' }} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-foreground">Kalore Coach</h3>
                <Sparkles className="w-4 h-4" style={{ color: '#4AD4B2' }} />
              </div>
              <p className="text-sm text-muted-foreground">
                Tu entrenador virtual está listo para ayudarte
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
                Kalore Coach
                <Sparkles className="w-4 h-4" style={{ color: '#4AD4B2' }} />
              </CardTitle>
              <p className="text-xs text-muted-foreground">Tu entrenador virtual personalizado</p>
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
                <p className="whitespace-pre-wrap">{message.content}</p>
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
            <p className="text-xs text-muted-foreground mb-2">Preguntas rápidas:</p>
            <div className="grid grid-cols-1 gap-2">
              {quickQuestions.map((question) => (
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
            placeholder="Escribe tu pregunta..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={sendMessage}
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