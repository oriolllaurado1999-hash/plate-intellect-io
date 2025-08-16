import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { message } = await req.json()
    console.log('Received message:', message)

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!
    
    // Get user from auth header using anon client
    const authHeader = req.headers.get('authorization')
    if (!authHeader) {
      console.error('No authorization header found')
      throw new Error('No authorization header')
    }

    // Create client with anon key for user authentication
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          authorization: authHeader
        }
      }
    })

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser()
    if (authError || !user) {
      console.error('Authentication error:', authError)
      throw new Error('Invalid token')
    }

    console.log('User authenticated:', user.id)

    // Create service role client for database operations
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (profileError) {
      console.error('Profile error:', profileError)
    }

    console.log('User profile:', profile)

    // Get today's meals
    const today = new Date().toISOString().split('T')[0]
    const { data: todayMeals } = await supabase
      .from('meals')
      .select(`
        *,
        meal_items (
          food_name,
          quantity,
          calories,
          protein,
          carbs,
          fat,
          fiber
        )
      `)
      .eq('user_id', user.id)
      .eq('meal_date', today)

    console.log('Today meals:', todayMeals)

    // Calculate daily totals
    const dailyTotals = todayMeals?.reduce((totals, meal) => {
      totals.calories += meal.total_calories || 0
      totals.protein += meal.total_protein || 0
      totals.carbs += meal.total_carbs || 0
      totals.fat += meal.total_fat || 0
      totals.fiber += meal.total_fiber || 0
      return totals
    }, { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }) || { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }

    // Get current time for context
    const currentHour = new Date().getHours()
    const timeOfDay = currentHour < 12 ? 'mañana' : currentHour < 18 ? 'tarde' : 'noche'

    // Create context for AI
    const userContext = {
      profile: {
        weight: profile?.weight || 'no especificado',
        height: profile?.height || 'no especificado',
        age: profile?.age || 'no especificado',
        activityLevel: profile?.activity_level || 'moderado',
        goalType: profile?.goal_type || 'mantener',
        dailyCalorieGoal: profile?.daily_calorie_goal || 2000
      },
      todayConsumption: {
        calories: dailyTotals.calories,
        protein: dailyTotals.protein,
        carbs: dailyTotals.carbs,
        fat: dailyTotals.fat,
        fiber: dailyTotals.fiber,
        mealsCount: todayMeals?.length || 0
      },
      remaining: {
        calories: (profile?.daily_calorie_goal || 2000) - dailyTotals.calories,
        protein: Math.max(0, ((profile?.daily_calorie_goal || 2000) * 0.25 / 4) - dailyTotals.protein),
        carbs: Math.max(0, ((profile?.daily_calorie_goal || 2000) * 0.45 / 4) - dailyTotals.carbs),
        fat: Math.max(0, ((profile?.daily_calorie_goal || 2000) * 0.30 / 9) - dailyTotals.fat)
      },
      timeOfDay,
      currentHour,
      recentMeals: todayMeals?.slice(-3).map(meal => ({
        name: meal.name,
        type: meal.meal_type,
        calories: meal.total_calories,
        time: new Date(meal.created_at).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
      })) || []
    }

    console.log('User context:', userContext)

    // Create system prompt
    const systemPrompt = `Eres un entrenador personal y nutricionista virtual experto llamado "Kalore Coach". Tu personalidad es amigable, motivacional y profesional.

DATOS DEL USUARIO:
- Peso: ${userContext.profile.weight}kg
- Altura: ${userContext.profile.height}cm
- Edad: ${userContext.profile.age} años
- Nivel de actividad: ${userContext.profile.activityLevel}
- Objetivo: ${userContext.profile.goalType}
- Meta diaria de calorías: ${userContext.profile.dailyCalorieGoal} kcal

CONSUMO DE HOY:
- Calorías consumidas: ${userContext.todayConsumption.calories} kcal
- Proteínas: ${userContext.todayConsumption.protein}g
- Carbohidratos: ${userContext.todayConsumption.carbs}g
- Grasas: ${userContext.todayConsumption.fat}g
- Fibra: ${userContext.todayConsumption.fiber}g
- Comidas registradas: ${userContext.todayConsumption.mealsCount}

CALORÍAS Y MACROS RESTANTES:
- Calorías restantes: ${userContext.remaining.calories} kcal
- Proteínas restantes: ${Math.round(userContext.remaining.protein)}g
- Carbohidratos restantes: ${Math.round(userContext.remaining.carbs)}g
- Grasas restantes: ${Math.round(userContext.remaining.fat)}g

CONTEXTO TEMPORAL:
- Momento del día: ${userContext.timeOfDay}
- Hora actual: ${userContext.currentHour}:00

COMIDAS RECIENTES:
${userContext.recentMeals.length > 0 ? userContext.recentMeals.map(meal => `- ${meal.name} (${meal.type}) - ${meal.calories} kcal a las ${meal.time}`).join('\n') : '- No hay comidas registradas hoy'}

INSTRUCCIONES:
1. Responde SIEMPRE en español
2. Sé conversacional y empático
3. Proporciona consejos específicos basados en sus datos reales
4. Sugiere alimentos específicos con cantidades aproximadas
5. Considera el momento del día para tus recomendaciones
6. Motiva al usuario y celebra sus logros
7. Si faltan datos importantes, pregunta de manera amigable
8. Mantén las respuestas concisas pero informativas (máximo 200 palabras)
9. Incluye emojis relevantes para hacer más amigable la conversación

Ejemplos de lo que puedes hacer:
- Analizar el progreso del día
- Sugerir próximas comidas
- Dar consejos sobre hidratación
- Recomendar ajustes en macros
- Motivar para alcanzar objetivos
- Educar sobre nutrición`;

    // Call OpenAI
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured')
    }

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
          { role: 'user', content: message }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('OpenAI API error:', errorData)
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()
    console.log('OpenAI response:', data)

    const aiResponse = data.choices[0].message.content

    return new Response(JSON.stringify({ 
      response: aiResponse,
      context: userContext 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Error in virtual-trainer function:', error)
    return new Response(JSON.stringify({ 
      error: error.message,
      response: "Lo siento, algo salió mal. Por favor intenta de nuevo en unos momentos. 😔"
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})