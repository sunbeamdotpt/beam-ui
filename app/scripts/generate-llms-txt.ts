/**
 * generate-llms-txt.ts
 *
 * Auto-discovers all Beam UI components and generates LLM-readable docs:
 *   - app/public/llms.txt       (concise overview)
 *   - app/public/llms-full.txt  (comprehensive API reference)
 *   - app/public/docs/{name}.md (per-component markdown)
 *
 * Components are discovered by scanning packages/beam-ui/src/components/
 * and extracting exported function names + props interfaces via regex.
 *
 * Run: npx tsx app/scripts/generate-llms-txt.ts
 */

import { writeFileSync, readFileSync, readdirSync, mkdirSync, existsSync } from "fs";
import { resolve, dirname, basename } from "path";

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), "..");
const MONO_ROOT = resolve(ROOT, "..");
const UI_DIR = resolve(MONO_ROOT, "packages/beam-ui/src/components/ui");
const SHELL_DIR = resolve(MONO_ROOT, "packages/beam-ui/src/components/shell");
const LAYOUT_DIR = resolve(MONO_ROOT, "packages/beam-ui/src/components/layouts");
const PUBLIC = resolve(ROOT, "public");
const DOCS_DIR = resolve(PUBLIC, "docs");

interface PropInfo {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface ComponentDef {
  name: string;
  slug: string;
  importPath: string;
  description: string;
  props: PropInfo[];
  exports: string[];
  category: "ui" | "shell" | "layout";
}

function ensureDir(dir: string) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function extractProps(source: string, interfaceName: string): PropInfo[] {
  const regex = new RegExp(
    `(?:export\\s+)?interface\\s+${interfaceName}\\s*(?:extends\\s+[^{]+)?\\{([^}]*(?:\\{[^}]*\\}[^}]*)*)\\}`,
    "s"
  );
  const match = source.match(regex);
  if (!match) return [];

  const body = match[1];
  const props: PropInfo[] = [];

  const propRegex = /(?:\/\*\*\s*(.*?)\s*\*\/\s*\n\s*)?(\w+)(\??):\s*([^;]+);/g;
  let m;
  while ((m = propRegex.exec(body)) !== null) {
    const [, comment, name, optional, rawType] = m;
    props.push({
      name,
      type: rawType.trim().replace(/\s+/g, " "),
      required: optional !== "?",
      description: comment?.trim() ?? "",
    });
  }
  return props;
}

function extractExports(source: string): string[] {
  const exports: string[] = [];
  const fnRegex = /export\s+function\s+(\w+)/g;
  let m;
  while ((m = fnRegex.exec(source)) !== null) exports.push(m[1]);
  const constRegex = /export\s+const\s+(\w+)/g;
  while ((m = constRegex.exec(source)) !== null) exports.push(m[1]);
  return exports;
}

function extractDescription(source: string, name: string): string {
  const beforeExport = new RegExp(`\\/\\*\\*\\s*([^*](?:.|\\n)*?)\\s*\\*\\/\\s*\\nexport\\s+function\\s+${name}`);
  const m = source.match(beforeExport);
  if (m) return m[1].replace(/\n\s*\*\s*/g, " ").trim();
  return `${name} component.`;
}

function discoverComponents(dir: string, category: "ui" | "shell" | "layout", importPrefix: string): ComponentDef[] {
  if (!existsSync(dir)) return [];
  const files = readdirSync(dir).filter((f) => f.endsWith(".tsx") && !f.startsWith("index"));
  const components: ComponentDef[] = [];

  for (const file of files) {
    const slug = basename(file, ".tsx");
    const source = readFileSync(resolve(dir, file), "utf-8");
    const exports = extractExports(source);
    if (exports.length === 0) continue;

    const mainExport = exports[0];

    let props: PropInfo[] = [];
    for (const exp of exports) {
      props = extractProps(source, `${exp}Props`);
      if (props.length > 0) break;
    }
    if (props.length === 0) {
      const anyProps = source.match(/interface\s+(\w*Props)\b/);
      if (anyProps) props = extractProps(source, anyProps[1]);
    }

    components.push({
      name: mainExport,
      slug,
      importPath: `${importPrefix}/${slug}`,
      description: extractDescription(source, mainExport),
      props,
      exports,
      category,
    });
  }

  return components.sort((a, b) => a.name.localeCompare(b.name));
}

function propsTable(props: PropInfo[]): string {
  if (props.length === 0) return "_No documented props._";
  const rows = props.map(
    (p) => `| ${p.name} | \`${p.type}\` | ${p.required ? "Yes" : "No"} | ${p.description} |`
  );
  return [
    "| Prop | Type | Required | Description |",
    "|------|------|----------|-------------|",
    ...rows,
  ].join("\n");
}

function generateLlmsTxt(all: ComponentDef[]): string {
  const byCategory = {
    ui: all.filter((c) => c.category === "ui"),
    shell: all.filter((c) => c.category === "shell"),
    layout: all.filter((c) => c.category === "layout"),
  };

  const listSection = (title: string, items: ComponentDef[]) =>
    `### ${title}\n${items.map((c) => `- **${c.name}** — ${c.description}  \n  \`import { ${c.name} } from "${c.importPath}"\``).join("\n")}`;

  return `# Beam Design Language

> A comprehensive React component library by Sunbeam Studios.

