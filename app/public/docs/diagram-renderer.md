# DiagramRenderer

> Props for {@link DiagramRenderer}. */
export interface DiagramRendererProps {
  /** Mermaid diagram syntax (flowchart, sequence, gantt, etc.). */
  code: string;
  /** Extra CSS class names to apply to the container. */
  className?: string;
}

/** Mermaid diagram renderer with Beam-themed dark and light modes. * Lazily loads the mermaid library and renders diagram code to SVG. Automatically responds to theme changes. Shows error state with fallback if rendering fails. Supports all mermaid diagram types (flowchart, sequence, gantt, class, state, etc.). * @example ```tsx <DiagramRenderer code="flowchart LR\n  A[Start] --> B[End]" /> ```

> **[View rendered page](https://design.sunbeam.pt/components/diagram-renderer?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { DiagramRenderer } from "@sunbeam/beam-ui/components/ui/diagram-renderer"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| code | `string` | Yes | Mermaid diagram syntax (flowchart, sequence, gantt, etc.). |
| className | `string` | No | Extra CSS class names to apply to the container. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
