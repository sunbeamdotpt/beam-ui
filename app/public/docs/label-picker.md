# LabelPicker

> A single label option with name, color, and optional description. */
export interface LabelOption {
  /** Unique identifier for the label. */
  id: string;
  /** Label name / display text. */
  name: string;
  /** Hex color code for the label. */
  color: string;
  /** Optional description shown in the dropdown. */
  description?: string;
}

/** Props for {@link LabelPicker}. */
export interface LabelPickerProps {
  /** Array of available labels to choose from. */
  options: LabelOption[];
  /** Array of selected label IDs. */
  selected: string[];
  /** Called when selection changes. Receives new array of selected label IDs. */
  onChange: (selected: string[]) => void;
  /** Placeholder text when no labels are selected. Defaults to `"Labels"`. */
  placeholder?: string;
  /** Optional CSS class for the trigger button. */
  className?: string;
}

/** Multi-select dropdown for choosing labels with color swatches and optional descriptions. Supports search filtering by label name or description. * @example ```tsx <LabelPicker options={labels} selected={selectedLabelIds} onChange={setSelectedLabelIds} /> ```

> **[View rendered page](https://design.sunbeam.pt/components/label-picker?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { LabelPicker } from "@sunbeam/beam-ui/components/ui/label-picker"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| options | `LabelOption[]` | Yes | Array of available labels to choose from. |
| selected | `string[]` | Yes | Array of selected label IDs. |
| onChange | `(selected: string[]) => void` | Yes | Called when selection changes. Receives new array of selected label IDs. |
| placeholder | `string` | No | Placeholder text when no labels are selected. Defaults to `"Labels"`. |
| className | `string` | No | Optional CSS class for the trigger button. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
