import { cn } from "@/lib/cn";

type RatingProps = {
  /** 0–5, rounded to the nearest half for display. */
  value: number;
  /** Number of reviews, shown after the score when provided. */
  count?: number;
  className?: string;
};

// All half-star gradients are identical, so a single shared id is safe even
// with several ratings on one page (SVG resolves to the first matching def).
const HALF_ID = "kc-star-half";

function Star({ fill }: { fill: "full" | "half" | "empty" }) {
  return (
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" aria-hidden="true">
      {fill === "half" && (
        <defs>
          <linearGradient id={HALF_ID}>
            <stop offset="50%" stopColor="var(--color-bronze)" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
      )}
      <path
        d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.77 4.8 17.5l.99-5.79L1.58 7.62l5.82-.85z"
        fill={
          fill === "full"
            ? "var(--color-bronze)"
            : fill === "half"
              ? `url(#${HALF_ID})`
              : "transparent"
        }
        stroke="var(--color-bronze)"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Star rating with an accessible text label. Stars are decorative; the real
 * value is announced via `aria-label` on the wrapper.
 */
export function Rating({ value, count, className }: RatingProps) {
  const rounded = Math.round(value * 2) / 2;
  const label =
    `Rated ${rounded} out of 5` + (count ? ` from ${count} reviews` : "");

  return (
    <span
      className={cn("inline-flex items-center gap-1.5", className)}
      role="img"
      aria-label={label}
    >
      <span className="inline-flex gap-0.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star
            key={i}
            fill={
              rounded >= i + 1 ? "full" : rounded >= i + 0.5 ? "half" : "empty"
            }
          />
        ))}
      </span>
      <span className="font-sans text-caption text-mocha" aria-hidden="true">
        {rounded.toFixed(1)}
        {count ? ` (${count})` : ""}
      </span>
    </span>
  );
}
