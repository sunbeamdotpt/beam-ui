# ActivityHeatmap

> GitHub-style contribution activity heatmap for the past year.

> **[View rendered page](https://design.sunbeam.pt/components/activity-heatmap?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { ActivityHeatmap } from "@sunbeam/beam-ui/components/ui/activity-heatmap"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| data | `ActivityDay[]` | Yes | Array of { date, count } entries |
| className | `string` | No | Additional CSS class |

## Usage
```tsx
<ActivityHeatmap data={[{ date: "2026-01-15", count: 5 }]} />
```

## Features
- 365-day grid layout
- 5-level color intensity
- Month labels
- Theme-aware colors

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
