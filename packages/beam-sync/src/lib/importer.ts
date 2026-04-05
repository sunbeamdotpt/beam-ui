/**
 * Orchestrates the full Penpot import pipeline (v7).
 *
 * 1. Import cleaned SVG via createShapeFromSvg
 * 2. Fix fillOpacity on all shapes
 * 3. Apply native Penpot shadows
 * 4. Replace path-text with editable Text
 * 5. Reparent arrows + sleep + align
 */

import { applyShadows } from "./shadows.ts";
import { replaceText, type TextData } from "./text-replacer.ts";
import { alignArrows } from "./arrow-aligner.ts";
import { findShapes, setParentXY } from "./penpot-helpers.ts";

export interface ComponentData {
  component: string;
  variant: string;
  theme: string;
  svg: string;
  texts: TextData[];
  shadows: string[];
  width: number;
  height: number;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function importComponent(
  data: ComponentData,
  penpot: any,
  position: { x: number; y: number } = { x: 0, y: 0 },
): Promise<any> {
  // Step 1: Import cleaned SVG
  const group = penpot.createShapeFromSvg(data.svg);
  if (!group) throw new Error("SVG is invalid or malformed");

  group.name = `${data.component} / ${data.variant}${data.theme === "dark" ? " (dark)" : ""}`;
  group.x = position.x;
  group.y = position.y;

  // Step 2: Fix fillOpacity on ALL shapes
  const allShapes = findShapes(() => true, group);
  for (const s of allShapes) {
    if (s.fills && Array.isArray(s.fills) && s.fills.length > 0) {
      s.fills = s.fills.map((f: any) => ({ ...f, fillOpacity: f.fillOpacity ?? 1 }));
    }
  }

  // Step 3: Apply native Penpot shadows
  if (data.shadows.length > 0) {
    applyShadows(group, data.shadows, findShapes);
  }

  // Step 4: Replace path-text with editable Text
  if (data.texts.length > 0) {
    replaceText(group, data.texts, penpot, findShapes);
  }

  // Step 5: Reparent arrow paths (must happen before sleep)
  const paths = findShapes((s: any) => s.type === "path", group);
  for (const p of paths) {
    if (p.width < 15) group.appendChild(p);
  }

  // Step 6: Sleep to let Penpot process DOM changes
  await sleep(200);

  // Step 7: Align arrows to matching-color text
  alignArrows(group, findShapes, setParentXY);

  // Store sync metadata
  group.setPluginData("beam-sync", JSON.stringify({
    component: data.component,
    variant: data.variant,
    theme: data.theme,
    importedAt: new Date().toISOString(),
  }));

  return group;
}
