# TreeView

> Node in a tree hierarchy. */
export interface TreeNode {
  /** Unique identifier for the node. */
  id: string;
  /** Display label. */
  label: string;
  /** Optional Material Symbols icon name. Defaults to "folder" for parents, "description" for leaves. */
  icon?: string;
  /** Child nodes forming a subtree. If present and non-empty, node is treated as a folder. */
  children?: TreeNode[];
  /** Called when a leaf node is clicked. */
  onClick?: () => void;
}

/** Props for {@link TreeView}. */
export interface TreeViewProps {
  /** Array of root tree nodes. */
  nodes: TreeNode[];
  /** ID of the currently active/selected node. */
  activeId?: string;
  /** Optional CSS class applied to the root container. */
  className?: string;
}

/** Hierarchical tree view using Ark UI collapsibles with icon indicators. Folders expand/collapse; leaves are clickable buttons. Active node is highlighted. * @example ```tsx const nodes: TreeNode[] = [ { id: "src", label: "src", children: [ { id: "index.ts", label: "index.ts", onClick: "() => console.log("clicked") }, ], }, ]; <TreeView nodes={nodes} activeId="index.ts" /> ```

> **[View rendered page](https://design.sunbeam.pt/components/tree-view?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { TreeView } from "@sunbeam/beam-ui/components/ui/tree-view"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| nodes | `TreeNode[]` | Yes | Array of root tree nodes. |
| activeId | `string` | No | ID of the currently active/selected node. |
| className | `string` | No | Optional CSS class applied to the root container. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
