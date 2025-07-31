import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FloatingAddButtonProps {
  onClick: () => void;
}

export default function FloatingAddButton({ onClick }: FloatingAddButtonProps) {
  return (
    <Button
      onClick={onClick}
      size="lg"
      className="fixed bottom-20 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-40 bg-primary hover:bg-primary/90"
    >
      <Plus className="h-6 w-6" />
      <span className="sr-only">Add meal</span>
    </Button>
  );
}