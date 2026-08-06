# KanbanCardDetail

> Extended card data for detail view. */
export interface KanbanCardData {
  /** Unique identifier for the card. */
  id: string;
  /** Card title / heading. */
  title: string;
  /** Markdown-formatted description. */
  description?: string;
  /** Optional labels (tags) with color token names. */
  labels?: { name: string; color: string }[];
  /** Optional assignees with optional avatar URLs. */
  assignees?: { name: string; avatarUrl?: string }[];
  /** Optional milestone reference. */
  milestone?: string;
  /** ISO date string for due date. */
  dueDate?: string;
  /** Status badge. */
  status?: string;
  /** Priority level. */
  priority?: "low" | "medium" | "high" | "critical";
  /** ISO timestamp when the card was created. */
  createdAt?: string;
  /** ISO timestamp of last update. */
  updatedAt?: string;
  /** Checklist subtasks. */
  checklist?: { id: string; title: string; done: boolean }[];
  /** Activity comments. */
  comments?: {
    id: string;
    author: string;
    avatarColor?: string;
    text: string;
    createdAt: string;
  }[];
  /** File attachments. */
  attachments?: {
    id: string;
    name: string;
    sizeBytes?: number;
    url?: string;
  }[];
  /** Breadcrumb path, e.g. "Beam UI / Components". */
  breadcrumb?: string;
  /** Column/status title, e.g. "Backlog". */
  columnTitle?: string;
  /** Short display ID, e.g. "BEAM-204". */
  shortId?: string;
}

/** Props for {@link KanbanCardDetail}. */
export interface KanbanCardDetailProps {
  card: KanbanCardData;
  open: boolean;
  onClose: () => void;
  onSave?: (card: KanbanCardData) => void;
  onDelete?: (id: string) => void;
  readOnly?: boolean;
  className?: string;
}

/* ------------------------------------------------------------------ */
/* Label color mapping (matches ref .lb--* classes)                   */
/* ------------------------------------------------------------------ */

const LABEL_STYLE: Record<
  string,
  { background: string; color: string; border: string }
> = {
  orange: {
    background: "rgba(250,82,15,0.12)",
    color: "#fa520f",
    border: "1px solid rgba(250,82,15,0.3)",
  },
  gold: {
    background: "oklab(0.82 0.04 0.15 / 0.5)",
    color: "oklab(0.42 0.08 0.14)",
    border: "1px solid oklab(0.7 0.06 0.14 / 0.4)",
  },
  feature: {
    background: "rgba(250,82,15,0.12)",
    color: "#fa520f",
    border: "1px solid rgba(250,82,15,0.3)",
  },
  design: {
    background: "oklab(0.82 0.04 0.15 / 0.5)",
    color: "oklab(0.42 0.08 0.14)",
    border: "1px solid oklab(0.7 0.06 0.14 / 0.4)",
  },
};

function getLabelStyle(color: string) {
  if (LABEL_STYLE[color]) return LABEL_STYLE[color];
  // hex fallback
  return { background: color + "22", color, border: `1px solid ${color}66` };
}

/* ------------------------------------------------------------------ */
/* Priority badge                                                      */
/* ------------------------------------------------------------------ */

const PRIORITY_STYLE: Record<
  string,
  { background: string; color: string; border: string }
> = {
  low: {
    background: "rgba(13,148,136,0.1)",
    color: "rgb(15,118,110)",
    border: "1px solid rgba(13,148,136,0.25)",
  },
  medium: {
    background: "rgba(217,119,6,0.12)",
    color: "rgb(180,83,9)",
    border: "1px solid rgba(217,119,6,0.3)",
  },
  high: {
    background: "rgba(250,82,15,0.12)",
    color: "#fa520f",
    border: "1px solid rgba(250,82,15,0.3)",
  },
  critical: {
    background: "rgb(254,226,226)",
    color: "rgb(153,27,27)",
    border: "1px solid rgb(252,165,165)",
  },
};

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

/** Modal dialog for viewing and editing detailed Kanban card information. Matches the Sunbeam Kanban reference design: 880px centered drawer with head (meta + title) and body (main column + side column).

> **[View rendered page](https://design.sunbeam.pt/components/kanban-card-detail?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { KanbanCardDetail } from "@sunbeam/beam-ui/components/ui/kanban-card-detail"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| card | `KanbanCardData` | Yes |  |
| open | `boolean` | Yes |  |
| onClose | `() => void` | Yes |  |
| onSave | `(card: KanbanCardData) => void` | No |  |
| onDelete | `(id: string) => void` | No |  |
| readOnly | `boolean` | No |  |
| className | `string` | No |  |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
