# CommitGraph

> Git commit history visualization with branch lanes and merge paths.

> **[View rendered page](https://design.sunbeam.pt/components/commit-graph?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { CommitGraph } from "@sunbeam/beam-ui/components/ui/commit-graph"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| commits | `CommitNode[]` | Yes | Commit objects with hash, message, author, parents, branch, tags |
| className | `string` | No | Additional CSS class |

## Usage
```tsx
<CommitGraph commits={gitLog} />
```

## Features
- SVG branch lane rendering
- Merge path visualization
- Branch and tag labels
- Commit metadata display

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
