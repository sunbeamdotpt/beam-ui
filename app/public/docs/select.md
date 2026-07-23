# Select

> Single select option. */
interface SelectOption {
  /** Unique value. */
  value: string;
  /** Display label. */
  label: string;
}

/** Props for {@link Select}. */
export interface SelectProps {
  /** Array of available options. */
  options: SelectOption[];
  /** Currently selected value. */
  value: string;
  /** Fired when selection changes. */
  onChange: (value: string) => void;
  /** Placeholder text. Defaults to `"Select…"`. */
  placeholder?: string;
  /** Disable the select. Defaults to `false`. */
  disabled?: boolean;
  /** Additional CSS class. */
  className?: string;
}

/** Dropdown select using Ark UI with keyboard navigation and custom styling. Displays dropdown below trigger by default. * @example ```tsx <Select options={[ { value: "a", label: "Option A" }, { value: "b", label: "Option B" }, ]} value={selected} onChange={setSelected} placeholder="Choose..." /> ```

> **[View rendered page](https://design.sunbeam.pt/components/select?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Select } from "@sunbeam/beam-ui/components/ui/select"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| options | `SelectOption[]` | Yes | Array of available options. |
| value | `string` | Yes | Currently selected value. |
| onChange | `(value: string) => void` | Yes | Fired when selection changes. |
| placeholder | `string` | No | Placeholder text. Defaults to `"Select…"`. |
| disabled | `boolean` | No | Disable the select. Defaults to `false`. |
| className | `string` | No | Additional CSS class. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
