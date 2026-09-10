# Components

Every component is specced here and implemented in `components/ui/` (icons in
`components/icons.tsx`). The living reference renders all of them:
`npm run dev` → <http://localhost:3000/style-guide>.

| Component | Spec | Code | Client? |
|-----------|------|------|---------|
| `Container` | [primitives.md](primitives.md#container) | `components/ui/Container.tsx` | no |
| `Button` | [primitives.md](primitives.md#button) | `components/ui/Button.tsx` | no¹ |
| `ArrowLink` | [primitives.md](primitives.md#arrowlink) | `components/ui/ArrowLink.tsx` | no |
| `Tag` | [primitives.md](primitives.md#tag) | `components/ui/Tag.tsx` | no |
| `Dialog` | [primitives.md](primitives.md#dialog) | `components/ui/Dialog.tsx` | **yes** |
| Icons | [primitives.md](primitives.md#icons) | `components/icons.tsx` | no |
| `SectionHeader` | [content.md](content.md#sectionheader) | `components/ui/SectionHeader.tsx` | no |
| `FeatureCard` | [content.md](content.md#featurecard) | `components/ui/FeatureCard.tsx` | no |
| `EventCard` | [content.md](content.md#eventcard) | `components/ui/EventCard.tsx` | no |
| `ProductCard` | [content.md](content.md#productcard) | `components/ui/ProductCard.tsx` | no¹ |
| `Rating` | [content.md](content.md#rating) | `components/ui/Rating.tsx` | no |
| `Stamp` | [content.md](content.md#stamp) | `components/ui/Stamp.tsx` | no |
| `Field` | [forms.md](forms.md#field) | `components/ui/Field.tsx` | **yes** |
| `Select` | [forms.md](forms.md#select) | `components/ui/Select.tsx` | **yes** |
| `ReserveTableForm` | [forms.md](forms.md#reservetableform) | `components/ui/ReserveTableForm.tsx` | **yes** |
| `Navbar` | [layout.md](layout.md#navbar) | `components/ui/Navbar.tsx` | no |
| `Footer` | [layout.md](layout.md#footer) | `components/ui/Footer.tsx` | no |

¹ Server Component itself, but takes an `on*` callback, so it must be rendered
by a Client Component when that prop is used.

## Conventions

- **Props**: every component takes an optional `className` appended last via
  the `cn()` helper (`lib/cn.ts`). There is no Tailwind-aware merge — keep
  overrides additive and specific.
- **Polymorphism**: only `Container` and `SectionHeader` accept an `as` /
  render-target prop. Others render a fixed element.
- **Styling**: token utilities only (`bg-espresso`, `text-h1`, …). No raw hex,
  no `style={{}}` except for a dynamic value that can't be a class (e.g. a
  swatch background in the style guide).
- **No barrel file.** Import from the exact path:
  `import { Button } from "@/components/ui/Button"`.
- **Accessibility** notes in each spec are requirements, not suggestions.
