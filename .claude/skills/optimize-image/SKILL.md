---
name: optimize-image
description: >-
  Download an image from a URL, resize it for the web, and save it as a WebP
  file in public/images/. Use when adding a stock photo (e.g. from Pexels) to
  the site, optimizing or converting an image to WebP, or refreshing the local
  image assets so pages serve them from public/ instead of a remote host.
---

# optimize-image

Turns a remote image into an optimized local WebP asset for the khady-cafe site.
Downloads the source, resizes it to a sensible max width, converts to WebP, and
writes it to `public/images/<slug>.webp` — so `<Image src="/images/<slug>.webp">`
serves it locally and Next.js re-optimizes it responsively at request time.

Uses `sharp` (already a dependency via Next). No extra install, no API keys.

## Usage

Always run from the **project root** (`khady-cafe/`).

### One image

```bash
node .claude/skills/optimize-image/scripts/optimize-image.mjs <url> --name <slug> [options]
```

`<url>` can be either:

- a **direct image URL** (`https://…/photo.jpg`), or
- a **Pexels photo page URL** (`https://www.pexels.com/photo/<slug>-<id>/`) —
  the script extracts the trailing photo id and builds the key-free
  `images.pexels.com` CDN URL itself.

Options:

| Flag | Default | Notes |
| --- | --- | --- |
| `--name <slug>` | — | Required. Output basename; file becomes `<slug>.webp`. |
| `--width <px>` | `1600` | Max width. Never upscales. See the ladder below. |
| `--quality <n>` | `80` | WebP quality (0–100). |
| `--aspect <w:h>` | off | Crop to this ratio (`fit: cover`, attention-focused). Usually unnecessary — app image wells already crop with `object-cover`. |
| `--out <dir>` | `public/images` | Output directory (relative to cwd). |
| `--keep-original` | off | Also save the downloaded source to `design/assets/photos/<slug>.<ext>` (the repo's home for full-res originals). |
| `--credit "…"` | off | Upsert a row in `public/images/CREDITS.md`. Format: `Photo title \| photo page URL \| Photographer \| profile URL`. |

Width ladder (match the image's role on the page):

| Role | `--width` | Examples |
| --- | --- | --- |
| Full-bleed / hero (`sizes="100vw"`) | `1920` | `hero-counter` |
| In-content feature | `1600` | `about-founders` |
| Card / half-column | `1000` | `about-counter-detail`, `event-*` |
| Menu tile (`aspect-4/5`, ~300px) | `800` | `menu-*` |

Example:

```bash
node .claude/skills/optimize-image/scripts/optimize-image.mjs \
  "https://www.pexels.com/photo/glass-of-espresso-26626461/" \
  --name menu-espresso --width 800 --keep-original \
  --credit "Glass of espresso | https://www.pexels.com/photo/glass-of-espresso-26626461/ | Oğuzhan Karataş | https://www.pexels.com/@withoguz/"
```

### Batch

```bash
node .claude/skills/optimize-image/scripts/optimize-image.mjs --manifest <path.json>
```

The manifest is a JSON array; each object takes the same keys as the flags
(`name`, `url`, `width?`, `quality?`, `aspect?`, `out?`, `keepOriginal?`,
`credit?`). The canonical manifest for the site's stock photos is
`design/assets/photos/manifest.json` — edit it and re-run to refresh all assets.

```json
[
  {
    "name": "menu-espresso",
    "url": "https://www.pexels.com/photo/glass-of-espresso-26626461/",
    "width": 800,
    "keepOriginal": true,
    "credit": "Glass of espresso | https://www.pexels.com/photo/glass-of-espresso-26626461/ | Oğuzhan Karataş | https://www.pexels.com/@withoguz/"
  }
]
```

## After running

- Reference the asset as `/images/<slug>.webp` in `data/*.ts` and components.
- Keep `public/images/CREDITS.md` accurate (use `--credit`, or edit by hand) —
  every Pexels photo must stay attributed.
- Commit the `.webp` in `public/images/` and, if you used `--keep-original`, the
  source in `design/assets/photos/`.
