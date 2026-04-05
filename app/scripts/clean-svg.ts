/**
 * clean-svg.ts
 *
 * Cleans dom-to-svg captured SVGs for Penpot import compatibility.
 * Strips scaffolding, normalizes coordinates, extracts text metadata,
 * detects shadow tokens, and validates output.
 *
 * Used by:
 *   - generate-component-api.ts (build-time API generation)
 *   - Beam Sync Penpot plugin (runtime import)
 */

/* ─── Types ───────────────────────────────────────────────────────────── */

export interface TspanElement {
  text: string;
  x: number;
  y: number;
  fill?: string;
}

export interface TextElement {
  text: string;
  x: number;
  y: number;
  fill: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  letterSpacing: string;
  tspans?: TspanElement[];
}

export interface CleanedComponent {
  svg: string;
  texts: TextElement[];
  shadows: string[];
  width: number;
  height: number;
  warnings: string[];
}

/* ─── Helpers ─────────────────────────────────────────────────────────── */

function rgbToHex(r: number, g: number, b: number): string {
  return `#${r.toString(16).padStart(2, "0").toUpperCase()}${g.toString(16).padStart(2, "0").toUpperCase()}${b.toString(16).padStart(2, "0").toUpperCase()}`;
}

function getAttr(attrs: string, name: string, defaultVal = ""): string {
  const match = attrs.match(new RegExp(`${name}="([^"]+)"`));
  return match ? match[1] : defaultVal;
}

/* ─── Main Cleaning Function ──────────────────────────────────────────── */

