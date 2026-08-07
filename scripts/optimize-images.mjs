// One-off image optimization: hero background PNG (1.7MB) → WebP (~150KB)
import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";

const src = "public/hero background.png";
const out = "public/hero-background.webp";

const buf = readFileSync(src);
const meta = await sharp(buf).metadata();
console.log("Source:", src, `${(buf.length / 1024 / 1024).toFixed(2)}MB`, `${meta.width}x${meta.height}`);

await sharp(buf)
  .resize({ width: Math.min(meta.width ?? 1920, 1920), withoutEnlargement: true })
  .webp({ quality: 72, effort: 4 })
  .toFile(out);

const outBuf = readFileSync(out);
console.log("Output:", out, `${(outBuf.length / 1024).toFixed(0)}KB (${(outBuf.length / buf.length * 100).toFixed(0)}% of original)`);
