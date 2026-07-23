# Slider

> Props for {@link Slider}. */
export interface SliderProps {
  /** Current slider value. */
  value: number;
  /** Fired when value changes. */
  onChange: (value: number) => void;
  /** Minimum value. Defaults to `0`. */
  min?: number;
  /** Maximum value. Defaults to `100`. */
  max?: number;
  /** Increment step. Defaults to `1`. */
  step?: number;
  /** Optional label above slider. */
  label?: string;
}

/** Horizontal slider with optional label using Ark UI. Supports keyboard navigation (arrow keys, Home, End). * @example ```tsx <Slider value={50} onChange={setValue} min={0} max={100} label="Volume" /> ```

> **[View rendered page](https://design.sunbeam.pt/components/slider?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Slider } from "@sunbeam/beam-ui/components/ui/slider"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| value | `number` | Yes | Current slider value. |
| onChange | `(value: number) => void` | Yes | Fired when value changes. |
| min | `number` | No | Minimum value. Defaults to `0`. |
| max | `number` | No | Maximum value. Defaults to `100`. |
| step | `number` | No | Increment step. Defaults to `1`. |
| label | `string` | No | Optional label above slider. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
