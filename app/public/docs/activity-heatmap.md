# ActivityHeatmap

> Single day in the activity heatmap. */
export interface ActivityDay {
  /** ISO 8601 date string (YYYY-MM-DD). */
  date: string;
  /** Number of contributions or activities on this day. */
  count: number;
}

/** Props for {@link ActivityHeatmap}. */
export interface ActivityHeatmapProps {
  /** Array of daily activity data (last 365 days). */
  data: ActivityDay[];
  /** Additional Panda CSS classes. */
  className?: string;
}

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const LEVEL_COLORS_LIGHT = [
  "rgba(127,99,21,0.08)", // border.subtle (light)
  "#ffe8a0", // very light gold
  "#ffd06a", // sunshine.300
  "#ffb83e", // sunshine.500
  "#fa520f", // sunbeam.orange
];

const LEVEL_COLORS_DARK = [
  "rgba(255,161,16,0.08)", // border.subtle (dark)
  "rgba(255,208,106,0.25)", // faint gold
  "#ffd06a", // sunshine.300
  "#ffb83e", // sunshine.500
  "#fa520f", // sunbeam.orange
];

function getLevel(count: number): number {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

const CELL = 11;
const GAP = 2;
const STEP = CELL + GAP;
const LABEL_W = 32;

/** GitHub-style activity heatmap showing contributions over the last 365 days. * Renders an SVG grid where each cell represents one day, colored by intensity (0–5 levels). Includes month labels, day-of-week labels, and a legend. Horizontally scrollable on small screens. * @example ```tsx const data = [ { date: "2026-01-01", count: 3 }, { date: "2026-01-02", count: 0 }, ]; <ActivityHeatmap data={data} /> ```

> **[View rendered page](https://design.sunbeam.pt/components/activity-heatmap?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { ActivityHeatmap } from "@sunbeam/beam-ui/components/ui/activity-heatmap"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| data | `ActivityDay[]` | Yes | Array of daily activity data (last 365 days). |
| className | `string` | No | Additional Panda CSS classes. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
