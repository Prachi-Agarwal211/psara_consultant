/**
 * Ensures lightningcss native binary is findable on Windows.
 * Nested @tailwindcss/node copy sometimes fails optional-dep resolve;
 * copy the .node next to the package as the loader fallback expects.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const candidates = [
  path.join(root, "node_modules", "lightningcss-win32-x64-msvc", "lightningcss.win32-x64-msvc.node"),
  path.join(
    root,
    "node_modules",
    "@tailwindcss",
    "node",
    "node_modules",
    "lightningcss-win32-x64-msvc",
    "lightningcss.win32-x64-msvc.node"
  ),
];

const dests = [
  path.join(root, "node_modules", "@tailwindcss", "node", "node_modules", "lightningcss", "lightningcss.win32-x64-msvc.node"),
  path.join(root, "node_modules", "lightningcss", "lightningcss.win32-x64-msvc.node"),
];

const src = candidates.find((p) => fs.existsSync(p));
if (!src) {
  // Not Windows or package not installed — skip quietly
  process.exit(0);
}

for (const dest of dests) {
  const dir = path.dirname(dest);
  if (!fs.existsSync(dir)) continue;
  try {
    fs.copyFileSync(src, dest);
    console.log("[fix-lightningcss] copied →", path.relative(root, dest));
  } catch (e) {
    console.warn("[fix-lightningcss] skip", dest, e.message);
  }
}
