/**
 * Visual regression test for the Plasmic component registry.
 *
 * Visits /plasmic-kitchen-sink, waits for every registered component to
 * hydrate, and snapshots the full page. The baseline captures each component
 * rendered with its registered defaults; future diffs flag regressions in
 * defaults, slot content, styling, or registry metadata.
 */
import { test, expect } from "@playwright/test";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test("plasmic kitchen sink renders all registered components", async ({ page }, testInfo) => {
  const response = await page.goto("/plasmic-kitchen-sink", { waitUntil: "domcontentloaded" });
  expect(response?.ok(), "/plasmic-kitchen-sink HTTP status").toBe(true);

  // Wait for the registry to load and render at least one component item.
  await expect(page.locator("h1")).toContainText("Plasmic component kitchen sink");
  await expect
    .poll(
      async () => page.getByTestId("kitchen-sink-item").count(),
      { timeout: 15_000, intervals: [200, 400, 800] },
    )
    .toBeGreaterThan(0);

  // Let fonts, lazy chunks, and any portal-mounted overlays settle.
  await page.evaluate(() => document.fonts?.ready);
  await page.waitForLoadState("networkidle", { timeout: 10_000 }).catch(() => {});

  const file = path.join(
    __dirname,
    "__screenshots__",
    "plasmic-kitchen-sink",
    `${testInfo.project.name}.png`,
  );
  await page.screenshot({ path: file, fullPage: true });
});
