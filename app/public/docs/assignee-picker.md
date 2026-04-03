# AssigneePicker

> Multi-select popover for assigning users with avatar display and search.

> **[View rendered page](https://design.sunbeam.pt/components/assignee-picker?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { AssigneePicker } from "@sunbeam/beam-ui/components/ui/assignee-picker"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| options | `UserOption[]` | Yes | Available users with id, username, displayName, avatarUrl |
| selected | `string[]` | Yes | Selected user IDs |
| onChange | `(selected: string[]) => void` | Yes | Selection change handler |
| placeholder | `string` | No | Trigger placeholder text |
| className | `string` | No | Additional CSS class |

## Usage
```tsx
<AssigneePicker options={users} selected={assigneeIds} onChange={setAssigneeIds} />
```

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
