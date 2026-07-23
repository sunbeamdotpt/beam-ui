# parseDiff

> Single line in a diff hunk. */
export interface DiffLine {
  /** Type of change: "add" (new), "remove" (deleted), or "context" (unchanged). */
  type: "add" | "remove" | "context";
  /** The text content of the line (without leading +/- prefix). */
  content: string;
  /** Line number in the old file (for remove or context lines). */
  oldLineNumber?: number;
  /** Line number in the new file (for add or context lines). */
  newLineNumber?: number;
}

/** Single hunk (contiguous block of changes) in a unified diff. */
export interface DiffHunk {
  /** The hunk header line from the diff (e.g., `@@ -10,5 +12,6 @@`). */
  header: string;
  /** Array of diff lines in this hunk. */
  lines: DiffLine[];
}

/** Props for {@link DiffViewer}. */
export interface DiffViewerProps {
  /** Array of hunks to display. */
  hunks: DiffHunk[];
  /** Optional old file name (shown in unified mode or when different from newFileName). */
  oldFileName?: string;
  /** Optional new file name (shown in all modes). */
  newFileName?: string;
  /** Render mode: "unified" (single column) or "split" (side-by-side). Defaults to `"unified"`. */
  mode?: "unified" | "split";
  /** Extra CSS class names to apply to the root container. */
  className?: string;
}

/* ------------------------------------------------------------------ */
/* parseDiff utility                                                    */
/* ------------------------------------------------------------------ */

/** Parse unified diff text into hunks and lines. * @param diffText - Raw unified diff output (e.g., from `git diff` or `git show`). @returns Array of DiffHunk objects. * @example ```ts const hunks = parseDiff(unifiedDiffText); ```

> **[View rendered page](https://design.sunbeam.pt/components/diff-viewer?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { parseDiff } from "@sunbeam/beam-ui/components/ui/diff-viewer"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| hunks | `DiffHunk[]` | Yes | Array of hunks to display. |
| oldFileName | `string` | No | Optional old file name (shown in unified mode or when different from newFileName). |
| newFileName | `string` | No | Optional new file name (shown in all modes). |
| mode | `"unified" | "split"` | No | Render mode: "unified" (single column) or "split" (side-by-side). Defaults to `"unified"`. |
| className | `string` | No | Extra CSS class names to apply to the root container. |

## Also Exports
- `DiffViewer`

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
