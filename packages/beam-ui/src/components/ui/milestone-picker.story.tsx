import { useState } from "react";
import { type MilestoneOption, MilestonePicker } from "./milestone-picker.tsx";

const options: MilestoneOption[] = [
  {
    id: "m1",
    title: "v1.0 Launch",
    dueDate: "May 1, 2026",
    progress: 85,
    open: 3,
    closed: 17,
  },
  {
    id: "m2",
    title: "v1.1 Polish",
    dueDate: "Jun 15, 2026",
    progress: 30,
    open: 14,
    closed: 6,
  },
  { id: "m3", title: "v2.0 Redesign", progress: 5, open: 22, closed: 1 },
];

export default function MilestonePickerStory() {
  const [selected, setSelected] = useState<string | null>("m1");

  return (
    <div style={{ maxWidth: 320 }}>
      <MilestonePicker
        options={options}
        selected={selected}
        onChange={setSelected}
      />
    </div>
  );
}

export function NoSelection() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div style={{ maxWidth: 320 }}>
      <MilestonePicker
        options={options}
        selected={selected}
        onChange={setSelected}
      />
    </div>
  );
}

export function SingleOption() {
  const single: MilestoneOption[] = [{
    id: "m1",
    title: "v1.0",
    progress: 100,
    open: 0,
    closed: 20,
  }];
  const [selected, setSelected] = useState<string | null>("m1");
  return (
    <div style={{ maxWidth: 320 }}>
      <MilestonePicker
        options={single}
        selected={selected}
        onChange={setSelected}
      />
    </div>
  );
}
