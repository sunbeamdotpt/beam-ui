/**
 * Visual capture suite for the beam-ui documentation site.
 *
 * One test per route. Screenshots land in `tests/__screenshots__/<bucket>/<slug>.png`
 * and are uploaded as a CI artifact. The suite also doubles as a liveness check:
 * if a route 404s, renders blank, or loses its Shell chrome, the matching test
 * fails.
 */

import { test, expect, type Page } from "@playwright/test";
import * as path from "node:path";
import * as fs from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { routes, catchAllPrefixes, type Route } from "./routes";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "__screenshots__");
const DIST_DIR = path.resolve(__dirname, "../dist");

// External SPAs (Storybook, Beam Sync) are built by separate commands —
// skip their tests when the dist subdirectory isn't present so local runs
// that only did `vite build` don't report spurious failures. CI builds both
// before invoking the suite.
function externalBucketAvailable(slug: string): boolean {
  return existsSync(path.join(DIST_DIR, slug, "index.html"));
}

test.beforeAll(async () => {
  await fs.mkdir(OUT_DIR, { recursive: true });
});

async function waitForAppShell(page: Page) {
  // Shell renders a <header> on every page (with or without a sidebar), and
  // every rendered route drops substantial text into <main>. Waiting on both
  // catches blank lazy-chunk states without requiring route-specific selectors.
  await expect(page.locator("header").first()).toBeVisible({ timeout: 15_000 });
  await expect
    .poll(
      async () => await page.evaluate(() => document.body?.innerText?.trim().length ?? 0),
      { timeout: 15_000, intervals: [200, 400, 800] },
    )
    .toBeGreaterThan(120);
  // Give fonts and any post-hydration CSS a beat to settle before the shot.
  await page.evaluate(() => document.fonts?.ready);
  await page.waitForLoadState("networkidle", { timeout: 5_000 }).catch(() => {});
}

async function waitForExternalSpa(page: Page) {
  await page.waitForLoadState("domcontentloaded");
  await expect
    .poll(
      async () => await page.evaluate(() => document.body?.innerText?.trim().length ?? 0),
      { timeout: 15_000, intervals: [200, 400, 800] },
    )
    .toBeGreaterThan(40);
  await page.evaluate(() => document.fonts?.ready);
  await page.waitForLoadState("networkidle", { timeout: 5_000 }).catch(() => {});
}

async function captureRoute(page: Page, route: Route, project: string) {
  const url = route.path === "" ? "/" : `/${route.path}`;
  const response = await page.goto(url, { waitUntil: "domcontentloaded" });
  expect(response?.ok(), `HTTP status for ${url}`).toBe(true);

  if (route.external) {
    await waitForExternalSpa(page);
  } else {
    await waitForAppShell(page);
  }

  const file = path.join(OUT_DIR, project, route.bucket, `${route.slug}.png`);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await page.screenshot({ path: file, fullPage: true });
}

test.describe.parallel("beam-ui visual capture", () => {
  for (const route of routes) {
    const title = route.path === "" ? "/" : `/${route.path}`;
    test(title, async ({ page }, testInfo) => {
      if (route.external) {
        test.skip(
          !externalBucketAvailable(route.slug),
          `dist/${route.slug} not built — run 'npm run build:external' first`,
        );
      }
      await captureRoute(page, route, testInfo.project.name);
    });
  }
});

test("routes manifest covers every sidebar link", async ({ page }) => {
  // Visit a DocsLayout page so the sidebar (populated with every component +
  // foundation link) is rendered. The top-level routes ("/", "/community",
  // "/guides") use Shell without DocsLayout and expose no aside.
  await page.goto("/components/button");
  await waitForAppShell(page);
  const hrefs = await page.locator("aside a[href^='/']").evaluateAll(
    (els) => Array.from(new Set(els.map((el) => (el as HTMLAnchorElement).pathname))),
  );
  const manifestPaths = new Set(routes.map((r) => (r.path === "" ? "/" : `/${r.path}`)));
  const missing = hrefs.filter((href) =>
    !manifestPaths.has(href) && !catchAllPrefixes.some((prefix) => href.startsWith(prefix)),
  );
  expect(missing, `sidebar links missing from tests/routes.ts: ${missing.join(", ")}`).toHaveLength(0);
});
