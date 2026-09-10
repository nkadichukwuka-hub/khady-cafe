import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Adds a trailing arrow that slides on hover/focus. */
  withArrow?: boolean;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm font-sans font-medium " +
  "transition-[background-color,border-color,color] duration-200 ease-[var(--ease-out-soft)] " +
  "disabled:cursor-not-allowed disabled:opacity-45 select-none";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-bean text-cream hover:bg-bean-hover",
  secondary:
    "border border-espresso/25 text-espresso hover:border-espresso hover:bg-espresso/[0.04]",
  ghost: "text-espresso hover:bg-espresso/[0.06]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-small",
  md: "h-11 px-6 text-body",
  lg: "h-13 px-8 text-lead",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  withArrow = false,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(base, variants[variant], sizes[size], "group", className)}
      {...props}
    >
      {children}
      {withArrow && (
        <span
          aria-hidden="true"
          className="transition-transform duration-200 ease-[var(--ease-out-soft)] group-hover:translate-x-1 group-focus-visible:translate-x-1"
        >
          &rarr;
        </span>
      )}
    </button>
  );
}
