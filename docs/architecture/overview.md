# Architecture Overview

## Stack

- **Framework:** Next.js 16 (App Router) — see `AGENTS.md`; this version has
  breaking changes, so check `node_modules/next/dist/docs/` before writing code.
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/postcss`)
- **Runtime:** React 19

## Project structure

```
khady-cafe/
├── app/              App Router routes, layouts, global CSS
│   ├── layout.tsx    Root layout
│   ├── page.tsx      Home page
│   └── globals.css   Tailwind entry + global styles
├── public/           Static assets
├── docs/             This documentation
└── design/           Design system, wireframes, assets
```

## Key decisions

Recorded as ADRs in `decisions/`. Start a new one when making a choice that is
hard to reverse or that future contributors would ask "why?" about.

## Planned additions

- `app/menu/`, `app/about/`, `app/contact/` route segments
- `data/menu.ts` (or a CMS) as the single source of menu content
- Shared components under `app/components/` or `components/`
