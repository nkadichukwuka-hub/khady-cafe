# Style Guide

The rules behind the system. For exact token values see `tokens.md`; for
component APIs see `components/`.

---

## 1. Voice

Warm, neighborly, a little rustic. We talk about people and place, not
"artisanal experiences."

- **Short sentences. Plain verbs. Sentence case everywhere** — including
  buttons, labels, and headings. The only capitalized-per-word text is proper
  nouns and menu item names.
- Name things by what the customer understands: "Visit", not "Locations";
  "Our story", not "About".
- A button says what happens: "Reserve a table" → the confirmation says
  "Table reserved". The verb carries through the flow.
- Errors don't apologize and are never vague: "Enter the name so we can call
  your order", not "Invalid input".
- Empty states invite action: "No favorites yet — tap the heart on anything
  you love."

Reference lines:
- "Fresh pastries out of the oven by 7. Come early."
- "We roast in small batches every week."
- "A quiet corner, a good cup, and something warm from the oven."

---

## 2. Color

Warm monochrome. The palette is a coffee gradient plus one accent.

| Role | Token | Hex | Notes |
|------|-------|-----|-------|
| Page ground | `cream` | `#F4EBDC` | The default background. Warmer than a neutral off-white. |
| Raised surface | `foam` | `#FCF8F1` | Cards, inputs, menus. Sits *above* cream. |
| Filled panel | `latte` | `#EBDDC6` | Image mats, sunken areas, inline code. |
| Hairline | `line` | `#DAC7A8` | Every border and divider. 1px. |
| Faint text | `clay` | `#A98763` | Disabled labels, input placeholders. Never body. |
| Secondary text | `mocha` | `#6E5442` | Captions, intros, italic emphasis. AA on cream. |
| Primary text | `espresso` | `#2A1C12` | Body copy and headings. |
| Dark surface | `bean` | `#3A2417` | Footer, primary buttons, the occasional full-bleed band. |
| Accent | `bronze` | `#9C6F3A` | Star ratings, `:focus-visible` ring, small price ticks. |
| Accent on dark | `bronze-soft` | `#C89B5E` | The same accent, legible on `bean`. |

**Rules**

- There is **no terracotta and no green**. Resisting a pop color is the point —
  it is what keeps this from looking like every other warm-serif landing page.
- Depth is **layering, not shadow**: `cream` behind, `foam` card, `line`
  border. Never a `box-shadow` with a black alpha.
- **`bronze` is not a text color for copy.** It clears AA only for large or
  bold text and for graphics (stars, rules, icons). Prices are set in
  `espresso`.
- Dark sections use `bean` as the ground with `cream` text and `bronze-soft`
  for any accent.
- Selection is `bean` on `cream`.

---

## 3. Typography

Two families, clearly distinct.

### Fraunces — display

High-contrast "old-style" serif with optical sizing. Used for `h1`–`h4`,
the wordmark, and pull quotes. Weight 300–500 (never bold — contrast comes
from size and the thick/thin of the letterforms, not weight). `opsz` axis is
on, so large settings get the display cut automatically.

Its **italic** is the system's one emphasis device. Append an italic phrase
to a heading rather than italicizing a word inside it:

> Style for **Every Sip** &nbsp;·&nbsp; Why our beans are **best**

In code: `SectionHeader` takes `title` (upright) + `emphasis` (italic).

### Hanken Grotesk — body & UI

Humanist sans, quiet and legible. Body, captions, labels, nav, buttons,
inputs. Weights 400 / 500. Never tracked out; never all caps.

### Scale

| Token | Size | Family | Use |
|-------|------|--------|-----|
| `text-display` | 4.5rem / 1.0 | Fraunces | Hero wordmark only |
| `text-hero` | 3.5rem / 1.05 | Fraunces | Page titles |
| `text-h1` | 2.5rem / 1.1 | Fraunces | Section headers |
| `text-h2` | 1.875rem / 1.15 | Fraunces | Sub-sections |
| `text-h3` | 1.375rem / 1.25 | Fraunces | Card titles, item names |
| `text-lead` | 1.25rem / 1.6 | Hanken | Standfirst / intro paragraph |
| `text-body` | 1rem / 1.65 | Hanken | Default |
| `text-small` | 0.875rem / 1.5 | Hanken | Captions, secondary UI |
| `text-caption` | 0.75rem / 1.4 | Hanken | Tags, timestamps, footnotes |

**Rules**

- Body measure caps at ~66 characters — use `max-w-prose` (42rem).
- Headings set `text-wrap: balance`; paragraphs `text-wrap: pretty` (both are
  in the base layer).
- Letter-spacing: `-0.01em` on display headings (set in base), `0` everywhere
  else. No positive tracking anywhere except the stamp's ring text.
- Don't add a label above a heading. The heading is the label.

---

## 4. Layout & spacing

- **Grid**: content max width `1240px` (`max-w-content`), 12 columns when a
  grid is needed. Side gutter is a minimum of `24px` (`px-gutter`), owned by
  the `Container` component — nothing else sets page-edge padding.
- **Alignment**: left-aligned by default. Only the hero centers a small
  cluster (wordmark + stamp). Never justify.
- **Vertical rhythm**: sections are `py-14` (56px) on mobile scaling to
  `py-28` (112px) on desktop. Be generous; whitespace is the luxury signal.
- **Spacing scale**: Tailwind's default 4px scale. Common steps: 4, 8, 12,
  16, 24, 32, 48, 64, 96.
- **Radius**: `rounded-sm` (4px) is the default for buttons, cards, inputs.
  `rounded-md` (8px) for media. `rounded-full` only for the stamp and avatars.
- **Borders**: always `border-line`, always 1px.

---

## 5. Iconography

- Line icons on a 24×24 grid, **1.5px stroke**, round caps and joins, no
  fills. Color inherits `currentColor`.
- Live in `components/icons.tsx`. Add new glyphs there in the same style —
  do not pull in an icon library.
- Default render size 24px (`h-6 w-6`); 16px (`h-4 w-4`) inline with text.
- On `cream`, feature icons use `text-bronze`. In the footer, `text-bronze-soft`.

---

## 6. Imagery

- Natural light, real food, real regulars. Warm white balance, no heavy
  filters. Show hands, steam, imperfect plating.
- Product / menu shots sit on a `latte` mat at a `4/5` ratio, `object-cover`.
- Always provide meaningful `alt`. Decorative images get `alt=""`.
- Use `next/image` with `sizes` set. Local placeholder art lives in
  `public/placeholder/`.

---

## 7. Motion

- **One ambient animation total**: the stamp rotates, 28s linear, infinite.
- Everything else is a **response to the user**: buttons and links shift color
  in 200ms; the arrow on a link/button nudges `translate-x-1` on hover and
  `:focus-visible`. Easing is `--ease-out-soft`.
- **No** scroll-triggered fade-and-rise on sections. **No** hover-lift on
  cards.
- `prefers-reduced-motion: reduce` cuts all of it (global rule in
  `globals.css`).

---

## 8. Accessibility floor

Non-negotiable, checked on every screen:

- `:focus-visible` shows a 2px `bronze` outline with 2px offset (one global
  rule — don't remove it per-component).
- Body text meets WCAG AA (`espresso` and `mocha` on `cream` both pass).
- Color is never the only signal: form errors show text + `aria-invalid` +
  a border change, not just red.
- Interactive targets are at least 40px in the smaller dimension
  (buttons are `h-9` / `h-11` / `h-13`).
- Ratings expose the value as text via `aria-label`; stars are decorative.
- Every input has a visible `<label>` — no placeholder-as-label.
- Page works at 360px wide with no horizontal scroll.
