/**
 * Generates app/src/plasmic/components.generated.tsx — Plasmic Studio
 * component registrations for beam-ui, derived from prop metadata extracted
 * with react-docgen-typescript.
 *
 * Discovery: packages/beam-ui/src/components/{ui,shell,layouts}/*.tsx
 * (stories excluded). Heavy-dependency components are registered through
 * React.lazy wrappers with importPath set to their @sunbeam/beam-ui subpath,
 * so the host page code-splits them and Plasmic codegen imports the same
 * subpaths (design-language rule: heavy deps never leak into the root entry).
 *
 * Hand-curated adjustments live in src/plasmic/registry.overrides.tsx.
 * See docs/plasmic-app-host-scope.md §4 for the triage rules.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import { parse, type PropItem } from "react-docgen-typescript";
import { overrides, skipComponents, type ComponentOverride } from "../src/plasmic/registry.overrides";

const SRC = new URL("../../packages/beam-ui/src/components/", import.meta.url).pathname;

/** Apply registry.overrides.tsx adjustments at generation time so we can also
 * emit a JSON sidecar of the final metadata for static validation. */
function applyOverride(name: string, meta: Record<string, unknown>): Record<string, unknown> {
  const o = overrides[name];
  if (!o) return meta;
  const props: Record<string, unknown> = { ...(meta.props as Record<string, unknown> ?? {}) };
  for (const [k, v] of Object.entries(o.props ?? {})) {
    if (v === null) delete props[k];
    else props[k] = { ...(props[k] as Record<string, unknown> ?? {}), ...v };
  }
  return {
    ...meta,
    displayName: o.displayName ?? meta.displayName,
    description: o.description ?? meta.description,
    props,
  };
}
const ROOT_IMPORT = "@sunbeam/beam-ui";

/** component file → package subpath (heavy deps, lazy-registered). */
const HEAVY_SUBPATHS: Record<string, string> = {
  "charts.tsx": `${ROOT_IMPORT}/charts`,
  "code-editor.tsx": `${ROOT_IMPORT}/code-editor`,
  "diagram-renderer.tsx": `${ROOT_IMPORT}/diagram`,
  "math-renderer.tsx": `${ROOT_IMPORT}/math`,
  "kanban-board.tsx": `${ROOT_IMPORT}/kanban`,
  "kanban-card-detail.tsx": `${ROOT_IMPORT}/kanban`,
  "markdown-renderer.tsx": `${ROOT_IMPORT}/markdown`,
  "markdown-editor.tsx": `${ROOT_IMPORT}/markdown`,
  "syntax-highlighter.tsx": `${ROOT_IMPORT}/syntax-highlighter`,
};

/** Files never registered (scope doc §4: internal/dev-only surfaces). */
const SKIP_FILES = new Set(["scroll-area.tsx"]);

/** Props never exposed in Studio. Includes the design-language navigation
 * props (linkAs/currentPath/onNavigate/isActive) — framework-coupled by
 * design; Studio-friendly href wrappers are a later curation (scope doc §4). */
const SKIP_PROPS = new Set([
  "as", "className", "css", "style", "ref", "key",
  "linkAs", "currentPath", "onNavigate", "isActive",
]);

interface PropMeta {
  type: string;
  options?: (string | number)[];
  defaultValue?: unknown;
  required?: boolean;
  description?: string;
  advanced?: boolean;
}

interface ComponentMeta {
  name: string;
  file: string;
  importPath: string;
  props: Record<string, PropMeta>;
  unmapped: string[];
}

function mapProp(name: string, prop: PropItem): PropMeta | null {
  if (SKIP_PROPS.has(name) || /^(aria-|data-)/.test(name)) return null;
  const t = prop.type as { name: string; raw?: string; value?: { value: string | number }[] };
  // Event handlers (func types + the onX convention) stay hidden in the
  // skeleton; Studio interaction wiring is a later curation.
  if (t.name === "func" || t.raw?.includes("=>") || /^on[A-Z]/.test(name)) return null;

  const meta: PropMeta = { type: "" };
  if (prop.required) meta.required = true;
  if (prop.description) meta.description = prop.description.split("\n")[0];

  if (name === "children") {
    meta.type = "slot";
    return meta;
  }

  if (t.name === "enum" && Array.isArray(t.value)) {
    const values = t.value.map((v) => v.value);
    const strings = values.filter((v): v is string => typeof v === "string");
    // ReactNode union (contains ReactElement) → slot
    if (values.some((v) => String(v).includes("ReactElement"))) {
      meta.type = "slot";
      return meta;
    }
    // boolean union → boolean
    if (values.every((v) => v === "false" || v === "true")) {
      meta.type = "boolean";
      if (prop.defaultValue) meta.defaultValue = prop.defaultValue.value;
      return meta;
    }
    // string-literal union → choice
    const quoted = strings.filter((v) => v.startsWith('"') && v.endsWith('"'));
    if (quoted.length > 0 && quoted.length === strings.length) {
      meta.type = "choice";
      meta.options = quoted.map((v) => v.slice(1, -1));
      if (prop.defaultValue) {
        const dv = String(prop.defaultValue.value).replace(/^"|"$/g, "");
        meta.defaultValue = dv;
      }
      return meta;
    }
    return null; // other unions: unmapped
  }

  if (t.name === "string" || t.name === "number") {
    meta.type = t.name;
    if (prop.defaultValue) meta.defaultValue = prop.defaultValue.value;
    return meta;
  }

  // Structured data (arrays/objects/mixed unions): expose as an advanced
  // JSON control so data-driven components stay usable in Studio.
  meta.type = "object";
  meta.advanced = true;
  return meta;
}

