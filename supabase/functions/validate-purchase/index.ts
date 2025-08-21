import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Helper logging function for enhanced debugging
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[VALIDATE-PURCHASE] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Create Supabase client with service role key
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    logStep("Function started");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");

    // Get user from auth header
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user) throw new Error("User not authenticated");

    logStep("User authenticated", { userId: user.id });

    const { userId, productId, transactionId, receiptData, platform, originalTransactionId } = await req.json();

    if (!userId || !productId || !transactionId || !platform) {
      throw new Error("Missing required fields");
    }

    logStep("Validating purchase", { userId, productId, transactionId, platform });

    // In a real implementation, you would validate the receipt with Apple/Google servers
    // For now, we'll do basic validation and store the purchase
    
    // Check if this transaction already exists
    const { data: existingTransaction } = await supabaseClient
      .from('subscriptions')
      .select('*')
      .eq('transaction_id', transactionId)
      .single();

    if (existingTransaction) {
      logStep("Transaction already exists", { transactionId });
      return new Response(JSON.stringify({ 
        success: true, 
        message: "Purchase already validated",
        subscription: existingTransaction 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Calculate expiry date based on product type
    let expiryDate = new Date();
    if (productId.includes('annual')) {
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    } else if (productId.includes('monthly')) {
      expiryDate.setMonth(expiryDate.getMonth() + 1);
    }

    // Deactivate any existing active subscriptions for this user
    await supabaseClient
      .from('subscriptions')
      .update({ is_active: false })
      .eq('user_id', userId)
      .eq('is_active', true);

    // Insert new subscription
    const { data: newSubscription, error: insertError } = await supabaseClient
      .from('subscriptions')
      .insert({
        user_id: userId,
        product_id: productId,
        transaction_id: transactionId,
        original_transaction_id: originalTransactionId || transactionId,
        platform,
        is_active: true,
        expiry_date: expiryDate.toISOString(),
        receipt_data: receiptData,
      })
      .select()
      .single();

    if (insertError) {
      logStep("Error inserting subscription", insertError);
      throw new Error(`Failed to create subscription: ${insertError.message}`);
    }

    logStep("Subscription created successfully", { subscriptionId: newSubscription.id });

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Purchase validated successfully",
      subscription: newSubscription 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in validate-purchase", { message: errorMessage });
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: errorMessage 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});