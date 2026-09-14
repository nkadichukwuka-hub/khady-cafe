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
 * forwards it to the booking webhook (an n8n workflow) from the server.
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

  const webhookUrl = process.env.RESERVATION_WEBHOOK_URL;
  const webhookSecret = process.env.RESERVATION_WEBHOOK_SECRET;

  if (!webhookUrl || !webhookSecret) {
    console.error(
      "[reserve] Missing RESERVATION_WEBHOOK_URL or RESERVATION_WEBHOOK_SECRET env var",
    );
    return NextResponse.json(
      {
        ok: false,
        error:
          "Online booking isn't available right now — please call us instead.",
      },
      { status: 500 },
    );
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
    });

    if (!webhookResponse.ok) {
      console.error(
        `[reserve] Webhook responded with ${webhookResponse.status} ${webhookResponse.statusText}`,
      );
      return NextResponse.json(
        {
          ok: false,
          error:
            "We couldn't reach the booking system — please try again or call us.",
        },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[reserve] Webhook request failed:", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn't reach the booking system — please try again or call us.",
      },
      { status: 502 },
    );
  }

  console.info("[reserve] Booking forwarded to webhook", {
    ...values,
    receivedAt: new Date().toISOString(),
  });

  const dayLabel = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(`${values.date}T00:00:00`));

  return NextResponse.json({
    ok: true,
    message: `Thanks ${values.name} — we've pencilled in a table for ${partySizeLabel(
      values.partySize,
    ).toLowerCase()} on ${dayLabel} at ${slotLabel(
      values.time,
    )}. We'll email to confirm.`,
  });
}
