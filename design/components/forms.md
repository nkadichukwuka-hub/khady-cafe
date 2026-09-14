# Forms

`Field`

---

## Field

Labelled text input. **Client Component** (`"use client"`) — it uses `useId`.

**Props**

```ts
type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;       // always visible, above the input
  hint?: string;       // help text below; hidden when `error` is set
  error?: string;      // error text below; sets aria-invalid
  trailing?: ReactNode; // node inside the field on the right (e.g. a Button)
};
```

Everything else (`type`, `placeholder`, `value`, `onChange`, `required`, …)
passes straight to the `<input>`.

**Anatomy**: `<label>` (`text-small`, medium) → bordered box (`bg-foam`,
`border-line`, `rounded-sm`, `h-11`) containing the input and optional
`trailing` → one line of `hint` **or** `error` (`text-caption`).

**States**

| State | Border | Below | ARIA |
|-------|--------|-------|------|
| default | `line` | `hint` in `mocha` | `aria-describedby` → hint id |
| focus | (box) bronze outline, 2px offset | — | — |
| error | `espresso` | `error` in `espresso` | `aria-invalid`, `aria-describedby` → error id |
| disabled | `line` | — | native `disabled` |

**Rules**

- The label is **always rendered**. Never use `placeholder` as the label.
- Errors are **not color-only**: the border goes to `espresso` (not a red) and
  the message is plain text wired via `aria-describedby`. Message says what to
  do: "Enter the name so we can call your order."
- Placeholder text is `clay` and illustrative only ("you@example.com").
- `trailing` is for an inline submit (newsletter) or a unit label. Keep it to
  one small element.
- For a newsletter row: `type="email"`, `trailing={<Button size="sm">Subscribe</Button>}`,
  and put the whole thing in a `<form>` with the button as `type="submit"`.

```tsx
<Field
  label="Email"
  type="email"
  placeholder="you@example.com"
  hint="For the monthly note about new roasts. No more than that."
/>
```

---

## Select

`Field`'s twin for a native `<select>`. **Client Component** (`useId`).

**Props**

```ts
type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: { value: string; label: string }[];
  hint?: string;
  error?: string;
  placeholder?: string; // disabled first option shown when nothing is chosen
};
```

Same contract as `Field`: label always visible, `bg-foam` box, `border-line`
(→ `espresso` on error), bronze focus ring on the wrapper, one line of `hint`
**or** `error` wired via `aria-describedby`, `aria-invalid` on error. The native
arrow is replaced with a `mocha` chevron; `appearance-none` on the control.

**Rules** — as `Field`: visible label, errors never color-only, sentence-case
option labels. Use for short, closed option sets (party size, a time slot). For
a long list, a `<datalist>`-backed `Field` is better.

---

## ReserveTableForm

Composition, not a primitive: the "Reserve a table" trigger + a `Dialog`
containing the form, submitting to `POST /api/reserve`. **Client Component.**

**Props**

```ts
type ReserveTableFormProps = {
  triggerLabel?: string;                  // default "Reserve a table"
  variant?: "primary" | "secondary";      // default "primary"
  size?: "sm" | "md" | "lg";              // default "lg"
  className?: string;                     // on the trigger Button
};
```

**Behaviour**

- Trigger is a `Button` that opens the `Dialog` (`useState`).
- The form's `onSubmit` reads a `FormData`, `fetch("/api/reserve", { method:
  "POST", body: JSON.stringify(values) })`, and stores the parsed JSON result
  in local `useState`. Fields: name (`Field type="text"`), party size
  (`Select`), preferred date (`Field type="date"` with `min` today), preferred
  time (`Select` of fixed slots). Slots + party sizes live in
  `lib/reservation.ts` so the form and the API route can't drift on options
  (validation itself is duplicated server-side in the route, since that's the
  trust boundary).
- On an error result, the fields are wrapped in `<div key={state.attempt}>` so
  they remount and re-apply `defaultValue` from the submitted values; each
  field shows `error={state.errors?.<name>}`. A result with a top-level
  `error` string (not tied to one field — e.g. the webhook was unreachable) is
  shown as a plain `role="alert"` paragraph above the fields, same
  never-color-only treatment as a field error.
- Submit `Button` is `disabled={pending}`, label `pending ? "Reserving…" : …`.
- On success the dialog body swaps to a confirmation panel (the message + a
  "Done" button that closes). The dialog stays open so the message is read.
- The verb carries through: trigger "Reserve a table" → confirmation
  "we've pencilled in a table…".

**Backend.** `app/api/reserve/route.ts` re-validates the request server-side,
then forwards it to the café's n8n booking webhook with a secret header
(`RESERVATION_WEBHOOK_URL` / `RESERVATION_WEBHOOK_SECRET` env vars — never
exposed to the browser). The webhook URL and secret are never called from, or
visible to, the client.

---

**Not built yet** (add here when needed, same rules): `Textarea`, `Checkbox`,
`RadioGroup`, quantity `Stepper`. Follow the same label / describe /
no-color-only-error pattern.
