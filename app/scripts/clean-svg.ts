/**
 * clean-svg.ts
 *
 * Cleans dom-to-svg captured SVGs for Penpot import compatibility.
 * Uses linkedom for proper DOM manipulation instead of regex on XML.
 */

import { parseHTML } from "linkedom";

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
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0").toUpperCase()).join("")}`;
}

function convertRgbColors(value: string): string {
  return value.replace(
    /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/g,
    (_, r, g, b) => rgbToHex(parseInt(r), parseInt(g), parseInt(b)),
  );
}

/* ─── Main Cleaning Function ──────────────────────────────────────────── */

export function cleanSvg(rawSvg: string): CleanedComponent {
  const warnings: string[] = [];

  // Pre-clean: remove comments and @font-face (easier as string before DOM parsing)
  let preCleaned = rawSvg;
  preCleaned = preCleaned.replace(/<!--.*?-->/gs, "");
  preCleaned = preCleaned.replace(/@font-face\s*\{[^}]+\}/g, "");

  // Parse into DOM
  const { document } = parseHTML(`<!DOCTYPE html><html><body>${preCleaned}</body></html>`);
  const svg = document.querySelector("svg");
  if (!svg) {
    return { svg: rawSvg, texts: [], shadows: [], width: 0, height: 0, warnings: ["No SVG element found"] };
  }

  // ── Parse and normalize viewBox ──
  const viewBox = svg.getAttribute("viewBox") || "0 0 0 0";
  const [oxStr, oyStr, wStr, hStr] = viewBox.split(/\s+/);
  const ox = parseFloat(oxStr);
  const oy = parseFloat(oyStr);
  const vbW = parseFloat(wStr);
  const vbH = parseFloat(hStr);

  // ── Collect shadow class info before stripping ──
  const shadows: string[] = [];
  const allElements = svg.querySelectorAll("*");
  for (const el of allElements) {
    const cls = el.getAttribute("class") || "";
    if (cls.includes("bx-sh_golden") && !shadows.includes("golden")) shadows.push("golden");
    if (cls.includes("bx-sh_nav") && !shadows.includes("nav")) shadows.push("nav");
    if (cls.includes("bx-sh_code") && !shadows.includes("code")) shadows.push("code");
  }

  // ── Detect edge cases ──
  for (const el of allElements) {
    const href = el.getAttribute("xlink:href") || el.getAttribute("href") || "";
    if (href.startsWith("http")) { warnings.push("external-image"); break; }
  }
  if (svg.querySelector("linearGradient, radialGradient")) {
    warnings.push("has-gradients");
  }

  // ── Extract text metadata BEFORE stripping ──
  const texts: TextElement[] = [];
  for (const textEl of svg.querySelectorAll("text")) {
    const tspanEls = textEl.querySelectorAll("tspan");
    if (tspanEls.length === 0) continue;

    const tspans: TspanElement[] = [];
    for (const tspan of tspanEls) {
      const text = (tspan.textContent || "").trim();
      if (!text) continue;
      const x = parseFloat(tspan.getAttribute("x") || "0") - ox;
      const y = parseFloat(tspan.getAttribute("y") || "0") - oy;
      const fill = tspan.getAttribute("fill") || undefined;
      tspans.push({ text, x, y, ...(fill ? { fill: convertRgbColors(fill) } : {}) });
    }

    if (tspans.length === 0) continue;

    const rawFontFamily = textEl.getAttribute("font-family") || "Ysabeau Infant";
    const fontFamily = rawFontFamily.includes("Monaspace") ? "Monaspace Argon" : "Ysabeau Infant";
    const fill = convertRgbColors(textEl.getAttribute("fill") || "#1F1F1F");
    const fontSize = (textEl.getAttribute("font-size") || "14px").replace("px", "");
    const fontWeight = textEl.getAttribute("font-weight") || "400";
    let letterSpacing = (textEl.getAttribute("letter-spacing") || "0").replace("px", "");
    if (letterSpacing === "normal") letterSpacing = "0";

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
      letterSpacing,
      ...(isMultiline ? { tspans } : {}),
    });
  }

  // ── Remove elements ──

  // Remove all <style> elements (font-face blocks)
  for (const el of svg.querySelectorAll("style")) el.remove();

  // Remove all <filter> elements (Penpot can't render them)
  for (const el of svg.querySelectorAll("filter")) el.remove();

  // Remove all <mask> elements
  for (const el of svg.querySelectorAll("mask")) el.remove();

  // Remove empty <defs>
  for (const el of svg.querySelectorAll("defs")) {
    if (el.children.length === 0) el.remove();
  }

  // ── Strip attributes ──

  const metadataAttrs = [
    "data-stacking-layer", "data-stacking-context", "data-z-index",
    "data-tag", "aria-owns", "role", "aria-level", "aria-hidden",
    "data-view-box", "data-width", "data-height",
  ];

  const redundantTextAttrs = [
    "dominant-baseline", "font-size-adjust", "font-stretch", "font-variant",
    "text-rendering", "unicode-bidi", "word-spacing", "writing-mode", "user-select",
    "text-anchor", "direction", "text-decoration", "font-style",
    "textLength", "lengthAdjust", "xml:space",
  ];

  // Process ALL elements including the SVG root
  const elementsToProcess = [svg, ...svg.querySelectorAll("*")];
  for (const el of elementsToProcess) {
    // Remove metadata attributes
    for (const attr of metadataAttrs) el.removeAttribute(attr);

    // Remove redundant text attributes
    for (const attr of redundantTextAttrs) el.removeAttribute(attr);

    // Remove filter references
    if (el.getAttribute("filter")?.startsWith("url(")) el.removeAttribute("filter");

    // Remove mask references
    if (el.getAttribute("mask")?.startsWith("url(")) el.removeAttribute("mask");

    // Remove standalone color attribute (not on feDropShadow etc.)
    if (el.tagName !== "feDropShadow" && el.hasAttribute("color")) el.removeAttribute("color");

    // Convert rgb() fills/strokes to hex
    for (const attr of ["fill", "stroke"]) {
      const val = el.getAttribute(attr);
      if (val?.startsWith("rgb(")) el.setAttribute(attr, convertRgbColors(val));
    }

    // Clean font-family quotes
    const ff = el.getAttribute("font-family");
    if (ff) el.setAttribute("font-family", ff.replace(/&quot;/g, "'"));
  }

  // ── Shift coordinates to normalize viewBox ──

  // Shift x/y attributes on positioned elements
  for (const el of svg.querySelectorAll("*")) {
    for (const attr of ["x", "y", "x1", "y1", "x2", "y2", "cx", "cy"]) {
      const val = el.getAttribute(attr);
      if (val === null) continue;
      const num = parseFloat(val);
      if (isNaN(num)) continue;
      const offset = ["x", "x1", "x2", "cx"].includes(attr) ? ox : oy;
      el.setAttribute(attr, String(num - offset));
    }

    // Shift transform matrix translations
    const transform = el.getAttribute("transform");
    if (transform?.startsWith("matrix(")) {
      const inner = transform.slice(7, -1);
      const parts = inner.split(/[\s,]+/);
      if (parts.length === 6) {
        parts[4] = String(parseFloat(parts[4]) - ox);
        parts[5] = String(parseFloat(parts[5]) - oy);
        el.setAttribute("transform", `matrix(${parts.join(" ")})`);
      }
    }
  }

  // Update viewBox
  svg.setAttribute("viewBox", `0 0 ${vbW} ${vbH}`);

  // ── Collapse empty groups ──
  for (let i = 0; i < 15; i++) {
    let removed = false;
    for (const g of svg.querySelectorAll("g")) {
      if (g.children.length === 0 && !g.textContent?.trim()) {
        g.remove();
        removed = true;
      }
    }
    if (!removed) break;
  }

  // ── Serialize ──
  const output = svg.outerHTML;

  // ── Validate ──
  if (!svg.querySelector("rect, path, circle, ellipse, text, line")) {
    warnings.push("no-visual-content");
  }

  return {
    svg: output,
    texts,
    shadows,
    width: vbW,
    height: vbH,
    warnings,
  };
}
