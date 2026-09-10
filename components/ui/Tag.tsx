import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type TagProps = {
  children: ReactNode;
  /** `outline` for dietary/attribute tags, `solid` for one emphasized label. */
  variant?: "outline" | "solid";
  className?: string;
};

/**
 * Small metadata label — dietary notes ("Oat", "GF"), roast level, "New".
 * Sentence case, not ALL CAPS. Use at most one `solid` tag per item.
 */
export function Tag({ children, variant = "outline", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-xs px-2 py-0.5 font-sans text-caption",
        variant === "outline"
          ? "border border-line text-mocha"
          : "bg-bean text-cream",
        className,
      )}
    >
      {children}
    </span>
  );
}
