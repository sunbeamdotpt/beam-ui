# Spinner

> Props for {@link Spinner}. */
export interface SpinnerProps {
  /** Size. Defaults to `"md"`. */
  size?: "sm" | "md" | "lg";
  /** Optional label shown below spinner. */
  label?: string;
  /** Use brand orange color instead of muted gold. Defaults to `false`. */
  accent?: boolean;
  /** Custom color hex (overrides accent). */
  color?: string;
  /** Additional CSS class. */
  className?: string;
}

const sizes = {
  sm: 20,
  md: 32,
  lg: 48,
} as const;

const strokes = {
  sm: 2.5,
  md: 3,
  lg: 3.5,
} as const;

/** SVG spinner with animated arc and optional label. Three sizes and customizable color. * @example ```tsx <Spinner size="md" label="Loading..." accent /> ```

> **[View rendered page](https://design.sunbeam.pt/components/spinner?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Spinner } from "@sunbeam/beam-ui/components/ui/spinner"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| size | `"sm" | "md" | "lg"` | No | Size. Defaults to `"md"`. |
| label | `string` | No | Optional label shown below spinner. |
| accent | `boolean` | No | Use brand orange color instead of muted gold. Defaults to `false`. |
| color | `string` | No | Custom color hex (overrides accent). |
| className | `string` | No | Additional CSS class. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
