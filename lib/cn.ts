/**
 * Minimal class-name joiner. Falsy values are dropped; later values win only by
 * source order (no Tailwind-aware merging — keep prop overrides explicit).
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
