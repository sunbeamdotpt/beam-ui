/**
 * Penpot helper utilities — replaces penpotUtils from MCP context.
 * The plugin sandbox only has `penpot`, not `penpotUtils`.
 */

/** Recursively find all shapes matching a predicate under a root shape. */
export function findShapes(predicate: (shape: any) => boolean, root: any): any[] {
  const results: any[] = [];
  function walk(shape: any) {
    if (predicate(shape)) results.push(shape);
    if (shape.children) {
      for (const child of shape.children) {
        walk(child);
      }
    }
  }
  if (root.children) {
    for (const child of root.children) {
      walk(child);
    }
  }
  return results;
}

/** Set shape position relative to its parent. */
export function setParentXY(shape: any, parentX: number, parentY: number) {
  const parent = shape.parent;
  if (parent) {
    shape.x = parent.x + parentX;
    shape.y = parent.y + parentY;
  }
}
