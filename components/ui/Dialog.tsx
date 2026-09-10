"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { XIcon } from "@/components/icons";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  /** Accessible name — rendered as the panel's <h2> and wired to aria-labelledby. */
  title: string;
  /** Optional supporting line under the title, wired to aria-describedby. */
  description?: string;
  children: ReactNode;
  className?: string;
};

/**
 * Modal dialog built on the native <dialog> element and `showModal()`, which
 * gives us the top layer (no z-index games), a focus trap, `inert` background,
 * Esc-to-close, and focus return to the trigger — for free. Backdrop click and
 * body-scroll lock are added here. Separation from the page is the scrim plus a
 * 1px border, never a shadow.
 */
export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  className,
}: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = `${title.replace(/\W+/g, "-").toLowerCase()}-title`;
  const descId = description ? `${titleId}-desc` : undefined;

  // Sync the `open` prop with the native dialog state.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  // Lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      aria-describedby={descId}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        // Close when the click lands on the backdrop (the <dialog> itself),
        // not on the panel inside it.
        if (e.target === ref.current) onClose();
      }}
      className={cn(
        "m-auto w-[calc(100vw_-_2*var(--spacing-gutter))] max-w-md rounded-sm border border-line bg-foam p-0 text-espresso",
        "backdrop:bg-espresso/40",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-4">
        <div>
          <h2 id={titleId} className="text-h3 text-espresso">
            {title}
          </h2>
          {description && (
            <p id={descId} className="mt-1 text-small text-mocha">
              {description}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="-mr-2 -mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-sm text-mocha transition-colors hover:bg-espresso/5 hover:text-espresso"
        >
          <XIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="px-6 py-5">{children}</div>
    </dialog>
  );
}
