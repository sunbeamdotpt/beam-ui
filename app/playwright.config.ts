import { defineConfig, devices } from "@playwright/test";

const PORT = 4173;
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: "./tests",
  // Cap per-test time; most routes render in under 5 s.
  timeout: 30_000,
  expect: { timeout: 10_000 },

  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 4 : undefined,
  reporter: isCI ? [["list"], ["html", { open: "never" }]] : "list",

  // One project per theme. The useTheme hook falls back to
  // `prefers-color-scheme` when no cookie or localStorage entry exists, so
  // Playwright's native colorScheme emulation is enough to flip the entire
  // design system. Screenshots land in __screenshots__/<project>/<bucket>/.
  projects: [
    {
      name: "light",
      use: { ...devices["Desktop Chrome"], colorScheme: "light" },
    },
    {
      name: "dark",
      use: { ...devices["Desktop Chrome"], colorScheme: "dark" },
    },
  ],

  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "on-first-retry",
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  },

  // vite preview serves the built bundle; matches what the Dockerfile ships.
  // Falls back to `npm run build && vite preview` on first run if dist is stale.
  webServer: {
    command: `npm run preview -- --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !isCI,
    timeout: 60_000,
    stdout: "ignore",
    stderr: "pipe",
  },
});
