import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.53.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId, language = 'es' } = await req.json();
    
    if (!userId) {
      throw new Error('User ID is required');
    }

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl!, supabaseServiceKey!);

    // Get current hour to determine message type
    const now = new Date();
    const hour = now.getHours();
    const today = now.toISOString().split('T')[0];
    
    let messageType: string;
    if (hour >= 6 && hour < 11) messageType = 'morning';
    else if (hour >= 11 && hour < 16) messageType = 'midday';
    else if (hour >= 16 && hour < 20) messageType = 'afternoon';
    else messageType = 'night';

    // Check if message already exists for today and type
    const { data: existingMessage } = await supabase
      .from('daily_coach_messages')
      .select('*')
      .eq('user_id', userId)
      .eq('message_date', today)
      .eq('message_type', messageType)
      .single();

    if (existingMessage) {
      return new Response(JSON.stringify({ 
        message: existingMessage,
        isNew: false 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get user profile and today's nutrition data
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    const { data: todayMeals } = await supabase
      .from('meals')
      .select(`
        *,
        meal_items(*)
      `)
      .eq('user_id', userId)
      .eq('meal_date', today);

    // Calculate today's totals
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    let totalFiber = 0;
    let totalSugar = 0;
    let totalSodium = 0;

    todayMeals?.forEach(meal => {
      totalCalories += Number(meal.total_calories || 0);
      totalProtein += Number(meal.total_protein || 0);
      totalCarbs += Number(meal.total_carbs || 0);
      totalFat += Number(meal.total_fat || 0);
      totalFiber += Number(meal.total_fiber || 0);
      
      meal.meal_items?.forEach((item: any) => {
        // Calculate estimated sugar and sodium (rough estimates)
        totalSugar += Number(item.carbs || 0) * 0.1; // ~10% of carbs as sugar estimate
        totalSodium += Number(item.calories || 0) * 0.5; // Rough sodium estimate
      });
    });

    const calorieGoal = profile?.daily_calorie_goal || 2000;
    const proteinGoal = Math.round(calorieGoal * 0.3 / 4); // 30% of calories from protein
    const carbsGoal = Math.round(calorieGoal * 0.4 / 4); // 40% of calories from carbs
    const fatGoal = Math.round(calorieGoal * 0.3 / 9); // 30% of calories from fat

    // Create context for AI
    const context = {
      messageType,
      hour,
      language,
      profile: {
        name: profile?.display_name || 'Usuario',
        calorieGoal,
        proteinGoal,
        carbsGoal,
        fatGoal,
        goalType: profile?.goal_type || 'maintain'
      },
      todayProgress: {
        calories: totalCalories,
        protein: totalProtein,
        carbs: totalCarbs,
        fat: totalFat,
        fiber: totalFiber,
        sugar: totalSugar,
        sodium: totalSodium,
        mealsCount: todayMeals?.length || 0
      },
      percentages: {
        calories: Math.round((totalCalories / calorieGoal) * 100),
        protein: Math.round((totalProtein / proteinGoal) * 100),
        carbs: Math.round((totalCarbs / carbsGoal) * 100),
        fat: Math.round((totalFat / fatGoal) * 100)
      }
    };

    // Generate AI message
    const systemPrompt = createSystemPrompt(language, context);
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: 'Genera el mensaje del coach para este momento' }
        ],
        max_tokens: 500,
        temperature: 0.7
      }),
    });

    const aiData = await response.json();
    const messageContent = aiData.choices[0].message.content;

    // Create preview (first 2 lines)
    const lines = messageContent.split('\n').filter((line: string) => line.trim());
    const preview = lines.slice(0, 2).join(' ').substring(0, 100);
    const finalPreview = preview.length < messageContent.length ? preview + '...' : preview;

    // Save message to database
    const { data: savedMessage, error } = await supabase
      .from('daily_coach_messages')
      .insert({
        user_id: userId,
        message_date: today,
        message_type: messageType,
        message_content: messageContent,
        message_preview: finalPreview,
        is_read: false
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving message:', error);
      throw error;
    }

    return new Response(JSON.stringify({ 
      message: savedMessage,
      isNew: true 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in daily-coach-message function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function createSystemPrompt(language: string, context: any): string {
  const isSpanish = language === 'es';
  
  const basePrompt = isSpanish ? `
Eres Kalore Coach, un entrenador y nutricionista virtual experto. Tu misión es motivar, guiar y dar consejos prácticos.

CONTEXTO ACTUAL:
- Tipo de mensaje: ${context.messageType}
- Hora: ${context.hour}:00
- Usuario: ${context.profile.name}
- Objetivo: ${context.profile.goalType}
- Meta calórica diaria: ${context.profile.calorieGoal} cal

PROGRESO DE HOY:
- Calorías: ${context.todayProgress.calories}/${context.profile.calorieGoal} (${context.percentages.calories}%)
- Proteínas: ${context.todayProgress.protein}g/${context.profile.proteinGoal}g (${context.percentages.protein}%)
- Carbohidratos: ${context.todayProgress.carbs}g/${context.profile.carbsGoal}g (${context.percentages.carbs}%)
- Grasas: ${context.todayProgress.fat}g/${context.profile.fatGoal}g (${context.percentages.fat}%)
- Comidas registradas: ${context.todayProgress.mealsCount}
- Azúcar estimado: ${Math.round(context.todayProgress.sugar)}g
- Fibra: ${Math.round(context.todayProgress.fiber)}g

INSTRUCCIONES POR TIPO DE MENSAJE:

MORNING (6-11h): Si las métricas están en 0, saluda con energía y sugiere un desayuno saludable específico. Si ya hay datos, comenta el progreso.

MIDDAY (11-16h): Analiza el progreso de media jornada. Da consejos para la comida/merienda basándote en lo que falta por consumir.

AFTERNOON (16-20h): Motivación y ajustes. Si va mal, anima y da consejos. Si va bien, felicita y recuerda seguir así.

NIGHT (20-24h): ANÁLISIS COMPLETO DEL DÍA. Haz un resumen detallado:
- Qué ha hecho bien/mal
- Análisis de cada macro
- Si se pasó en algo (azúcar, sodio, calorías)
- Recomendaciones específicas para mañana
- Motivación para el día siguiente

ESTILO:
- Usa emojis apropiados
- Sé motivador pero realista
- Da consejos específicos y prácticos
- Máximo 200 palabras
- Personaliza según el nombre del usuario
- Si detectas excesos (azúcar >50g, sodio >2300mg), menciona sugerencias para equilibrar
` : `
You are Kalore Coach, an expert virtual trainer and nutritionist. Your mission is to motivate, guide and give practical advice.

CURRENT CONTEXT:
- Message type: ${context.messageType}
- Time: ${context.hour}:00
- User: ${context.profile.name}
- Goal: ${context.profile.goalType}
- Daily calorie target: ${context.profile.calorieGoal} cal

TODAY'S PROGRESS:
- Calories: ${context.todayProgress.calories}/${context.profile.calorieGoal} (${context.percentages.calories}%)
- Protein: ${context.todayProgress.protein}g/${context.profile.proteinGoal}g (${context.percentages.protein}%)
- Carbs: ${context.todayProgress.carbs}g/${context.profile.carbsGoal}g (${context.percentages.carbs}%)
- Fat: ${context.todayProgress.fat}g/${context.profile.fatGoal}g (${context.percentages.fat}%)
- Meals logged: ${context.todayProgress.mealsCount}
- Estimated sugar: ${Math.round(context.todayProgress.sugar)}g
- Fiber: ${Math.round(context.todayProgress.fiber)}g

INSTRUCTIONS BY MESSAGE TYPE:

MORNING (6-11h): If metrics are at 0, greet with energy and suggest specific healthy breakfast. If there's data, comment on progress.

MIDDAY (11-16h): Analyze mid-day progress. Give advice for lunch/snack based on what's missing.

AFTERNOON (16-20h): Motivation and adjustments. If going badly, encourage and advise. If going well, congratulate and remind to keep it up.

NIGHT (20-24h): COMPLETE DAY ANALYSIS. Make a detailed summary:
- What went well/badly
- Analysis of each macro
- If exceeded anything (sugar, sodium, calories)
- Specific recommendations for tomorrow
- Motivation for the next day

STYLE:
- Use appropriate emojis
- Be motivating but realistic
- Give specific and practical advice
- Maximum 200 words
- Personalize according to user's name
- If you detect excesses (sugar >50g, sodium >2300mg), mention suggestions to balance
`;

  return basePrompt;
}