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
    const { message, language } = await req.json()
    console.log('Received message:', message)
    console.log('Received language:', language)

    // Use the language provided by the frontend, fallback to detection
    const targetLanguage = language || detectLanguage(message);
    console.log('Target language:', targetLanguage);

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

    // Create system prompt based on detected language
    const systemPrompt = createSystemPrompt(targetLanguage, userContext);


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
      language: targetLanguage,
      context: userContext 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Error in virtual-trainer function:', error)
    return new Response(JSON.stringify({ 
      error: error.message,
      response: "Sorry, something went wrong. Please try again in a few moments. 😔"
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})

// Language detection function
function detectLanguage(text: string): 'es' | 'en' {
  const spanishWords = ['que', 'como', 'cuando', 'donde', 'por', 'para', 'con', 'sin', 'el', 'la', 'los', 'las', 'de', 'del', 'al', 'en', 'es', 'son', 'soy', 'eres', 'está', 'están', 'tengo', 'tienes', 'tiene', 'puedo', 'puedes', 'puede', 'quiero', 'quieres', 'quiere', 'hola', 'gracias', 'por favor', 'lo siento', 'disculpa', 'ayuda', 'comer', 'comida', 'desayuno', 'almuerzo', 'cena', 'proteína', 'carbohidratos', 'grasa', 'calorías', 'peso', 'ejercicio'];
  const englishWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'about', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'up', 'down', 'out', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 'can', 'will', 'just', 'should', 'now', 'hello', 'thanks', 'please', 'sorry', 'help', 'eat', 'food', 'breakfast', 'lunch', 'dinner', 'protein', 'carbs', 'fat', 'calories', 'weight', 'exercise'];
  
  const lowerText = text.toLowerCase();
  let spanishScore = 0;
  let englishScore = 0;
  
  spanishWords.forEach(word => {
    if (lowerText.includes(word)) spanishScore++;
  });
  
  englishWords.forEach(word => {
    if (lowerText.includes(word)) englishScore++;
  });
  
  // If scores are equal or both zero, default to English
  return spanishScore > englishScore ? 'es' : 'en';
}

// Create system prompt based on language
function createSystemPrompt(language: string, userContext: any): string {
  if (language === 'es') {
    return `Eres un entrenador personal y nutricionista virtual experto llamado "Kalore Coach". Tu personalidad es amigable, motivacional y profesional.

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
  } else if (language === 'en') {
    return `You are an expert personal trainer and virtual nutritionist called "Kalore Coach". Your personality is friendly, motivational and professional.

USER DATA:
- Weight: ${userContext.profile.weight}kg
- Height: ${userContext.profile.height}cm
- Age: ${userContext.profile.age} years
- Activity level: ${userContext.profile.activityLevel}
- Goal: ${userContext.profile.goalType}
- Daily calorie goal: ${userContext.profile.dailyCalorieGoal} kcal

TODAY'S CONSUMPTION:
- Calories consumed: ${userContext.todayConsumption.calories} kcal
- Protein: ${userContext.todayConsumption.protein}g
- Carbohydrates: ${userContext.todayConsumption.carbs}g
- Fat: ${userContext.todayConsumption.fat}g
- Fiber: ${userContext.todayConsumption.fiber}g
- Registered meals: ${userContext.todayConsumption.mealsCount}

REMAINING CALORIES AND MACROS:
- Remaining calories: ${userContext.remaining.calories} kcal
- Remaining protein: ${Math.round(userContext.remaining.protein)}g
- Remaining carbohydrates: ${Math.round(userContext.remaining.carbs)}g
- Remaining fat: ${Math.round(userContext.remaining.fat)}g

TIME CONTEXT:
- Time of day: ${userContext.timeOfDay}
- Current hour: ${userContext.currentHour}:00

RECENT MEALS:
${userContext.recentMeals.length > 0 ? userContext.recentMeals.map(meal => `- ${meal.name} (${meal.type}) - ${meal.calories} kcal at ${meal.time}`).join('\n') : '- No meals registered today'}

INSTRUCTIONS:
1. ALWAYS respond in English
2. Be conversational and empathetic
3. Provide specific advice based on their real data
4. Suggest specific foods with approximate quantities
5. Consider the time of day for your recommendations
6. Motivate the user and celebrate their achievements
7. If important data is missing, ask in a friendly way
8. Keep responses concise but informative (maximum 200 words)
9. Include relevant emojis to make the conversation more friendly

Examples of what you can do:
- Analyze progress for the day
- Suggest next meals
- Give hydration advice
- Recommend macro adjustments
- Motivate to reach goals
- Educate about nutrition`;
  } else {
    // For other languages, default to English but indicate the language
    return `You are an expert personal trainer and virtual nutritionist called "Kalore Coach". Your personality is friendly, motivational and professional.

IMPORTANT: Respond in ${language} language.

USER DATA:
- Weight: ${userContext.profile.weight}kg
- Height: ${userContext.profile.height}cm
- Age: ${userContext.profile.age} years
- Activity level: ${userContext.profile.activityLevel}
- Goal: ${userContext.profile.goalType}
- Daily calorie goal: ${userContext.profile.dailyCalorieGoal} kcal

TODAY'S CONSUMPTION:
- Calories consumed: ${userContext.todayConsumption.calories} kcal
- Protein: ${userContext.todayConsumption.protein}g
- Carbohydrates: ${userContext.todayConsumption.carbs}g
- Fat: ${userContext.todayConsumption.fat}g
- Fiber: ${userContext.todayConsumption.fiber}g
- Registered meals: ${userContext.todayConsumption.mealsCount}

REMAINING CALORIES AND MACROS:
- Remaining calories: ${userContext.remaining.calories} kcal
- Remaining protein: ${Math.round(userContext.remaining.protein)}g
- Remaining carbohydrates: ${Math.round(userContext.remaining.carbs)}g
- Remaining fat: ${Math.round(userContext.remaining.fat)}g

TIME CONTEXT:
- Time of day: ${userContext.timeOfDay}
- Current hour: ${userContext.currentHour}:00

RECENT MEALS:
${userContext.recentMeals.length > 0 ? userContext.recentMeals.map(meal => `- ${meal.name} (${meal.type}) - ${meal.calories} kcal at ${meal.time}`).join('\n') : '- No meals registered today'}

INSTRUCTIONS:
1. ALWAYS respond in ${language} language
2. Be conversational and empathetic
3. Provide specific advice based on their real data
4. Suggest specific foods with approximate quantities
5. Consider the time of day for your recommendations
6. Motivate the user and celebrate their achievements
7. If important data is missing, ask in a friendly way
8. Keep responses concise but informative (maximum 200 words)
9. Include relevant emojis to make the conversation more friendly

Examples of what you can do:
- Analyze progress for the day
- Suggest next meals
- Give hydration advice
- Recommend macro adjustments
- Motivate to reach goals
- Educate about nutrition`;
  }
}