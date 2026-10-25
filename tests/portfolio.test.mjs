// Portfolio page tests. Runs against public/index.html by default, or against
// a running server when BASE_URL is set (e.g. `next start` or a Vercel deploy).
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";

const FILE = fileURLToPath(new URL("../public/index.html", import.meta.url));
const URL_UNDER_TEST = process.env.BASE_URL || pathToFileURL(FILE).href;

// Size of the original upload this page was trimmed from.
const ORIGINAL_BYTES = 155528;

let browser, page, html;
const errors = [];

before(async () => {
  browser = await chromium.launch();
  page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  const res = await page.goto(URL_UNDER_TEST, { waitUntil: "load" });
  if (process.env.BASE_URL) assert.equal(res.status(), 200);
  html = await page.content();
});

after(async () => {
  await browser?.close();
});

test("page has the right title and loads without script errors", async () => {
  assert.match(await page.title(), /Muhammad Imam Nurokhi/);
  assert.deepEqual(errors, []);
});

test("core sections are kept", async () => {
  for (const id of ["top", "about", "work", "ai", "experience", "toolkit", "contact"]) {
    assert.equal(await page.locator(`section#${id}`).count(), 1, `missing #${id}`);
  }
  assert.equal(await page.locator(".pcard").count(), 12);
  assert.equal(await page.locator(".jobs > li").count(), 7);
  assert.equal(await page.locator(".skill").count(), 6);
  assert.equal(await page.locator('a[href^="mailto:mimamnuro@gmail.com"]').count() >= 1, true);
  assert.equal(await page.locator('a[href="https://id.linkedin.com/in/muhammad-imam-nurokhi"]').count(), 1);
  assert.equal(await page.locator('a[href="https://github.com/imam-nurokhi"]').count(), 1);
});

test("non-essential content is removed", async () => {
  const gone = {
    "cursor orb": ".orb",
    "keyword marquee": ".marquee",
    "scroll-jacked process story": "#process, #story, .stage",
    "slogan statement": ".statement",
    "duplicate about photo": ".about-photo",
    "fake agent console demo": ".console, #c-run",
    "perspective slogan section": ".persp",
    "hero scroll hint": ".hero-foot, .photo-note",
    "decorative stamp": ".stamp",
  };
  for (const [what, sel] of Object.entries(gone)) {
    assert.equal(await page.locator(sel).count(), 0, `${what} still present (${sel})`);
  }
  assert.doesNotMatch(html, /ONE HTML FILE, NO TRACKERS/);
  assert.doesNotMatch(html, /recording processed end to end/);
});

test("in-page links and icon references resolve", async () => {
  const broken = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      const id = a.getAttribute("href").slice(1);
      if (id && !document.getElementById(id)) out.push(a.getAttribute("href"));
    });
    document.querySelectorAll("use").forEach((u) => {
      const id = u.getAttribute("href").slice(1);
      if (!document.getElementById(id)) out.push("use#" + id);
    });
    return out;
  });
  assert.deepEqual(broken, []);
});

test("section numbering is sequential", async () => {
  const nums = await page.locator(".num span:first-child").allTextContents();
  const seq = nums.map((t) => t.match(/^(\d\d) \//)?.[1]).filter(Boolean);
  assert.deepEqual(seq, seq.map((_, i) => String(i + 1).padStart(2, "0")));
  const mobile = await page.locator("#mnav a span").allTextContents();
  assert.deepEqual(mobile, mobile.map((_, i) => String(i + 1).padStart(2, "0")));
});

test("JSON-LD is valid JSON", async () => {
  const raw = await page.locator('script[type="application/ld+json"]').textContent();
  assert.doesNotThrow(() => JSON.parse(raw));
});

test("Indonesian translation covers every keyed node and has no orphans", async () => {
  const src = html.match(/var ID=(\{[\s\S]*?\n\s*\});/);
  assert.ok(src, "Indonesian dictionary not found");
  const ID = new Function(`return ${src[1]}`)();
  const keys = await page.evaluate(() =>
    [...new Set([...document.querySelectorAll("[data-i18n]")].map((n) => n.dataset.i18n))]
  );
  const missing = keys.filter((k) => !(k in ID));
  const orphans = Object.keys(ID).filter((k) => !keys.includes(k));
  assert.deepEqual(missing, [], "data-i18n keys without an Indonesian string");
  assert.deepEqual(orphans, [], "Indonesian strings with no matching node");
});

test("interactions work: language, filter, project dialog", async () => {
  await page.click("#lang");
  assert.equal(await page.getAttribute("html", "lang"), "id");
  assert.equal(await page.locator('.nav a[href="#about"]').textContent(), "Tentang");
  await page.click("#lang");
  assert.equal(await page.getAttribute("html", "lang"), "en");

  await page.click('.filter[data-f="cbqa"]');
  assert.equal(await page.locator(".pcard:not([hidden])").count(), 4);
  assert.match(await page.locator("#count").textContent(), /SHOWING 4 PROJECTS/);
  await page.click('.filter[data-f="all"]');

  await page.locator(".pcard .c-open").first().click();
  assert.equal(await page.locator("#detail[open]").count(), 1);
  assert.equal(await page.locator("#d-title").textContent(), "NEXONE");
  await page.click("#d-close");
  assert.equal(await page.locator("#detail[open]").count(), 0);
  assert.deepEqual(errors, []);
});

test("mobile layout has no horizontal scroll", async () => {
  const m = await browser.newPage({ viewport: { width: 375, height: 800 } });
  await m.goto(URL_UNDER_TEST, { waitUntil: "load" });
  const overflow = await m.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  await m.close();
  assert.ok(overflow <= 0, `page overflows by ${overflow}px at 375px`);
});

test("file is meaningfully smaller than the original", { skip: !!process.env.BASE_URL }, () => {
  const bytes = statSync(FILE).size;
  assert.ok(bytes < ORIGINAL_BYTES * 0.8, `${bytes} bytes is not at least 20% smaller`);
  assert.ok(readFileSync(FILE, "utf8").startsWith("<!doctype html>"));
});

test("old /portfolio.html URL redirects to the root", { skip: !process.env.BASE_URL }, async () => {
  const res = await fetch(new URL("/portfolio.html", process.env.BASE_URL), { redirect: "manual" });
  assert.ok([301, 308].includes(res.status), `got ${res.status}`);
  assert.equal(new URL(res.headers.get("location"), process.env.BASE_URL).pathname, "/");
});
