import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight, Plus, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useTranslation } from '@/hooks/useTranslation';

interface WeightHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AddWeightModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (weight: number) => void;
}

interface AllRecordingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockWeightData = {
  W: [
    { date: 'Mon', weight: 81.2 },
    { date: 'Tue', weight: 81.0 },
    { date: 'Wed', weight: 81.3 },
    { date: 'Thu', weight: 81.1 },
    { date: 'Fri', weight: 80.9 },
  ],
  M: [
    { date: 'Jul 21', weight: 82.5 },
    { date: 'Jul 28', weight: 82.0 },
    { date: 'Aug 4', weight: 81.8 },
    { date: 'Aug 11', weight: 81.5 },
    { date: 'Aug 18', weight: 80.9 },
  ],
  '6M': [
    { date: 'Mar', weight: 84.0 },
    { date: 'Apr', weight: 83.2 },
    { date: 'May', weight: 82.8 },
    { date: 'Jun', weight: 82.1 },
    { date: 'Aug', weight: 81.0 },
  ]
};

const AddWeightModal = ({ isOpen, onClose, onSave }: AddWeightModalProps) => {
  const { t } = useTranslation();
  const [weight, setWeight] = useState('');

  const handleSave = () => {
    if (weight && !isNaN(Number(weight))) {
      onSave(Number(weight));
      setWeight('');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-center">Add Weight Measurement</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 p-4">
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter your weight"
            />
          </div>
          
          <p className="text-sm text-muted-foreground">
            Note: You can only add one measurement every 7 days.
          </p>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1">
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const AllRecordingsModal = ({ isOpen, onClose }: AllRecordingsModalProps) => {
  const { t } = useTranslation();
  
  const mockRecordings = [
    { date: 'Aug 18, 2025', weight: 80.9 },
    { date: 'Aug 11, 2025', weight: 81.5 },
    { date: 'Aug 4, 2025', weight: 81.8 },
    { date: 'Jul 28, 2025', weight: 82.0 },
    { date: 'Jul 21, 2025', weight: 82.5 },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[80vh] overflow-y-auto bg-background border-border">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <DialogTitle className="text-center">All Recordings</DialogTitle>
          <div className="w-10" />
        </DialogHeader>
        
        <div className="space-y-4 p-4">
          {mockRecordings.map((record, index) => (
            <div key={index} className="flex justify-between items-center p-3 rounded-lg border border-border">
              <span className="text-sm text-muted-foreground">{record.date}</span>
              <span className="font-medium">{record.weight} kg</span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const WeightHistoryModal = ({ isOpen, onClose }: WeightHistoryModalProps) => {
  const { t } = useTranslation();
  const [selectedMetric, setSelectedMetric] = useState('WEIGHT');
  const [selectedPeriod, setSelectedPeriod] = useState<'W' | 'M' | '6M'>('M');
  const [showAddWeight, setShowAddWeight] = useState(false);
  const [showAllRecordings, setShowAllRecordings] = useState(false);

  const currentData = mockWeightData[selectedPeriod];
  const monthlyAverage = 82.0;

  const handleAddWeight = (weight: number) => {
    // Here you would save the weight to your database
    console.log('Saving weight:', weight);
  };

  const handlePreviousPeriod = () => {
    const periods: ('W' | 'M' | '6M')[] = ['W', 'M', '6M'];
    const currentIndex = periods.indexOf(selectedPeriod);
    const previousIndex = currentIndex > 0 ? currentIndex - 1 : periods.length - 1;
    setSelectedPeriod(periods[previousIndex]);
  };

  const handleNextPeriod = () => {
    const periods: ('W' | 'M' | '6M')[] = ['W', 'M', '6M'];
    const currentIndex = periods.indexOf(selectedPeriod);
    const nextIndex = currentIndex < periods.length - 1 ? currentIndex + 1 : 0;
    setSelectedPeriod(periods[nextIndex]);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto bg-background border-border">
          <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <DialogTitle className="text-center">TREND VIEW</DialogTitle>
            <div className="w-10" />
          </DialogHeader>
          
          <div className="space-y-6 p-4">

            {/* Stats Section */}
            <div className="text-left space-y-2">
              <p className="text-muted-foreground text-sm">AVERAGE</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-light">{monthlyAverage}</span>
                <span className="text-xl text-muted-foreground">kg</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-muted rounded px-2 py-1">
                  <span className="text-xs text-green-600">▲ 1%</span>
                  <span className="text-xs text-muted-foreground">vs. prior month</span>
                </div>
              </div>
            </div>

            {/* Period Selector */}
            <div className="flex items-center justify-between bg-muted/30 rounded-lg p-2">
              <Button variant="ghost" size="icon" onClick={handlePreviousPeriod}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex gap-2">
                {(['W', 'M', '6M'] as const).map((period) => (
                  <Button
                    key={period}
                    variant={selectedPeriod === period ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setSelectedPeriod(period)}
                  >
                    {period}
                  </Button>
                ))}
              </div>

              <Button variant="ghost" size="icon" onClick={handleNextPeriod}>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              {selectedPeriod === 'W' ? 'THIS WEEK' : 
               selectedPeriod === 'M' ? 'JUL 20 - AUG 18, 25' : 
               'MAR - AUG 2025'}
            </div>

            {/* Description */}
            <p className="text-sm text-foreground">
              Your average weight this {selectedPeriod === 'W' ? 'week' : selectedPeriod === 'M' ? 'month' : 'period'} ({monthlyAverage} kg) was above your previous 30-day average of 81.0 kg.
            </p>

            {/* Chart */}
            <div className="p-4 rounded-lg border border-border bg-card">
              <div className="h-48 w-full -ml-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={currentData} margin={{ left: 0, right: 10, top: 5, bottom: 5 }}>
                    <XAxis 
                      dataKey="date" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      interval={0}
                    />
                    <YAxis 
                      domain={[80, 84]}
                      ticks={[80, 81, 82, 83, 84]}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="weight" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              Last updated: Aug 15 2025, 12:33PM
            </p>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={() => setShowAddWeight(true)}
                className="w-full flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                ADD MANUAL MEASUREMENT
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => setShowAllRecordings(true)}
                className="w-full flex items-center gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                SEE ALL RECORDINGS
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AddWeightModal 
        isOpen={showAddWeight} 
        onClose={() => setShowAddWeight(false)}
        onSave={handleAddWeight}
      />

      <AllRecordingsModal 
        isOpen={showAllRecordings} 
        onClose={() => setShowAllRecordings(false)}
      />
    </>
  );
};