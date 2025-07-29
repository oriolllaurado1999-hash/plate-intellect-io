import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting food analysis...');
    
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }
    
    const { imageBase64 } = await req.json();

    if (!imageBase64) {
      throw new Error('No image provided');
    }

    console.log('Image received, calling OpenAI...');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a nutrition expert AI that analyzes food images. Analyze the food in the image and return ONLY a valid JSON object with this exact structure:

{
  "foods": [
    {
      "name": "food name",
      "quantity": estimated_grams,
      "calories": calories_for_quantity,
      "protein": protein_grams,
      "carbs": carbs_grams,
      "fat": fat_grams,
      "fiber": fiber_grams,
      "confidence": 0.0_to_1.0
    }
  ],
  "overall_confidence": 0.0_to_1.0,
  "meal_name": "suggested meal name"
}

Guidelines:
- Estimate quantities in grams based on visual portion sizes
- Calculate nutrition values for the estimated quantity (not per 100g)
- Be conservative with confidence scores
- Include all visible foods
- Use common food names
- If unsure about a food, lower the confidence
- Return only the JSON, no other text`
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Analyze this food image and identify all foods with their nutritional information.'
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageBase64,
                  detail: "high"
                }
              }
            ]
          }
        ],
        max_tokens: 1500,
        temperature: 0.3
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', response.status, errorData);
      throw new Error(`OpenAI API error: ${response.status} - ${errorData}`);
    }

    console.log('OpenAI response received successfully');

    const data = await response.json();
    let analysisResult;
    
    try {
      // Parse the JSON response from the AI
      const aiResponse = data.choices[0].message.content;
      console.log('AI Response:', aiResponse);
      analysisResult = JSON.parse(aiResponse);
      console.log('Successfully parsed AI response');
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      console.error('Raw AI response:', data.choices[0]?.message?.content);
      throw new Error('Invalid AI response format');
    }

    return new Response(JSON.stringify({ 
      success: true, 
      analysis: analysisResult 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-food function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});