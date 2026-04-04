/**
 * generate-stories.ts
 *
 * Discovers colocated *.story.tsx files next to components and generates
 * Storybook CSF3 wrappers in app/src/stories/.
 *
 * Convention:
 *   packages/beam-ui/src/components/ui/button.story.tsx  →  app/src/stories/Button.stories.tsx
 *
 * Each .story.tsx file:
 *   - default export: the primary "Default" story render
 *   - named exports: additional variant stories (e.g. export function Primary() {})
 *   - // @storyName override for display name
 *
 * Since story files import the real component with real props,
 * TypeScript catches any mismatches at compile time.
 *
 * Run: npx tsx app/scripts/generate-stories.ts
 */

import { writeFileSync, readdirSync, mkdirSync, existsSync, readFileSync } from "fs";
import { resolve, dirname, basename } from "path";

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), "..");
const MONO_ROOT = resolve(ROOT, "..");
const STORIES_DIR = resolve(ROOT, "src/stories");

const COMPONENT_DIRS: Array<{ dir: string; category: string; importPrefix: string }> = [
  { dir: resolve(MONO_ROOT, "packages/beam-ui/src/components/ui"), category: "UI", importPrefix: "@sunbeam/beam-ui/components/ui" },
  { dir: resolve(MONO_ROOT, "packages/beam-ui/src/components/shell"), category: "Shell", importPrefix: "@sunbeam/beam-ui/components/shell" },
  { dir: resolve(MONO_ROOT, "packages/beam-ui/src/components/layouts"), category: "Layout", importPrefix: "@sunbeam/beam-ui/components/layouts" },
];

function ensureDir(dir: string) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function toPascal(slug: string): string {
  return slug.split("-").map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join("");
}

/** Extract named exports (export function Foo / export const Foo) at the top level only */
function extractNamedExports(source: string): string[] {
  // Strip template literals and regular strings to avoid matching code inside them
  const stripped = source.replace(/`[\s\S]*?`/g, "``").replace(/"[\s\S]*?"/g, '""').replace(/'[\s\S]*?'/g, "''");
  const names: string[] = [];
  const regex = /^export\s+(?:function|const)\s+([A-Z]\w+)/gm;
  let m;
  while ((m = regex.exec(stripped)) !== null) {
    names.push(m[1]);
  }
  return names;
}

function main() {
  ensureDir(STORIES_DIR);
  let count = 0;

  for (const { dir, category, importPrefix } of COMPONENT_DIRS) {
    if (!existsSync(dir)) continue;

    const storyFiles = readdirSync(dir).filter((f) => f.endsWith(".story.tsx"));

    for (const storyFile of storyFiles) {
      const slug = basename(storyFile, ".story.tsx");
      const source = readFileSync(resolve(dir, storyFile), "utf-8");

      // Display name: @storyName comment or PascalCase of slug
      const nameMatch = source.match(/\/\/\s*@storyName\s+(\S+)/);
      const name = nameMatch ? nameMatch[1] : toPascal(slug);

      const storyImportPath = `${importPrefix}/${slug}.story`;

      // Find named exports for variant stories (skip "Default" — conflicts with generated one)
      const namedExports = extractNamedExports(source).filter((e) => e !== "Default");

      // Build imports
      const importParts = ["StoryRender"];
      if (namedExports.length > 0) {
        importParts.push(...namedExports);
      }

      // Build aliased imports and story entries
      const aliases = namedExports.map((e) => `${e} as ${e}Render`);

      let variantStories = "";
      for (const exp of namedExports) {
        variantStories += `
export const ${exp}: Story = {
  render: () => <${exp}Render />,
};
`;
      }

      const csf = `import type { Meta, StoryObj } from "@storybook/react";
import StoryRender${namedExports.length > 0 ? `, { ${aliases.join(", ")} }` : ""} from "${storyImportPath}";

const meta: Meta = {
  title: "${category}/${name}",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <StoryRender />,
};
${variantStories}`;

      writeFileSync(resolve(STORIES_DIR, `${name}.stories.tsx`), csf, "utf-8");
      count++;
    }
  }

  console.log(`  generated ${count} stories`);
}

main();
