import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { barcode } = await req.json();

    if (!barcode) {
      return new Response(
        JSON.stringify({ error: 'Barcode is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create Supabase client
    const supabase = createClient(supabaseUrl!, supabaseServiceKey!);

    // First, try to find the product in our local database
    const { data: existingProduct, error: dbError } = await supabase
      .from('food_items')
      .select('*')
      .eq('barcode', barcode)
      .single();

    if (existingProduct && !dbError) {
      console.log('Found product in local database:', existingProduct);
      return new Response(JSON.stringify({ 
        success: true, 
        product: existingProduct,
        source: 'local'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // If not found locally, try OpenFoodFacts API
    console.log(`Searching OpenFoodFacts for barcode: ${barcode}`);
    const openFoodFactsResponse = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
    const openFoodFactsData = await openFoodFactsResponse.json();

    if (openFoodFactsData.status === 0) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Product not found' 
      }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Extract product information from OpenFoodFacts
    const product = openFoodFactsData.product;
    const nutriments = product.nutriments || {};

    const productData = {
      name: product.product_name || product.product_name_en || 'Unknown Product',
      brand: product.brands || null,
      barcode: barcode,
      calories_per_100g: nutriments['energy-kcal_100g'] || nutriments['energy_100g'] ? Math.round(nutriments['energy_100g'] / 4.184) : 0,
      protein_per_100g: nutriments['proteins_100g'] || 0,
      carbs_per_100g: nutriments['carbohydrates_100g'] || 0,
      fat_per_100g: nutriments['fat_100g'] || 0,
      fiber_per_100g: nutriments['fiber_100g'] || 0,
      sugar_per_100g: nutriments['sugars_100g'] || 0,
      sodium_per_100g: nutriments['sodium_100g'] || 0,
    };

    // Save to our database for future use
    const { data: savedProduct, error: saveError } = await supabase
      .from('food_items')
      .insert(productData)
      .select()
      .single();

    if (saveError) {
      console.error('Error saving product to database:', saveError);
      // Still return the product data even if we couldn't save it
      return new Response(JSON.stringify({ 
        success: true, 
        product: productData,
        source: 'openfoodfacts'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Product saved and returned:', savedProduct);
    return new Response(JSON.stringify({ 
      success: true, 
      product: savedProduct,
      source: 'openfoodfacts'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in barcode-lookup function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Internal server error',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});