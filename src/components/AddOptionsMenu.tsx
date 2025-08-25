import React from 'react';
import { Search, Bookmark, Dumbbell, ScanLine, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface AddOptionsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onScanFood: () => void;
  onFoodDatabase: () => void;
  onSavedFoods: () => void;
}

const AddOptionsMenu = ({ isOpen, onClose, onScanFood, onFoodDatabase, onSavedFoods }: AddOptionsMenuProps) => {
  if (!isOpen) return null;

  const handleScanFood = () => {
    onScanFood();
    onClose();
  };

  const options = [
    {
      icon: Dumbbell,
      label: 'Log exercise',
      onClick: () => {
        // TODO: Implement log exercise functionality
        console.log('Log exercise clicked');
        onClose();
      }
    },
    {
      icon: Bookmark,
      label: 'Saved foods',
      onClick: () => {
        onSavedFoods();
        onClose();
      }
    },
    {
      icon: Search,
      label: 'Food Database',
      onClick: () => {
        onFoodDatabase();
        onClose();
      }
    },
    {
      icon: ScanLine,
      label: 'Scan food',
      onClick: handleScanFood
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center p-4">
      <div className="bg-card rounded-full p-8 w-80 h-80 relative flex flex-col items-center justify-center">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Circular Options Layout */}
        <div className="relative w-56 h-56">
          {/* Top option */}
          <button
            onClick={options[0].onClick}
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3 w-20 h-20 bg-muted/50 rounded-full flex flex-col items-center justify-center gap-1 hover:bg-muted transition-colors"
          >
            {React.createElement(options[0].icon, { className: "w-7 h-7 text-foreground" })}
            <span className="text-xs font-medium text-foreground text-center leading-tight">
              {options[0].label.split(' ').map((word, i) => (
                <div key={i}>{word}</div>
              ))}
            </span>
          </button>

          {/* Right option */}
          <button
            onClick={options[1].onClick}
            className="absolute right-0 top-1/2 transform translate-x-3 -translate-y-1/2 w-20 h-20 bg-muted/50 rounded-full flex flex-col items-center justify-center gap-1 hover:bg-muted transition-colors"
          >
            {React.createElement(options[1].icon, { className: "w-7 h-7 text-foreground" })}
            <span className="text-xs font-medium text-foreground text-center leading-tight">
              {options[1].label.split(' ').map((word, i) => (
                <div key={i}>{word}</div>
              ))}
            </span>
          </button>

          {/* Bottom option */}
          <button
            onClick={options[2].onClick}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-3 w-20 h-20 bg-muted/50 rounded-full flex flex-col items-center justify-center gap-1 hover:bg-muted transition-colors"
          >
            {React.createElement(options[2].icon, { className: "w-7 h-7 text-foreground" })}
            <span className="text-xs font-medium text-foreground text-center leading-tight">
              {options[2].label.split(' ').map((word, i) => (
                <div key={i}>{word}</div>
              ))}
            </span>
          </button>

          {/* Left option */}
          <button
            onClick={options[3].onClick}
            className="absolute left-0 top-1/2 transform -translate-x-3 -translate-y-1/2 w-20 h-20 bg-muted/50 rounded-full flex flex-col items-center justify-center gap-1 hover:bg-muted transition-colors"
          >
            {React.createElement(options[3].icon, { className: "w-7 h-7 text-foreground" })}
            <span className="text-xs font-medium text-foreground text-center leading-tight">
              {options[3].label.split(' ').map((word, i) => (
                <div key={i}>{word}</div>
              ))}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddOptionsMenu;