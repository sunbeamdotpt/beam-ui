/**
 * Static validation for the Plasmic component registry.
 *
 * Imports the generated registry and checks the invariants we learned the
 * hard way during the integration. Run locally with:
 *   npx tsx scripts/validate-plasmic-registry.ts
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const registry = JSON.parse(
  readFileSync(join(__dirname, "../src/plasmic/components.generated.json"), "utf8"),
) as ComponentMeta[];

const INTERNAL_PROPS = new Set([
  "setControlContextData",
  "plasmicNotifyAutoOpenedContent",
  "plasmicUpdateVariant",
]);

interface PropMeta {
  type: string;
  defaultValue?: unknown;
  required?: boolean;
  advanced?: boolean;
}

interface ComponentMeta {
  name: string;
  displayName?: string;
  importPath?: string;
  importName?: string;
  props?: Record<string, PropMeta>;
}

let hardFailures = 0;
let warnings = 0;

function fail(message: string) {
  console.error(`  ❌ ${message}`);
  hardFailures++;
}

function warn(message: string) {
  console.warn(`  ⚠️  ${message}`);
  warnings++;
}

function stringify(value: unknown): string {
  return JSON.stringify(value);
}

function checkDefaultValue(componentName: string, propName: string, value: unknown) {
  const str = stringify(value);
  for (const internal of INTERNAL_PROPS) {
    if (str.includes(internal)) {
      fail(`${componentName}.${propName}: defaultValue leaks internal prop "${internal}"`);
    }
  }
  if (str.includes('"inherit"') || str.includes("'inherit'")) {
    fail(`${componentName}.${propName}: defaultValue uses invalid font "inherit"`);
  }
}

console.log(`Validating ${registry.length} registered components...\n`);

for (const meta of registry) {
  const label = meta.displayName ?? meta.name ?? "(unnamed)";

  if (!meta.name || typeof meta.name !== "string") {
    fail(`${label}: missing component name`);
  }
  if (!meta.importPath || typeof meta.importPath !== "string") {
    fail(`${label}: missing importPath (codegen will break)`);
  }
  if (!meta.importName || typeof meta.importName !== "string") {
    fail(`${label}: missing importName (codegen will break)`);
  }
  if (!meta.props || typeof meta.props !== "object") {
    fail(`${label}: missing props metadata`);
    continue;
  }

  for (const [propName, prop] of Object.entries(meta.props)) {
    if (INTERNAL_PROPS.has(propName)) {
      fail(`${label}: prop "${propName}" should not be exposed in registration metadata`);
    }

    if (prop.type === "slot") {
      if (prop.defaultValue === undefined) {
        fail(`${label}.${propName}: slot has no defaultValue (will render 0×0 in Studio)`);
      } else {
        checkDefaultValue(label, propName, prop.defaultValue);
      }
    } else if (prop.required && prop.defaultValue === undefined && !prop.advanced) {
      warn(`${label}.${propName}: required prop has no defaultValue — component will need sample data or a Studio template`);
    } else if (prop.defaultValue !== undefined) {
      checkDefaultValue(label, propName, prop.defaultValue);
    }
  }
}

console.log("\n" + (hardFailures === 0 ? "✅ Registry passed hard invariants." : `❌ ${hardFailures} hard failure(s).`));
if (warnings > 0) {
  console.log(`⚠️  ${warnings} warning(s) — components that still need curated sample data.`);
}

process.exit(hardFailures > 0 ? 1 : 0);
