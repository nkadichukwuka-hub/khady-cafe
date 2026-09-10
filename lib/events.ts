import type { WeeklyEvent } from "@/data/events";

export type EventOccurrence = {
  event: WeeklyEvent;
  /** The next date this event happens, at its start time. */
  date: Date;
};

function nextDateFor(event: WeeklyEvent, from: Date): Date {
  const [h, m] = event.start.split(":").map(Number);
  const d = new Date(from);
  d.setHours(h, m, 0, 0);

  let delta = (event.weekday - d.getDay() + 7) % 7;
  // If it's the event's weekday but the start time has passed, jump a week.
  if (delta === 0 && d.getTime() <= from.getTime()) delta = 7;
  d.setDate(d.getDate() + delta);
  return d;
}

/**
 * The next `count` occurrences across all events, soonest first. With two
 * weekly events and `count = 2` this returns the upcoming Saturday and Sunday.
 */
export function nextOccurrences(
  events: WeeklyEvent[],
  from: Date = new Date(),
  count = 2,
): EventOccurrence[] {
  return events
    .map((event) => ({ event, date: nextDateFor(event, from) }))
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, count);
}

const dayFmt = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

const timeFmt = new Intl.DateTimeFormat("en-GB", {
  hour: "numeric",
  minute: "2-digit",
  hourCycle: "h12",
});

/** "Sunday 15 June" */
export function formatEventDay(date: Date): string {
  return dayFmt.format(date);
}

/** "6:30–9:00pm" (end optional). */
export function formatEventTime(event: WeeklyEvent): string {
  const [sh, sm] = event.start.split(":").map(Number);
  const start = new Date();
  start.setHours(sh, sm, 0, 0);
  if (!event.end) return timeFmt.format(start).toLowerCase();

  const [eh, em] = event.end.split(":").map(Number);
  const end = new Date();
  end.setHours(eh, em, 0, 0);
  return `${timeFmt.format(start).replace(/\s?[ap]m$/i, "")}–${timeFmt
    .format(end)
    .toLowerCase()}`;
}
