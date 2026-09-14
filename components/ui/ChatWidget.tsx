"use client";

import { useEffect } from "react";
import { createChat } from "@n8n/chat";
import "@n8n/chat/style.css";

const N8N_CHAT_WEBHOOK_URL =
  "https://nkadi-goshen.app.n8n.cloud/webhook/179dba43-cf94-4be5-b179-0eeafdf25f87/chat";

/**
 * Floating chat bubble backed by the café's n8n workflow. Renders no DOM of
 * its own — the widget mounts itself into a `#n8n-chat` div it creates in
 * `<body>`, which is why it's rendered once from the root layout rather than
 * per page. Themed to the design tokens via the `#n8n-chat` block in
 * `app/globals.css` (see `--chat--*` custom properties there).
 */
export function ChatWidget() {
  useEffect(() => {
    const chat = createChat({
      webhookUrl: N8N_CHAT_WEBHOOK_URL,
      mode: "window",
      showWelcomeScreen: false,
      initialMessages: [
        "Hi, welcome to Khady's Café.",
        "Ask about the menu, opening hours, or booking a table.",
      ],
      i18n: {
        en: {
          title: "Khady's Café",
          subtitle: "Chat with Khady's Café.",
          footer: "",
          getStarted: "Start chatting",
          inputPlaceholder: "Type your message…",
          closeButtonTooltip: "Close chat",
        },
      },
    });

    return () => {
      chat.unmount();
      document.getElementById("n8n-chat")?.remove();
    };
  }, []);

  return null;
}
