# BranchSelector

> BranchSelector component.

> **[View rendered page](https://design.sunbeam.pt/components/branch-selector?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { BranchSelector } from "@sunbeam/beam-ui/components/ui/branch-selector"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| branches | `string[]` | Yes |  |
| tags | `string[]` | Yes |  |
| current | `string` | Yes |  |
| defaultBranch | `string` | No |  |
| onChange | `(ref: string) => void` | Yes |  |
| onCreateBranch | `(name: string) => void` | No |  |
| className | `string` | No |  |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
