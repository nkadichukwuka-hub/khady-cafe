# Primitives

`Container` · `Button` · `ArrowLink` · `Tag` · Icons

---

## Container

Horizontal frame for page content. Owns the page-edge gutter so nothing else
needs to.

**Props**

```ts
type ContainerProps = {
  children: ReactNode;
  width?: "content" | "prose"; // default "content"
  as?: ElementType;            // default "div"
  className?: string;
};
```

| `width` | Max width | For |
|---------|-----------|-----|
| `content` | `1240px` (`max-w-content`) | Page shell, section rows, grids |
| `prose` | `42rem` (`max-w-prose`) | Running text, article bodies |

**Rules**

- Never nest a `Container` inside a `Container` (the gutter would double).
- Vertical spacing is the caller's job — `Container` only handles the x-axis.
- Section backgrounds (e.g. a `bean` band) go on a full-width wrapper
  *outside* the `Container`; the `Container` sits inside it.

```tsx
<footer className="bg-bean text-cream">
  <Container className="py-16">…</Container>
</footer>
```

---

## Button

**Props**

```ts
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost"; // default "primary"
  size?: "sm" | "md" | "lg";                    // default "md"
  withArrow?: boolean;                          // default false
};
```

| Variant | Look | When |
|---------|------|------|
| `primary` | `bean` fill, `cream` text | The one main action on a view |
| `secondary` | transparent, `espresso/25` border | Alternative actions |
| `ghost` | text only, faint hover wash | Low-stakes / tertiary (e.g. "Not now") |

| Size | Height | Text |
|------|--------|------|
| `sm` | `h-9` (36px) | `text-small` |
| `md` | `h-11` (44px) | `text-body` |
| `lg` | `h-13` (52px) | `text-lead` |

**States**: hover shifts the fill/border in 200ms. `:focus-visible` uses the
global bronze ring. `disabled` drops opacity to 45% and blocks the cursor.
With `withArrow`, a `→` follows the label and slides `translate-x-1` on hover
and focus (the arrow is `aria-hidden`).

**Rules**

- One `primary` per view. If you have two equal actions, one is `secondary`.
- Label is a sentence-case verb phrase: "See the menu", "Reserve a table".
  Never "Submit", "OK", "Click here".
- It renders a `<button>`. For navigation, use `ArrowLink` or a styled
  `next/link` — don't put a Button in an anchor.
- `type` defaults to `"button"`; pass `type="submit"` inside a form.

---

## ArrowLink

Editorial text link with a moving arrow — the reference's core link style.

**Props**

```ts
type ArrowLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  direction?: "left" | "right"; // default "right"
};
```

Renders a `next/link`. Underline is `line`-colored at rest, `espresso` on
hover; the arrow (`→` trailing, or `←` leading when `direction="left"`)
translates 4px on hover and `:focus-visible`. Arrow is `aria-hidden`.

**Rules**

- **Always pair with a real verb phrase**: "Browse the menu →", "Read our
  story →", "Back to all roasts ←". Never a bare "Learn more" or "Read more".
- Use for text-level navigation. For a primary CTA use `Button`.
- `direction="left"` is for back-navigation only.

---

## Tag

Small metadata label — dietary notes, roast level, "New".

**Props**

```ts
type TagProps = {
  children: ReactNode;
  variant?: "outline" | "solid"; // default "outline"
  className?: string;
};
```

| Variant | Look | Use |
|---------|------|-----|
| `outline` | `line` border, `mocha` text | Attributes: "Oat", "Gluten-free", "Decaf" |
| `solid` | `bean` fill, `cream` text | One emphasized status per item: "New", "Seasonal" |

**Rules**

- `text-caption`, sentence case — **never ALL CAPS**.
- At most one `solid` tag per item; keep total tags per item ≤ 3.
- Tags describe, they don't link. If it needs to filter, it's a button, not a
  Tag.
- A menu/product `badge` ("Popular", "House favourite") is one `solid` Tag —
  see `content.md#productcard`.

---

## Dialog

Modal dialog built on the native `<dialog>` element + `showModal()`.

**Props**

```ts
type DialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;        // rendered as the panel <h2>, wired to aria-labelledby
  description?: string; // supporting line, wired to aria-describedby
  children: ReactNode;
  className?: string;
};
```

**Why native `<dialog>`**: it gives the top layer (no `z-index` fights with the
sticky `Navbar`), a focus trap, `inert` background, `Esc` to close, and focus
return to the trigger — for free. This component adds backdrop-click close and a
body-scroll lock, and styles the panel + `::backdrop`.

**Anatomy**: `bg-foam` panel, 1px `border-line`, `rounded-sm`, max-width `md`,
`w-[calc(100vw-2*var(--spacing-gutter))]` so it keeps the 24px gutter on phones.
Header row (title + optional description + a 40px "Close" button with `XIcon`)
over a `border-line` divider; body below. Backdrop is `bg-espresso/40`.

**Rules**

- **No shadow.** Separation is the scrim + the 1px border only
  (`style-guide.md` §2).
- The close button is `aria-label="Close"` and ≥40px in its small dimension.
- Open/close is instant — no entrance animation. (The native element + the
  global `prefers-reduced-motion` rule mean there is nothing to disable, but
  don't add a JS transition.)
- Drive it from a parent's `useState`; keep the trigger `<button>` outside the
  dialog so focus can return to it.
- One dialog open at a time. Don't nest.

---

## Icons

Line-icon set in `components/icons.tsx`. Current glyphs: `BeanIcon`,
`LeafIcon`, `CupIcon`, `HeartIcon`, `ClockIcon`, `PinIcon`, `MicIcon`,
`CalendarIcon`, `XIcon`.

**Spec**

- 24×24 viewbox, `stroke-width={1.5}`, `stroke="currentColor"`, `fill="none"`,
  round caps and joins.
- Each is an `SVGProps<SVGSVGElement>` passthrough — size with `className`
  (`h-6 w-6` default, `h-4 w-4` inline), color with `text-*`.
- `aria-hidden` is set on the shared wrapper; icons are always decorative and
  must be accompanied by a text label.

**Adding a glyph**: add a function to `icons.tsx` using the shared `Icon`
wrapper. Do not install an icon package — the hand-drawn consistency is part
of the brand.

```tsx
<span className="text-bronze">
  <BeanIcon className="h-6 w-6" />
</span>
```
