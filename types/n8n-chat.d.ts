/**
 * Ambient types for @n8n/chat.
 *
 * The published package's package.json points "types" at
 * "./dist/index.d.ts", which doesn't exist in the 1.37.2 tarball — the real
 * declarations live at "dist/src/index.d.ts" but aren't reachable through
 * the package's export map, so `tsc` can't find them on its own. This shim
 * covers only the surface components/ui/ChatWidget.tsx actually uses;
 * widen it if that component starts using more of the options documented
 * at https://www.npmjs.com/package/@n8n/chat.
 */
declare module "@n8n/chat" {
  export interface ChatOptions {
    webhookUrl: string;
    webhookConfig?: {
      method?: "GET" | "POST";
      headers?: Record<string, string>;
    };
    target?: string | Element;
    mode?: "window" | "fullscreen";
    showWindowCloseButton?: boolean;
    showWelcomeScreen?: boolean;
    loadPreviousSession?: boolean;
    sessionId?: string;
    chatInputKey?: string;
    chatSessionKey?: string;
    defaultLanguage?: "en";
    initialMessages?: string[];
    metadata?: Record<string, unknown>;
    i18n?: Record<
      string,
      {
        title: string;
        subtitle: string;
        footer: string;
        getStarted: string;
        inputPlaceholder: string;
        closeButtonTooltip: string;
        [message: string]: string;
      }
    >;
    enableStreaming?: boolean;
    allowFileUploads?: boolean;
    allowedFilesMimeTypes?: string;
    enableMessageActions?: boolean;
  }

  export function createChat(options?: Partial<ChatOptions>): {
    unmount: () => void;
  };
}