export function cleanSvg(rawSvg: string): CleanedComponent {
  const warnings: string[] = [];
  let svg = rawSvg;

  // Step 1: Parse viewBox offset
  const vbMatch = svg.match(/viewBox="([-\d.]+)\s+([-\d.]+)\s+([\d.]+)\s+([\d.]+)"/);
  if (!vbMatch) {
    return { svg: rawSvg, texts: [], shadows: [], width: 0, height: 0, warnings: ["No viewBox found"] };
  }
  const ox = parseFloat(vbMatch[1]);
  const oy = parseFloat(vbMatch[2]);
  const vbW = parseFloat(vbMatch[3]);
  const vbH = parseFloat(vbMatch[4]);

  // Step 2: Normalize coordinates (shift to 0,0 origin)
  svg = svg.replace(
    /\b(x|y|x1|y1|x2|y2|cx|cy)="([-\d.]+)"/g,
    (match, attr: string, val: string) => {
      const v = parseFloat(val);
      if (["x", "x1", "x2", "cx"].includes(attr)) return `${attr}="${v - ox}"`;
      if (["y", "y1", "y2", "cy"].includes(attr)) return `${attr}="${v - oy}"`;
      return match;
    }
  );

  // Shift transform matrix translations
  svg = svg.replace(
    /transform="matrix\(([^)]+)\)"/g,
    (match, inner: string) => {
      const parts = inner.split(/\s+/);
      if (parts.length === 6) {
        parts[4] = String(parseFloat(parts[4]) - ox);
        parts[5] = String(parseFloat(parts[5]) - oy);
        return `transform="matrix(${parts.join(" ")})"`;
      }
      return match;
    }
  );

  svg = svg.replace(/viewBox="[^"]*"/, `viewBox="0 0 ${vbW} ${vbH}"`);

  // Step 3: Strip @font-face
  svg = svg.replace(/@font-face\s*\{[^}]+\}/g, "");

  // Step 4: Remove HTML comments
  svg = svg.replace(/<!--.*?-->/gs, "");

  // Step 5: Remove empty <style> blocks
  svg = svg.replace(/<style>\s*<\/style>/g, "");

  // Step 6: Strip <filter> defs but preserve gradients
  svg = svg.replace(/<filter[^>]*>[\s\S]*?<\/filter>/g, "");
  svg = svg.replace(/<defs>\s*<\/defs>/g, "");

  // Step 7: Remove filter="url(#...)" references
  svg = svg.replace(/\s*filter="url\([^)]+\)"/g, "");

  // Step 8: Flatten masks
  svg = svg.replace(/<mask[^>]*>[\s\S]*?<\/mask>/g, "");
  svg = svg.replace(/\s*mask="url\([^)]+\)"/g, "");

  // Step 9: Remove empty <g data-stacking-layer> elements
  svg = svg.replace(/<g data-stacking-layer="[^"]*"\s*\/>/g, "");

  // Step 10: Collapse empty <g> elements
  for (let i = 0; i < 15; i++) {
    const prev = svg;
    svg = svg.replace(/<g[^>]*>\s*<\/g>/g, "");
    if (svg === prev) break;
  }

  // Step 11: Remove dom-to-svg metadata attributes
  for (const attr of [
    "data-stacking-layer", "data-stacking-context", "data-z-index",
    "data-tag", "aria-owns", "role", "aria-level", "aria-hidden",
    "data-view-box", "data-width", "data-height",
  ]) {
    svg = svg.replace(new RegExp(`\\s*${attr}="[^"]*"`, "g"), "");
  }

  // Step 12: Remove redundant text attributes
  for (const attr of [
    "dominant-baseline", "font-size-adjust", "font-stretch", "font-variant",
    "text-rendering", "unicode-bidi", "word-spacing", "writing-mode", "user-select",
    "text-anchor", "direction", "text-decoration", "font-style",
    "textLength", "lengthAdjust", "xml:space",
  ]) {
    svg = svg.replace(new RegExp(`\\s*${attr}="[^"]*"`, "g"), "");
  }

  // Step 13: Remove standalone color= (not flood-color)
  svg = svg.replace(/\s+color="[^"]*"/g, "");

  // Step 14: Clean &quot; to single quotes
  svg = svg.replace(/&quot;/g, "'");

  // Step 15: Convert rgb() to hex
  svg = svg.replace(
    /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g,
    (_, r, g, b) => rgbToHex(parseInt(r), parseInt(g), parseInt(b))
  );

  // Step 16: Final cleanup
  for (let i = 0; i < 10; i++) {
    const prev = svg;
    svg = svg.replace(/<g>\s*<\/g>/g, "");
    svg = svg.replace(/<g[^>]*>\s*<\/g>/g, "");
    if (svg === prev) break;
  }
  svg = svg.replace(/\n\s*\n+/g, "\n");
  svg = svg.replace(/ {2,}/g, " ");
  svg = svg.trim();

  // ── Extract text metadata ──
  const texts: TextElement[] = [];
  const textRegex = /<text ([^>]*)>([\s\S]*?)<\/text>/g;
  let textMatch;

  while ((textMatch = textRegex.exec(svg)) !== null) {
    const attrs = textMatch[1];
    const content = textMatch[2];

    const tspanRegex = /<tspan[^>]*x="([^"]+)"[^>]*y="([^"]+)"[^>]*>([^<]*)<\/tspan>/g;
    const tspans: TspanElement[] = [];
    let tspanMatch;

    while ((tspanMatch = tspanRegex.exec(content)) !== null) {
      const tspanText = tspanMatch[3].trim();
      if (!tspanText) continue;

      const tspanFull = content.slice(
        content.lastIndexOf("<tspan", tspanMatch.index),
        tspanMatch.index + tspanMatch[0].length
      );
      const tspanFill = tspanFull.match(/fill="([^"]+)"/)?.[1];

      tspans.push({
        text: tspanText,
        x: parseFloat(tspanMatch[1]),
        y: parseFloat(tspanMatch[2]),
        ...(tspanFill ? { fill: tspanFill } : {}),
      });
    }

    if (tspans.length === 0) continue;

    const rawFontFamily = getAttr(attrs, "font-family", "Ysabeau Infant");
    const fontFamily = rawFontFamily.includes("Monaspace")
      ? "Monaspace Argon"
      : "Ysabeau Infant";

    const fill = getAttr(attrs, "fill", "#1F1F1F");
    const fontSize = getAttr(attrs, "font-size", "14px").replace("px", "");
    const fontWeight = getAttr(attrs, "font-weight", "400");
    const letterSpacing = getAttr(attrs, "letter-spacing", "0").replace("px", "");

    const isMultiline = tspans.length > 1;
    const fullText = tspans.map((t) => t.text).join(isMultiline ? "\n" : " ");

    texts.push({
      text: fullText,
      x: tspans[0].x,
      y: tspans[0].y,
      fill,
      fontFamily,
      fontSize,
      fontWeight,
      letterSpacing: letterSpacing === "normal" ? "0" : letterSpacing,
      ...(isMultiline ? { tspans } : {}),
    });
  }

  // ── Detect shadow classes ──
  const shadows: string[] = [];
  if (/bx-sh_golden/.test(svg)) shadows.push("golden");
  if (/bx-sh_nav/.test(svg)) shadows.push("nav");
  if (/bx-sh_code/.test(svg)) shadows.push("code");

  // ── Detect edge cases ──
  if (/xlink:href="https?:/.test(svg)) warnings.push("external-image");
  if (/<linearGradient|<radialGradient/.test(svg)) warnings.push("has-gradients");

  // ── Validate ──
  if (!/<rect |<path |<circle |<ellipse |<text /.test(svg)) {
    warnings.push("no-visual-content");
  }
  if (!svg.match(/viewBox="0 0 /)) {
    warnings.push("viewBox-not-normalized");
  }

  return { svg, texts, shadows, width: vbW, height: vbH, warnings };
}
