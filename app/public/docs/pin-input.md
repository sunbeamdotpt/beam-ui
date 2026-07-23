# PinInput

> Props for {@link PinInput}. */
export interface PinInputProps {
  /** Number of input slots. Defaults to `4`. */
  length?: number;
  /** Current value as a concatenated string. */
  value: string;
  /** Fired when value changes. */
  onChange: (value: string) => void;
  /** Mask input (show dots instead of digits). Defaults to `false`. */
  mask?: boolean;
  /** Optional label above the input. */
  label?: string;
}

/** PIN/OTP input with customizable length and optional masking. * @example ```tsx const [pin, setPin] = useState(""); <PinInput value={pin} onChange={setPin} length={6} label="Verification Code" /> ```

> **[View rendered page](https://design.sunbeam.pt/components/pin-input?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { PinInput } from "@sunbeam/beam-ui/components/ui/pin-input"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| length | `number` | No | Number of input slots. Defaults to `4`. |
| value | `string` | Yes | Current value as a concatenated string. |
| onChange | `(value: string) => void` | Yes | Fired when value changes. |
| mask | `boolean` | No | Mask input (show dots instead of digits). Defaults to `false`. |
| label | `string` | No | Optional label above the input. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
