"use client";

import { useState, type FormEvent } from "react";
import {
  PARTY_SIZES,
  RESERVATION_SLOTS,
  type ReserveErrors,
  type ReserveValues,
} from "@/lib/reservation";
import { Button } from "./Button";
import { Dialog } from "./Dialog";
import { Field } from "./Field";
import { Select } from "./Select";

type ReserveTableFormProps = {
  triggerLabel?: string;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
};

type FormState =
  | { status: "idle" }
  | {
      status: "error";
      attempt: number;
      errors: ReserveErrors;
      values: ReserveValues;
      formError?: string;
    }
  | { status: "success"; message: string };

const todayISO = () => new Date().toISOString().slice(0, 10);

/**
 * "Reserve a table" trigger + modal form. Submits to `POST /api/reserve`,
 * which validates the request and forwards it to the booking webhook from
 * the server — the webhook URL and secret never reach the browser. On error
 * the fields remount so the guest's entries reappear; on success the dialog
 * body swaps to the confirmation and stays open until dismissed.
 */
export function ReserveTableForm({
  triggerLabel = "Reserve a table",
  variant = "primary",
  size = "lg",
  className,
}: ReserveTableFormProps) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [state, setState] = useState<FormState>({ status: "idle" });

  const errors = state.status === "error" ? state.errors : undefined;
  const values = state.status === "error" ? state.values : undefined;
  const resetKey = state.status === "error" ? state.attempt : 0;
  const nextAttempt = state.status === "error" ? state.attempt + 1 : 1;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nextValues: ReserveValues = {
      name: String(formData.get("name") ?? "").trim(),
      partySize: String(formData.get("partySize") ?? ""),
      date: String(formData.get("date") ?? ""),
      time: String(formData.get("time") ?? ""),
    };

    setPending(true);
    try {
      const response = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nextValues),
      });
      const result = await response.json();

      if (result.ok) {
        setState({ status: "success", message: result.message });
      } else {
        setState({
          status: "error",
          attempt: nextAttempt,
          errors: result.errors ?? {},
          values: nextValues,
          formError: result.errors ? undefined : result.error,
        });
      }
    } catch {
      setState({
        status: "error",
        attempt: nextAttempt,
        errors: {},
        values: nextValues,
        formError: "Something went wrong — please try again or call us.",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={() => setOpen(true)}
      >
        {triggerLabel}
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Reserve a table"
        description="A few details and we'll email to confirm. Tables seat up to 8 — for a bigger group, call us."
      >
        {state.status === "success" ? (
          <div className="flex flex-col gap-5">
            <p className="text-body text-espresso">{state.message}</p>
            <Button variant="primary" onClick={() => setOpen(false)}>
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {state.status === "error" && state.formError ? (
              <p role="alert" className="text-body text-espresso">
                {state.formError}
              </p>
            ) : null}
            <div key={resetKey} className="flex flex-col gap-4">
              <Field
                label="Name for the booking"
                name="name"
                type="text"
                autoComplete="name"
                defaultValue={values?.name}
                error={errors?.name}
              />
              <Select
                label="Party size"
                name="partySize"
                options={PARTY_SIZES}
                placeholder="Choose party size"
                defaultValue={values?.partySize}
                error={errors?.partySize}
              />
              <Field
                label="Preferred date"
                name="date"
                type="date"
                min={todayISO()}
                defaultValue={values?.date}
                error={errors?.date}
              />
              <Select
                label="Preferred time"
                name="time"
                options={RESERVATION_SLOTS}
                placeholder="Choose a time"
                defaultValue={values?.time}
                error={errors?.time}
              />
            </div>
            <Button type="submit" variant="primary" disabled={pending}>
              {pending ? "Reserving…" : "Reserve a table"}
            </Button>
          </form>
        )}
      </Dialog>
    </>
  );
}
