import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { goalWeight, userId } = await req.json();

    if (!goalWeight || !userId) {
      throw new Error('Goal weight and user ID are required');
    }

    console.log('Recalculating nutrition goals for user:', userId, 'Goal weight:', goalWeight);

    // Create Supabase client with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get user's current profile data
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (profileError || !profile) {
      throw new Error('Could not fetch user profile');
    }

    console.log('Current profile:', profile);

    // Calculate age from date of birth if available
    let age = profile.age;
    if (!age && profile.date_of_birth) {
      const birthDate = new Date(profile.date_of_birth);
      const today = new Date();
      age = today.getFullYear() - birthDate.getFullYear();
    }

    // Create prompt for AI analysis
    const prompt = `
You are a nutrition expert AI. Calculate optimal daily nutrition goals for a user based on their profile and new goal weight.

User Profile:
- Current Weight: ${profile.weight || 'unknown'} kg
- Goal Weight: ${goalWeight} kg
- Height: ${profile.height || 'unknown'} cm
- Age: ${age || 'unknown'}
- Activity Level: ${profile.activity_level || 'moderate'}
- Goal Type: ${profile.goal_type || 'maintain'}

Please calculate and return ONLY a JSON object with the following format (no additional text):
{
  "daily_calorie_goal": number,
  "protein_goal": number,
  "carbs_goal": number,
  "fat_goal": number,
  "fiber_goal": number,
  "reasoning": "Brief explanation of the calculation"
}

Consider:
- BMR calculation based on age, weight, height, gender
- Activity level multiplier
- Goal type (lose weight, gain weight, maintain)
- Optimal macronutrient distribution
- Healthy rate of weight change (0.5-1kg per week)
- Adequate fiber intake (25-35g per day)

Ensure the macronutrients add up correctly to the total calories (protein: 4 cal/g, carbs: 4 cal/g, fat: 9 cal/g).
`;

    console.log('Sending request to OpenAI...');

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-2025-08-07',
        messages: [
          {
            role: 'system',
            content: 'You are a professional nutritionist and dietitian. Provide accurate, science-based nutrition calculations. Always respond with valid JSON only.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_completion_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const aiContent = aiResponse.choices[0].message.content;
    
    console.log('AI Response:', aiContent);

    // Parse AI response
    let nutritionGoals;
    try {
      nutritionGoals = JSON.parse(aiContent);
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', aiContent);
      throw new Error('Invalid AI response format');
    }

    // Validate required fields
    const requiredFields = ['daily_calorie_goal', 'protein_goal', 'carbs_goal', 'fat_goal', 'fiber_goal'];
    for (const field of requiredFields) {
      if (typeof nutritionGoals[field] !== 'number') {
        throw new Error(`Invalid or missing ${field} in AI response`);
      }
    }

    console.log('Parsed nutrition goals:', nutritionGoals);

    // Update user profile with new goals
    const { data: updatedProfile, error: updateError } = await supabase
      .from('profiles')
      .update({
        goal_weight: goalWeight,
        daily_calorie_goal: Math.round(nutritionGoals.daily_calorie_goal),
        protein_goal: Math.round(nutritionGoals.protein_goal),
        carbs_goal: Math.round(nutritionGoals.carbs_goal),
        fat_goal: Math.round(nutritionGoals.fat_goal),
        fiber_goal: Math.round(nutritionGoals.fiber_goal),
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .select()
      .single();

    if (updateError) {
      console.error('Database update error:', updateError);
      throw new Error('Failed to update user profile');
    }

    console.log('Successfully updated profile:', updatedProfile);

    return new Response(
      JSON.stringify({
        success: true,
        goals: {
          goalWeight: goalWeight,
          dailyCalorieGoal: Math.round(nutritionGoals.daily_calorie_goal),
          proteinGoal: Math.round(nutritionGoals.protein_goal),
          carbsGoal: Math.round(nutritionGoals.carbs_goal),
          fatGoal: Math.round(nutritionGoals.fat_goal),
          fiberGoal: Math.round(nutritionGoals.fiber_goal)
        },
        reasoning: nutritionGoals.reasoning
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in recalculate-nutrition-goals function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});