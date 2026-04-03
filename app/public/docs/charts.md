# Charts

> Chart components (Line, Bar, Pie, Area) built on Recharts with Beam theming.

> **[View rendered page](https://design.sunbeam.pt/components/charts?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Charts } from "@sunbeam/beam-ui/components/ui/charts"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| data | `ChartDataPoint[]` | Yes | Data points with label and numeric values |
| dataKeys | `string[]` | Yes | Keys to plot from data |
| height | `number` | No | Chart height in pixels |
| className | `string` | No | Additional CSS class |

## Usage
```tsx
<LineChart data={[{ label: "Jan", value: 100 }]} dataKeys={["value"]} />
```

## Features
- LineChart, BarChart, PieChart, AreaChart
- Responsive containers
- Beam color palette
- Tooltips and legends

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
