# ProgressBar

> Progress bar visual variant. */
type ProgressVariant = "default" | "success" | "error";

/** Props for {@link ProgressBar}. */
export interface ProgressBarProps {
  /** Numeric progress value (0–100). Clamped automatically. */
  value: number;
  /** Visual style. Defaults to `"default"`. */
  variant?: ProgressVariant;
  /** Show percentage label. Defaults to `false`. */
  showLabel?: boolean;
  /** Bar height. Defaults to `"md"`. */
  size?: "sm" | "md";
  /** Additional CSS class. */
  className?: string;
}

const fillColors: Record<ProgressVariant, string> = {
  default: "sunbeam.orange",
  success: "sunshine.700",
  error: "sunbeam.flame",
};

/** Horizontal progress bar with optional percentage label and three color variants. * @example ```tsx <ProgressBar value={65} variant="default" showLabel size="md" /> ```

> **[View rendered page](https://design.sunbeam.pt/components/progress-bar?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { ProgressBar } from "@sunbeam/beam-ui/components/ui/progress-bar"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| value | `number` | Yes | Numeric progress value (0–100). Clamped automatically. |
| variant | `ProgressVariant` | No | Visual style. Defaults to `"default"`. |
| showLabel | `boolean` | No | Show percentage label. Defaults to `false`. |
| size | `"sm" | "md"` | No | Bar height. Defaults to `"md"`. |
| className | `string` | No | Additional CSS class. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
