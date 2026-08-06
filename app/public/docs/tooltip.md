# Tooltip

> Props for {@link Tooltip}. */
export interface TooltipProps {
  /** Tooltip text displayed on hover. */
  content: string;
  /** Element that triggers the tooltip. */
  children: ReactNode;
  /** Tooltip placement relative to the trigger. Defaults to `"top"`. */
  position?: "top" | "bottom" | "left" | "right";
}

const contentStyle = css({
  backgroundColor: "sunbeam.black",
  color: "white",
  fontSize: "xs",
  padding: "1.5 3",
  borderRadius: "sm",
  lineHeight: 1.4,
  maxWidth: "60",
  zIndex: 1000,
});

const arrowStyle = css({
  "--arrow-size": "8px",
  "--arrow-background": "var(--colors-sunbeam-black)",
});

/** Accessible tooltip using Ark UI with 200ms open delay and positioned arrow. Content is plain text; black background with white text. * @example ```tsx <Tooltip content="Save changes" position="top"> <button type="button">Save</button> </Tooltip> ```

> **[View rendered page](https://design.sunbeam.pt/components/tooltip?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Tooltip } from "@sunbeam/beam-ui/components/ui/tooltip"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| content | `string` | Yes | Tooltip text displayed on hover. |
| children | `ReactNode` | Yes | Element that triggers the tooltip. |
| position | `"top" | "bottom" | "left" | "right"` | No | Tooltip placement relative to the trigger. Defaults to `"top"`. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
