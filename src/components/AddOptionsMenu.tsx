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
    <div 
      className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-card rounded-full p-8 w-80 h-80 relative flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Food Basket Image */}
        <div className="flex flex-col items-center justify-center">
          <img 
            src="/lovable-uploads/edd1d405-5720-4d1a-9e1d-85a84e38b7c2.png" 
            alt="Food basket with fruits and vegetables" 
            className="w-32 h-32 mb-4"
          />
          
          {/* Options Grid */}
          <div className="grid grid-cols-2 gap-4">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={option.onClick}
                className="w-20 h-20 rounded-lg bg-primary/10 hover:bg-primary/20 flex flex-col items-center justify-center gap-1 transition-colors"
              >
                {React.createElement(option.icon, { className: "w-6 h-6 text-primary" })}
                <span className="text-xs font-medium text-foreground text-center leading-tight">
                  {option.label.split(' ').map((word, i) => (
                    <div key={i}>{word}</div>
                  ))}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOptionsMenu;