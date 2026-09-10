#!/usr/bin/env node
/**
 * optimize-image — download an image from a URL, resize it for the web, and
 * write it as WebP into the site's public folder.
 *
 * Single image:
 *   node .claude/skills/optimize-image/scripts/optimize-image.mjs <url> \
 *     --name <slug> [--width 1600] [--quality 80] [--aspect 4:5] \
 *     [--out public/images] [--keep-original] \
 *     [--credit "Photo title | photo page URL | Photographer | profile URL"]
 *
 * <url> may be a direct image URL or a Pexels photo *page* URL.
 *
 * Batch (array of the same options as JSON objects):
 *   node .claude/skills/optimize-image/scripts/optimize-image.mjs --manifest <path.json>
 *
 * Run it from the project root so `sharp` (a Next.js dependency) resolves and
 * the default relative paths (`public/images`, `design/assets/photos`) land in
 * the right place.
 */

import { createRequire } from "node:module";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";

const require = createRequire(import.meta.url);

let sharp;
try {
  sharp = require("sharp");
} catch {
  console.error(
    "Could not load `sharp`. Run this script from the khady-cafe project root " +
      "(where node_modules/sharp exists).",
  );
  process.exit(1);
}

const DEFAULTS = { width: 1600, quality: 80, out: "public/images" };

/** Parse `key value` / `--flag` style args after the positional URL. */
function parseArgs(argv) {
  const opts = {};
  const positional = [];
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      if (key === "keep-original") {
        opts.keepOriginal = true;
      } else {
        opts[key] = argv[++i];
      }
    } else {
      positional.push(arg);
    }
  }
  if (positional[0]) opts.url = positional[0];
  return opts;
}

/**
 * Pexels photo *page* URLs (…/photo/<slug>-<id>/) aren't image files. Turn one
 * into a key-free CDN URL. Anything else is returned unchanged and fetched as-is.
 */
function resolveSourceUrl(url, targetWidth) {
  try {
    const u = new URL(url);
    if (u.hostname.endsWith("pexels.com") && u.pathname.includes("/photo/")) {
      const id = u.pathname.replace(/\/+$/, "").match(/(\d+)$/)?.[1];
      if (!id) throw new Error(`No photo id found in Pexels URL: ${url}`);
      const w = Math.max(targetWidth * 2, 2400);
      return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
    }
  } catch (err) {
    if (err instanceof TypeError) throw new Error(`Invalid URL: ${url}`);
    throw err;
  }
  return url;
}

const EXT_BY_TYPE = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
};

async function download(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "optimize-image-skill" },
    redirect: "follow",
  });
  if (!res.ok) {
    throw new Error(`GET ${url} -> ${res.status} ${res.statusText}`);
  }
  const type = (res.headers.get("content-type") || "").split(";")[0].trim();
  if (!type.startsWith("image/")) {
    throw new Error(`Expected an image from ${url}, got "${type}"`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  return { buf, ext: EXT_BY_TYPE[type] || "img" };
}

/**
 * Upsert a row for `<name>.webp` into public/images/CREDITS.md.
 * `credit` is "Photo title | photo page URL | Photographer | profile URL"
 * (matching the table's existing columns: File | Photo | Photographer | Profile).
 */
async function updateCredits(name, credit) {
  const [title = "", photoUrl = "", photographer = "", profileUrl = ""] = credit
    .split("|")
    .map((s) => s.trim());
  const creditsPath = path.join("public", "images", "CREDITS.md");
  let md;
  try {
    md = await readFile(creditsPath, "utf8");
  } catch {
    md =
      "All photos from Pexels (https://www.pexels.com/license/). Free to use.\n\n" +
      "| File | Photo | Photographer | Profile |\n| --- | --- | --- | --- |\n";
  }
  const file = `${name}.webp`;
  const photoCell = photoUrl ? `[${title}](${photoUrl})` : title;
  const profileCell = profileUrl ? `[Profile](${profileUrl})` : "";
  const row = `| \`${file}\` | ${photoCell} | ${photographer} | ${profileCell} |`;
  const lines = md.replace(/\s*$/, "").split("\n");
  const idx = lines.findIndex((l) => l.startsWith(`| \`${file}\` |`));
  if (idx >= 0) {
    lines[idx] = row;
  } else {
    lines.push(row);
  }
  await writeFile(creditsPath, lines.join("\n") + "\n");
}

async function optimizeOne(rawOpts) {
  const opts = { ...DEFAULTS, ...rawOpts };
  if (!opts.url) throw new Error("Missing image URL");
  if (!opts.name) throw new Error("Missing --name <slug>");

  const width = Number(opts.width) || DEFAULTS.width;
  const quality = Number(opts.quality) || DEFAULTS.quality;
  const slug = String(opts.name).replace(/\.[a-z0-9]+$/i, "");

  const sourceUrl = resolveSourceUrl(opts.url, width);
  const { buf, ext } = await download(sourceUrl);

  const pipeline = sharp(buf)
    .rotate()
    .resize({ width, withoutEnlargement: true });

  if (opts.aspect) {
    const [aw, ah] = String(opts.aspect).split(":").map(Number);
    if (aw > 0 && ah > 0) {
      pipeline.resize({
        width,
        height: Math.round((width * ah) / aw),
        fit: "cover",
        position: "attention",
        withoutEnlargement: true,
      });
    }
  }

  const outDir = opts.out || DEFAULTS.out;
  await mkdir(outDir, { recursive: true });
  const outPath = path.join(outDir, `${slug}.webp`);
  const info = await pipeline.webp({ quality, effort: 5 }).toFile(outPath);

  if (opts.keepOriginal) {
    const origDir = path.join("design", "assets", "photos");
    await mkdir(origDir, { recursive: true });
    await writeFile(path.join(origDir, `${slug}.${ext}`), buf);
  }

  if (opts.credit) await updateCredits(slug, opts.credit);

  const srcKB = Math.round(buf.length / 1024);
  const outKB = Math.round(info.size / 1024);
  console.log(
    `  ${slug}.webp  ${srcKB} KB -> ${outKB} KB  (${info.width}x${info.height})`,
  );
  return { slug, srcKB, outKB };
}

async function main() {
  const argv = process.argv.slice(2);
  const opts = parseArgs(argv);

  if (opts.manifest) {
    const entries = JSON.parse(await readFile(opts.manifest, "utf8"));
    if (!Array.isArray(entries)) {
      throw new Error("Manifest must be a JSON array of image objects");
    }
    console.log(`Optimizing ${entries.length} image(s) from ${opts.manifest}:`);
    let done = 0;
    const failures = [];
    for (const entry of entries) {
      try {
        await optimizeOne(entry);
        done++;
      } catch (err) {
        failures.push({ name: entry.name, message: err.message });
        console.error(`  ${entry.name}: FAILED — ${err.message}`);
      }
    }
    console.log(`\nDone: ${done}/${entries.length} succeeded.`);
    if (failures.length) process.exit(1);
    return;
  }

  await optimizeOne(opts);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