function discover(): { file: string; path: string }[] {
  const dirs = ["ui", "shell", "layouts"];
  const out: { file: string; path: string }[] = [];
  for (const dir of dirs) {
    for (const f of readdirSync(join(SRC, dir))) {
      if (!f.endsWith(".tsx") || f.endsWith(".story.tsx") || SKIP_FILES.has(f)) continue;
      out.push({ file: f, path: join(SRC, dir, f) });
    }
  }
  return out.sort((a, b) => a.file.localeCompare(b.file));
}

const components: ComponentMeta[] = [];
let totalUnmapped = 0;

for (const { file, path } of discover()) {
  let docs;
  try {
    docs = parse(path, {
      shouldExtractLiteralValuesFromEnum: true,
      shouldExtractValuesFromUnion: true,
      savePropValueAsString: true,
      propFilter: (prop) => {
        if (prop.name === "children") return true;
        if (prop.declarations?.length) {
          return !prop.declarations.every((d) => d.fileName.includes("node_modules"));
        }
        return true;
      },
    });
  } catch (e) {
    console.warn(`  ⚠ docgen failed for ${file}: ${(e as Error).message}`);
    continue;
  }
  const acceptsPolymorphicChildren =
    /ComponentPropsWith(?:out)?Ref|PropsWithChildren/.test(readFileSync(path, "utf8"));
  for (const doc of docs) {
    const name = doc.displayName;
    if (!name || !/^[A-Z]/.test(name) || skipComponents.includes(name)) continue;
    const props: Record<string, PropMeta> = {};
    const unmapped: string[] = [];
    for (const [propName, prop] of Object.entries(doc.props)) {
      const meta = mapProp(propName, prop);
      if (meta) {
        props[propName] = meta;
        if (meta.type === "object") unmapped.push(propName);
      }
    }
    totalUnmapped += unmapped.length;
    // Polymorphic components spread generic ComponentPropsWithoutRef<T>,
    // which docgen cannot resolve — children vanishes from the prop list.
    // If the source uses the spread and docgen found no children, inject
    // the slot manually.
    if (!props.children && acceptsPolymorphicChildren) {
      props.children = { type: "slot" };
    }
    // Slots with no default content render as empty 0×0 boxes on the Studio
    // canvas — give the children slot a text placeholder so instances are
    // visible and hug-sized out of the gate (curate richer defaults per
    // component in registry.overrides.tsx).
    //
    // defaultValue must be a PlasmicElement SCHEMA (JSON), not JSX — JSX
    // hard-errors Studio's registry ingest. A bare string becomes a text
    // node with NO typography of its own, which inherits from the artboard
    // root; canvas-overrides.css asserts Beam body typography there, so
    // slot text comes out in Beam fonts. (Do NOT set styles like
    // fontFamily: "inherit" on the schema — Studio's font checker treats
    // "inherit" as a literal font name and warns it "is not available".)
    if (props.children?.type === "slot" && props.children.defaultValue === undefined) {
      props.children.defaultValue = {
        type: "text",
        tag: "span",
        value: name,
      };
    }
    components.push({ name, file, importPath: HEAVY_SUBPATHS[file] ?? ROOT_IMPORT, props, unmapped });
  }
}

const heavy = components.filter((c) => c.importPath !== ROOT_IMPORT);
const root = components.filter((c) => c.importPath === ROOT_IMPORT);

