# Layout components

`Navbar` · `Footer`

---

## Navbar

Top navigation.

**Props**

```ts
type NavItem = { label: string; href: string };
type NavbarProps = { items?: NavItem[] };
```

Default items: `Menu` → `/menu`, `Our story` → `/about`. (A `Visit` → `/visit`
item was in the original spec; it was dropped when the site shipped with three
pages. Restore it here and in `Navbar.tsx` if a visit page is added.)

**Anatomy**: sticky, `bg-cream/90` + `backdrop-blur-sm`, hairline `border-b`.
Wordmark left — Fraunces italic lowercase, `text-h3`, links to `/`. Primary
`<nav>` right — sentence-case `text-small` links in `mocha` that go `espresso`
with an underline on hover.

**Rules**

- Wordmark is always "khady's café" set in display italic lowercase.
- Links are sentence case: "Our story", not "OUR STORY" or "About Us".
- At narrow widths the row wraps (links drop below the wordmark). This is fine
  for ≤ 4 items. If the nav grows, add a proper disclosure menu — don't shrink
  the text.
- Keep it to primary destinations. Cart / account, when they exist, sit as
  icon buttons at the far right, after the nav list.

---

## Footer

Site footer — the dark counterweight to the cream page.

**Props**: none currently (content is inlined). Extract to props when a second
consumer needs different content.

**Anatomy**: `bg-bean text-cream`, `mt-24`. Three columns on `sm+`, stacked on
mobile:

1. Wordmark (display italic) + one-line description (`cream/70`).
2. Hours and address, each with a `bronze-soft` line icon (`ClockIcon`,
   `PinIcon`).
3. Secondary nav — plain links, `cream/80` with a faint underline.

Bottom strip: `border-t border-cream/15`, copyright in `text-caption`
`cream/55`, year via `new Date().getFullYear()`.

**Rules**

- This is the only place `bean` is used as a large ground on a content page
  (buttons aside).
- Accent inside the footer is `bronze-soft`, never `bronze` (too dark on
  `bean`).
- Text opacities (`/70`, `/80`, `/55`) are intentional hierarchy — keep the
  body of links at `/80` minimum for contrast.
