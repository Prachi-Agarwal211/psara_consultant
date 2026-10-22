/**
 * Rebuild the shipped v3 posters from the local design reference.
 * This is an explicit authoring command, never a build or install hook:
 *   node scripts/grade-v3-images.mjs
 * The reference folder is not needed by the application or production build.
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const input = path.join(root, "_design_v3", "mockups-v3", "img");
const output = path.join(root, "public", "assets", "images", "graded");
await mkdir(output, { recursive: true });

for (const name of ["hero", "desk", "hq", "corridor"]) {
  const { data, info } = await sharp(path.join(input, `${name}.jpg`))
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .modulate({ saturation: 0.78 })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // The reference already has a photographic grade. Keep the split tone light
  // enough to preserve faces and uniform detail; bake it once rather than
  // applying runtime SVG/CSS filters to every animated image.
  let seed = 73;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * info.channels;
      const luminance = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
      const shadow = Math.pow(1 - luminance, 2) * 0.09;
      const highlight = Math.pow(luminance, 2) * 0.055;
      const dx = (x / info.width - 0.5) * 1.414;
      const dy = (y / info.height - 0.5) * 1.414;
      const vignette = 1 - Math.min(1, dx * dx + dy * dy) * 0.12;
      seed = (1664525 * seed + 1013904223) >>> 0;
      const grain = ((seed / 0xffffffff) - 0.5) * 1.5;
      const navy = [11, 30, 59];
      const amber = [255, 181, 71];
      for (let c = 0; c < 3; c++) {
        const toned = data[i + c] * (1 - shadow - highlight) + navy[c] * shadow + amber[c] * highlight;
        data[i + c] = Math.max(0, Math.min(255, Math.round(toned * vignette + grain)));
      }
    }
  }

  await sharp(data, { raw: info }).webp({ quality: 88, effort: 6 }).toFile(path.join(output, `${name}.webp`));
  console.log(`Graded ${name}.webp`);
}

await sharp(path.join(input, "mark.png"))
  .resize({ width: 480, withoutEnlargement: true })
  .webp({ quality: 92, alphaQuality: 100, effort: 6 })
  .toFile(path.join(output, "eagle-mark.webp"));
console.log("Optimized eagle-mark.webp (alpha preserved)");
