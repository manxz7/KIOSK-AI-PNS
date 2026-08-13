import sharp from "sharp";
import { mkdirSync } from "node:fs";

const OUT_DIR = "public/pwa";
mkdirSync(OUT_DIR, { recursive: true });

const LOGO = "src/assets/logo-pns.png";
const ROYAL_BLUE = { r: 0, g: 26, b: 77, alpha: 1 }; // #001a4d

async function onWhite(size, padPct = 0.9) {
  const inner = Math.round(size * padPct);
  const logo = await sharp(LOGO).resize(inner, inner, { fit: "contain" }).toBuffer();
  return sharp({
    create: { width: size, height: size, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } },
  })
    .composite([{ input: logo, gravity: "center" }])
    .png()
    .toBuffer();
}

async function onColor(size, bg, padPct = 0.62) {
  const inner = Math.round(size * padPct);
  const logo = await sharp(LOGO).resize(inner, inner, { fit: "contain" }).toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: bg } })
    .composite([{ input: logo, gravity: "center" }])
    .png()
    .toBuffer();
}

const icon192 = await onWhite(192);
await sharp(icon192).toFile(`${OUT_DIR}/icon-192.png`);
console.log("generated: icon-192.png");

const icon512 = await onWhite(512);
await sharp(icon512).toFile(`${OUT_DIR}/icon-512.png`);
console.log("generated: icon-512.png");

const maskable = await onColor(512, ROYAL_BLUE, 0.62);
await sharp(maskable).toFile(`${OUT_DIR}/maskable-512.png`);
console.log("generated: maskable-512.png");

const appleTouch = await onWhite(180);
await sharp(appleTouch).toFile(`${OUT_DIR}/apple-touch-icon.png`);
console.log("generated: apple-touch-icon.png");

const favicon = await onWhite(64, 0.95);
await sharp(favicon).toFile(`${OUT_DIR}/favicon-64.png`);
console.log("generated: favicon-64.png");
