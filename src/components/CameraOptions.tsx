import { Button } from '@/components/ui/button';
import { X, Dumbbell, Bookmark, Search, ScanLine, CreditCard } from 'lucide-react';

interface CameraOptionsProps {
  onClose: () => void;
  onScanFood: () => void;
  onBarcodeScanner: () => void;
}

const CameraOptions = ({ onClose, onScanFood, onBarcodeScanner }: CameraOptionsProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-background rounded-t-3xl w-full p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Choose an option</h2>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose}
            className="rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-24 space-y-2 bg-card hover:bg-accent"
            onClick={() => {/* TODO: Implement log exercise */}}
          >
            <Dumbbell className="h-6 w-6" />
            <span className="text-sm font-medium">Log exercise</span>
          </Button>

          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-24 space-y-2 bg-card hover:bg-accent"
            onClick={() => {/* TODO: Implement saved foods */}}
          >
            <Bookmark className="h-6 w-6" />
            <span className="text-sm font-medium">Saved foods</span>
          </Button>

          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-24 space-y-2 bg-card hover:bg-accent"
            onClick={() => {/* TODO: Implement food database */}}
          >
            <Search className="h-6 w-6" />
            <span className="text-sm font-medium">Food Database</span>
          </Button>

          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-24 space-y-2 bg-card hover:bg-accent"
            onClick={onScanFood}
          >
            <ScanLine className="h-6 w-6" />
            <span className="text-sm font-medium">Scan food</span>
          </Button>

          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-24 space-y-2 bg-card hover:bg-accent col-span-2"
            onClick={onBarcodeScanner}
          >
            <CreditCard className="h-6 w-6" />
            <span className="text-sm font-medium">Barcode Scanner</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CameraOptions;