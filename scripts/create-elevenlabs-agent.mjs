// One-off / re-run-able script that creates (or updates, if AGENT_ID is passed)
// the ElevenLabs Conversational AI agent backing the site's voice widget
// (components/ui/VoiceWidget.tsx). Run with:
//
//   node --env-file=.env.local scripts/create-elevenlabs-agent.mjs
//
// from inside khady-cafe/. Prints the created agent_id — copy it into
// NEXT_PUBLIC_ELEVENLABS_AGENT_ID in .env.local (and wherever the site is
// deployed) afterward.

const API_KEY = process.env.ELEVENLABS_API_KEY;
if (!API_KEY) {
  console.error("Missing ELEVENLABS_API_KEY (run with --env-file=.env.local).");
  process.exit(1);
}

const SYSTEM_PROMPT = `You are the voice and chat assistant for Khady's Café, a neighbourhood specialty-coffee shop at 42 Lauriston Road, London E9 7HA.

## Who you are
Friendly, warm, and concise — like a helpful staff member picking up the phone. Keep answers short and conversational, suited to being spoken aloud.

## What you know today
- Name: Khady's Café, open since 2017.
- Address: 42 Lauriston Road, London E9 7HA.
- Hours: Mon–Fri 7:00–16:00, Sat 8:00–16:00, Sun 9:00–21:00.
- Contact: hello@khadyscafe.co.uk, 020 7946 0114, Instagram @khadyscafe.
- About: a neighbourhood coffee shop on Lauriston Road — small-batch coffee, pastries baked every morning, and a short lunch menu.
- Menu categories on the site: Espresso Drinks, Cold Drinks, Pastries, Sandwiches. Specific items, exact prices, and daily availability are NOT loaded into you yet.

## What to do
- Answer questions about hours, location, contact details, and the café's general vibe confidently, using only the facts above.
- For specific menu items, prices, allergens, or availability, say you don't have the full menu on hand yet and point them to the site's menu page or 020 7946 0114 — never invent items, prices, or availability.
- For table bookings, point them to the site's reservation page. You can take their name, preferred date/time, and party size to pass along, but don't confirm a booking yourself.
- If you don't know something, say so plainly and offer the phone number or email rather than guessing.

## Additional knowledge base
You also have an attached Knowledge Base with more detail (full menu, seasonal items, allergens, policies, etc.). Prefer it over the summary above for anything it covers, and use it to answer specific menu, allergen, and policy questions instead of saying you don't have that on hand.`;

// Documents uploaded via the ElevenLabs dashboard (Knowledge Base tab) still
// need to be attached to the agent to be used — uploading alone doesn't do
// it. List their workspace document IDs here (GET
// https://api.elevenlabs.io/v1/convai/knowledge-base lists them) and re-run
// this script to (re-)attach. "auto" usage_mode inlines the full document
// text into context, which is fine at this size; switch to RAG
// (conversation_config.agent.prompt.rag.enabled) if the knowledge base grows
// past what comfortably fits in context.
const KNOWLEDGE_BASE = [
  {
    type: "file",
    id: "wZv4Ci5IyXYqmU9eGNr2",
    name: "Khadys Cafe - Customer Support Contact Guide.pdf",
    usage_mode: "auto",
  },
  {
    type: "file",
    id: "C53XdulyVdDznzHfE6Ub",
    name: "Khadys Cafe - Customer Support FAQ_1.pdf",
    usage_mode: "auto",
  },
];

const body = {
  name: "Khady's Café Support Agent",
  conversation_config: {
    agent: {
      prompt: {
        prompt: SYSTEM_PROMPT,
        llm: "gemini-2.0-flash",
        knowledge_base: KNOWLEDGE_BASE,
      },
      first_message: "Hi, thanks for calling Khady's Café — how can I help?",
      language: "en",
    },
    tts: {
      // Elise — Warm, Natural and Engaging. Swap via the dashboard any time,
      // but re-run this script afterward to keep this file in sync — otherwise
      // the next script run will silently revert to whatever's hardcoded here.
      voice_id: "EST9Ui6982FZPSi7gCHi",
    },
  },
  platform_settings: {
    widget: {
      variant: "full",
      // bottom-left: the existing n8n text-chat bubble already occupies
      // bottom-right (see components/ui/ChatWidget.tsx).
      placement: "bottom-left",
      // Match the site's design tokens (app/globals.css @theme block).
      avatar: { type: "orb", color_1: "#9c6f3a", color_2: "#c89b5e" },
      bg_color: "#fcf8f1", // --color-foam
      text_color: "#2a1c12", // --color-espresso
      btn_color: "#3a2417", // --color-bean
      btn_text_color: "#f4ebdc", // --color-cream
      border_color: "#dac7a8", // --color-line
      focus_color: "#9c6f3a", // --color-bronze
    },
  },
};

const existingAgentId = process.argv[2];
const url = existingAgentId
  ? `https://api.elevenlabs.io/v1/convai/agents/${existingAgentId}`
  : "https://api.elevenlabs.io/v1/convai/agents/create";

const res = await fetch(url, {
  method: existingAgentId ? "PATCH" : "POST",
  headers: {
    "xi-api-key": API_KEY,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
});

const data = await res.json();
if (!res.ok) {
  console.error(`ElevenLabs API error (${res.status}):`, JSON.stringify(data, null, 2));
  process.exit(1);
}

console.log(JSON.stringify(data, null, 2));
if (data.agent_id) {
  console.log(`\nAgent ready. Set NEXT_PUBLIC_ELEVENLABS_AGENT_ID=${data.agent_id}`);
}
