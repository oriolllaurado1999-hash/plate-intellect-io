import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';

interface BMIDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  bmi: number;
  bmiStatus: {
    status: string;
    color: string;
  };
  bmiPosition: number;
}

const BMIDetailModal = ({ isOpen, onClose, bmi, bmiStatus, bmiPosition }: BMIDetailModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto h-full max-h-screen overflow-y-auto p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <DialogHeader className="p-4 pb-2">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-10 w-10 rounded-full bg-muted"
                onClick={onClose}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <DialogTitle className="text-xl font-semibold">BMI</DialogTitle>
            </div>
          </DialogHeader>

          {/* Content */}
          <div className="flex-1 p-4 space-y-6">
            {/* BMI Value and Status */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-lg">Your weight is</span>
                <Badge 
                  className={`${
                    bmiStatus.status === 'Underweight' ? 'bg-blue-500' :
                    bmiStatus.status === 'Healthy' ? 'bg-green-500' :
                    bmiStatus.status === 'Overweight' ? 'bg-yellow-500' :
                    'bg-red-500'
                  } text-white`}
                >
                  {bmiStatus.status}
                </Badge>
              </div>
              
              <div className="text-6xl font-bold">
                {bmi.toFixed(1)}
              </div>
            </div>

            {/* BMI Scale */}
            <div className="space-y-3">
              <div className="h-3 bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 to-red-500 rounded-full relative">
                <div 
                  className="absolute w-1 h-7 bg-black rounded-full -top-2"
                  style={{ left: `${bmiPosition}%` }}
                />
              </div>
              
              <div className="flex justify-between text-[10px]">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Underweight</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Healthy</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span>Overweight</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Obese</span>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Disclaimer</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                As with most measures of health, BMI is not a perfect test. For example, results can be thrown 
                off by pregnancy or high muscle mass, and it may not be a good measure of health for children or 
                the elderly.
              </p>
            </div>

            {/* Why BMI Matters */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">So then, why does BMI matter?</h3>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  In general, the higher your BMI, the higher the risk of developing a range of conditions linked with 
                  excess weight,
                </p>
                <p className="text-sm text-muted-foreground">including:</p>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• diabetes</li>
                  <li>• arthritis</li>
                  <li>• liver disease</li>
                  <li>• several types of cancer (such as those of the breast, colon, and prostate)</li>
                  <li>• high blood pressure (hypertension)</li>
                  <li>• high cholesterol</li>
                  <li>• sleep apnea.</li>
                </ul>
              </div>
            </div>

            {/* Source */}
            <div className="pb-4">
              <p className="text-sm text-muted-foreground underline">Source</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BMIDetailModal;