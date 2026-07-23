# Checkbox

> Props for {@link Checkbox}. */
export interface CheckboxProps {
  /** Whether the checkbox is checked. */
  checked: boolean;
  /** Called with the new checked state when the user toggles the checkbox. */
  onChange: (checked: boolean) => void;
  /** Optional label text displayed next to the checkbox. */
  label?: string;
  /** If true, disables interaction. Defaults to false. */
  disabled?: boolean;
  /** If true, shows a dash (indeterminate state) instead of a checkmark. Defaults to false. */
  indeterminate?: boolean;
  /** Additional Panda CSS classes. */
  className?: string;
}

/** Custom checkbox with optional label, indeterminate state, and focus styling. * Uses a hidden native input with styled visual box. Supports three states: unchecked, checked (with checkmark), and indeterminate (with dash). Hover and focus-visible styling included. * @example ```tsx <Checkbox checked={agreed} onChange={setAgreed} label="I agree to the terms" indeterminate={someButNotAll} /> ```

> **[View rendered page](https://design.sunbeam.pt/components/checkbox?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Checkbox } from "@sunbeam/beam-ui/components/ui/checkbox"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| checked | `boolean` | Yes | Whether the checkbox is checked. |
| onChange | `(checked: boolean) => void` | Yes | Called with the new checked state when the user toggles the checkbox. |
| label | `string` | No | Optional label text displayed next to the checkbox. |
| disabled | `boolean` | No | If true, disables interaction. Defaults to false. |
| indeterminate | `boolean` | No | If true, shows a dash (indeterminate state) instead of a checkmark. Defaults to false. |
| className | `string` | No | Additional Panda CSS classes. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
