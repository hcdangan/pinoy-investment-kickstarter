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

    // Call the AI provider
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

async function callAI(messages: Array<{ role: string; content: string }>): Promise<string | null> {
  const openaiKey = Deno.env.get("OPENAI_API_KEY");
  const anthropicKey = Deno.env.get("ANTHROPIC_API_KEY");

  if (openaiKey) {
    return callOpenAI(messages, openaiKey);
  }
  if (anthropicKey) {
    return callAnthropic(messages, anthropicKey);
  }

  // Fallback: rule-based responses when no AI key is configured
  return generateFallbackResponse(messages);
}

async function callOpenAI(
  messages: Array<{ role: string; content: string }>,
  apiKey: string,
): Promise<string | null> {
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        max_tokens: 800,
        temperature: 0.7,
      }),
    });
    if (!res.ok) return generateFallbackResponse(messages);
    const data = await res.json();
    return data.choices?.[0]?.message?.content ?? null;
  } catch {
    return generateFallbackResponse(messages);
  }
}

async function callAnthropic(
  messages: Array<{ role: string; content: string }>,
  apiKey: string,
): Promise<string | null> {
  try {
    const systemMsg = messages.find((m) => m.role === "system");
    const chatMessages = messages.filter((m) => m.role !== "system");

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20241022",
        system: systemMsg?.content ?? "",
        messages: chatMessages.map((m) => ({
          role: m.role === "assistant" ? "assistant" : "user",
          content: m.content,
        })),
        max_tokens: 800,
      }),
    });
    if (!res.ok) return generateFallbackResponse(messages);
    const data = await res.json();
    return data.content?.[0]?.text ?? null;
  } catch {
    return generateFallbackResponse(messages);
  }
}

function generateFallbackResponse(messages: Array<{ role: string; content: string }>): string {
  const userMessages = messages.filter((m) => m.role === "user");
  const count = userMessages.length;

  if (count === 0) {
    return "Hello! I'm your PinoyInvest assistant. I'm here to help you learn about investing in the Philippine context. To give you the best educational guidance, I'd like to ask a few questions about your financial situation. Let's start: What's your age range? (e.g., 18-25, 26-35, 36-45, 46-55, 55+)";
  }

  const lastMsg = userMessages[userMessages.length - 1]?.content?.toLowerCase() ?? "";

  if (count === 1) {
    return "Thank you! Next question: What's your approximate monthly income range? (e.g., below ₱20K, ₱20K-₱50K, ₱50K-₱100K, ₱100K+) This helps me understand what investment options might be accessible to you.";
  }
  if (count === 2) {
    return "Great! Do you currently have any savings or an emergency fund? If yes, roughly how many months of expenses does it cover? If not, that's perfectly okay — we can talk about building one.";
  }
  if (count === 3) {
    return "Thanks for sharing! How would you describe your investment experience? (none, beginner, some, experienced) There's no wrong answer — I'm here to help you learn at your level.";
  }
  if (count === 4) {
    return "Good to know! How would you describe your risk tolerance? Are you conservative (prefer safety), moderate (okay with some ups and downs), or aggressive (comfortable with higher risk for potentially higher returns)?";
  }
  if (count === 5) {
    return "Excellent! What are your main investment goals? For example: building an emergency fund, retirement, buying a home, children's education, or just growing your money long-term?";
  }
  if (count === 6) {
    return "Last question! What's your investment timeline? Are you looking at short-term (less than 3 years), medium-term (3-10 years), or long-term (10+ years)?";
  }

  // After 7+ messages, provide a summary
  return `Based on our conversation, here's a summary of your investment profile and some educational guidance:

## Your Profile Summary
You've shared your age, income, savings status, experience level, risk tolerance, goals, and timeline. This gives us a foundation to explore suitable investment types.

## Educational Overview
Here are investment options commonly available to Filipinos, from lower to higher risk:

1. **High-yield savings accounts** (digital banks like Maya, GoTyme, Seabank) — Low risk, earns 4-6% annually. Good for emergency funds.
2. **Pag-IBIG MP2** — Low to moderate risk, historically 5-7% annual dividend. Minimum ₱500/month.
3. **SSS PESO Fund** — Low to moderate risk, government-backed. For SSS members.
4. **Bonds and UITFs** — Moderate risk, professionally managed. Minimum ₱5,000-10,000.
5. **Mutual funds** — Moderate risk, diversified. Good for beginners. Minimum ₱5,000.
6. **Stocks (PSE)** — Higher risk, potentially higher returns. Requires research and a broker account.

## Risk Considerations
- All investments can lose value. Past performance does not guarantee future returns.
- Diversification (spreading money across different investments) helps manage risk.
- Only invest money you can afford to keep invested for your chosen timeline.

## Suggested Learning Path
1. Start with "Investing Basics" and "Understanding Risk" modules
2. Explore "The Philippine Market" to learn about local options
3. Study "Building a Portfolio" when you're ready to plan allocation

## Important Reminder
This is educational content only, not licensed financial advice. Always research thoroughly and consult a licensed financial professional before making investment decisions. Investments can lose value.

Would you like me to explain any of these topics in more detail?`;
}