import { css, cx } from "styled-system/css";
import {
  ResponsiveContainer,
  LineChart as RLineChart,
  Line,
  BarChart as RBarChart,
  Bar,
  PieChart as RPieChart,
  Pie,
  Cell,
  AreaChart as RAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

/* ------------------------------------------------------------------ */
/* Shared types & constants                                            */
/* ------------------------------------------------------------------ */

interface ChartDataPoint {
  label: string;
  [key: string]: string | number;
}

const DEFAULT_COLORS = [
  "#fa520f",  // sunbeam orange
  "#4a9eff",  // steel blue
  "#5bb8a6",  // teal
  "#a855f7",  // purple
  "#f59e0b",  // amber
  "#ef4444",  // red
  "#22c55e",  // green
  "#ec4899",  // pink
];

/* ------------------------------------------------------------------ */
/* Custom tooltip                                                      */
/* ------------------------------------------------------------------ */
function BeamTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;

  return (
    <div className={tooltipWrapper}>
      {label && <p className={tooltipLabel}>{label}</p>}
      {payload.map((entry: any, i: number) => (
        <p key={i} className={tooltipEntry}>
          <span
            className={tooltipDot}
            style={{ backgroundColor: entry.color }}
          />
          {entry.name}: <strong className={tooltipValue}>{typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value}</strong>
        </p>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* LineChart                                                           */
/* ------------------------------------------------------------------ */
interface LineChartProps {
  data: ChartDataPoint[];
  lines: { key: string; color?: string; label?: string }[];
  height?: number;
  className?: string;
}

export function LineChart({ data, lines, height = 300, className }: LineChartProps) {
  return (
    <div className={cx(chartWrapper, className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RLineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.15)" />
          <XAxis
            dataKey="label"
            tick={axisTick}
            axisLine={{ stroke: "rgba(128,128,128,0.2)" }}
            tickLine={false}
          />
          <YAxis
            tick={axisTick}
            axisLine={{ stroke: "rgba(128,128,128,0.2)" }}
            tickLine={false}
          />
          <Tooltip content={<BeamTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: "12px", fontFamily: "var(--fonts-body)" }}
          />
          {lines.map((line, i) => (
            <Line
              key={line.key}
              type="monotone"
              dataKey={line.key}
              name={line.label ?? line.key}
              stroke={line.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          ))}
        </RLineChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* BarChart                                                            */
/* ------------------------------------------------------------------ */
interface BarChartProps {
  data: ChartDataPoint[];
  bars: { key: string; color?: string; label?: string }[];
  height?: number;
  className?: string;
}

export function BarChart({ data, bars, height = 300, className }: BarChartProps) {
  return (
    <div className={cx(chartWrapper, className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RBarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.15)" />
          <XAxis
            dataKey="label"
            tick={axisTick}
            axisLine={{ stroke: "rgba(128,128,128,0.2)" }}
            tickLine={false}
          />
          <YAxis
            tick={axisTick}
            axisLine={{ stroke: "rgba(128,128,128,0.2)" }}
            tickLine={false}
          />
          <Tooltip content={<BeamTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: "12px", fontFamily: "var(--fonts-body)" }}
          />
          {bars.map((bar, i) => (
            <Bar
              key={bar.key}
              dataKey={bar.key}
              name={bar.label ?? bar.key}
              fill={bar.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]}
              radius={[2, 2, 0, 0]}
            />
          ))}
        </RBarChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* PieChart                                                            */
/* ------------------------------------------------------------------ */
interface PieChartProps {
  data: { name: string; value: number; color?: string }[];
  height?: number;
  donut?: boolean;
  className?: string;
}

export function PieChart({ data, height = 300, donut = false, className }: PieChartProps) {
  return (
    <div className={cx(chartWrapper, className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={donut ? 60 : 0}
            outerRadius={100}
            dataKey="value"
            nameKey="name"
            paddingAngle={donut ? 2 : 0}
          >
            {data.map((entry, i) => (
              <Cell
                key={entry.name}
                fill={entry.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<BeamTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: "12px", fontFamily: "var(--fonts-body)" }}
          />
        </RPieChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* AreaChart                                                           */
/* ------------------------------------------------------------------ */
interface AreaChartProps {
  data: ChartDataPoint[];
  areas: { key: string; color?: string; label?: string }[];
  height?: number;
  className?: string;
}

export function AreaChart({ data, areas, height = 300, className }: AreaChartProps) {
  return (
    <div className={cx(chartWrapper, className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RAreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.15)" />
          <XAxis
            dataKey="label"
            tick={axisTick}
            axisLine={{ stroke: "rgba(128,128,128,0.2)" }}
            tickLine={false}
          />
          <YAxis
            tick={axisTick}
            axisLine={{ stroke: "rgba(128,128,128,0.2)" }}
            tickLine={false}
          />
          <Tooltip content={<BeamTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: "12px", fontFamily: "var(--fonts-body)" }}
          />
          {areas.map((area, i) => {
            const color = area.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length];
            return (
              <Area
                key={area.key}
                type="monotone"
                dataKey={area.key}
                name={area.label ?? area.key}
                stroke={color}
                fill={color}
                fillOpacity={0.15}
                strokeWidth={2}
              />
            );
          })}
        </RAreaChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Styles                                                              */
/* ------------------------------------------------------------------ */

const chartWrapper = css({
  backgroundColor: "bg.card",
  border: "1px solid",
  borderColor: "border.default",
  borderRadius: "0",
  padding: "24px",
});

const axisTick = {
  fontSize: 11,
  fill: "rgba(128,128,128,0.7)",
  fontFamily: "'Monaspace Argon', 'SF Mono', 'Fira Code', monospace",
};

const tooltipWrapper = css({
  backgroundColor: "bg.page",
  border: "1px solid",
  borderColor: "border.default",
  padding: "12px 16px",
  fontSize: "13px",
  fontFamily: "body",
  color: "text.primary",
  shadow: "sm",
});

const tooltipLabel = css({
  fontWeight: "heading",
  marginBottom: "4px",
  fontSize: "12px",
  color: "text.secondary",
});

const tooltipEntry = css({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontSize: "13px",
  margin: 0,
  lineHeight: 1.6,
});

const tooltipValue = css({
  fontFamily: "mono",
});

const tooltipDot = css({
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  flexShrink: 0,
});
