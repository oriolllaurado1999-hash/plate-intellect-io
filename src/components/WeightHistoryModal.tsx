import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, ArrowRight, Plus, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useTranslation } from '@/hooks/useTranslation';

interface WeightHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockWeightData = [
  { date: 'Jul 21', weight: 82.5 },
  { date: 'Jul 28', weight: 82.0 },
  { date: 'Aug 4', weight: 81.8 },
  { date: 'Aug 11', weight: 81.5 },
  { date: 'Aug 18', weight: 80.9 },
];

export const WeightHistoryModal = ({ isOpen, onClose }: WeightHistoryModalProps) => {
  const { t } = useTranslation();
  const [selectedMetric, setSelectedMetric] = useState('WEIGHT');
  const [selectedPeriod, setSelectedPeriod] = useState('M');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto bg-slate-900 text-white border-slate-700">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <DialogTitle className="text-center text-white">TREND VIEW</DialogTitle>
          <div className="w-10" />
        </DialogHeader>
        
        <div className="space-y-6 p-4">
          {/* Metric Selector */}
          <Card className="bg-slate-800 border-slate-700">
            <div className="p-4">
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="WEIGHT">WEIGHT</SelectItem>
                  <SelectItem value="BMI">BMI</SelectItem>
                  <SelectItem value="BODY_FAT">BODY FAT</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Stats Section */}
          <div className="text-left space-y-2">
            <p className="text-slate-400 text-sm">AVERAGE</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-light">82.0</span>
              <span className="text-xl text-slate-400">kg</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-slate-700 rounded px-2 py-1">
                <span className="text-xs text-green-400">▲ 1%</span>
                <span className="text-xs text-slate-400">vs. prior month</span>
              </div>
            </div>
          </div>

          {/* Period Selector */}
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" className="text-white">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex gap-2">
              {['W', 'M', '6M'].map((period) => (
                <Button
                  key={period}
                  variant={selectedPeriod === period ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedPeriod(period)}
                  className={selectedPeriod === period ? 'bg-slate-600' : 'text-slate-400'}
                >
                  {period}
                </Button>
              ))}
            </div>

            <Button variant="ghost" size="icon" className="text-white">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-center text-sm text-slate-400">
            JUL 20 - AUG 18, 25
          </div>

          {/* Description */}
          <p className="text-sm text-slate-300">
            Your average weight this month (82.0 kg) was above your previous 30-day average of 81.0 kg.
          </p>

          {/* Chart */}
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockWeightData}>
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <YAxis hide />
                <Line 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="#60a5fa" 
                  strokeWidth={2}
                  dot={{ fill: '#60a5fa', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <p className="text-xs text-slate-400">
            Last updated: Aug 15 2025, 12:33PM
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              className="w-full bg-slate-700 hover:bg-slate-600 text-white flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              ADD MANUAL MEASUREMENT
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full border-slate-600 text-white hover:bg-slate-700 flex items-center gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              SEE ALL RECORDINGS
            </Button>
          </div>

          {/* Learn More Footer */}
          <div className="flex items-center justify-between pt-4">
            <span className="text-xs text-slate-400">LEARN MORE</span>
            <Button variant="ghost" size="sm" className="text-slate-400">
              VIEW ALL →
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};