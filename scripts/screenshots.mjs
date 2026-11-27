// Full-page screenshots at phone/tablet/desktop widths + console-error and overflow check.
// Usage: node scripts/screenshots.mjs <outDir> [baseUrl]
import { chromium } from "@playwright/test";
const out = process.argv[2];
const base = process.argv[3] ?? "http://localhost:3000";
const b = await chromium.launch();
const errors = [];
for (const [name, w, h] of [["mobile", 375, 812], ["tablet", 768, 1024], ["desktop", 1440, 900]]) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  p.on("console", (m) => m.type() === "error" && errors.push(`${name}: ${m.text()}`));
  p.on("pageerror", (e) => errors.push(`${name}: ${e.message}`));
  await p.goto(base, { waitUntil: "networkidle" });
  const total = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < total; y += h / 2) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(120); }
  await p.waitForTimeout(1200);
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.waitForTimeout(400);
  const overflow = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  console.log(name, "height", total, "h-overflow", overflow);
  await p.screenshot({ path: `${out}/${name}.png`, fullPage: true });
  await p.close();
}
console.log(errors.length ? errors.join("\n") : "no console errors");
await b.close();
