# Splitter

> Props for {@link Splitter}. */
export interface SplitterProps {
  /** Exactly two child elements to split. */
  children: [ReactNode, ReactNode];
  /** Split direction. Defaults to `"horizontal"`. */
  direction?: "horizontal" | "vertical";
  /** Initial size of left/top panel as percentage (0–100). Defaults to `50`. */
  defaultSize?: number;
  /** Called when the user finishes resizing a panel. */
  onSizeChangeEnd?: (details: SizeChangeDetails) => void;
  /** Whether the first panel is collapsed to its minimum size. */
  collapsed?: boolean;
  /** Size of the first panel when collapsed, in percent. Defaults to `0`. */
  collapsedSize?: number;
}

/** Resizable two-panel splitter using Ark UI. Drag handle shows on hover and highlights on drag. * @example ```tsx <Splitter direction="horizontal" defaultSize={30}> <LeftPanel /> <RightPanel /> </Splitter> ```

> **[View rendered page](https://design.sunbeam.pt/components/splitter?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Splitter } from "@sunbeam/beam-ui/components/ui/splitter"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| children | `[ReactNode, ReactNode]` | Yes | Exactly two child elements to split. |
| direction | `"horizontal" | "vertical"` | No | Split direction. Defaults to `"horizontal"`. |
| defaultSize | `number` | No | Initial size of left/top panel as percentage (0–100). Defaults to `50`. |
| onSizeChangeEnd | `(details: SizeChangeDetails) => void` | No | Called when the user finishes resizing a panel. |
| collapsed | `boolean` | No | Whether the first panel is collapsed to its minimum size. |
| collapsedSize | `number` | No | Size of the first panel when collapsed, in percent. Defaults to `0`. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
