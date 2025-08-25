import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const USDA_API_KEY = Deno.env.get('USDA_API_KEY');
const USDA_BASE_URL = 'https://api.nal.usda.gov/fdc/v1';

interface USDAFoodItem {
  fdcId: number;
  description: string;
  brandName?: string;
  brandOwner?: string;
  dataType: string;
  foodNutrients: Array<{
    nutrientId: number;
    nutrientName: string;
    nutrientNumber: string;
    unitName: string;
    value: number;
  }>;
}

interface FoodItem {
  id: string;
  name: string;
  brand?: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  servingSize: string;
  servingUnit: string;
}

serve(async (req) => {
  console.log('USDA Food Search function called');

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, pageSize = 20 } = await req.json();
    
    if (!query || typeof query !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Query parameter is required and must be a string' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log(`Searching USDA for: ${query}`);

    const response = await fetch(`${USDA_BASE_URL}/foods/search?api_key=${USDA_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: query,
        dataType: ['Foundation', 'SR Legacy', 'Survey (FNDDS)', 'Branded'],
        pageSize: pageSize,
        pageNumber: 1,
        sortBy: 'dataType.keyword',
        sortOrder: 'asc'
      }),
    });

    if (!response.ok) {
      console.error('USDA API error:', response.status, response.statusText);
      throw new Error(`USDA API error: ${response.status}`);
    }

    const data = await response.json();
    console.log(`Found ${data.foods?.length || 0} foods from USDA`);

    const formattedFoods: FoodItem[] = data.foods?.map((food: USDAFoodItem) => {
      // Extract key nutrients
      const nutrients = food.foodNutrients || [];
      
      const getNutrientValue = (nutrientId: number): number => {
        const nutrient = nutrients.find(n => n.nutrientId === nutrientId);
        return nutrient?.value || 0;
      };

      const calories = getNutrientValue(1008); // Energy (kcal)
      const protein = getNutrientValue(1003); // Protein
      const carbs = getNutrientValue(1005); // Carbohydrates
      const fat = getNutrientValue(1004); // Total lipid (fat)
      const fiber = getNutrientValue(1079); // Fiber, total dietary
      const sugar = getNutrientValue(2000); // Sugars, total
      const sodium = getNutrientValue(1093); // Sodium

      return {
        id: food.fdcId.toString(),
        name: food.description,
        brand: food.brandName || food.brandOwner,
        calories: Math.round(calories),
        protein: Math.round(protein * 10) / 10,
        carbs: Math.round(carbs * 10) / 10,
        fat: Math.round(fat * 10) / 10,
        fiber: Math.round(fiber * 10) / 10,
        sugar: Math.round(sugar * 10) / 10,
        sodium: Math.round(sodium),
        servingSize: '100',
        servingUnit: 'g'
      };
    }) || [];

    return new Response(
      JSON.stringify({ foods: formattedFoods }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in USDA food search:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to search foods',
        foods: []
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});