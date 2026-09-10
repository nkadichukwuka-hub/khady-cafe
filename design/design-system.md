# Khady's Café — Design System

A warm, editorial identity for a neighborhood café: one expressive serif, a
monochrome coffee palette, and layouts built from space and hairlines rather
than shadows. Adapted from the reference in `design/references/1.png`.

## The idea in one paragraph

Khady's Café looks like a small-batch roaster's zine. **Fraunces** — a
high-contrast serif with real warmth and a lovely italic — carries the whole
personality; it is set large and its italic does the work that a color accent
or a bold word would do elsewhere. Everything around it is quiet: **Hanken
Grotesk** for body and UI, a **warm monochrome palette** (cream → foam → latte
→ bean) with no terracotta and no pop color, and structure made from generous
whitespace and 1px rules. One thing moves on its own — the circular stamp.

## Files

| File | What it is |
|------|-----------|
| `style-guide.md` | The style guide: voice, color, type, layout, motion, a11y — the rules |
| `tokens.md` | Every design token, its value, and where it is used |
| `tokens/theme.css` | Canonical token source; the `@theme` block is pasted into `app/globals.css` |
| `components/` | One spec per component, each mapped to real code in `components/ui/` |
| `brand.md` | Brand voice, logo, photography direction |
| `wireframes/` | Low-fidelity page layouts |

## How it maps to the codebase

The system is live in the app, not just on paper:

| Design | Code |
|--------|------|
| Tokens | `app/globals.css` (`@theme`) — mirror of `design/tokens/theme.css` |
| Fonts | `app/layout.tsx` — `next/font/google` self-hosts Fraunces + Hanken Grotesk |
| Components | `components/ui/*.tsx` |
| Icons | `components/icons.tsx` |
| Living reference | `app/style-guide/page.tsx` → run `npm run dev`, open `/style-guide` |

Tailwind v4 turns the tokens into utilities automatically: `--color-espresso`
→ `bg-espresso` / `text-espresso`, `--text-h1` → `text-h1` (with its line
height), `--spacing-gutter` → `px-gutter`, `--radius-sm` → `rounded-sm`.

## Working rules

1. **Never write a raw hex value in a component.** Use a token utility. If a
   color is missing, add it to `tokens/theme.css` first.
2. **Two typefaces only.** Fraunces for `h1`–`h4` and display; Hanken for
   everything else. No third family.
3. **No drop shadows.** Separate surfaces with `bg-foam` + `border-line`.
4. **Emphasis = display italic**, appended as a phrase — not a colored or
   bolded single word, and not a tracked all-caps eyebrow.
5. **Arrow links need a verb.** "Browse the menu →", never "Learn more →".
6. **One moving thing per page**: the stamp. No scroll-triggered reveals.
7. Keep the quality floor: visible `:focus-visible`, `prefers-reduced-motion`
   respected, 24px min side gutter, no horizontal scroll at 360px.
