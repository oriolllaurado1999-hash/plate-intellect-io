import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface OpenFoodFactsProduct {
  id: string;
  product_name: string;
  brands?: string;
  nutriments: {
    'energy-kcal_100g'?: number;
    'proteins_100g'?: number;
    'carbohydrates_100g'?: number;
    'fat_100g'?: number;
    'fiber_100g'?: number;
    'sugars_100g'?: number;
    'salt_100g'?: number;
    'sodium_100g'?: number;
  };
  serving_size?: string;
  quantity?: string;
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

function transformOpenFoodFactsProduct(product: OpenFoodFactsProduct): FoodItem {
  const nutrients = product.nutriments || {};
  
  // Convert salt to sodium (salt contains ~40% sodium)
  const sodiumFromSalt = nutrients['salt_100g'] ? nutrients['salt_100g'] * 400 : 0;
  const sodium = nutrients['sodium_100g'] ? nutrients['sodium_100g'] * 1000 : sodiumFromSalt;
  
  return {
    id: `off_${product.id}`,
    name: product.product_name || 'Unknown Product',
    brand: product.brands?.split(',')[0]?.trim(),
    calories: Math.round(nutrients['energy-kcal_100g'] || 0),
    protein: Math.round((nutrients['proteins_100g'] || 0) * 10) / 10,
    carbs: Math.round((nutrients['carbohydrates_100g'] || 0) * 10) / 10,
    fat: Math.round((nutrients['fat_100g'] || 0) * 10) / 10,
    fiber: Math.round((nutrients['fiber_100g'] || 0) * 10) / 10,
    sugar: Math.round((nutrients['sugars_100g'] || 0) * 10) / 10,
    sodium: Math.round(sodium),
    servingSize: "100",
    servingUnit: "g"
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, pageSize = 20 } = await req.json();
    
    if (!query || query.trim().length === 0) {
      return new Response(JSON.stringify({ foods: [] }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Searching Open Food Facts for: ${query}`);

    // Build the Open Food Facts API URL
    const searchUrl = new URL('https://world.openfoodfacts.org/api/v2/search');
    searchUrl.searchParams.set('search_terms', query.trim());
    searchUrl.searchParams.set('search_simple', '1');
    searchUrl.searchParams.set('action', 'process');
    searchUrl.searchParams.set('json', '1');
    searchUrl.searchParams.set('page_size', pageSize.toString());
    searchUrl.searchParams.set('fields', 'id,product_name,brands,nutriments,serving_size,quantity');
    
    // Add filters for products with nutrition data
    searchUrl.searchParams.set('nutrition_grades_tags', 'known');

    const response = await fetch(searchUrl.toString(), {
      method: 'GET',
      headers: {
        'User-Agent': 'Kalore-NutritionApp/1.0 (kalore@nutrition.app)',
      },
    });

    if (!response.ok) {
      console.error(`Open Food Facts API error: ${response.status}`);
      throw new Error(`Open Food Facts API returned ${response.status}`);
    }

    const data = await response.json();
    console.log(`Open Food Facts API response:`, JSON.stringify(data, null, 2));

    if (!data.products || !Array.isArray(data.products)) {
      console.log('No products found in response');
      return new Response(JSON.stringify({ foods: [] }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Transform products to our format
    const foods: FoodItem[] = data.products
      .filter((product: OpenFoodFactsProduct) => {
        // Only include products with nutrition data
        return product.product_name && 
               product.nutriments && 
               (product.nutriments['energy-kcal_100g'] !== undefined || 
                product.nutriments['proteins_100g'] !== undefined);
      })
      .map(transformOpenFoodFactsProduct)
      .filter((food: FoodItem) => food.name !== 'Unknown Product');

    console.log(`Transformed ${foods.length} products from Open Food Facts`);

    return new Response(JSON.stringify({ foods }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in openfoodfacts-search function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      foods: [] 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});