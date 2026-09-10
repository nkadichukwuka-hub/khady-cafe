# Requirements

Status legend: 🔲 planned · 🚧 in progress · ✅ done

## Pages

| Page | Status | Notes |
|------|--------|-------|
| Home (`/`) | ✅ | Background-image hero, reserve + hours strip, featured (most popular) items, weekly events, about teaser |
| Menu (`/menu`) | ✅ | 4 categories, photo per item, `£` prices, "Popular" / "House favourite" badges, jump links |
| About (`/about`) | ✅ | Founder story (invented), pull quote, stamp |
| Contact / Visit | 🔲 | Folded into the footer + home strip for now; a standalone page is a later option |

## Features

- **Menu content**
  - ✅ Items grouped by category (Espresso Drinks, Cold Drinks, Pastries, Sandwiches)
  - ✅ Each item: name, description, price, optional badge
  - ✅ Single source of truth: `data/menu.ts` (seeded from `docs/menu-items.csv`)

- **Reserve a table**
  - ✅ Modal (native `<dialog>`) form: name, party size, date, time
  - ✅ Server-side validation + confirmation state
  - 🔲 Real destination for requests (email / booking system) — not wired yet

- **Events**
  - ✅ Weekly open mic (Sun) + coffee tasting (Sat), defined as recurring rules
  - ✅ Home page shows the next occurrence of each

- **Site-wide**
  - ✅ Responsive layout, works to ~360px, no horizontal scroll
  - ✅ Semantic headings, alt text, keyboard-navigable modal, visible focus ring
  - ✅ Per-page titles + meta descriptions; `title.template` in the root layout
  - 🔲 Open Graph image (`app/opengraph-image.jpg`) — asset still to add

- **Imagery**
  - ✅ Real Pexels stock photos in `public/images/` with `public/images/CREDITS.md`

## Acceptance criteria

- ✅ Menu page renders all categories and items from `data/menu.ts`.
- 🔲 Lighthouse a11y ≥ 95, load < 2s on a mid-range phone (to be measured).
