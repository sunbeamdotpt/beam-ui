// @storyName Charts
import { LineChart, BarChart, PieChart, AreaChart } from "./charts";

const lineData = [
  { label: "Jan", commits: 120, issues: 45 },
  { label: "Feb", commits: 180, issues: 62 },
  { label: "Mar", commits: 150, issues: 38 },
  { label: "Apr", commits: 220, issues: 71 },
  { label: "May", commits: 290, issues: 55 },
  { label: "Jun", commits: 260, issues: 48 },
];

const barData = [
  { label: "Frontend", prs: 42, reviews: 38 },
  { label: "Backend", prs: 67, reviews: 54 },
  { label: "Infra", prs: 23, reviews: 21 },
  { label: "Docs", prs: 15, reviews: 12 },
  { label: "Mobile", prs: 31, reviews: 28 },
];

export default function ChartsStory() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, maxWidth: 700 }}>
      <LineChart
        data={lineData}
        lines={[
          { key: "commits", label: "Commits" },
          { key: "issues", label: "Issues" },
        ]}
        aria-label="Monthly commits and issues"
      />
      <BarChart
        data={barData}
        bars={[
          { key: "prs", label: "Pull Requests" },
          { key: "reviews", label: "Reviews" },
        ]}
        aria-label="PRs and reviews by team"
      />
    </div>
  );
}

export function LineChartOnly() {
  return (
    <div style={{ maxWidth: 700 }}>
      <LineChart data={lineData} lines={[{ key: "commits", label: "Commits" }]} aria-label="Monthly commits" />
    </div>
  );
}

export function BarChartOnly() {
  return (
    <div style={{ maxWidth: 700 }}>
      <BarChart data={barData} bars={[{ key: "prs", label: "Pull Requests" }]} aria-label="PRs by team" />
    </div>
  );
}

export function PieChartExample() {
  return (
    <div style={{ maxWidth: 400 }}>
      <PieChart
        data={[
          { name: "TypeScript", value: 45 },
          { name: "Rust", value: 25 },
          { name: "Go", value: 20 },
          { name: "Python", value: 10 },
        ]}
        aria-label="Language distribution"
      />
    </div>
  );
}

export function DonutChart() {
  return (
    <div style={{ maxWidth: 400 }}>
      <PieChart
        data={[
          { name: "Open", value: 12 },
          { name: "Closed", value: 34 },
          { name: "Draft", value: 5 },
        ]}
        donut
        aria-label="Issue status"
      />
    </div>
  );
}

export function AreaChartExample() {
  return (
    <div style={{ maxWidth: 700 }}>
      <AreaChart data={lineData} areas={[{ key: "commits", label: "Commits" }]} aria-label="Monthly commits area" />
    </div>
  );
}
