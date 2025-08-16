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

    // Create mock user context for now
    const userContext = {
      profile: {
        weight: 70,
        height: 175,
        age: 30,
        activityLevel: 'moderado',
        goalType: 'mantener',
        dailyCalorieGoal: 2000
      },
      todayConsumption: {
        calories: 800,
        protein: 30,
        carbs: 100,
        fat: 25,
        fiber: 15,
        mealsCount: 2
      },
      remaining: {
        calories: 1200,
        protein: 120,
        carbs: 150,
        fat: 45
      },
      timeOfDay: 'tarde',
      currentHour: 15,
      recentMeals: [
        { name: 'Desayuno saludable', type: 'breakfast', calories: 400, time: '08:30' },
        { name: 'Almuerzo ligero', type: 'lunch', calories: 400, time: '13:00' }
      ]
    }

    console.log('Using mock user context:', userContext)

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
      console.error('OpenAI API key not configured')
      throw new Error('OpenAI API key not configured')
    }

    console.log('Calling OpenAI with prompt...')

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
    console.log('OpenAI response received successfully')

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