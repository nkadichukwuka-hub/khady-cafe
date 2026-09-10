import type { AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type ArrowLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  /** `right` (default) trails the arrow; `left` leads with a back arrow. */
  direction?: "left" | "right";
};

/**
 * Editorial text link with a moving arrow. Always pair with a real verb phrase
 * ("Browse the menu", "Read our story") — never a bare "Learn more".
 * The arrow is decorative; it is hidden from assistive tech.
 */
export function ArrowLink({
  href,
  children,
  direction = "right",
  className,
  ...props
}: ArrowLinkProps) {
  const arrow = (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block transition-transform duration-200 ease-[var(--ease-out-soft)]",
        direction === "right"
          ? "group-hover:translate-x-1 group-focus-visible:translate-x-1"
          : "group-hover:-translate-x-1 group-focus-visible:-translate-x-1",
      )}
    >
      {direction === "right" ? "→" : "←"}
    </span>
  );

  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 font-sans text-body font-medium text-espresso",
        "underline decoration-line decoration-1 underline-offset-4",
        "transition-colors duration-200 hover:decoration-espresso",
        className,
      )}
      {...props}
    >
      {direction === "left" && arrow}
      <span>{children}</span>
      {direction === "right" && arrow}
    </Link>
  );
}
