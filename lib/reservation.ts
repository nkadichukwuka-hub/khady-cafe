/**
 * Shared constants + validation for the table-reservation form. Imported by both
 * the client form (`ReserveTableForm`) and the server action (`app/reserve/
 * actions.ts`) so the options and the checks can't drift.
 */

export type Option = { value: string; label: string };

export const PARTY_SIZES: Option[] = [
  { value: "1", label: "1 person" },
  { value: "2", label: "2 people" },
  { value: "3", label: "3 people" },
  { value: "4", label: "4 people" },
  { value: "5", label: "5 people" },
  { value: "6", label: "6 people" },
  { value: "7", label: "7 people" },
  { value: "8", label: "8 or more" },
];

/** Half-hour slots across the daytime service. */
export const RESERVATION_SLOTS: Option[] = buildSlots(8, 0, 15, 30);

function buildSlots(
  startH: number,
  startM: number,
  endH: number,
  endM: number,
): Option[] {
  const out: Option[] = [];
  for (let m = startH * 60 + startM; m <= endH * 60 + endM; m += 30) {
    const h = Math.floor(m / 60);
    const mm = m % 60;
    const value = `${String(h).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
    const h12 = ((h + 11) % 12) + 1;
    const suffix = h < 12 ? "am" : "pm";
    const label = `${h12}:${String(mm).padStart(2, "0")}${suffix}`;
    out.push({ value, label });
  }
  return out;
}

export const partySizeValues = new Set(PARTY_SIZES.map((o) => o.value));
export const slotValues = new Set(RESERVATION_SLOTS.map((o) => o.value));

/** How far ahead a booking can be made. */
export const MAX_DAYS_AHEAD = 60;

export function slotLabel(value: string): string {
  return RESERVATION_SLOTS.find((o) => o.value === value)?.label ?? value;
}

export function partySizeLabel(value: string): string {
  return PARTY_SIZES.find((o) => o.value === value)?.label ?? value;
}

// --- Reservation form state (shared by the form and the server action) ------

export type ReserveValues = {
  name: string;
  partySize: string;
  date: string;
  time: string;
};

export type ReserveErrors = Partial<Record<keyof ReserveValues, string>>;

export type ReserveState =
  | { status: "idle" }
  | {
      status: "error";
      attempt: number;
      errors: ReserveErrors;
      values: ReserveValues;
    }
  | { status: "success"; attempt: number; message: string };

export const initialReserveState: ReserveState = { status: "idle" };
