import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  /** Plain part of the title, set in the display serif upright. */
  title: string;
  /** Optional trailing phrase set in display italic — the system's accent move. */
  emphasis?: string;
  /** One line of context below the title. */
  intro?: string;
  /** Right-aligned action, usually an ArrowLink. */
  action?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

/**
 * Standard section lead-in. Emphasis is carried by an italic display phrase
 * appended to the title (e.g. "Style for Every Sip") — not by coloring or
 * bolding a single word, and not by a tracked all-caps eyebrow.
 */
export function SectionHeader({
  title,
  emphasis,
  intro,
  action,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-prose", align === "center" && "mx-auto text-center")}>
        <h2 className="text-h1 text-espresso">
          {title}
          {emphasis && (
            <>
              {" "}
              <span className="italic text-mocha">{emphasis}</span>
            </>
          )}
        </h2>
        {intro && <p className="mt-3 text-body text-mocha">{intro}</p>}
      </div>
      {action && <div className="shrink-0 sm:pb-1">{action}</div>}
    </div>
  );
}
