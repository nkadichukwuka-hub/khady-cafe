# Content components

`SectionHeader` · `FeatureCard` · `ProductCard` · `Rating` · `Stamp`

---

## SectionHeader

Standard lead-in for a page section. Carries the system's emphasis device.

**Props**

```ts
type SectionHeaderProps = {
  title: string;              // upright display serif
  emphasis?: string;          // appended, display italic — the accent
  intro?: string;             // one line of context, mocha
  action?: ReactNode;         // right-aligned, usually an <ArrowLink>
  align?: "left" | "center";  // default "left"
  className?: string;
};
```

Renders an `<h2 class="text-h1">`. `emphasis` is wrapped in
`<span class="italic text-mocha">` — e.g. `title="Style for"`,
`emphasis="Every Sip"`. `action` sits on the baseline at the right on `sm+`,
stacks below on mobile.

**Rules**

- Emphasis is a **phrase**, not a single word, and it always trails the title.
- Do **not** add an eyebrow / kicker above `title`. No "OUR MENU" label.
- `align="center"` is for the hero and the occasional standalone statement
  only. Section headers in a scannable page are left-aligned.
- One `SectionHeader` per section. The page title (`text-hero`) is separate
  and hand-rolled in the page.

---

## FeatureCard

Editorial "why us" tile — icon, italic serif title, short body.

**Props**

```ts
type FeatureCardProps = {
  icon: ReactNode;   // inline SVG from components/icons.tsx
  title: string;     // renders as <h3> in display italic; two lines reads well
  body: string;
  className?: string;
};
```

`bg-foam` + `border-line`, `p-7`, `rounded-sm`. Icon is `text-bronze` at
24px. **No shadow, no hover-lift.** Depth is the foam-on-cream step plus the
hairline.

**Rules**

- Titles are short and evocative — "Freshly roasted", "Ethically sourced",
  "Made by hand" — set in Fraunces italic.
- Body is `text-small text-mocha`, ~1–2 sentences.
- Use in a 3-up grid on desktop (`sm:grid-cols-3`), stacked on mobile.
- These are **not** a numbered sequence — do not add 01 / 02 / 03.

---

## EventCard

One recurring event — same surface recipe as `FeatureCard` with a photo well
and a schedule line.

**Props**

```ts
type EventCardProps = {
  image: { src: string; alt: string };
  icon: ReactNode;      // line icon, ~20px
  whenLabel: string;    // "Sunday 15 June" or "Every Sunday"
  timeLabel: string;    // "6:30–9pm"
  title: string;        // <h3> in Fraunces italic
  blurb: string;
  className?: string;
};
```

**Anatomy**: `16/9` `latte` image well → `p-7` body with a schedule line
(`text-small text-mocha`, `bronze` icon), `<h3>` italic, `text-small text-mocha`
blurb. `bg-foam` + `border-line` + `rounded-sm`, **no shadow, no hover-lift**.

**Rules**

- Events are an **unordered set** — no 01/02/03, no ordered-list styling.
- The recurring cadence goes in `whenLabel` / `timeLabel`, not a `Tag`.
- Use in a 2-up grid (`md:grid-cols-2`), stacked on mobile.
- Feed dates from `lib/events.ts` `nextOccurrences()`; don't hand-type dates.

---

## ProductCard

Menu / shop item.

**Props**

```ts
type Product = {
  name: string;
  price: string;              // pre-formatted, e.g. "£4.50"
  note?: string;              // "Oat milk, dark roast"
  image: { src: string; alt: string };
  rating?: { value: number; count?: number };
  tags?: string[];
  badge?: string;             // one emphasized status, e.g. "Popular"
};

type ProductCardProps = {
  product: Product;
  onAdd?: (product: Product) => void; // omit → static card (no button)
  className?: string;
};
```

**Anatomy** (top → bottom): image in a `4/5` `latte` well with `object-cover`,
with the `badge` (as a `solid` Tag) and any `tags` (outline) overlaid top-left →
`Rating` (if present) → `name` (`text-h3`) → `note` (`text-small text-mocha`) →
row with `price` (`espresso`, medium) and an "Add to cart →" text button (only
when `onAdd` is given).

**Rules**

- `price` is set in `espresso`, **not** bronze. Bronze is ratings only. Format
  it in the data layer (`lib/money.ts` `formatGBP`), never in the component.
- `badge` is a single emphasized status ("Popular", "House favourite") — it
  renders as one `<Tag variant="solid">` (opaque `bean`, so it reads over a
  photo). Keep it to one; don't also pass the same value in `tags`.
- Menu `note` may be a full sentence (menu descriptions) or a terse descriptor —
  both are fine; the type is one line of `text-small`.
- The card is an `<article>`. `name` is an `<h3>` — make sure the surrounding
  heading levels are correct on the page.
- Provide a real `image.alt`. Decorative crops still describe the item.
- Because `onAdd` is a function, a card with an add button must be rendered
  inside a Client Component (or wrapped in a small client "AddButton" island).
- `next/image` needs `sizes` — the component sets a sensible default for a
  2/3/4-up grid; override via `className` context if your layout differs.

---

## Rating

Star rating with an accessible text value.

**Props**

```ts
type RatingProps = {
  value: number;   // 0–5
  count?: number;  // review count, shown as "(128)"
  className?: string;
};
```

`value` is rounded to the nearest **half** for the star display. Stars are
drawn in `bronze` (full / half via a shared gradient / empty outline). The
wrapper is `role="img"` with
`aria-label="Rated 4.5 out of 5 from 128 reviews"`; the visible
`4.5 (128)` text is `aria-hidden` to avoid double announcement.

**Rules**

- Never show a rating without the accessible label.
- The trailing number uses `.toFixed(1)` — always one decimal ("5.0", "4.5").
- Don't recolor the stars. Bronze on cream, bronze on foam, bronze-soft would
  be the swap on `bean` (not currently a prop — add one if needed).

---

## Stamp

Circular rotating seal — the single piece of ambient motion in the system.

**Props**

```ts
type StampProps = {
  text?: string;    // ring text, repeated feel; keep short
  center?: string;  // center label, e.g. "Est. 2017"
  className?: string;
};
```

128×128. The outer ring text rotates 28s / linear / infinite via
`@keyframes kc-stamp-spin`; the center label and inner hairline circle stay
put. Entire component is `aria-hidden` — it's decoration.

**Rules**

- **This is the only ambient animation allowed on a page.** If the stamp is on
  screen, nothing else auto-animates.
- Ring text is the **one place** ALL CAPS + letter-spacing is used, because it
  reads as a maker's seal, not a UI label.
- Placement: hero cluster, or as a full-stop at the end of a section. Not more
  than one per page.
- Respects `prefers-reduced-motion` (global rule freezes the rotation).
