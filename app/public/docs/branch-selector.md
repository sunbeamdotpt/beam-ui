# BranchSelector

> Props for {@link BranchSelector}. */
export interface BranchSelectorProps {
  /** Array of branch names to choose from. */
  branches: string[];
  /** Array of tag names to choose from. */
  tags: string[];
  /** Currently selected branch or tag name. */
  current: string;
  /** Name of the default/main branch (shown with "default" badge). */
  defaultBranch?: string;
  /** Called with selected branch or tag name. */
  onChange: (ref: string) => void;
  /** Optional callback to create a new branch with the given name. */
  onCreateBranch?: (name: string) => void;
  /** Additional Panda CSS classes. */
  className?: string;
}

/** Dropdown for selecting Git branches or tags with optional branch creation. * Shows two tabs (Branches, Tags), a search input, and a list of options. If `onCreateBranch` is provided and the search matches no existing branch, a "Create branch" button appears. The current selection is marked with a checkmark and highlighted in orange. * @example ```tsx <BranchSelector branches={["main", "develop", "feature/auth"]} tags={["v1.0.0", "v1.1.0"]} current="main" defaultBranch="main" onChange={(ref) => checkout(ref)} onCreateBranch={(name) => createBranch(name)} /> ```

> **[View rendered page](https://design.sunbeam.pt/components/branch-selector?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { BranchSelector } from "@sunbeam/beam-ui/components/ui/branch-selector"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| branches | `string[]` | Yes | Array of branch names to choose from. |
| tags | `string[]` | Yes | Array of tag names to choose from. |
| current | `string` | Yes | Currently selected branch or tag name. |
| defaultBranch | `string` | No | Name of the default/main branch (shown with "default" badge). |
| onChange | `(ref: string) => void` | Yes | Called with selected branch or tag name. |
| onCreateBranch | `(name: string) => void` | No | Optional callback to create a new branch with the given name. |
| className | `string` | No | Additional Panda CSS classes. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
