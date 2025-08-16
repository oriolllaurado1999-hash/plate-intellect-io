import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Mic, MicOff, Send, Edit3, X, Volume2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface VoiceRecorderProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  variant?: 'default' | 'inline';
  buttonStyle?: React.CSSProperties;
}

const VoiceRecorder = ({ onSendMessage, isLoading, variant = 'default', buttonStyle }: VoiceRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const [editableText, setEditableText] = useState('');
  const [showEditMode, setShowEditMode] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    };
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        } 
      });

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm'
      });

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        
        // Create audio URL for playback
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        
        // Convert to base64 and transcribe
        await transcribeAudio(audioBlob);
        
        // Stop the stream
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "Error",
        description: "No se pudo acceder al micrófono. Verifica los permisos.",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
        recordingIntervalRef.current = null;
      }
    }
  };

  const transcribeAudio = async (audioBlob: Blob) => {
    setIsTranscribing(true);
    
    try {
      // Convert blob to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Audio = (reader.result as string).split(',')[1];
        
        const { data, error } = await supabase.functions.invoke('voice-transcription', {
          body: { audio: base64Audio }
        });

        if (error) {
          throw error;
        }

        const transcription = data.text || '';
        setTranscribedText(transcription);
        setEditableText(transcription);
        setShowEditMode(true);
      };
      
      reader.readAsDataURL(audioBlob);
    } catch (error) {
      console.error('Error transcribing audio:', error);
      toast({
        title: "Error",
        description: "No se pudo transcribir el audio. Intenta de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsTranscribing(false);
    }
  };

  const handleSendTranscription = () => {
    if (editableText.trim()) {
      onSendMessage(editableText.trim());
      resetRecorder();
    }
  };

  const resetRecorder = () => {
    setTranscribedText('');
    setEditableText('');
    setShowEditMode(false);
    setRecordingTime(0);
    
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (showEditMode) {
    return (
      <Card className="mb-4 border-2" style={{ borderColor: '#4AD4B2' }}>
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm">Transcripción de voz</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetRecorder}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Audio playback */}
            {audioUrl && (
              <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                <Volume2 className="h-4 w-4 text-muted-foreground" />
                <audio controls className="flex-1 h-8">
                  <source src={audioUrl} type="audio/webm" />
                </audio>
              </div>
            )}
            
            {/* Editable transcription */}
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">
                Puedes editar la transcripción antes de enviar:
              </label>
              <Input
                value={editableText}
                onChange={(e) => setEditableText(e.target.value)}
                placeholder="Edita tu mensaje aquí..."
                className="min-h-[80px]"
                disabled={isLoading}
              />
            </div>
            
            {/* Action buttons */}
            <div className="flex gap-2">
              <Button
                onClick={handleSendTranscription}
                disabled={isLoading || !editableText.trim()}
                className="flex-1"
                style={{ backgroundColor: '#4AD4B2' }}
              >
                <Send className="h-4 w-4 mr-2" />
                Enviar mensaje
              </Button>
              <Button
                variant="outline"
                onClick={resetRecorder}
                disabled={isLoading}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === 'inline') {
    return (
      <>
        {isRecording && (
          <div className="flex items-center gap-2 px-3 py-1 bg-red-100 dark:bg-red-900/20 rounded-full">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-red-600 dark:text-red-400">
              {formatTime(recordingTime)}
            </span>
          </div>
        )}
        
        {isTranscribing && (
          <div className="flex items-center gap-2 px-3 py-1 bg-muted rounded-full">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-xs font-medium">Transcribiendo...</span>
          </div>
        )}
        
        <Button
          size="sm"
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isLoading || isTranscribing}
          style={isRecording ? { backgroundColor: '#ef4444' } : buttonStyle}
          className={`text-white hover:opacity-90 ${isRecording ? '' : ''}`}
        >
          {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        </Button>
      </>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {isRecording && (
        <div className="flex items-center gap-2 px-3 py-1 bg-red-100 dark:bg-red-900/20 rounded-full">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-xs font-medium text-red-600 dark:text-red-400">
            {formatTime(recordingTime)}
          </span>
        </div>
      )}
      
      {isTranscribing && (
        <div className="flex items-center gap-2 px-3 py-1 bg-muted rounded-full">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-xs font-medium">Transcribiendo...</span>
        </div>
      )}
      
      <Button
        variant="outline"
        size="sm"
        onClick={isRecording ? stopRecording : startRecording}
        disabled={isLoading || isTranscribing}
        className={`${isRecording ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' : ''}`}
      >
        {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default VoiceRecorder;