## Overview
- Package: @sunbeam/beam-ui
- Registry: https://src.sunbeam.pt/api/packages/studio/npm/
- Source: https://src.sunbeam.pt/studio/beam-ui
- Docs: https://design.sunbeam.pt

## Install
\`\`\`bash
npm install @sunbeam/beam-ui --registry=https://src.sunbeam.pt/api/packages/studio/npm/
\`\`\`

## Stack
React 19, Panda CSS, Ark UI v4, TypeScript

## Components (${all.length} total)

${listSection("UI Components", byCategory.ui)}

${listSection("Shell", byCategory.shell)}

${listSection("Layouts", byCategory.layout)}

## Foundations
- **Colors**: Warm sunbeam palette with semantic tokens for light/dark mode (sunbeam.orange #fa520f, sunshine scale, ivory/cream surfaces)
- **Typography**: Ysabeau Infant (body/heading), Monaspace Argon (mono)
- **Spacing**: 4px base unit scale
- **Elevation**: Golden shadow system
- **Accessibility**: Section 508 + WCAG 2.1 AA compliant

## Full Documentation
For complete props, usage examples, and API details: [/llms-full.txt](https://design.sunbeam.pt/llms-full.txt)

## Per-Component Docs
Each component has a dedicated markdown file at: \`/docs/{component-slug}.md\`

## Rendered Pages
To view the fully rendered HTML page with live DOM structure, append \`?render=html\` to any page URL:
\`https://design.sunbeam.pt/components/button?render=html\`
`;
}

function generateLlmsFullTxt(all: ComponentDef[]): string {
  const sections = all.map((c) => {
    let section = `### ${c.name}

> ${c.description}

\`\`\`tsx
import { ${c.name} } from "${c.importPath}"
\`\`\`

${propsTable(c.props)}`;

    if (c.exports.length > 1) {
      section += `\n\n**Also exports:** ${c.exports.slice(1).map((e) => `\`${e}\``).join(", ")}`;
    }

    return section;
  }).join("\n\n---\n\n");

  return `# Beam Design Language — Full API Reference

> A comprehensive React component library by Sunbeam Studios for building design system interfaces.

## Overview
- **Package:** \`@sunbeam/beam-ui\`
- **Registry:** https://src.sunbeam.pt/api/packages/studio/npm/
- **Source:** https://src.sunbeam.pt/studio/beam-ui
- **Docs:** https://design.sunbeam.pt
- **Stack:** React 19, Panda CSS, Ark UI v4, TypeScript

## Install
\`\`\`bash
npm install @sunbeam/beam-ui --registry=https://src.sunbeam.pt/api/packages/studio/npm/
\`\`\`

## Foundations
- **Colors:** Warm sunbeam palette — primary orange (#fa520f), sunshine scale (#ff8a00 to #ffe295), semantic tokens for light/dark mode
- **Typography:** Ysabeau Infant (body/heading), Monaspace Argon (monospace)
- **Spacing:** 4px base unit scale
- **Elevation:** Golden shadow system with hover lift effects
- **Accessibility:** Section 508 + WCAG 2.1 AA compliant, keyboard navigable, screen reader tested

## Components (${all.length} total)

${sections}
`;
}

function generateComponentDoc(c: ComponentDef): string {
  const pagePath = c.category === "ui"
    ? `/components/${c.slug}`
    : c.category === "shell"
    ? `/shell/${c.slug}`
    : `/layouts/${c.slug}`;

  let doc = `# ${c.name}

> ${c.description}

> **[View rendered page](https://design.sunbeam.pt${pagePath}?render=html)** — see the live component with full DOM structure and styling.

## Import
\`\`\`tsx
import { ${c.name} } from "${c.importPath}"
\`\`\`

## Props
${propsTable(c.props)}`;

  if (c.exports.length > 1) {
    doc += `\n\n## Also Exports\n${c.exports.slice(1).map((e) => `- \`${e}\``).join("\n")}`;
  }

  doc += `\n\n---\n*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*\n`;
  return doc;
}

function main() {
  ensureDir(PUBLIC);
  ensureDir(DOCS_DIR);

  const uiComponents = discoverComponents(UI_DIR, "ui", "@sunbeam/beam-ui/components/ui");
  const shellComponents = discoverComponents(SHELL_DIR, "shell", "@sunbeam/beam-ui/components/shell");
  const layoutComponents = discoverComponents(LAYOUT_DIR, "layout", "@sunbeam/beam-ui/components/layouts");
  const all = [...uiComponents, ...shellComponents, ...layoutComponents];

  console.log(`  discovered ${all.length} components (${uiComponents.length} ui, ${shellComponents.length} shell, ${layoutComponents.length} layout)`);

  const llmsTxt = generateLlmsTxt(all);
  writeFileSync(resolve(PUBLIC, "llms.txt"), llmsTxt, "utf-8");
  console.log(`  wrote llms.txt (${llmsTxt.length} bytes)`);

  const llmsFullTxt = generateLlmsFullTxt(all);
  writeFileSync(resolve(PUBLIC, "llms-full.txt"), llmsFullTxt, "utf-8");
  console.log(`  wrote llms-full.txt (${llmsFullTxt.length} bytes)`);

  for (const c of all) {
    const doc = generateComponentDoc(c);
    writeFileSync(resolve(DOCS_DIR, `${c.slug}.md`), doc, "utf-8");
  }
  console.log(`  wrote ${all.length} per-component docs to docs/`);
}

main();