const lines: string[] = [
  `// AUTO-GENERATED by scripts/generate-plasmic-registry.ts — do not edit.`,
  `// Regenerated on every dev/build start (see vite.config.ts).`,
  `// Hand-curated adjustments: ./registry.overrides.tsx`,
  `import { lazy, Suspense, type ComponentType, type ReactNode } from "react";`,
  `import { registerComponent } from "@plasmicapp/react-web/lib/host";`,
  `import {`,
  ...root.map((c) => `  ${c.name},`),
  `} from "${ROOT_IMPORT}";`,
  ``,
  ...heavy.map((c) =>
    `const ${c.name}Lazy = lazy(() => import("${c.importPath}").then((m) => ({ default: m.${c.name} as ComponentType<any> })));`
  ),
  ``,
  `function withSuspense(Lazy: ComponentType<any>): ComponentType<any> {`,
  `  return function PlasmicSuspenseHost(props: Record<string, unknown>) {`,
  `    return <Suspense fallback={null}><Lazy {...props} /></Suspense>;`,
  `  };`,
  `}`,
  ``,
  `// Plasmic's canvas proxy injects its own internal props into code`,
  `// components; our components spread unknown props onto DOM elements,`,
  `// which triggers React unknown-prop warnings in dev. Strip them here.`,
  `const PLASMIC_INTERNAL_PROPS = new Set([`,
  `  "setControlContextData",`,
  `  "plasmicNotifyAutoOpenedContent",`,
  `  "plasmicUpdateVariant",`,
  `]);`,
  `function withSanitizedProps(Component: ComponentType<any>): ComponentType<any> {`,
  `  return function PlasmicSanitizedHost(props: Record<string, unknown>) {`,
  `    const clean = { ...props };`,
  `    for (const k of PLASMIC_INTERNAL_PROPS) delete clean[k];`,
  `    return <Component {...clean} />;`,
  `  };`,
  `}`,
  ``,
  ...heavy.map((c) => `const ${c.name}Host = withSuspense(${c.name}Lazy);`),
  ``,
  `export function registerBeamComponents(): void {`,
];

const finalMetas: Record<string, unknown>[] = [];

for (const c of components) {
  const ref = c.importPath === ROOT_IMPORT ? c.name : `${c.name}Host`;
  const meta: Record<string, unknown> = {
    name: `Beam${c.name}`,
    displayName: `Beam / ${c.name}`,
    importPath: c.importPath,
    importName: c.name,
    props: c.props,
  };
  const finalMeta = applyOverride(c.name, meta);
  finalMetas.push(finalMeta);
  const varName = `metaBeam${c.name}`;
  lines.push(`  const ${varName} = withOverride(${JSON.stringify(c.name)}, ${JSON.stringify(meta, null, 2)});`);
  lines.push(`  beamComponentRegistry.push(${varName});`);
  lines.push(`  registerComponent(withSanitizedProps(${ref}), ${varName});`);
}

lines.push(`}`);
lines.push(``);
lines.push(`// Overrides are applied at runtime so registry.overrides.tsx can use JSX.`);
lines.push(`import { overrides, type ComponentOverride } from "./registry.overrides";`);
lines.push(`export const beamComponentRegistry: Record<string, unknown>[] = [];`);
lines.push(`function withOverride(name: string, meta: Record<string, unknown>): any {`);
lines.push(`  const o: ComponentOverride | undefined = overrides[name];`);
lines.push(`  if (!o) return meta;`);
lines.push(`  const props = { ...(meta.props as Record<string, unknown>) };`);
lines.push(`  for (const [k, v] of Object.entries(o.props ?? {})) {`);
lines.push(`    if (v === null) delete props[k];`);
lines.push(`    else props[k] = { ...(props[k] as Record<string, unknown> ?? {}), ...v };`);
lines.push(`  }`);
lines.push(`  return { ...meta, displayName: o.displayName ?? meta.displayName, description: o.description ?? meta.description, props };`);
lines.push(`}`);
lines.push(``);

writeFileSync(new URL("../src/plasmic/components.generated.tsx", import.meta.url), lines.join("\n"));
writeFileSync(
  new URL("../src/plasmic/components.generated.json", import.meta.url),
  JSON.stringify(finalMetas, null, 2),
);
const skippedNote = skipComponents.length ? `, skipped: ${skipComponents.join(", ")}` : "";
console.log(`  wrote components.generated.tsx (${components.length} components: ${root.length} root, ${heavy.length} lazy${skippedNote})`);
console.log(`  wrote components.generated.json (${finalMetas.length} metadata entries)`);
if (totalUnmapped > 0) {
  console.log(`  ${totalUnmapped} data props exposed as advanced JSON controls:`);
}
for (const c of components.filter((c) => c.unmapped.length > 0)) {
  console.log(`    ${c.name}: ${c.unmapped.join(", ")}`);
}
