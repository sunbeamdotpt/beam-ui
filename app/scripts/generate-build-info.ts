/**
 * generate-build-info.ts
 *
 * Generates build metadata:
 *   - app/src/generated/build-info.ts  (commit hash, dirty flag, timestamp)
 *   - app/src/generated/page-dates.ts  (last git modification date per page file)
 *
 * Run: npx tsx app/scripts/generate-build-info.ts
 */

import { execFileSync } from "child_process";
import { writeFileSync, mkdirSync, readdirSync, existsSync } from "fs";
import { resolve, dirname, basename } from "path";

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), "..");
const GEN_DIR = resolve(ROOT, "src/generated");
const REPO_ROOT = resolve(ROOT, "..");

if (!existsSync(GEN_DIR)) mkdirSync(GEN_DIR, { recursive: true });

/* ------------------------------------------------------------------ */
/* Build info                                                          */
/* ------------------------------------------------------------------ */

function getBuildInfo() {
  let commit = "unknown";
  let dirty = false;
  let branch = "unknown";

  try {
    commit = execFileSync("git", ["rev-parse", "--short", "HEAD"], { cwd: REPO_ROOT })
      .toString().trim();
    branch = execFileSync("git", ["rev-parse", "--abbrev-ref", "HEAD"], { cwd: REPO_ROOT })
      .toString().trim();
    try {
      execFileSync("git", ["diff", "--quiet"], { cwd: REPO_ROOT });
    } catch {
      dirty = true; // non-zero exit = dirty
    }
  } catch {
    // not a git repo
  }

  const timestamp = new Date().toISOString();

  const content = `// Auto-generated at build time. Do not edit.
export const buildInfo = {
  commit: "${commit}",
  branch: "${branch}",
  dirty: ${dirty},
  timestamp: "${timestamp}",
  label: "${commit}${dirty ? "+dirty" : ""}",
} as const;
`;

  writeFileSync(resolve(GEN_DIR, "build-info.ts"), content);
  console.log(`  wrote build-info.ts (${commit}${dirty ? "+dirty" : ""})`);
}

/* ------------------------------------------------------------------ */
/* Per-page last updated dates                                         */
/* ------------------------------------------------------------------ */

function getPageDates() {
  const pageDirs = [
    { dir: resolve(ROOT, "src/pages/foundations"), prefix: "/foundations/" },
    { dir: resolve(ROOT, "src/pages/components"), prefix: "/components/" },
    { dir: resolve(ROOT, "src/pages/shell"), prefix: "/shell/" },
    { dir: resolve(ROOT, "src/pages/layouts"), prefix: "/layouts/" },
  ];

  const dates: Record<string, string> = {};

  for (const { dir, prefix } of pageDirs) {
    if (!existsSync(dir)) continue;
    const files = readdirSync(dir).filter((f) => f.endsWith(".tsx"));

    for (const file of files) {
      const filePath = resolve(dir, file);
      let slug = basename(file, ".tsx");

      // Remove -page suffix for component/shell/layout pages
      if (slug.endsWith("-page")) slug = slug.slice(0, -5);

      const route = `${prefix}${slug}`;

      try {
        const dateStr = execFileSync(
          "git",
          ["log", "-1", "--format=%ci", "--", filePath],
          { cwd: REPO_ROOT }
        ).toString().trim();

        if (dateStr) {
          // Convert to readable date: "2026-04-03 10:15:30 +0000" -> "Apr 3, 2026"
          const d = new Date(dateStr);
          const formatted = d.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });
          dates[route] = formatted;
        }
      } catch {
        // file not tracked
      }
    }
  }

  const entries = Object.entries(dates)
    .map(([route, date]) => `  "${route}": "${date}",`)
    .join("\n");

  const content = `// Auto-generated at build time. Do not edit.
export const pageDates: Record<string, string> = {
${entries}
};
`;

  writeFileSync(resolve(GEN_DIR, "page-dates.ts"), content);
  console.log(`  wrote page-dates.ts (${Object.keys(dates).length} pages)`);
}

/* ------------------------------------------------------------------ */
/* Run                                                                 */
/* ------------------------------------------------------------------ */

getBuildInfo();
getPageDates();
