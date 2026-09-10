# Khady's Café — Design

The design system, plus wireframes and source assets for the site.

## Start here

- **`design-system.md`** — the overview: the concept, the file map, and how the
  system connects to the codebase.
- **`style-guide.md`** — the rules: voice, color, type, layout, motion, a11y.
- **`tokens.md`** — every design token and the Tailwind utility it generates.
- **`tokens/theme.css`** — canonical token source (pasted into `app/globals.css`).
- **`components/`** — one spec per component, mapped to `components/ui/*.tsx`.
- **`brand.md`** — brand voice, logo usage, photography direction.
- **`wireframes/`** — low-fidelity page layouts.
- **`assets/`** — source files: logos, icons, photos, mockups.
- **`references/`** — the visual reference this system was drawn from.

## Living reference

The system is implemented in the app. Run `npm run dev` and open
<http://localhost:3000/style-guide> to see every token and component rendered.

## Workflow

1. Sketch a page in `wireframes/` before building it.
2. Build from `components/ui/` and token utilities — never raw hex or ad-hoc
   spacing.
3. If a token is missing, add it to `tokens/theme.css`, mirror the `@theme`
   block into `app/globals.css`, then use it.
4. Keep optimized, shipping assets in `../public/`; keep source/original files
   here in `assets/`.
