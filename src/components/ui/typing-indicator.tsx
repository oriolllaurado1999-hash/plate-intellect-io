import { cn } from "@/lib/utils"

interface TypingIndicatorProps {
  className?: string;
}

const TypingIndicator = ({ className }: TypingIndicatorProps) => {
  return (
    <div className={cn("flex items-center gap-1 p-3", className)}>
      <div className="flex gap-1">
        <div 
          className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-pulse"
          style={{
            animation: 'typing-dot 1.5s infinite ease-in-out',
            animationDelay: '0ms'
          }}
        />
        <div 
          className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-pulse"
          style={{
            animation: 'typing-dot 1.5s infinite ease-in-out',
            animationDelay: '300ms'
          }}
        />
        <div 
          className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-pulse"
          style={{
            animation: 'typing-dot 1.5s infinite ease-in-out',
            animationDelay: '600ms'
          }}
        />
      </div>
    </div>
  );
};

export { TypingIndicator };