# Skeleton

> Props for {@link Skeleton}. */
export interface SkeletonProps {
  /** Width (CSS string). */
  width?: string;
  /** Height (CSS string). */
  height?: string;
  /** Skeleton shape. Defaults to `"text"`. */
  variant?: "text" | "circle" | "rect";
  /** Number of skeletons to render (stacked vertically). Defaults to `1`. */
  count?: number;
  /** Additional CSS class. */
  className?: string;
}

const shimmerName = "beam-shimmer";

const base = css({
  backgroundColor: { base: "warm.10", _dark: "chrome.06" },
  borderWidth: "0.25",
  borderStyle: "solid",
  borderColor: "border.default",
  backgroundImage: {
    base: "linear-gradient(90deg, transparent 0%, rgba(127,99,21,0.15) 50%, transparent 100%)",
    _dark: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)",
  },
  backgroundSize: "200% 100%",
  animationName: shimmerName,
  animationDuration: "1.8s",
  animationTimingFunction: "ease-in-out",
  animationIterationCount: "infinite",
});

const textStyle = css({
  width: "100%",
  height: "4",
  borderRadius: "sm",
});

const circleStyle = css({
  borderRadius: "full",
});

const rectStyle = css({
  borderRadius: "sm",
});

const stackStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "3",
});

/** Animated loading placeholder with shimmer effect. Renders as text line (100% width, 16px), circle, or rect by default. Circle defaults to square (set height = width). Multiple skeletons stack vertically. * @example ```tsx <Skeleton variant="text" width="100%" /> <Skeleton variant="circle" width="48px" /> <Skeleton variant="rect" width="200px" height="100px" count={3} /> ```

> **[View rendered page](https://design.sunbeam.pt/components/skeleton?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Skeleton } from "@sunbeam/beam-ui/components/ui/skeleton"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| width | `string` | No | Width (CSS string). |
| height | `string` | No | Height (CSS string). |
| variant | `"text" | "circle" | "rect"` | No | Skeleton shape. Defaults to `"text"`. |
| count | `number` | No | Number of skeletons to render (stacked vertically). Defaults to `1`. |
| className | `string` | No | Additional CSS class. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
