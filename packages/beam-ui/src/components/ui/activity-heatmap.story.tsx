import { ActivityHeatmap } from "./activity-heatmap";
import type { ActivityDay } from "./activity-heatmap";

function generateSampleData(): ActivityDay[] {
  const data: ActivityDay[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const iso = date.toISOString().split("T")[0];
    const count = Math.random() < 0.3 ? 0 : Math.floor(Math.random() * 12);
    data.push({ date: iso, count });
  }
  return data;
}

const sampleData = generateSampleData();

export default function ActivityHeatmapStory() {
  return <ActivityHeatmap data={sampleData} />;
}

export function Empty() {
  const emptyData: ActivityDay[] = Array.from({ length: 365 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (364 - i));
    return { date: date.toISOString().split("T")[0], count: 0 };
  });
  return <ActivityHeatmap data={emptyData} />;
}

export function HighActivity() {
  const highData: ActivityDay[] = Array.from({ length: 365 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (364 - i));
    return { date: date.toISOString().split("T")[0], count: Math.floor(Math.random() * 15) + 5 };
  });
  return <ActivityHeatmap data={highData} />;
}
