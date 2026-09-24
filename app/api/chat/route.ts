import { NextResponse } from "next/server";

/**
 * Same-origin proxy for the café's n8n chat workflow, used by `ChatWidget`
 * (`webhookUrl: "/api/chat"`) instead of calling n8n directly from the
 * browser. The workflow's CORS setting only allows one hardcoded origin, so
 * a direct browser fetch fails everywhere else (any other dev port, or the
 * production domain); a server-to-server forward isn't subject to CORS at
 * all. Mirrors the forwarding pattern in `app/api/reserve/route.ts`.
 */
export async function POST(request: Request) {
  const webhookUrl = process.env.N8N_CHAT_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("[chat] Missing N8N_CHAT_WEBHOOK_URL env var");
    return NextResponse.json(
      { error: "Chat isn't available right now." },
      { status: 500 },
    );
  }

  const body = await request.text();

  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });

    const responseBody = await webhookResponse.text();
    return new NextResponse(responseBody, {
      status: webhookResponse.status,
      headers: {
        "Content-Type":
          webhookResponse.headers.get("Content-Type") ?? "application/json",
      },
    });
  } catch (err) {
    console.error("[chat] Webhook request failed:", err);
    return NextResponse.json(
      { error: "Chat isn't available right now." },
      { status: 502 },
    );
  }
}
