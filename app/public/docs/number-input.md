# NumberInput

> Props for {@link NumberInput}. */
export interface NumberInputProps {
  /** Current numeric value. */
  value: number;
  /** Called when user types or clicks increment/decrement buttons. Receives new number. */
  onChange: (value: number) => void;
  /** Minimum allowed value (inclusive). */
  min?: number;
  /** Maximum allowed value (inclusive). */
  max?: number;
  /** Increment/decrement step size. Defaults to `1`. */
  step?: number;
  /** Optional label text above the input. */
  label?: string;
}

/** Spinbox input for numeric values with increment/decrement buttons and optional min/max constraints. Supports mouse wheel for scrolling adjustment. * @example ```tsx <NumberInput value={count} onChange={setCount} min={0} max={100} step={5} label="Quantity" /> ```

> **[View rendered page](https://design.sunbeam.pt/components/number-input?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { NumberInput } from "@sunbeam/beam-ui/components/ui/number-input"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| value | `number` | Yes | Current numeric value. |
| onChange | `(value: number) => void` | Yes | Called when user types or clicks increment/decrement buttons. Receives new number. |
| min | `number` | No | Minimum allowed value (inclusive). |
| max | `number` | No | Maximum allowed value (inclusive). |
| step | `number` | No | Increment/decrement step size. Defaults to `1`. |
| label | `string` | No | Optional label text above the input. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
