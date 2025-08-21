import { useMemo } from 'react';

interface UserData {
  gender: 'male' | 'female' | null;
  birthDate: Date | null;
  currentWeight: { weight: number; unit: 'kg' | 'lbs' } | null;
  height: { height: number; unit: 'cm' | 'ft' } | null;
  desiredWeight: number | null;
  lossSpeed: number | null;
  goal: 'lose' | 'maintain' | 'gain' | null;
  workouts: '0-2' | '3-5' | '6+' | null;
}

interface NutritionGoals {
  calories: number;
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
  healthScore: number; // 1-10
}

export const useNutritionCalculator = (userData: UserData): NutritionGoals => {
  return useMemo(() => {
    // Default values if data is missing
    if (!userData.currentWeight || !userData.height || !userData.gender || !userData.birthDate) {
      return {
        calories: 2000,
        protein: 150,
        carbs: 225,
        fat: 65,
        healthScore: 7
      };
    }

    // Calculate age
    const today = new Date();
    const birthDate = new Date(userData.birthDate);
    const age = today.getFullYear() - birthDate.getFullYear();
    
    // Convert weight to kg
    let weightKg = userData.currentWeight.weight;
    if (userData.currentWeight.unit === 'lbs') {
      weightKg = weightKg * 0.453592;
    }

    // Convert height to cm
    let heightCm = userData.height.height;
    if (userData.height.unit === 'ft') {
      heightCm = heightCm * 30.48;
    }

    // Calculate BMR using Mifflin-St Jeor equation
    let bmr: number;
    if (userData.gender === 'male') {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }

    // Activity factor based on workouts per week
    let activityFactor: number;
    switch (userData.workouts) {
      case '0-2':
        activityFactor = 1.2; // Sedentary
        break;
      case '3-5':
        activityFactor = 1.55; // Moderately active
        break;
      case '6+':
        activityFactor = 1.725; // Very active
        break;
      default:
        activityFactor = 1.375; // Light activity (default)
    }

    // Calculate TDEE (Total Daily Energy Expenditure)
    const tdee = bmr * activityFactor;

    // Calculate calorie target based on goal
    let targetCalories = tdee;
    let healthScore = 8; // Start with good score

    if (userData.goal === 'lose' && userData.desiredWeight && userData.lossSpeed) {
      const weightToLose = weightKg - userData.desiredWeight;
      
      // Convert loss speed to kg per week if needed
      let lossSpeedKg = userData.lossSpeed;
      
      // Calculate weekly deficit needed (7700 calories = 1 kg fat)
      const weeklyDeficit = lossSpeedKg * 7700;
      const dailyDeficit = weeklyDeficit / 7;
      
      targetCalories = tdee - dailyDeficit;
      
      // Adjust health score based on aggressiveness
      const deficitPercentage = dailyDeficit / tdee;
      if (deficitPercentage > 0.25) {
        healthScore = 5; // Very aggressive
      } else if (deficitPercentage > 0.2) {
        healthScore = 6; // Aggressive
      } else if (deficitPercentage > 0.15) {
        healthScore = 7; // Moderate
      } else {
        healthScore = 9; // Conservative
      }
      
      // Minimum calories safety check
      const minCalories = userData.gender === 'male' ? 1500 : 1200;
      if (targetCalories < minCalories) {
        targetCalories = minCalories;
        healthScore = Math.max(healthScore - 2, 4);
      }
    } else if (userData.goal === 'gain' && userData.desiredWeight) {
      const weightToGain = userData.desiredWeight - weightKg;
      
      // Moderate surplus for healthy weight gain (0.25-0.5kg per week)
      const weeklyGain = Math.min(weightToGain / 12, 0.5); // Max 0.5kg per week
      const weeklySurplus = weeklyGain * 7700;
      const dailySurplus = weeklySurplus / 7;
      
      targetCalories = tdee + dailySurplus;
      healthScore = 8;
    }

    // Calculate macronutrient distribution
    // Protein: 1.6-2.2g per kg body weight (higher for cutting)
    let proteinPerKg = userData.goal === 'lose' ? 2.0 : 1.8;
    const protein = Math.round(weightKg * proteinPerKg);

    // Fat: 20-30% of calories
    const fatPercentage = userData.goal === 'lose' ? 0.25 : 0.30;
    const fat = Math.round((targetCalories * fatPercentage) / 9); // 9 cal per gram

    // Carbs: Fill the rest
    const proteinCalories = protein * 4;
    const fatCalories = fat * 9;
    const carbCalories = targetCalories - proteinCalories - fatCalories;
    const carbs = Math.round(carbCalories / 4); // 4 cal per gram

    // Calculate final health score based on various factors
    const bmi = weightKg / ((heightCm / 100) ** 2);
    if (bmi < 18.5 || bmi > 30) {
      healthScore = Math.max(healthScore - 1, 4);
    }
    
    if (userData.goal === 'lose' && userData.desiredWeight) {
      const targetBMI = userData.desiredWeight / ((heightCm / 100) ** 2);
      if (targetBMI >= 18.5 && targetBMI <= 25) {
        healthScore = Math.min(healthScore + 1, 10);
      }
    }

    return {
      calories: Math.round(targetCalories),
      protein,
      carbs: Math.max(carbs, 100), // Minimum carbs for brain function
      fat: Math.max(fat, 40), // Minimum fat for hormone production
      healthScore: Math.max(Math.min(healthScore, 10), 1)
    };
  }, [userData]);
};