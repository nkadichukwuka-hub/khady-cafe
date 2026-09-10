"use client";

import type { SelectHTMLAttributes } from "react";
import { useId } from "react";
import { cn } from "@/lib/cn";

type SelectOption = { value: string; label: string };

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: SelectOption[];
  /** Help text under the control. Replaced by `error` when present. */
  hint?: string;
  error?: string;
  /** Shown as a disabled first option when no value is selected. */
  placeholder?: string;
};

/**
 * Labelled select — the twin of `Field`. Same label / describe / non-color-only
 * error contract: the label is always visible, errors are announced via
 * aria-describedby and shown with a border change, not color alone.
 */
export function Select({
  label,
  options,
  hint,
  error,
  placeholder,
  className,
  id,
  defaultValue,
  ...props
}: SelectProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const describedBy = error
    ? `${fieldId}-error`
    : hint
      ? `${fieldId}-hint`
      : undefined;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={fieldId}
        className="font-sans text-small font-medium text-espresso"
      >
        {label}
      </label>
      <div
        className={cn(
          "relative rounded-sm border bg-foam",
          "focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-bronze",
          error ? "border-espresso" : "border-line",
        )}
      >
        <select
          id={fieldId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          defaultValue={defaultValue ?? (placeholder ? "" : undefined)}
          className="h-11 w-full appearance-none bg-transparent pl-3 pr-9 font-sans text-body text-espresso outline-none"
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 24 24"
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mocha"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
      {error ? (
        <p
          id={`${fieldId}-error`}
          className="font-sans text-caption text-espresso"
        >
          {error}
        </p>
      ) : hint ? (
        <p id={`${fieldId}-hint`} className="font-sans text-caption text-mocha">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
