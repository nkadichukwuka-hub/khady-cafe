"use client";

import { useEffect } from "react";

const AGENT_ID = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;
const EMBED_SCRIPT_SRC = "https://unpkg.com/@elevenlabs/convai-widget-embed";

/**
 * Floating voice-support bubble backed by the café's ElevenLabs Conversational
 * AI agent (created via scripts/create-elevenlabs-agent.mjs). Mounts the
 * `<elevenlabs-convai>` custom element and its embed script once, alongside
 * the existing `<ChatWidget />`, so visitors can choose text or voice.
 */
export function VoiceWidget() {
  useEffect(() => {
    if (!AGENT_ID) {
      console.warn(
        "NEXT_PUBLIC_ELEVENLABS_AGENT_ID is not set — voice widget disabled.",
      );
      return;
    }

    // Variant, placement, colors, and copy are all configured on the agent
    // itself (see scripts/create-elevenlabs-agent.mjs) so they stay in sync
    // with dashboard edits without redeploying the site.
    const widget = document.createElement("elevenlabs-convai");
    widget.setAttribute("agent-id", AGENT_ID);
    document.body.appendChild(widget);

    let script = document.querySelector<HTMLScriptElement>(
      `script[src="${EMBED_SCRIPT_SRC}"]`,
    );
    if (!script) {
      script = document.createElement("script");
      script.src = EMBED_SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }

    return () => {
      widget.remove();
    };
  }, []);

  return null;
}
