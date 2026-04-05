/**
 * Aligns small CTA arrow paths to their matching text by fill color.
 * Must run AFTER text replacement and a 200ms sleep.
 */

export function alignArrows(
  group: any, // Penpot Group shape
  findShapes: (pred: (s: any) => boolean, root: any) => any[],
  setParentXY: (shape: any, x: number, y: number) => void,
) {
  const paths = findShapes((s: any) => s.type === "path", group);
  const texts = findShapes((s: any) => s.type === "text", group);

  for (const p of paths) {
    if (p.width < 15) {
      // Reparent to top level to break free of SVG group transforms
      group.appendChild(p);

      // Match by fill color
      const pathFill = p.fills?.[0]?.fillColor?.toUpperCase();
      const matchingText = texts.find((t: any) => {
        const textFill = Array.isArray(t.fills)
          ? t.fills[0]?.fillColor?.toUpperCase()
          : null;
        return textFill === pathFill;
      });

      if (matchingText) {
        const targetX = (matchingText.x - group.x) + matchingText.width + 8;
        const targetY = (matchingText.y - group.y) + (matchingText.height - p.height) / 2;
        setParentXY(p, targetX, targetY);
      }
    }
  }
}
