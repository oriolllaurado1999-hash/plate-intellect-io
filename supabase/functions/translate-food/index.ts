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
    const { foodName, language = 'en' } = await req.json();
    
    if (!foodName) {
      throw new Error('Food name is required');
    }

    console.log('Translating food name:', foodName, 'to language:', language);

    if (!openAIApiKey) {
      console.error('OpenAI API key not configured');
      throw new Error('OpenAI API key not configured');
    }

    // Create translation prompt
    const systemPrompt = createTranslationPrompt(language);
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-nano-2025-08-07',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: foodName }
        ],
        max_completion_tokens: 50
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const translatedName = data.choices[0].message.content.trim();

    console.log('Translation result:', translatedName);

    return new Response(JSON.stringify({ 
      originalName: foodName,
      translatedName: translatedName,
      language: language
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in translate-food function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      translatedName: foodName // Fallback to original name
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function createTranslationPrompt(language: string): string {
  const languageNames = {
    'es': 'español',
    'en': 'English',
    'zh': '中文',
    'pt': 'português',
    'fr': 'français', 
    'de': 'Deutsch',
    'it': 'italiano',
    'ru': 'русский'
  };

  const targetLanguage = languageNames[language as keyof typeof languageNames] || 'English';

  return `You are a food name translator. Translate food names to ${targetLanguage}.

RULES:
1. Only translate the food name, nothing else
2. Keep it concise and natural
3. Use common food terminology in ${targetLanguage}
4. For compound foods, translate each component appropriately
5. If it's already in ${targetLanguage}, return it as is
6. Don't add explanations or extra text

Examples:
- "fresh lemon slice" → "rodaja de limón fresco" (for Spanish)
- "grilled chicken breast" → "pechuga de pollo a la plancha" (for Spanish)
- "mixed green salad" → "ensalada verde mixta" (for Spanish)

Translate the food name to ${targetLanguage}:`;
}