# Combobox

> Single option in a {@link Combobox}. */
interface ComboboxOption {
  /** Internal identifier for this option. */
  value: string;
  /** Display label shown in the dropdown and input. */
  label: string;
}

/** Props for {@link Combobox}. */
export interface ComboboxProps {
  /** Array of options to display in the dropdown. */
  options: ComboboxOption[];
  /** Currently selected option value. */
  value: string;
  /** Callback fired when the user selects an option; receives the option's value. */
  onChange: (value: string) => void;
  /** Placeholder text shown in the input when no option is selected. Defaults to `"Search..."`. */
  placeholder?: string;
  /** If true, the combobox is disabled and cannot be interacted with. Defaults to false. */
  disabled?: boolean;
  /** Extra CSS class names to apply to the root component. */
  className?: string;
}

/** Searchable dropdown combobox with filter-as-you-type and keyboard navigation. * Typing in the input filters the options list by label. Arrow keys navigate, Enter selects. Supports disabled state. Integrates with Ark UI's ComboboxRoot for accessibility. * @example ```tsx <Combobox options={[{ value: "ts", label: "TypeScript" }]} value={lang} onChange={setLang} /> ```

> **[View rendered page](https://design.sunbeam.pt/components/combobox?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Combobox } from "@sunbeam/beam-ui/components/ui/combobox"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| options | `ComboboxOption[]` | Yes | Array of options to display in the dropdown. |
| value | `string` | Yes | Currently selected option value. |
| onChange | `(value: string) => void` | Yes | Callback fired when the user selects an option; receives the option's value. |
| placeholder | `string` | No | Placeholder text shown in the input when no option is selected. Defaults to `"Search..."`. |
| disabled | `boolean` | No | If true, the combobox is disabled and cannot be interacted with. Defaults to false. |
| className | `string` | No | Extra CSS class names to apply to the root component. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
