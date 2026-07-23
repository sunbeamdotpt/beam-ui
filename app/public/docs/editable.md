# Editable

> Props for {@link Editable}. */
export interface EditableProps {
  /** Current text value (shown in preview mode). */
  value: string;
  /** Callback fired when the user submits an edit; receives the new text. */
  onChange: (value: string) => void;
  /** Placeholder text shown in edit mode if the field is empty. Defaults to `"Click to edit..."`. */
  placeholder?: string;
  /** Extra CSS class names to apply to the root container. */
  className?: string;
}

/** Click-to-edit inline text field with preview and input modes. * Displays text as a clickable preview; clicking enters edit mode with an input field. Press Enter to submit changes, Escape to cancel. Integrates with Ark UI's EditableRoot. * @example ```tsx <Editable value={title} onChange={setTitle} placeholder="Untitled" /> ```

> **[View rendered page](https://design.sunbeam.pt/components/editable?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Editable } from "@sunbeam/beam-ui/components/ui/editable"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| value | `string` | Yes | Current text value (shown in preview mode). |
| onChange | `(value: string) => void` | Yes | Callback fired when the user submits an edit; receives the new text. |
| placeholder | `string` | No | Placeholder text shown in edit mode if the field is empty. Defaults to `"Click to edit..."`. |
| className | `string` | No | Extra CSS class names to apply to the root container. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
