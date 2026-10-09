import { NextResponse } from "next/server";
import {
  MAX_DAYS_AHEAD,
  partySizeLabel,
  partySizeValues,
  slotLabel,
  slotValues,
  type ReserveErrors,
  type ReserveValues,
} from "@/lib/reservation";

function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function validate(values: ReserveValues): ReserveErrors {
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

  return errors;
}

/**
 * Receives a reservation request from `ReserveTableForm`, validates it, and
 * forwards it to the booking webhook (an n8n workflow) from the server when one
 * is configured, otherwise answers with a demo confirmation.
 * `RESERVATION_WEBHOOK_URL` / `RESERVATION_WEBHOOK_SECRET` live only in
 * server env vars — never sent to, or readable by, the browser.
 */
export async function POST(request: Request) {
  let body: Partial<ReserveValues>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "That request didn't look right — try again." },
      { status: 400 },
    );
  }

  const values: ReserveValues = {
    name: String(body.name ?? "").trim(),
    partySize: String(body.partySize ?? ""),
    date: String(body.date ?? ""),
    time: String(body.time ?? ""),
  };

  const errors = validate(values);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const dayLabel = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(`${values.date}T00:00:00`));
  const tableFor = `${partySizeLabel(values.partySize).toLowerCase()} on ${dayLabel} at ${slotLabel(values.time)}`;

  // Try the real booking system first. If it isn't configured or can't be
  // reached (this is a demo café), fall back to a clear demo confirmation so
  // visitors never see a broken form.
  const delivered = await forwardToBookingSystem(values);

  if (!delivered) {
    console.info("[reserve] Booking system unavailable, showing demo confirmation", {
      ...values,
      receivedAt: new Date().toISOString(),
    });
    return NextResponse.json({
      ok: true,
      demo: true,
      message: `Thanks ${values.name}. This is a demo café, so a table for ${tableFor} wasn't actually booked. In a real café this request would go straight to the team.`,
    });
  }

  console.info("[reserve] Booking forwarded to webhook", {
    ...values,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({
    ok: true,
    message: `Thanks ${values.name} — we've pencilled in a table for ${tableFor}. We'll email to confirm.`,
  });
}

/** Sends the booking to the n8n webhook. Returns false if it can't be delivered. */
async function forwardToBookingSystem(values: ReserveValues): Promise<boolean> {
  const webhookUrl = process.env.RESERVATION_WEBHOOK_URL;
  const webhookSecret = process.env.RESERVATION_WEBHOOK_SECRET;

  if (!webhookUrl || !webhookSecret) {
    console.error(
      "[reserve] Missing RESERVATION_WEBHOOK_URL or RESERVATION_WEBHOOK_SECRET env var",
    );
    return false;
  }

  try {
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-webhook-secret": webhookSecret,
      },
      body: JSON.stringify({
        guestName: values.name,
        groupSize: Number(values.partySize),
        bookingTime: `${values.date}T${values.time}:00`,
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!webhookResponse.ok) {
      console.error(
        `[reserve] Webhook responded with ${webhookResponse.status} ${webhookResponse.statusText}`,
      );
      return false;
    }
    return true;
  } catch (err) {
    console.error("[reserve] Webhook request failed:", err);
    return false;
  }
}
