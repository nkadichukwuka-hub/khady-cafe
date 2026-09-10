/**
 * Recurring weekly events. Defined as rules, not dated instances, so they never
 * go stale — `lib/events.ts` computes the next occurrence for display.
 */

export type EventIcon = "mic" | "cup";

export type WeeklyEvent = {
  slug: "open-mic" | "coffee-tasting";
  title: string;
  /** 0 = Sunday … 6 = Saturday. */
  weekday: number;
  /** 24h "HH:MM". */
  start: string;
  end?: string;
  blurb: string;
  icon: EventIcon;
  image: { src: string; alt: string };
};

export const weeklyEvents: WeeklyEvent[] = [
  {
    slug: "open-mic",
    title: "Sunday open mic",
    weekday: 0,
    start: "18:30",
    end: "21:00",
    blurb:
      "Songs, poems, works in progress. Put your name on the list at the counter, or just come and listen. Kitchen stays open for cake.",
    icon: "mic",
    image: {
      src: "/images/event-open-mic.webp",
      alt: "A performer at a microphone in a warm-lit café",
    },
  },
  {
    slug: "coffee-tasting",
    title: "Saturday coffee tasting",
    weekday: 6,
    start: "10:00",
    end: "11:30",
    blurb:
      "Sit down with the week's beans and one of our baristas. We cup three coffees side by side and talk through what you're tasting. Free; ten seats.",
    icon: "cup",
    image: {
      src: "/images/event-coffee-tasting.webp",
      alt: "Cupping bowls and spoons laid out for a coffee tasting",
    },
  },
];
