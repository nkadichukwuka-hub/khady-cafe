/**
 * Shared facts about the café — the single source of truth for anything that
 * appears in more than one place (Footer, the Home hours strip, the About page,
 * the Stamp). Replace the invented values here with the real ones; nothing else
 * needs to change.
 */

export const cafe = {
  name: "Khady's Café",
  foundedYear: 2017,

  address: {
    line1: "42 Lauriston Road",
    city: "London",
    postcode: "E9 7HA",
    /** One-line form for the Footer / meta. */
    oneLine: "42 Lauriston Road, London E9 7HA",
  },

  contact: {
    email: "hello@khadyscafe.co.uk",
    phone: "020 7946 0114",
    instagram: "https://instagram.com/khadyscafe",
  },

  /**
   * Opening hours, Monday-first. `null` = closed. Kept as short display strings
   * rather than times so the Footer and strip can print them directly.
   */
  hours: [
    { day: "Mon", label: "7:00 – 16:00" },
    { day: "Tue", label: "7:00 – 16:00" },
    { day: "Wed", label: "7:00 – 16:00" },
    { day: "Thu", label: "7:00 – 16:00" },
    { day: "Fri", label: "7:00 – 16:00" },
    { day: "Sat", label: "8:00 – 16:00" },
    { day: "Sun", label: "9:00 – 21:00" },
  ] as const,

  /** Condensed hours for tight spaces (Footer line, meta descriptions). */
  hoursSummary: "Mon–Fri 7:00–16:00 · Sat 8:00–16:00 · Sun 9:00–21:00",

  blurb:
    "A neighbourhood coffee shop on Lauriston Road. Small-batch coffee, pastries baked every morning, and a short lunch menu.",
} as const;
