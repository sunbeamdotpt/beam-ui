# AssigneePicker

> Represents a single user option in the picker. */
export interface UserOption {
  /** Unique user identifier. */
  id: string;
  /** Login username. */
  username: string;
  /** Display name. */
  displayName: string;
  /** Avatar image URL (optional). */
  avatarUrl?: string;
}

/** Props for {@link AssigneePicker}. */
export interface AssigneePickerProps {
  /** List of available users to pick from. */
  options: UserOption[];
  /** Array of selected user IDs. */
  selected: string[];
  /** Called with updated array of selected user IDs when selection changes. */
  onChange: (selected: string[]) => void;
  /** Placeholder text shown when no users are selected. Defaults to "Assignees". */
  placeholder?: string;
  /** Additional Panda CSS classes. */
  className?: string;
}

/** Multi-select dropdown for assigning users. * Shows selected avatars inline. Clicking opens a popover with a search input and checkbox list. Multiple users can be selected simultaneously. * @example ```tsx <AssigneePicker options={[ { id: "1", username: "alice", displayName: "Alice Smith" }, { id: "2", username: "bob", displayName: "Bob Jones" }, ]} selected={["1"]} onChange={(ids) => setSprint({ ...sprint, assignees: ids })} /> ```

> **[View rendered page](https://design.sunbeam.pt/components/assignee-picker?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { AssigneePicker } from "@sunbeam/beam-ui/components/ui/assignee-picker"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| options | `UserOption[]` | Yes | List of available users to pick from. |
| selected | `string[]` | Yes | Array of selected user IDs. |
| onChange | `(selected: string[]) => void` | Yes | Called with updated array of selected user IDs when selection changes. |
| placeholder | `string` | No | Placeholder text shown when no users are selected. Defaults to "Assignees". |
| className | `string` | No | Additional Panda CSS classes. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
