/**
 * Beam shadow token definitions for native Penpot shadows.
 * These match the design tokens in packages/beam-ui/src/preset.ts.
 */

export const BEAM_SHADOWS: Record<string, Array<{
  color: { color: string; opacity: number };
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  hidden: boolean;
}>> = {
  golden: [
    { color: { color: "#7F6315", opacity: 0.15 }, offsetX: -3, offsetY: 5, blur: 13, spread: 0, hidden: false },
    { color: { color: "#7F6315", opacity: 0.11 }, offsetX: -11, offsetY: 21, blur: 32, spread: 0, hidden: false },
    { color: { color: "#7F6315", opacity: 0.08 }, offsetX: -21, offsetY: 43, blur: 53, spread: 0, hidden: false },
    { color: { color: "#7F6315", opacity: 0.05 }, offsetX: -43, offsetY: 85, blur: 80, spread: 0, hidden: false },
  ],
  nav: [
    { color: { color: "#7F6315", opacity: 0.08 }, offsetX: 0, offsetY: 3, blur: 13, spread: 0, hidden: false },
  ],
  code: [
    { color: { color: "#000000", opacity: 0.5 }, offsetX: 0, offsetY: 7, blur: 20, spread: -7, hidden: false },
  ],
};

/** Apply native Penpot shadows to shapes that have bx-sh_ CSS classes. */
export function applyShadows(
  group: any, // Shape (Penpot types)
  shadows: string[],
  findShapes: (pred: (s: any) => boolean, root: any) => any[],
) {
  for (const token of shadows) {
    const shadowDef = BEAM_SHADOWS[token];
    if (!shadowDef) continue;

    const className = `bx-sh_${token}`;
    const shapes = findShapes(
      (s: any) => s.type === "rectangle" && s.name === "svg-rect",
      group,
    );

    for (const shape of shapes) {
      shape.shadows = shadowDef;
    }
  }
}
