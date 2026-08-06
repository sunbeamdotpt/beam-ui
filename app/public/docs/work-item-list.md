# WorkItemList

> Label badge for a work item. */
export interface WorkItemLabel {
  /** Label text. */
  name: string;
  /** Hex or CSS color for the label background/border. */
  color: string;
}

/** Branch information displayed inline with a work item. */
export interface WorkItemBranch {
  /** Target branch name. */
  base: string;
  /** Source branch name. */
  head: string;
}

/** A single row in a work item list (e.g., PR, issue). */
export interface WorkItemRow {
  /** Unique identifier for the item. */
  id: string;
  /** Optional left-column icon (e.g., status indicator, avatar). */
  icon?: ReactNode;
  /** Item title (becomes a link if href is provided). */
  title: string;
  /** Link destination for the title. If omitted, title is displayed as plain text. */
  href?: string;
  /** Optional array of labels (colored badges). */
  labels?: WorkItemLabel[];
  /** Metadata displayed below title (e.g., author, date). */
  meta: ReactNode;
  /** Optional branch information ("into base from head"). */
  branches?: WorkItemBranch;
  /** Optional status indicator (right column, e.g., "open", "merged"). */
  status?: ReactNode;
  /** Number of comments; if >0, displayed with a comment icon. */
  commentCount?: number;
}

/** Props for {@link WorkItemList}. */
export interface WorkItemListProps {
  /** Array of work item rows. */
  items: WorkItemRow[];
  /** Set of currently selected item IDs. */
  selected?: Set<string>;
  /** Called when selection changes with the updated Set. */
  onSelect?: (selected: Set<string>) => void;
  /** Whether checkboxes appear for row selection. Defaults to `false`. */
  selectable?: boolean;
  /** Called when "Load more" button is clicked. */
  onLoadMore?: () => void;
  /** Optional CSS class applied to the root container. */
  className?: string;
  /** Component used to render item links. Defaults to a plain `<a>`. */
  linkAs?: LinkComponent;
}

/* ------------------------------------------------------------------ */
/* Checkbox                                                            */
/* ------------------------------------------------------------------ */

function Checkbox(
  { checked, onChange, ariaLabel }: {
    checked: boolean;
    onChange: () => void;
    ariaLabel?: string;
  },
) {
  return (
    <div
      role="checkbox"
      aria-checked={checked}
      aria-label={ariaLabel}
      tabIndex={0}
      className={cx(checkboxOuter, checked && checkboxChecked)}
      onClick={(e) => {
        e.stopPropagation();
        onChange();
      }}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          e.stopPropagation();
          onChange();
        }
      }}
    >
      {checked && <Icon name="check" size={14} />}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* WorkItemList                                                        */
/* ------------------------------------------------------------------ */

/** List of work items (PRs, issues, tasks) with title, labels, metadata, branches, and status. Optional checkboxes for multi-select; "Load more" button at bottom if provided. Rows highlight on hover and when selected; title is a link if href is provided. * @example ```tsx const items: WorkItemRow[] = [ { id: "pr-1", title: "Add feature X", href: "/pr/1", meta: "opened by alice", labels: "[{ name: "feature", color: "#0066cc" }], branches: "{ base: "main", head: "feat/x" }, status: <Badge>Draft</Badge>, commentCount: 3, }, ]; <WorkItemList items={items} selectable onSelect={handleSelect} onLoadMore={loadMore} /> ```

> **[View rendered page](https://design.sunbeam.pt/components/work-item-list?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { WorkItemList } from "@sunbeam/beam-ui/components/ui/work-item-list"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| items | `WorkItemRow[]` | Yes | Array of work item rows. |
| selected | `Set<string>` | No | Set of currently selected item IDs. |
| onSelect | `(selected: Set<string>) => void` | No | Called when selection changes with the updated Set. |
| selectable | `boolean` | No | Whether checkboxes appear for row selection. Defaults to `false`. |
| onLoadMore | `() => void` | No | Called when "Load more" button is clicked. |
| className | `string` | No | Optional CSS class applied to the root container. |
| linkAs | `LinkComponent` | No | Component used to render item links. Defaults to a plain `<a>`. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
