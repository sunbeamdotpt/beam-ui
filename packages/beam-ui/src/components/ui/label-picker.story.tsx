import { useState } from "react";
import { LabelPicker, type LabelOption } from "./label-picker.tsx";

const options: LabelOption[] = [
  { id: "bug", name: "Bug", color: "#ef4444", description: "Something isn't working" },
  { id: "feature", name: "Feature", color: "#10b981", description: "New functionality" },
  { id: "docs", name: "Documentation", color: "#6366f1", description: "Improvements to docs" },
  { id: "perf", name: "Performance", color: "#f59e0b", description: "Speed and efficiency" },
  { id: "security", name: "Security", color: "#ec4899" },
];

export default function LabelPickerStory() {
  const [selected, setSelected] = useState<string[]>(["bug"]);

  return (
    <div style={{ maxWidth: 320 }}>
      <LabelPicker options={options} selected={selected} onChange={setSelected} />
    </div>
  );
}

export function NoSelection() {
  const [selected, setSelected] = useState<string[]>([]);
  return <div style={{ maxWidth: 320 }}><LabelPicker options={options} selected={selected} onChange={setSelected} /></div>;
}

export function MultipleSelected() {
  const [selected, setSelected] = useState<string[]>(["bug", "feature", "docs"]);
  return <div style={{ maxWidth: 320 }}><LabelPicker options={options} selected={selected} onChange={setSelected} /></div>;
}
