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
                Like many health indicators, BMI isn't flawless. Factors such as pregnancy or having a lot of muscle can skew the results, and it's not always the best measure for children or older adults.
              </p>
            </div>

            {/* Why BMI Matters */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Why pay attention to BMI?</h3>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  While it's not perfect, BMI can still give a quick snapshot of weight-related health risks. Generally, a higher BMI is linked to a greater chance of developing conditions like:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>* Diabetes</li>
                  <li>* Arthritis</li>
                  <li>* Liver disease</li>
                  <li>* Certain cancers (including breast, colon, and prostate)</li>
                  <li>* High blood pressure</li>
                  <li>* High cholesterol</li>
                  <li>* Sleep apnea</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BMIDetailModal;