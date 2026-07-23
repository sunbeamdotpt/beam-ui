# TransferList

> Item in a transfer list. */
export interface TransferItem {
  /** Unique identifier for the item. */
  id: string;
  /** Display label. */
  label: string;
  /** Optional Material Symbols icon name. */
  icon?: string;
}

/** Props for {@link TransferList}. */
export interface TransferListProps {
  /** Array of available items (left panel). */
  available: TransferItem[];
  /** Array of selected items (right panel). */
  selected: TransferItem[];
  /** Called when items are moved between panels with updated available and selected arrays. */
  onChange: (available: TransferItem[], selected: TransferItem[]) => void;
  /** Title for the available items panel. Defaults to `"Available"`. */
  availableTitle?: string;
  /** Title for the selected items panel. Defaults to `"Selected"`. */
  selectedTitle?: string;
  /** Optional CSS class applied to the root container. */
  className?: string;
}

/** Dual-panel transfer list for moving items between available and selected sets. Each panel has search/filter, checkbox selection, and item counts. Center buttons move selected or all items left/right; supports Ctrl+Click for multi-select. * @example ```tsx const [available, setAvailable] = useState([...]); const [selected, setSelected] = useState([...]); <TransferList available={available} selected={selected} onChange={(avail, sel) => { setAvailable(avail); setSelected(sel); }} availableTitle="Permissions" selectedTitle="Granted" /> ```

> **[View rendered page](https://design.sunbeam.pt/components/transfer-list?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { TransferList } from "@sunbeam/beam-ui/components/ui/transfer-list"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| available | `TransferItem[]` | Yes | Array of available items (left panel). |
| selected | `TransferItem[]` | Yes | Array of selected items (right panel). |
| onChange | `(available: TransferItem[], selected: TransferItem[]) => void` | Yes | Called when items are moved between panels with updated available and selected arrays. |
| availableTitle | `string` | No | Title for the available items panel. Defaults to `"Available"`. |
| selectedTitle | `string` | No | Title for the selected items panel. Defaults to `"Selected"`. |
| className | `string` | No | Optional CSS class applied to the root container. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
