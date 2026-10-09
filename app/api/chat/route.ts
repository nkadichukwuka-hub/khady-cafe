import { NextResponse } from "next/server";
import { cafe } from "@/data/cafe";
import { buildSystemPrompt } from "@/lib/chat-knowledge";

/**
 * Chat endpoint for the floating widget (`components/ui/ChatWidget.tsx`).
 * Speaks the small protocol the @n8n/chat widget expects, but answers with
 * Google Gemini directly, so no separate automation server has to stay online.
 * The API key lives only in the GEMINI_API_KEY environment variable.
 */

const MODEL = "gemini-3.5-flash-lite";
const MAX_INPUT = 500; // characters per visitor message
const MAX_TURNS = 8; // remembered exchanges per conversation
const SESSION_TTL_MS = 30 * 60 * 1000;
const PER_IP_LIMIT = 20; // messages per window
const WINDOW_MS = 10 * 60 * 1000;
const DAILY_LIMIT = 400; // protects the free Gemini quota

type Turn = { role: "user" | "model"; text: string };

// Memory lives in this server instance only: good enough for a short demo
// chat, and it resets harmlessly when the instance restarts.
const sessions = new Map<string, { turns: Turn[]; touched: number }>();
const hits = new Map<string, number[]>();
let day = { key: "", count: 0 };

const fallback = () =>
  NextResponse.json({
    output: `Sorry, I'm having trouble right now. Please call us on ${cafe.contact.phone} and the team will help.`,
  });

function allowed(ip: string): boolean {
  const now = Date.now();
  const today = new Date().toISOString().slice(0, 10);
  if (day.key !== today) day = { key: today, count: 0 };
  if (day.count >= DAILY_LIMIT) return false;

  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= PER_IP_LIMIT) return false;
  recent.push(now);
  hits.set(ip, recent);
  day.count += 1;

  if (hits.size > 2000) hits.clear();
  return true;
}

function remember(id: string): Turn[] {
  const now = Date.now();
  for (const [key, s] of sessions) {
    if (now - s.touched > SESSION_TTL_MS) sessions.delete(key);
  }
  if (sessions.size > 500) sessions.clear();
  const existing = sessions.get(id) ?? { turns: [], touched: now };
  existing.touched = now;
  sessions.set(id, existing);
  return existing.turns;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  // The widget asks for earlier messages when it opens; we keep none.
  if (body.action === "loadPreviousSession") {
    return NextResponse.json({ data: [] });
  }

  const text = typeof body.chatInput === "string" ? body.chatInput.trim() : "";
  const sessionId =
    typeof body.sessionId === "string" ? body.sessionId.slice(0, 80) : "anon";
  if (!text) {
    return NextResponse.json({
      output: "Ask me about the menu, opening hours or our weekly events.",
    });
  }

  const ip = (request.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (!allowed(ip)) {
    return NextResponse.json({
      output: `You're sending messages very quickly. Please wait a little, or call us on ${cafe.contact.phone}.`,
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("[chat] Missing GEMINI_API_KEY env var");
    return fallback();
  }

  const turns = remember(sessionId);
  const message = text.slice(0, MAX_INPUT);

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: buildSystemPrompt() }] },
          contents: [...turns, { role: "user", text: message }].map((t) => ({
            role: t.role,
            parts: [{ text: t.text }],
          })),
          generationConfig: { temperature: 0.4, maxOutputTokens: 400 },
        }),
        signal: AbortSignal.timeout(20000),
      },
    );

    if (!res.ok) {
      console.error("[chat] Gemini error", res.status, (await res.text()).slice(0, 300));
      return fallback();
    }

    const data = await res.json();
    const reply: string = (data.candidates?.[0]?.content?.parts ?? [])
      .map((p: { text?: string }) => p.text ?? "")
      .join("")
      .trim();
    if (!reply) return fallback();

    turns.push({ role: "user", text: message }, { role: "model", text: reply });
    if (turns.length > MAX_TURNS * 2) turns.splice(0, turns.length - MAX_TURNS * 2);

    return NextResponse.json({ output: reply });
  } catch (err) {
    console.error("[chat] Gemini request failed:", err);
    return fallback();
  }
}
