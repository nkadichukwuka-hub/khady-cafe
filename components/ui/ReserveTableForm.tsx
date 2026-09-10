"use client";

import { useActionState, useState } from "react";
import { reserveTable } from "@/app/reserve/actions";
import {
  PARTY_SIZES,
  RESERVATION_SLOTS,
  initialReserveState,
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

const todayISO = () => new Date().toISOString().slice(0, 10);

/**
 * "Reserve a table" trigger + modal form. The form posts to a server action
 * that validates and returns a confirmation (there is no booking backend yet).
 * On error the fields remount so the guest's entries reappear; on success the
 * dialog body swaps to the confirmation and stays open until dismissed.
 */
export function ReserveTableForm({
  triggerLabel = "Reserve a table",
  variant = "primary",
  size = "lg",
  className,
}: ReserveTableFormProps) {
  const [open, setOpen] = useState(false);
  const [state, formAction, pending] = useActionState(
    reserveTable,
    initialReserveState,
  );

  const errors = state.status === "error" ? state.errors : undefined;
  const values = state.status === "error" ? state.values : undefined;
  const resetKey = state.status === "error" ? state.attempt : 0;

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
          <form action={formAction} className="flex flex-col gap-5">
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
