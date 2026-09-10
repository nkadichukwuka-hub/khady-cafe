import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type FeatureCardProps = {
  /** Line icon, ~24px, 1.5px stroke. Pass an inline SVG. */
  icon: ReactNode;
  /** Two-line title works best; set in display italic. */
  title: string;
  body: string;
  className?: string;
};

/**
 * Editorial feature tile — icon, italic serif title, short body. Depth comes
 * from the foam surface against the cream page plus a hairline border, never a
 * drop shadow.
 */
export function FeatureCard({ icon, title, body, className }: FeatureCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 rounded-sm border border-line bg-foam p-7",
        className,
      )}
    >
      <span className="text-bronze [&_svg]:h-6 [&_svg]:w-6">{icon}</span>
      <h3 className="text-h3 italic text-espresso">{title}</h3>
      <p className="text-small text-mocha">{body}</p>
    </div>
  );
}
