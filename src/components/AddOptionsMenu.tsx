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
      <div className="bg-card rounded-2xl p-6 w-full max-w-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Add to diary</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-2 gap-4">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={option.onClick}
              className="bg-muted/50 rounded-xl p-6 flex flex-col items-center gap-3 hover:bg-muted transition-colors"
            >
              <option.icon className="w-8 h-8 text-foreground" />
              <span className="text-sm font-medium text-foreground text-center">
                {option.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddOptionsMenu;