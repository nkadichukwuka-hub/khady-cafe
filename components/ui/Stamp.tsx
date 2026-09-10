import { cn } from "@/lib/cn";

type StampProps = {
  /** Text repeated around the ring. Kept short — it reads as a seal, not a sentence. */
  text?: string;
  /** Center glyph or short label. */
  center?: string;
  className?: string;
};

/**
 * Circular rotating seal — the one piece of ambient motion in the system.
 * Respects prefers-reduced-motion (the keyframe is neutralized globally).
 * Decorative: the ring text is aria-hidden.
 */
export function Stamp({
  text = "Roasted in small batches · Baked every morning · ",
  center = "Est. 2017",
  className,
}: StampProps) {
  const chars = text.split("");
  return (
    <div
      className={cn("relative h-32 w-32 select-none", className)}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 [animation:kc-stamp-spin_28s_linear_infinite]"
        style={{ transformOrigin: "50% 50%" }}
      >
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <defs>
            <path
              id="kc-stamp-ring"
              d="M50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0"
            />
          </defs>
          <text className="fill-mocha font-sans text-[6.5px] uppercase tracking-[0.18em]">
            <textPath href="#kc-stamp-ring">
              {chars.map((c, i) => (
                <tspan key={i}>{c}</tspan>
              ))}
            </textPath>
          </text>
        </svg>
      </div>
      <div className="absolute inset-0 grid place-items-center">
        <span className="font-display text-small italic text-espresso">
          {center}
        </span>
      </div>
      <span className="absolute inset-3 rounded-full border border-line" />
    </div>
  );
}
