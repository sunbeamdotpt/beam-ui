# MilestonePicker

> A milestone option with progress tracking and completion counts. */
export interface MilestoneOption {
  /** Unique identifier for the milestone. */
  id: string;
  /** Milestone name / title. */
  title: string;
  /** Optional due date string (e.g., ISO date or human-readable format). */
  dueDate?: string;
  /** Progress percentage (0–100). */
  progress: number;
  /** Count of open items in the milestone. */
  open: number;
  /** Count of closed/completed items in the milestone. */
  closed: number;
}

/** Props for {@link MilestonePicker}. */
export interface MilestonePickerProps {
  /** Array of available milestones to choose from. */
  options: MilestoneOption[];
  /** ID of the currently selected milestone, or null if none selected. */
  selected: string | null;
  /** Called when user selects or deselects a milestone. Receives milestone id or null. */
  onChange: (selected: string | null) => void;
  /** Placeholder text when no milestone is selected. Defaults to `"Milestone"`. */
  placeholder?: string;
  /** Optional CSS class for the trigger button. */
  className?: string;
}

/** Single-select dropdown for choosing milestones with progress tracking. Displays due date, open/closed counts, and progress bar for each milestone. Supports search filtering by milestone title. Clicking a selected milestone again deselects it. * @example ```tsx <MilestonePicker options={milestones} selected={selectedMilestoneId} onChange={setSelectedMilestoneId} /> ```

> **[View rendered page](https://design.sunbeam.pt/components/milestone-picker?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { MilestonePicker } from "@sunbeam/beam-ui/components/ui/milestone-picker"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| options | `MilestoneOption[]` | Yes | Array of available milestones to choose from. |
| selected | `string | null` | Yes | ID of the currently selected milestone, or null if none selected. |
| onChange | `(selected: string | null) => void` | Yes | Called when user selects or deselects a milestone. Receives milestone id or null. |
| placeholder | `string` | No | Placeholder text when no milestone is selected. Defaults to `"Milestone"`. |
| className | `string` | No | Optional CSS class for the trigger button. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
