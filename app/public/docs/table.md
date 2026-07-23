# Table

> Column configuration for {@link Table}. */
interface Column {
  /** Unique key matching a field in row data. */
  key: string;
  /** Display label for the column header. */
  label: string;
  /** Whether the column can be clicked to sort. Defaults to `false`. */
  sortable?: boolean;
  /** Optional CSS width (e.g. "120px", "20%"). */
  width?: string;
}

/** Props for {@link Table}. */
export interface TableProps {
  /** Array of column definitions with keys, labels, and optional sort/width. */
  columns: Column[];
  /** Array of row objects, matched against column keys. */
  rows: Array<Record<string, ReactNode>>;
  /** Called when a sortable column header is clicked with the column key and direction. */
  onSort?: (key: string, dir: "asc" | "desc") => void;
  /** Whether checkboxes appear for row selection. Defaults to `false`. */
  selectable?: boolean;
  /** Called when row selection changes with an array of selected row keys. */
  onSelect?: (selectedKeys: string[]) => void;
  /** Data key to use as the unique row identifier. Defaults to `"id"`. */
  rowKey?: string;
  /** Optional CSS class applied to the wrapper. */
  className?: string;
  /** Accessible caption for the table (visually hidden by default). */
  caption?: string;
}

/** Data table with sorting, row selection, and alternating row colors. Columns are configured via an array of `Column` definitions matching row data keys. * @example ```tsx const columns: Column[] = [ { key: "name", label: "Name", sortable: true }, { key: "status", label: "Status" }, ]; const rows = [ { id: "1", name: "Alice", status: "Active" }, { id: "2", name: "Bob", status: "Inactive" }, ]; <Table columns={columns} rows={rows} selectable onSort={handleSort} onSelect={handleSelect} /> ```

> **[View rendered page](https://design.sunbeam.pt/components/table?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Table } from "@sunbeam/beam-ui/components/ui/table"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| columns | `Column[]` | Yes | Array of column definitions with keys, labels, and optional sort/width. |
| rows | `Array<Record<string, ReactNode>>` | Yes | Array of row objects, matched against column keys. |
| onSort | `(key: string, dir: "asc" | "desc") => void` | No | Called when a sortable column header is clicked with the column key and direction. |
| selectable | `boolean` | No | Whether checkboxes appear for row selection. Defaults to `false`. |
| onSelect | `(selectedKeys: string[]) => void` | No | Called when row selection changes with an array of selected row keys. |
| rowKey | `string` | No | Data key to use as the unique row identifier. Defaults to `"id"`. |
| className | `string` | No | Optional CSS class applied to the wrapper. |
| caption | `string` | No | Accessible caption for the table (visually hidden by default). |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
