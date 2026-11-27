import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("no WCAG 2.1 AA violations (incl. contrast) on home and CV", async ({ page }) => {
  for (const path of ["/", "/cv"]) {
    await page.goto(path);
    // Reveal all scroll-triggered content so axe sees final colours, not mid-fade opacity.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 400) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
    });
    await page.waitForTimeout(2000);
    const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(violations.map((v) => `${path} ${v.id}: ${v.nodes.map((n) => n.target.join(" ")).slice(0, 3).join(", ")} ${v.nodes[0]?.failureSummary?.slice(0, 160)}`)).toEqual([]);
  }
});

const sections = ["About", "Experience", "Education", "Skills", "Work", "Contact"];

test("home renders identity, every section and no console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Cosmin-Ionel Enachescu/);
  for (const id of ["about", "experience", "education", "skills", "work", "qualifications", "contact"]) {
    await expect(page.locator(`section#${id}`)).toHaveCount(1);
  }
  await page.waitForLoadState("networkidle");
  expect(errors).toEqual([]);
});

test("content guard: excluded or private facts never appear", async ({ page }) => {
  for (const path of ["/", "/cv"]) {
    await page.goto(path);
    const text = await page.locator("body").innerText();
    expect(text).not.toMatch(/2015\/1998|11\.2\.2|Air Cargo Security|Sector Alarm|\+47|907 39 586/i);
    expect(text).not.toMatch(/several years running/i); // overstated claim removed after review
    expect(text).toContain("Oslo, Norway");
    expect(text).toMatch(/varebilløyve|van transport licence/i);
  }
});

test("hero name is visible without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  // CSS rise animation (1.3s + delay) must settle at rest with no JS at all.
  await expect
    .poll(() => page.locator("h1 .rise").evaluateAll((els) => els.map((e) => getComputedStyle(e).transform)))
    .toEqual(["none", "none"]);
  await context.close();
});

test("no horizontal overflow on a 320px phone", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto("/");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

test("skills filter narrows to a tier and reports it", async ({ page }) => {
  await page.goto("/#skills");
  const developing = page.getByRole("button", { name: /Currently developing/ });
  await developing.click();
  await expect(developing).toHaveAttribute("aria-pressed", "true");
  const list = page.locator("section#skills");
  await expect(list.getByText("FastAPI", { exact: true })).toBeVisible();
  await expect(list.getByText("Python", { exact: true })).toHaveCount(0);
  await expect(list.getByText(/Learning through study/)).toBeVisible();
});

test("project case study expands and collapses", async ({ page }) => {
  await page.goto("/#work");
  const toggle = page.locator("section#work").getByRole("button", { name: "Read case study" }).first();
  await toggle.click();
  await expect(page.locator("section#work").getByRole("button", { name: "Hide case study" }).nth(1)).toHaveAttribute(
    "aria-expanded",
    "true",
  );
});

test("external links open safely and resolve", async ({ page, request }) => {
  await page.goto("/");
  const links = await page.locator('a[target="_blank"]').evaluateAll((as) =>
    as.map((a) => ({ href: (a as HTMLAnchorElement).href, rel: a.getAttribute("rel") ?? "" })),
  );
  expect(links.length).toBeGreaterThan(0);
  for (const { href, rel } of links) expect(rel, href).toContain("noopener");
  for (const href of [...new Set(links.map((l) => l.href))]) {
    // Polled: third-party hosts (GitHub) return the odd transient 5xx.
    await expect
      .poll(async () => (await request.get(href, { maxRedirects: 5 })).status(), { message: href, timeout: 20000 })
      .toBeLessThan(400);
  }
});

test("CV PDF and printable CV are served", async ({ page, request }) => {
  const pdf = await request.get("/cv.pdf");
  expect(pdf.status()).toBe(200);
  expect(pdf.headers()["content-type"]).toContain("application/pdf");
  await page.goto("/cv");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Cosmin-Ionel Enachescu");
  await expect(page.getByText(/Planned completion|2028/).first()).toBeVisible();
});

test("SEO metadata, sitemap and robots", async ({ page, request }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Cosmin-Ionel Enachescu/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /University of Oslo/);
  await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
  expect((await request.get("/sitemap.xml")).status()).toBe(200);
  expect((await request.get("/robots.txt")).status()).toBe(200);
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });
  test("hero canvas renders a converged static frame", async ({ page }, info) => {
    test.skip(info.project.name !== "desktop", "caption is only visible on large screens");
    await page.goto("/");
    await expect(page.getByText(/k-means .* converged/)).toBeVisible();
  });
});

test.describe("navigation", () => {
  test("desktop nav marks the section in view", async ({ page }, info) => {
    test.skip(info.project.name !== "desktop");
    await page.goto("/");
    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Education" }).click();
    await expect(page.getByRole("link", { name: "Education" }).first()).toHaveAttribute("aria-current", "location");
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await expect(page.locator("header [aria-current]")).toHaveCount(0);
  });

  test("mobile menu opens, moves focus in, closes on Escape", async ({ page }, info) => {
    test.skip(info.project.name !== "mobile");
    await page.goto("/");
    const button = page.getByRole("button", { name: "Open menu" });
    await button.click();
    const menu = page.getByRole("navigation", { name: "Mobile" });
    for (const s of sections) await expect(menu.getByRole("link", { name: new RegExp(s) })).toBeVisible();
    await expect(menu.getByRole("link").first()).toBeFocused();
    await expect(page.locator("main#main")).toHaveAttribute("inert", "");
    await page.keyboard.press("Escape");
    await expect(menu).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
    await expect(page.locator("main#main")).not.toHaveAttribute("inert");
  });

  test("mobile menu link does not pull focus back to the menu button", async ({ page }, info) => {
    test.skip(info.project.name !== "mobile");
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("navigation", { name: "Mobile" }).getByRole("link", { name: /Skills/ }).click();
    await expect(page.getByRole("button", { name: "Open menu" })).not.toBeFocused();
    await expect(page.locator("main#main")).not.toHaveAttribute("inert");
  });
});
