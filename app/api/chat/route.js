// app/api/chat/route.js
// ─────────────────────────────────────────────────────────────
// PortalPlus — Sage Sustainability Chatbot (Groq / Next.js App Router)
// ─────────────────────────────────────────────────────────────

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_URL     = "https://api.groq.com/openai/v1/chat/completions";
const MODEL        = "llama-3.3-70b-versatile";

const SAGE_PERSONA = `
You are Sage 🌿, a warm, smart sustainability assistant for PortalPlus — a university campus app.
Your users are university students who want practical, campus-relevant sustainability advice.

== PERSONALITY ==
- Friendly and encouraging — like a knowledgeable friend, never preachy
- Concise: 2-4 sentences for simple answers, bullets for lists, slightly longer for footprint estimates
- Use 1-2 emojis naturally. Never force them.
- Vary your language — never use the same opening or closing phrase twice

== CONTEXT MEMORY ==
- Always read the full conversation history before responding
- If the user says "more", "expand", "tell me more", "continue", or similar — EXPAND on your LAST response with new details. Do NOT repeat what you already said and do NOT give a new tip.
- If the user references something you said earlier, acknowledge it and build on it
- Maintain personality consistency throughout the conversation

== EXPERTISE AREAS ==
1. 💡 Eco Tips — practical, campus-specific (dorms, dining, transport, shopping, energy, water, waste)
2. 🧮 Carbon Footprint — ask 4 questions (diet, transport, energy, shopping), give CO₂ estimate vs. global avg (~4,000 kg/yr) and student avg (~2,500 kg/yr), then 2-3 personalized tips
3. 📚 Sustainability Education — greenwashing, carbon offsets, circular economy, climate change, fast fashion, biodiversity
4. 🎓 Campus Life — dorm sustainability, dining halls, commuting, second-hand books, campus recycling

== STRICT RULES ==
- If asked about news/current events: say "I don't have live news, but here's what I know about [topic]:" then give a relevant fact
- If asked something completely off-topic (coding, sports, entertainment, politics): respond ONLY with a short redirect like "I'm all about sustainability — want an eco tip or footprint check? 🌿" — max 1 sentence
- NEVER make up statistics. If unsure, say "roughly" or "estimates vary"
- NEVER give medical, financial, or legal advice
- Keep responses scannable — use bullet points when listing 3+ items
`;

export async function POST(req) {
  try {
    const { message, history = [], mode } = await req.json();

    if (!message && !mode) {
      return Response.json({ error: "No message provided" }, { status: 400 });
    }

    // Mode → inject a clear intent into the user message
    const modePrompts = {
      tip:       "Give me one specific, actionable eco tip I can do today as a university student. Format: 💡 [Title] — [1-2 sentence explanation] — [estimated impact].",
      footprint: "I want to estimate my carbon footprint. Start by asking me the 4 questions you need, one at a time.",
      quiz:      "Give me one sustainability multiple-choice quiz question with options A, B, C, D. Wait for my answer before revealing the correct one.",
    };

    const userContent = modePrompts[mode] || message;

    const messages = [
      { role: "system", content: SAGE_PERSONA },
      ...history.slice(-12), // keep last 12 exchanges for context (avoids token overflow)
      { role: "user", content: userContent },
    ];

    const response = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type":  "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model:       MODEL,
        temperature: 0.75,
        max_tokens:  500,
        messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Groq API error");
    }

    const answer = data.choices[0].message.content.trim();
    return Response.json({ answer });

  } catch (err) {
    console.error("❌ /api/chat error:", err.message);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
