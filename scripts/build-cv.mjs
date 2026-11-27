// Prints the /cv route to public/cv.pdf. Usage: npm run cv (expects a production build; starts `next start` itself).
import { spawn } from "node:child_process";
import { chromium } from "@playwright/test";

const PORT = 3123;
const url = `http://localhost:${PORT}/cv`;

const answers = () =>
  fetch(url).then(
    (r) => r.ok,
    () => false,
  );

// A leftover server on this port would be printed instead of the fresh build.
if (await answers()) throw new Error(`Port ${PORT} is already in use; stop that server and retry.`);

const win = process.platform === "win32";
// detached on POSIX gives the server its own process group, so the whole tree can be killed below.
const server = spawn(`npx next start -p ${PORT}`, { shell: true, stdio: "ignore", detached: !win });

let browser;
try {
  const start = Date.now();
  while (!(await answers())) {
    if (Date.now() - start > 30000) throw new Error(`Server did not respond at ${url}`);
    await new Promise((r) => setTimeout(r, 400));
  }
  browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.emulateMedia({ media: "print" });
  await page.pdf({
    path: "public/cv.pdf",
    format: "A4",
    printBackground: true,
    margin: { top: "14mm", bottom: "14mm", left: "16mm", right: "16mm" },
  });
  console.log("Wrote public/cv.pdf");
} finally {
  await browser?.close();
  if (win) spawn("taskkill", ["/pid", String(server.pid), "/T", "/F"], { stdio: "ignore" });
  else process.kill(-server.pid, "SIGTERM");
}
