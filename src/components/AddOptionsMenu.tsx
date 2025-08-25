import React, { useState, useRef, useCallback } from 'react';
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
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startAngle, setStartAngle] = useState(0);
  const [startRotation, setStartRotation] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const getCenter = () => {
    if (!containerRef.current) return { x: 0, y: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  };

  const getAngle = (clientX: number, clientY: number) => {
    const center = getCenter();
    return Math.atan2(clientY - center.y, clientX - center.x);
  };

  const handleStart = useCallback((clientX: number, clientY: number) => {
    setIsDragging(true);
    setStartAngle(getAngle(clientX, clientY));
    setStartRotation(rotation);
  }, [rotation]);

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!isDragging) return;
    
    const currentAngle = getAngle(clientX, clientY);
    const deltaAngle = currentAngle - startAngle;
    const newRotation = startRotation + (deltaAngle * 180) / Math.PI;
    
    setRotation(newRotation);
  }, [isDragging, startAngle, startRotation]);

  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  }, [handleMove]);

  const handleMouseUp = useCallback(() => {
    handleEnd();
  }, [handleEnd]);

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = useCallback((e: TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  }, [handleMove]);

  const handleTouchEnd = useCallback(() => {
    handleEnd();
  }, [handleEnd]);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // Calculate button positions based on rotation
  const getButtonStyle = (index: number) => {
    const baseAngles = [-90, 0, 90, 180]; // Top, Right, Bottom, Left
    const angle = (baseAngles[index] + rotation) * (Math.PI / 180);
    const radius = 120; // Distance from center
    
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    return {
      position: 'absolute' as const,
      left: '50%',
      top: '50%',
      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
      transition: isDragging ? 'none' : 'transform 0.3s ease-out',
    };
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        ref={containerRef}
        className="bg-card rounded-full p-8 w-80 h-80 relative flex flex-col items-center justify-center select-none"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Circular Options Layout */}
        <div className="relative w-full h-full">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                if (!isDragging) {
                  option.onClick();
                }
              }}
              className="w-24 h-24 rounded-full flex flex-col items-center justify-center gap-1 hover:opacity-80 transition-opacity"
              style={{
                ...getButtonStyle(index),
                backgroundColor: '#4AD4B220',
                pointerEvents: isDragging ? 'none' : 'auto',
              }}
            >
              {React.createElement(option.icon, { className: "w-8 h-8 text-foreground" })}
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
  );
};

export default AddOptionsMenu;