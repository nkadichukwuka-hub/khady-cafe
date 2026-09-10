# Design Tokens

Canonical source: **`design/tokens/theme.css`**. That `@theme` block is pasted
verbatim into `app/globals.css`, which is what Tailwind v4 compiles. This file
is the human-readable index — value, the Tailwind utility it generates, and
where it's meant to be used.

To change a token: edit `tokens/theme.css`, copy the `@theme` block into
`app/globals.css`, restart `next dev`.

---

## Color

| Token | Value | Utilities | Use |
|-------|-------|-----------|-----|
| `--color-cream` | `#F4EBDC` | `bg-cream` `text-cream` | Page ground |
| `--color-foam` | `#FCF8F1` | `bg-foam` | Cards, inputs, menus (above cream) |
| `--color-latte` | `#EBDDC6` | `bg-latte` | Image mats, sunken panels, inline code |
| `--color-line` | `#DAC7A8` | `border-line` `divide-line` | All 1px borders & rules |
| `--color-clay` | `#A98763` | `text-clay` `placeholder:text-clay` | Disabled / placeholder only |
| `--color-mocha` | `#6E5442` | `text-mocha` | Secondary text, captions, italic emphasis |
| `--color-espresso` | `#2A1C12` | `text-espresso` `bg-espresso` | Primary text, headings |
| `--color-bean` | `#3A2417` | `bg-bean` `text-bean` | Dark sections, primary button |
| `--color-bean-hover` | `#4A2F1E` | `hover:bg-bean-hover` | Primary button hover |
| `--color-bronze` | `#9C6F3A` | `text-bronze` `fill-bronze` `outline-bronze` | Ratings, focus ring, price ticks |
| `--color-bronze-soft` | `#C89B5E` | `text-bronze-soft` | Accent on `bean` surfaces |
| `--color-background` | → `cream` | — | Aliased for convention |
| `--color-foreground` | → `espresso` | — | Aliased for convention |

Contrast on `cream`: `espresso` 13.3:1, `mocha` 5.7:1 (AA body), `bronze`
3.6:1 (UI/large/graphics only), `clay` 2.6:1 (non-text only).

---

## Typography

| Token | Value | Utility | Family |
|-------|-------|---------|--------|
| `--font-display` | Fraunces → Georgia → serif | `font-display` | — |
| `--font-sans` | Hanken Grotesk → system-ui | `font-sans` | — |
| `--text-display` | 4.5rem / 1.0 | `text-display` | Fraunces |
| `--text-hero` | 3.5rem / 1.05 | `text-hero` | Fraunces |
| `--text-h1` | 2.5rem / 1.1 | `text-h1` | Fraunces |
| `--text-h2` | 1.875rem / 1.15 | `text-h2` | Fraunces |
| `--text-h3` | 1.375rem / 1.25 | `text-h3` | Fraunces |
| `--text-lead` | 1.25rem / 1.6 | `text-lead` | Hanken |
| `--text-body` | 1rem / 1.65 | `text-body` | Hanken |
| `--text-small` | 0.875rem / 1.5 | `text-small` | Hanken |
| `--text-caption` | 0.75rem / 1.4 | `text-caption` | Hanken |

Each size token ships with a paired `--text-*--line-height`, so `text-h1`
sets both size and leading. Weights: Fraunces 300–500, Hanken 400/500.
Fonts are self-hosted via `next/font/google` in `app/layout.tsx` and exposed
as `--font-fraunces` / `--font-hanken`.

---

## Radius

| Token | Value | Utility | Use |
|-------|-------|---------|-----|
| `--radius-xs` | 2px | `rounded-xs` | Tags, inline code |
| `--radius-sm` | 4px | `rounded-sm` | **Default** — buttons, cards, inputs |
| `--radius-md` | 8px | `rounded-md` | Media wells, figures |
| `--radius-lg` | 16px | `rounded-lg` | Full-bleed feature panels |

Fully round (`rounded-full`) is reserved for the stamp and avatars.

---

## Layout

| Token | Value | Utility | Use |
|-------|-------|---------|-----|
| `--spacing-gutter` | 1.5rem (24px) | `px-gutter` `p-gutter` … | Min page side padding (owned by `Container`) |
| `--container-content` | 77.5rem (1240px) | `max-w-content` | Page content width |
| `--container-prose` | 42rem (~66ch) | `max-w-prose` | Reading measure (overrides Tailwind's 65ch default) |

Spacing steps otherwise use Tailwind's default 4px scale.

---

## Motion

| Token | Value | Use |
|-------|-------|-----|
| `--ease-out-soft` | `cubic-bezier(0.22, 1, 0.36, 1)` | All transitions & the stamp |
| `@keyframes kc-stamp-spin` | `rotate(360deg)` | Stamp only; 28s linear infinite |

Standard transition: `duration-200`. All motion is disabled under
`prefers-reduced-motion` by a global rule in `app/globals.css`.
