"use server";

import {
  MAX_DAYS_AHEAD,
  partySizeLabel,
  partySizeValues,
  slotLabel,
  slotValues,
  type ReserveErrors,
  type ReserveState,
  type ReserveValues,
} from "@/lib/reservation";

function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Validates a reservation request and returns a confirmation. There is no
 * booking backend yet — a valid request is logged server-side for staff and the
 * guest is told we'll follow up by email.
 */
export async function reserveTable(
  prev: ReserveState,
  formData: FormData,
): Promise<ReserveState> {
  const attempt = "attempt" in prev ? prev.attempt + 1 : 1;

  const values: ReserveValues = {
    name: String(formData.get("name") ?? "").trim(),
    partySize: String(formData.get("partySize") ?? ""),
    date: String(formData.get("date") ?? ""),
    time: String(formData.get("time") ?? ""),
  };

  const errors: ReserveErrors = {};

  if (!values.name) {
    errors.name = "Tell us the name for the booking.";
  } else if (values.name.length > 80) {
    errors.name = "That name is a little long — shorten it.";
  }

  if (!partySizeValues.has(values.partySize)) {
    errors.partySize = "Choose how many are coming.";
  }

  if (!values.date) {
    errors.date = "Pick a date.";
  } else {
    const picked = new Date(`${values.date}T00:00:00`);
    if (Number.isNaN(picked.getTime())) {
      errors.date = "That date doesn't look right.";
    } else if (picked < startOfToday()) {
      errors.date = "Pick a date that hasn't passed.";
    } else {
      const limit = startOfToday();
      limit.setDate(limit.getDate() + MAX_DAYS_AHEAD);
      if (picked > limit) {
        errors.date = `We take bookings up to ${MAX_DAYS_AHEAD} days ahead.`;
      }
    }
  }

  if (!slotValues.has(values.time)) {
    errors.time = "Choose a time.";
  }

  if (Object.keys(errors).length > 0) {
    return { status: "error", attempt, errors, values };
  }

  const dayLabel = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(`${values.date}T00:00:00`));

  // No backend yet — record it for staff.
  console.info("[reservation]", {
    ...values,
    receivedAt: new Date().toISOString(),
  });

  return {
    status: "success",
    attempt,
    message: `Thanks ${values.name} — we've pencilled in a table for ${partySizeLabel(
      values.partySize,
    ).toLowerCase()} on ${dayLabel} at ${slotLabel(
      values.time,
    )}. We'll email to confirm.`,
  };
}
