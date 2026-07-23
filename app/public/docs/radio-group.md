# RadioGroup

> Single radio option. */
interface RadioOption {
  /** Unique value for this option. */
  value: string;
  /** Display label. */
  label: string;
}

/** Props for {@link RadioGroup}. */
export interface RadioGroupProps {
  /** Array of radio options. */
  options: RadioOption[];
  /** Currently selected value. */
  value: string;
  /** Fired when selection changes. */
  onChange: (value: string) => void;
  /** Optional group label. */
  label?: string;
}

/** Radio button group with keyboard navigation and optional label. * @example ```tsx <RadioGroup options={[ { value: "opt1", label: "Option 1" }, { value: "opt2", label: "Option 2" }, ]} value={selected} onChange={setSelected} label="Choose one:" /> ```

> **[View rendered page](https://design.sunbeam.pt/components/radio-group?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { RadioGroup } from "@sunbeam/beam-ui/components/ui/radio-group"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| options | `RadioOption[]` | Yes | Array of radio options. |
| value | `string` | Yes | Currently selected value. |
| onChange | `(value: string) => void` | Yes | Fired when selection changes. |
| label | `string` | No | Optional group label. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
