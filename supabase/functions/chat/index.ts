import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const SYSTEM_PROMPT = `You are PinoyInvest Assistant, an AI-powered investment education guide for Filipino investors. Your role is to interview users about their financial situation and goals, then provide educational investment guidance based on their profile.

## Your Interview Process
Ask questions ONE AT A TIME to understand the user's profile:
1. Age range (e.g., 18-25, 26-35, 36-45, 46-55, 55+)
2. Monthly income range (e.g., below ₱20K, ₱20K-₱50K, ₱50K-₱100K, ₱100K+)
3. Current savings or emergency fund status
4. Investment experience (none, beginner, some, experienced)
5. Risk tolerance (conservative, moderate, aggressive)
6. Investment goals (e.g., retirement, emergency fund, buying a home, children's education)
7. Investment timeline (short-term <3 years, medium 3-10 years, long-term 10+ years)

## Rules
- ALWAYS frame responses as education, NOT as licensed financial advice.
- Use PHP (₱) and Philippine market examples (PSE, UITFs, mutual funds, Pag-IBIG MP2, SSS PESO Fund, digital banks).
- Keep explanations beginner-friendly and in plain language.
- NEVER guarantee returns or claim certainty about investment outcomes.
- NEVER give personalized buy/sell recommendations for specific stocks or funds.
- Mention that investments can lose value.
- Encourage users to research and consult licensed professionals for personal financial decisions.
- Be warm, encouraging, and culturally appropriate for Filipino users.
- Keep responses concise — typically 2-4 short paragraphs or a question with brief context.
- After gathering enough profile info (usually after 5-7 exchanges), provide a summary with:
  * Their profile summary
  * Educational overview of suitable investment types (not specific recommendations)
  * Risk considerations
  * Suggested learning path
  * Reminder to consult a licensed professional

## Safety
- If a user asks for specific buy/sell advice, politely redirect to educational framing.
- If a user mentions financial distress, encourage them to seek professional help.
- Never claim to be a licensed financial advisor.`;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing authorization header" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { messages, conversationId } = body;

    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Messages must be an array" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch profile to enrich context
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, age_range, income_range, risk_tolerance, experience_level, goals")
      .eq("id", user.id)
      .maybeSingle();

    let profileContext = "";
    if (profile) {
      const parts: string[] = [];
      if (profile.full_name) parts.push(`Name: ${profile.full_name}`);
      if (profile.age_range) parts.push(`Age range: ${profile.age_range}`);
      if (profile.income_range) parts.push(`Income range: ${profile.income_range}`);
      if (profile.risk_tolerance) parts.push(`Risk tolerance: ${profile.risk_tolerance}`);
      if (profile.experience_level) parts.push(`Experience: ${profile.experience_level}`);
      if (profile.goals?.length) parts.push(`Goals: ${profile.goals.join(", ")}`);
      if (parts.length > 0) {
        profileContext = `\n\n## User Profile (from database)\n${parts.join("\n")}`;
      }
    }

    // Build conversation messages for the LLM
    const conversationMessages = [
      { role: "system", content: SYSTEM_PROMPT + profileContext },
      ...messages.map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
    ];

    // Call the AI agent
    const aiResponse = await callAI(conversationMessages);

    if (!aiResponse) {
      return new Response(JSON.stringify({ error: "AI service unavailable" }), {
        status: 503,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Save user message and assistant response to database
    if (conversationId) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage && lastMessage.role === "user") {
        await supabase.from("messages").insert({
          conversation_id: conversationId,
          user_id: user.id,
          role: "user",
          content: lastMessage.content,
        });
      }
      await supabase.from("messages").insert({
        conversation_id: conversationId,
        user_id: user.id,
        role: "assistant",
        content: aiResponse,
      });
      await supabase.from("conversations")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", conversationId);
    }

    return new Response(
      JSON.stringify({ content: aiResponse }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

const OPENROUTER_MODEL = "openrouter/free";

async function callAI(messages: Array<{ role: string; content: string }>): Promise<string | null> {
  const apiKey = Deno.env.get("OPENROUTER_API_KEY");
  if (!apiKey) {
    throw new Error("AI agent is not configured: set OPENROUTER_API_KEY as a Supabase Edge Function secret.");
  }
  return callOpenRouter(messages, apiKey);
}

async function callOpenRouter(
  messages: Array<{ role: string; content: string }>,
  apiKey: string,
): Promise<string | null> {
  try {
    // OpenRouter's API is OpenAI-compatible, so the same messages array
    // works as-is. "openrouter/free" auto-selects whichever free model is
    // currently available, so this keeps working as the free lineup rotates.
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages,
        max_tokens: 1500,
      }),
    });

    if (!res.ok) {
      console.error("OpenRouter API error:", res.status, await res.text());
      return null;
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content ?? null;
  } catch (err) {
    console.error("OpenRouter request failed:", err);
    return null;
  }
}
