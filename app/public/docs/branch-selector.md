# BranchSelector

> Branch/tag selector popover with tabs, search, and create-branch support.

> **[View rendered page](https://design.sunbeam.pt/components/branch-selector?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { BranchSelector } from "@sunbeam/beam-ui/components/ui/branch-selector"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| branches | `string[]` | Yes | Available branch names |
| tags | `string[]` | Yes | Available tag names |
| current | `string` | Yes | Currently selected ref |
| defaultBranch | `string` | No | Default branch name |
| onChange | `(ref: string) => void` | Yes | Ref change handler |
| onCreateBranch | `(name: string) => void` | No | Create branch callback |
| className | `string` | No | Additional CSS class |

## Usage
```tsx
<BranchSelector branches={["main", "dev"]} tags={["v1.0"]} current="main" onChange={setRef} />
```

## Features
- Tabbed Branches/Tags view
- Fuzzy search filtering
- Create new branch inline

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
