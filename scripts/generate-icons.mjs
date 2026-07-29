/**
 * Generate favicon, apple-touch-icon, and OG image assets from public/logo.png
 * Run: node scripts/generate-icons.mjs
 */
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import sharp from 'sharp';

const ROOT = process.cwd();
const PUBLIC = join(ROOT, 'public');
const SRC = join(PUBLIC, 'logo.png');
const OG_DIR = join(PUBLIC, 'assets', 'images', 'og');

const sizes = {
  'favicon-32x32.png': 32,
  'favicon-48x48.png': 48,
  'favicon-192x192.png': 192,
  'favicon-512x512.png': 512,
  'apple-touch-icon.png': 180,
};

async function main() {
  console.log('Loading logo.png ...');
  const srcBuf = await readFile(SRC);
  const meta = await sharp(srcBuf).metadata();
  console.log(`  Source: ${meta.width}x${meta.height}, ${meta.format}`);

  // Favicons & Apple Touch Icon
  for (const [name, size] of Object.entries(sizes)) {
    const out = join(PUBLIC, name);
    await sharp(srcBuf)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(out);
    console.log(`  OK  ${name} (${size}x${size})`);
  }

  // favicon.ico: browsers accept PNG bytes in a .ico extension
  const icoSrc = join(PUBLIC, 'favicon-32x32.png');
  const icoDest = join(PUBLIC, 'favicon.ico');
  await writeFile(icoDest, await readFile(icoSrc));
  console.log('  OK  favicon.ico (32x32)');

  // OG Image 1200x630 for social share
  const ogDest = join(OG_DIR, 'default-og.png');
  await sharp(srcBuf)
    .resize(1200, 630, { fit: 'contain', background: { r: 30, g: 27, b: 24, alpha: 1 } })
    .png()
    .toFile(ogDest);
  console.log('  OK  assets/images/og/default-og.png (1200x630)');

  console.log('\nAll icons generated!');
}

main().catch((err) => {
  console.error('Failed:', err);
  process.exit(1);
});
