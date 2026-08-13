import sharp from "sharp";
import { mkdirSync } from "node:fs";

const OUT_DIR = "public/pwa";
const RES_DIR = "resources";
mkdirSync(OUT_DIR, { recursive: true });
mkdirSync(RES_DIR, { recursive: true });

// Full-bleed icon (safe center content ~66% for maskable adaptive icons)
function svg({ size, radius, showRing = true }) {
  const cx = size / 2;
  const cy = size / 2;
  const fontSize = size * 0.30;
  const dotR = size * 0.035;

  return `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0d4fbd" />
      <stop offset="55%" stop-color="#003da5" />
      <stop offset="100%" stop-color="#032670" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${radius}" fill="url(#bg)" />
  ${showRing ? `<circle cx="${cx}" cy="${cy}" r="${size * 0.36}" fill="none" stroke="#ffd100" stroke-width="${size * 0.012}" opacity="0.55" stroke-dasharray="${size * 0.02} ${size * 0.018}" />` : ""}
  <text x="${cx}" y="${cy}" font-family="Arial, sans-serif" font-weight="800" font-size="${fontSize}" fill="#ffffff" text-anchor="middle" dominant-baseline="central" letter-spacing="-1">PNS</text>
  <circle cx="${cx + size * 0.24}" cy="${cy + size * 0.2}" r="${dotR}" fill="#ffd100" />
</svg>`;
}

const targets = [
  { name: "icon-192.png", size: 192, radius: 40, showRing: true },
  { name: "icon-512.png", size: 512, radius: 100, showRing: true },
  { name: "maskable-512.png", size: 512, radius: 0, showRing: false },
  { name: "apple-touch-icon.png", size: 180, radius: 40, showRing: true },
];

for (const t of targets) {
  const buf = Buffer.from(svg(t));
  await sharp(buf).png().toFile(`${OUT_DIR}/${t.name}`);
  console.log("generated:", t.name);
}

// Favicon (keep simple, no ring, smaller)
const faviconSvg = svg({ size: 64, radius: 14, showRing: false });
await sharp(Buffer.from(faviconSvg)).png().toFile(`${OUT_DIR}/favicon-64.png`);
console.log("generated: favicon-64.png");

// --- Capacitor native asset sources (via @capacitor/assets) ---

// Standard app icon, 1024x1024, full bleed square
const iconSvg = svg({ size: 1024, radius: 0, showRing: true });
await sharp(Buffer.from(iconSvg)).png().toFile(`${RES_DIR}/icon.png`);
console.log("generated: resources/icon.png");

// Adaptive icon background layer (solid gradient, no marks)
function bgOnlySvg(size) {
  return `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0d4fbd" />
      <stop offset="55%" stop-color="#003da5" />
      <stop offset="100%" stop-color="#032670" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#bg)" />
</svg>`;
}
await sharp(Buffer.from(bgOnlySvg(1024))).png().toFile(`${RES_DIR}/icon-background.png`);
console.log("generated: resources/icon-background.png");

// Adaptive icon foreground layer (transparent bg, marks scaled to safe zone ~55%)
function foregroundSvg(size) {
  const cx = size / 2;
  const cy = size / 2;
  const scale = 0.55;
  const fontSize = size * 0.3 * scale * 1.15;
  const dotR = size * 0.035 * scale * 1.15;
  const ringR = size * 0.36 * scale * 1.15;
  return `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <circle cx="${cx}" cy="${cy}" r="${ringR}" fill="none" stroke="#ffd100" stroke-width="${size * 0.012}" opacity="0.55" stroke-dasharray="${size * 0.02} ${size * 0.018}" />
  <text x="${cx}" y="${cy}" font-family="Arial, sans-serif" font-weight="800" font-size="${fontSize}" fill="#ffffff" text-anchor="middle" dominant-baseline="central" letter-spacing="-1">PNS</text>
  <circle cx="${cx + ringR * 0.66}" cy="${cy + ringR * 0.55}" r="${dotR}" fill="#ffd100" />
</svg>`;
}
await sharp(Buffer.from(foregroundSvg(1024))).png().toFile(`${RES_DIR}/icon-foreground.png`);
console.log("generated: resources/icon-foreground.png");

// Splash screen, 2732x2732, light background with centered mark
function splashSvg({ size, bg, markScale = 0.22 }) {
  const cx = size / 2;
  const cy = size / 2;
  const markSize = size * markScale;
  const r = markSize / 2;
  const fontSize = markSize * 0.32;
  return `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="mark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0d4fbd" />
      <stop offset="55%" stop-color="#003da5" />
      <stop offset="100%" stop-color="#032670" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="${bg}" />
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#mark)" />
  <text x="${cx}" y="${cy}" font-family="Arial, sans-serif" font-weight="800" font-size="${fontSize}" fill="#ffffff" text-anchor="middle" dominant-baseline="central" letter-spacing="-1">PNS</text>
</svg>`;
}
await sharp(Buffer.from(splashSvg({ size: 2732, bg: "#f5f7fa" })))
  .png()
  .toFile(`${RES_DIR}/splash.png`);
console.log("generated: resources/splash.png");

await sharp(Buffer.from(splashSvg({ size: 2732, bg: "#0a1f4e" })))
  .png()
  .toFile(`${RES_DIR}/splash-dark.png`);
console.log("generated: resources/splash-dark.png");
