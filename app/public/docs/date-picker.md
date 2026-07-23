# DatePicker

> Props for {@link DatePicker}. */
export interface DatePickerProps {
  /** Current date value as ISO 8601 string (e.g., `"2024-12-25"`). */
  value?: string;
  /** Callback fired when the user selects a date; receives the ISO date string. */
  onChange?: (value: string) => void;
  /** Optional label shown above the date input. */
  label?: string;
  /** Placeholder text shown in the input when no date is selected. Defaults to `"Select date"`. */
  placeholder?: string;
  /** If true, the date picker is disabled and cannot be interacted with. Defaults to false. */
  disabled?: boolean;
  /** Extra CSS class names to apply to the root container. */
  className?: string;
}

/** Ark UI date picker with day/month/year views and calendar navigation. * Displays a trigger button with a calendar icon; opens a popover with day, month, and year views. Supports keyboard navigation and locale-aware formatting. Closes automatically on selection. * @example ```tsx <DatePicker value={date} onChange={setDate} label="Start Date" /> ```

> **[View rendered page](https://design.sunbeam.pt/components/date-picker?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { DatePicker } from "@sunbeam/beam-ui/components/ui/date-picker"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| value | `string` | No | Current date value as ISO 8601 string (e.g., `"2024-12-25"`). |
| onChange | `(value: string) => void` | No | Callback fired when the user selects a date; receives the ISO date string. |
| label | `string` | No | Optional label shown above the date input. |
| placeholder | `string` | No | Placeholder text shown in the input when no date is selected. Defaults to `"Select date"`. |
| disabled | `boolean` | No | If true, the date picker is disabled and cannot be interacted with. Defaults to false. |
| className | `string` | No | Extra CSS class names to apply to the root container. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
