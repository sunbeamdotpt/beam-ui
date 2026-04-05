/**
 * generate-component-api.ts
 *
 * Reads all captured SVGs, cleans them via clean-svg.ts, and writes
 * static JSON files to app/public/api/ for the Beam Sync Penpot plugin.
 *
 * Output:
 *   public/api/components.json          — component index
 *   public/api/components/{Name}/{Variant}.json — per-variant cleaned data
 *   public/api/validation-report.json   — build validation results
 *
 * Hooked into Vite buildStart() via vite.config.ts.
 */

import { readdirSync, readFileSync, writeFileSync, mkdirSync, statSync } from "fs";
import { join, resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { cleanSvg, type CleanedComponent } from "./clean-svg.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SVG_DIR = resolve(__dirname, "..", "captured-svgs");
const API_DIR = resolve(__dirname, "..", "public", "api");
const COMPONENTS_DIR = resolve(API_DIR, "components");

interface VariantInfo {
  name: string;
  themes: string[];
}

interface ComponentInfo {
  name: string;
  category: string;
  variants: VariantInfo[];
}

interface ValidationResult {
  component: string;
  variant: string;
  theme: string;
  passed: boolean;
  warnings: string[];
  textCount: number;
  svgSize: number;
}

// Categorize components based on source directory
function categorize(componentName: string): string {
  const shellComponents = new Set([
    "Shell", "Header", "Footer", "Sidebar", "RightRail", "Breadcrumbs",
  ]);
  const layoutComponents = new Set([
    "ApiLayout", "DocsLayout", "FullwidthLayout",
  ]);
  if (shellComponents.has(componentName)) return "shell";
  if (layoutComponents.has(componentName)) return "layout";
  return "ui";
}

export async function generateComponentApi() {
  console.log("  generating component API...");

  // Ensure output directories exist
  mkdirSync(API_DIR, { recursive: true });
  mkdirSync(COMPONENTS_DIR, { recursive: true });

  const componentDirs = readdirSync(SVG_DIR)
    .filter((d) => statSync(join(SVG_DIR, d)).isDirectory())
    .sort();

  const components: ComponentInfo[] = [];
  const validationResults: ValidationResult[] = [];
  let totalFiles = 0;
  let totalPassed = 0;

  for (const componentName of componentDirs) {
    const componentDir = join(SVG_DIR, componentName);
    const svgFiles = readdirSync(componentDir).filter((f) => f.endsWith(".svg"));

    // Group by variant (light/dark)
    const variantMap = new Map<string, string[]>();
    for (const file of svgFiles) {
      const isDark = file.endsWith(".dark.svg");
      const variantName = isDark
        ? file.replace(".dark.svg", "")
        : file.replace(".svg", "");
      const theme = isDark ? "dark" : "light";

      if (!variantMap.has(variantName)) variantMap.set(variantName, []);
      variantMap.get(variantName)!.push(theme);
    }

    const variants: VariantInfo[] = [];
    const outDir = join(COMPONENTS_DIR, componentName);
    mkdirSync(outDir, { recursive: true });

    for (const [variantName, themes] of variantMap) {
      variants.push({ name: variantName, themes });

      for (const theme of themes) {
        const suffix = theme === "dark" ? ".dark" : "";
        const svgFile = join(componentDir, `${variantName}${suffix}.svg`);
        const raw = readFileSync(svgFile, "utf-8");
        const cleaned = cleanSvg(raw);

        // Write per-variant JSON
        const jsonFile = join(outDir, `${variantName}${suffix}.json`);
        writeFileSync(jsonFile, JSON.stringify({
          component: componentName,
          variant: variantName,
          theme,
          svg: cleaned.svg,
          texts: cleaned.texts,
          shadows: cleaned.shadows,
          width: cleaned.width,
          height: cleaned.height,
          warnings: cleaned.warnings,
        }), "utf-8");

        // Validation
        const passed = !cleaned.warnings.includes("no-visual-content") &&
          !cleaned.warnings.includes("viewBox-not-normalized");

        validationResults.push({
          component: componentName,
          variant: variantName,
          theme,
          passed,
          warnings: cleaned.warnings,
          textCount: cleaned.texts.length,
          svgSize: cleaned.svg.length,
        });

        totalFiles++;
        if (passed) totalPassed++;
      }
    }

    components.push({
      name: componentName,
      category: categorize(componentName),
      variants,
    });
  }

  // Write component index
  const buildLabel = process.env.BUILD_LABEL || new Date().toISOString();
  writeFileSync(
    join(API_DIR, "components.json"),
    JSON.stringify({ buildLabel, components }, null, 2),
    "utf-8"
  );

  // Write validation report
  const failedResults = validationResults.filter((r) => !r.passed);
  writeFileSync(
    join(API_DIR, "validation-report.json"),
    JSON.stringify({
      total: totalFiles,
      passed: totalPassed,
      failed: totalFiles - totalPassed,
      failures: failedResults,
      warnings: validationResults
        .filter((r) => r.warnings.length > 0)
        .map((r) => ({
          component: r.component,
          variant: r.variant,
          theme: r.theme,
          warnings: r.warnings,
        })),
    }, null, 2),
    "utf-8"
  );

  console.log(`  wrote ${components.length} components, ${totalFiles} variants`);
  console.log(`  validation: ${totalPassed}/${totalFiles} passed`);
  if (failedResults.length > 0) {
    console.log(`  ⚠ ${failedResults.length} failures:`);
    for (const f of failedResults) {
      console.log(`    ${f.component}/${f.variant} [${f.theme}]: ${f.warnings.join(", ")}`);
    }
  }
}

// CLI entry point
if (process.argv[1]?.includes("generate-component-api")) {
  generateComponentApi().catch(console.error);
}
