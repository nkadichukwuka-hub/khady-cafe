"use client";

import type { InputHTMLAttributes, ReactNode } from "react";
import { useId } from "react";
import { cn } from "@/lib/cn";

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  /** Help text shown under the input. Replaced by `error` when present. */
  hint?: string;
  error?: string;
  /** Node rendered inside the field on the right (e.g. a submit button). */
  trailing?: ReactNode;
};

/**
 * Labelled text input. The label is always visible (no placeholder-as-label).
 * Errors are announced via aria-describedby and never rely on color alone.
 */
export function Field({
  label,
  hint,
  error,
  trailing,
  className,
  id,
  ...props
}: FieldProps) {
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
          "flex items-center gap-2 rounded-sm border bg-foam px-3",
          "focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-bronze",
          error ? "border-espresso" : "border-line",
        )}
      >
        <input
          id={fieldId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className="h-11 flex-1 bg-transparent font-sans text-body text-espresso outline-none placeholder:text-clay"
          {...props}
        />
        {trailing}
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
