# ScrollArea

> Props for {@link ScrollArea}. */
export interface ScrollAreaProps {
  /** Content to scroll. */
  children: ReactNode;
  /** Max height before scrolling (CSS string). */
  maxHeight?: string;
  /** Scrollbar visibility mode. `"visible"` always shows themed scrollbar, `"hover"` hides until hover, `"auto"` uses browser default. Defaults to `"visible"`. */
  scrollbar?: "visible" | "hover" | "auto";
  /** Scroll direction. Defaults to `"vertical"`. */
  direction?: "vertical" | "horizontal" | "both";
  /** Additional CSS class. */
  className?: string;
}

/** Native scrollable container with themed golden scrollbars (Webkit & Firefox). Supports three scrollbar modes and flexible scroll directions. * @example ```tsx <ScrollArea maxHeight="400px" scrollbar="hover" direction="vertical"> <LongContent /> </ScrollArea> ```

> **[View rendered page](https://design.sunbeam.pt/components/scroll-area?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { ScrollArea } from "@sunbeam/beam-ui/components/ui/scroll-area"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| children | `ReactNode` | Yes | Content to scroll. |
| maxHeight | `string` | No | Max height before scrolling (CSS string). |
| scrollbar | `"visible" | "hover" | "auto"` | No | Scrollbar visibility mode. `"visible"` always shows themed scrollbar, `"hover"` hides until hover, `"auto"` uses browser default. Defaults to `"visible"`. |
| direction | `"vertical" | "horizontal" | "both"` | No | Scroll direction. Defaults to `"vertical"`. |
| className | `string` | No | Additional CSS class. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
