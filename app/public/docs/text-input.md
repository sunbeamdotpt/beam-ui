# TextInput

> Props for {@link TextInput}. */
export interface TextInputProps {
  /** Current input value. */
  value: string;
  /** Called when the input value changes. */
  onChange: (value: string) => void;
  /** Placeholder text displayed when empty. */
  placeholder?: string;
  /** Optional label displayed above the input. */
  label?: string;
  /** Error message displayed below the input with orange accent. */
  error?: string;
  /** Whether the input is disabled. Defaults to `false`. */
  disabled?: boolean;
  /** HTML input type. Defaults to `"text"`. */
  type?: "text" | "password" | "email" | "number";
  /** Optional CSS class applied to the wrapper. */
  className?: string;
}

/** Foundational text input with optional label, error message, and type variants. Supports accessibility attributes and automatic error styling. * @example ```tsx const [email, setEmail] = useState(""); <TextInput type="email" value={email} onChange={setEmail} label="Email" placeholder="name@example.com" error={emailError ? "Invalid email" : undefined} /> ```

> **[View rendered page](https://design.sunbeam.pt/components/text-input?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { TextInput } from "@sunbeam/beam-ui/components/ui/text-input"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| value | `string` | Yes | Current input value. |
| onChange | `(value: string) => void` | Yes | Called when the input value changes. |
| placeholder | `string` | No | Placeholder text displayed when empty. |
| label | `string` | No | Optional label displayed above the input. |
| error | `string` | No | Error message displayed below the input with orange accent. |
| disabled | `boolean` | No | Whether the input is disabled. Defaults to `false`. |
| type | `"text" | "password" | "email" | "number"` | No | HTML input type. Defaults to `"text"`. |
| className | `string` | No | Optional CSS class applied to the wrapper. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
