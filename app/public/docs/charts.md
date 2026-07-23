# LineChart

> Props for {@link LineChart}. */
export interface LineChartProps {
  /** Array of data points with a `label` key and numeric data series. */
  data: ChartDataPoint[];
  /** Array of line series; each specifies a data `key`, optional `color`, and optional `label`. */
  lines: { key: string; color?: string; label?: string }[];
  /** Chart height in pixels. Defaults to 300. */
  height?: number;
  /** Additional Panda CSS classes. */
  className?: string;
  /** Accessible description of the chart for screen readers. */
  "aria-label"?: string;
}

/** Recharts line chart wrapper with beam-ui styling. * Displays one or more lines with grid, axes, legend, and tooltip. Custom tooltip shows data values with consistent formatting. Colors cycle from a warm palette if not specified. * @example ```tsx <LineChart data={[{ label: "Jan", revenue: 4000 }, { label: "Feb", revenue: 5200 }]} lines={[{ key: "revenue", label: "Monthly Revenue" }]} /> ```

> **[View rendered page](https://design.sunbeam.pt/components/charts?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { LineChart } from "@sunbeam/beam-ui/components/ui/charts"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| data | `ChartDataPoint[]` | Yes | Array of data points with a `label` key and numeric data series. |
| lines | `{ key: string` | Yes | Array of line series; each specifies a data `key`, optional `color`, and optional `label`. |
| color | `string` | No |  |

## Also Exports
- `BarChart`
- `PieChart`
- `AreaChart`

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
