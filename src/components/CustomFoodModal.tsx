import { useState } from "react";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface CustomFoodModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface CustomFoodData {
  brandName: string;
  description: string;
  servingSize: string;
  servingPerContainer: string;
  calories: string;
  protein: string;
  carbs: string;
  totalFat: string;
  saturatedFat: string;
  polyunsaturatedFat: string;
  monounsaturatedFat: string;
  transFat: string;
  cholesterol: string;
  sodium: string;
  potassium: string;
  sugar: string;
  fiber: string;
  vitaminA: string;
  vitaminC: string;
  calcium: string;
  iron: string;
}

export function CustomFoodModal({ open, onOpenChange }: CustomFoodModalProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [foodData, setFoodData] = useState<CustomFoodData>({
    brandName: '',
    description: '',
    servingSize: '',
    servingPerContainer: '',
    calories: '',
    protein: '',
    carbs: '',
    totalFat: '',
    saturatedFat: '',
    polyunsaturatedFat: '',
    monounsaturatedFat: '',
    transFat: '',
    cholesterol: '',
    sodium: '',
    potassium: '',
    sugar: '',
    fiber: '',
    vitaminA: '',
    vitaminC: '',
    calcium: '',
    iron: ''
  });

  const updateField = (field: keyof CustomFoodData, value: string) => {
    setFoodData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to save custom foods",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.from('custom_foods').insert({
        user_id: user.id,
        brand_name: foodData.brandName || null,
        description: foodData.description,
        serving_size: foodData.servingSize,
        serving_per_container: foodData.servingPerContainer,
        calories: parseFloat(foodData.calories) || 0,
        protein: parseFloat(foodData.protein) || 0,
        carbs: parseFloat(foodData.carbs) || 0,
        total_fat: parseFloat(foodData.totalFat) || 0,
        saturated_fat: parseFloat(foodData.saturatedFat) || 0,
        polyunsaturated_fat: parseFloat(foodData.polyunsaturatedFat) || 0,
        monounsaturated_fat: parseFloat(foodData.monounsaturatedFat) || 0,
        trans_fat: parseFloat(foodData.transFat) || 0,
        cholesterol: parseFloat(foodData.cholesterol) || 0,
        sodium: parseFloat(foodData.sodium) || 0,
        potassium: parseFloat(foodData.potassium) || 0,
        sugar: parseFloat(foodData.sugar) || 0,
        fiber: parseFloat(foodData.fiber) || 0,
      });

      if (error) {
        console.error('Error saving custom food:', error);
        toast({
          title: "Error",
          description: "Failed to save custom food. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Custom food saved successfully!",
      });

      onOpenChange(false);
      setCurrentStep(1);
      setFoodData({
        brandName: '',
        description: '',
        servingSize: '',
        servingPerContainer: '',
        calories: '',
        protein: '',
        carbs: '',
        totalFat: '',
        saturatedFat: '',
        polyunsaturatedFat: '',
        monounsaturatedFat: '',
        transFat: '',
        cholesterol: '',
        sodium: '',
        potassium: '',
        sugar: '',
        fiber: '',
        vitaminA: '',
        vitaminC: '',
        calcium: '',
        iron: ''
      });
    } catch (error) {
      console.error('Error saving custom food:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Input
          placeholder="Brand name"
          value={foodData.brandName}
          onChange={(e) => updateField('brandName', e.target.value)}
          className="h-12 text-base"
        />
      </div>
      
      <div className="space-y-2">
        <Label className="text-muted-foreground">Description*</Label>
        <Input
          value={foodData.description}
          onChange={(e) => updateField('description', e.target.value)}
          className="h-12 text-base"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-muted-foreground">Serving size*</Label>
        <Input
          placeholder="ex. 1 cup"
          value={foodData.servingSize}
          onChange={(e) => updateField('servingSize', e.target.value)}
          className="h-12 text-base"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-muted-foreground">Serving per container*</Label>
        <Input
          placeholder="ex. 1"
          value={foodData.servingPerContainer}
          onChange={(e) => updateField('servingPerContainer', e.target.value)}
          className="h-12 text-base"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-muted-foreground">Calories*</Label>
        <Input
          type="number"
          value={foodData.calories}
          onChange={(e) => updateField('calories', e.target.value)}
          className="h-12 text-base"
          required
        />
      </div>

      <div className="space-y-2">
        <Label className="text-muted-foreground">Protein</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={foodData.protein}
            onChange={(e) => updateField('protein', e.target.value)}
            className="h-12 text-base flex-1"
          />
          <span className="text-muted-foreground">(g)</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-muted-foreground">Carbs</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={foodData.carbs}
            onChange={(e) => updateField('carbs', e.target.value)}
            className="h-12 text-base flex-1"
          />
          <span className="text-muted-foreground">(g)</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-muted-foreground">Total fat</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={foodData.totalFat}
            onChange={(e) => updateField('totalFat', e.target.value)}
            className="h-12 text-base flex-1"
          />
          <span className="text-muted-foreground">(g)</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-muted-foreground">Saturated fat</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={foodData.saturatedFat}
            onChange={(e) => updateField('saturatedFat', e.target.value)}
            className="h-12 text-base flex-1"
          />
          <span className="text-muted-foreground">(g)</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-muted-foreground">Polyunsaturated fat</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={foodData.polyunsaturatedFat}
            onChange={(e) => updateField('polyunsaturatedFat', e.target.value)}
            className="h-12 text-base flex-1"
          />
          <span className="text-muted-foreground">(g)</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-muted-foreground">Monounsaturated fat</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={foodData.monounsaturatedFat}
            onChange={(e) => updateField('monounsaturatedFat', e.target.value)}
            className="h-12 text-base flex-1"
          />
          <span className="text-muted-foreground">(g)</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-muted-foreground">Trans fat</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={foodData.transFat}
            onChange={(e) => updateField('transFat', e.target.value)}
            className="h-12 text-base flex-1"
          />
          <span className="text-muted-foreground">(g)</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-muted-foreground">Cholesterol</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={foodData.cholesterol}
            onChange={(e) => updateField('cholesterol', e.target.value)}
            className="h-12 text-base flex-1"
          />
          <span className="text-muted-foreground">(mg)</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-muted-foreground">Sodium</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={foodData.sodium}
            onChange={(e) => updateField('sodium', e.target.value)}
            className="h-12 text-base flex-1"
          />
          <span className="text-muted-foreground">(mg)</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-muted-foreground">Potassium</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={foodData.potassium}
            onChange={(e) => updateField('potassium', e.target.value)}
            className="h-12 text-base flex-1"
          />
          <span className="text-muted-foreground">(mg)</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-muted-foreground">Sugar</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={foodData.sugar}
            onChange={(e) => updateField('sugar', e.target.value)}
            className="h-12 text-base flex-1"
          />
          <span className="text-muted-foreground">(g)</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-muted-foreground">Fiber</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={foodData.fiber}
            onChange={(e) => updateField('fiber', e.target.value)}
            className="h-12 text-base flex-1"
          />
          <span className="text-muted-foreground">(g)</span>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-muted-foreground">Saturated fat</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={foodData.saturatedFat}
            onChange={(e) => updateField('saturatedFat', e.target.value)}
            className="h-12 text-base flex-1"
          />
          <span className="text-muted-foreground">(g)</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-muted-foreground">Polyunsaturated fat</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={foodData.polyunsaturatedFat}
            onChange={(e) => updateField('polyunsaturatedFat', e.target.value)}
            className="h-12 text-base flex-1"
          />
          <span className="text-muted-foreground">(g)</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-muted-foreground">Monounsaturated fat</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={foodData.monounsaturatedFat}
            onChange={(e) => updateField('monounsaturatedFat', e.target.value)}
            className="h-12 text-base flex-1"
          />
          <span className="text-muted-foreground">(g)</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-muted-foreground">Trans fat</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={foodData.transFat}
            onChange={(e) => updateField('transFat', e.target.value)}
            className="h-12 text-base flex-1"
          />
          <span className="text-muted-foreground">(g)</span>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-muted-foreground">Cholesterol</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={foodData.cholesterol}
            onChange={(e) => updateField('cholesterol', e.target.value)}
            className="h-12 text-base flex-1"
          />
          <span className="text-muted-foreground">(mg)</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-muted-foreground">Sodium</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={foodData.sodium}
            onChange={(e) => updateField('sodium', e.target.value)}
            className="h-12 text-base flex-1"
          />
          <span className="text-muted-foreground">(mg)</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-muted-foreground">Potassium</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={foodData.potassium}
            onChange={(e) => updateField('potassium', e.target.value)}
            className="h-12 text-base flex-1"
          />
          <span className="text-muted-foreground">(mg)</span>
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-muted-foreground">Sugar</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={foodData.sugar}
            onChange={(e) => updateField('sugar', e.target.value)}
            className="h-12 text-base flex-1"
          />
          <span className="text-muted-foreground">(g)</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-muted-foreground">Fiber</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={foodData.fiber}
            onChange={(e) => updateField('fiber', e.target.value)}
            className="h-12 text-base flex-1"
          />
          <span className="text-muted-foreground">(g)</span>
        </div>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      default:
        return renderStep1();
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[100vh] rounded-t-none p-0 z-[90] flex flex-col [&>button]:hidden">
        <SheetHeader className="p-6 pb-4 flex-row items-center justify-between space-y-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            className="w-10 h-10 rounded-full bg-muted"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-lg font-semibold">Add Food</h2>
          {currentStep > 1 ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={prevStep}
              className="w-10 h-10 rounded-full bg-muted"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          ) : (
            <div className="w-10 h-10"></div>
          )}
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          <div className="px-6 pb-6">
            {renderStepContent()}
          </div>
        </div>

        <div className="p-6 pt-2 flex-shrink-0">
          <Button
            onClick={currentStep === 2 ? handleSave : nextStep}
            className="w-full h-12 text-base font-semibold rounded-full"
            disabled={(currentStep === 1 && !foodData.description) || (currentStep === 2 && !foodData.calories)}
          >
            {currentStep === 2 ? 'Save food' : 'Next'}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}