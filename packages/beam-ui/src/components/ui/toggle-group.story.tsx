import { useState } from "react";
import { ToggleGroup } from "./toggle-group.tsx";

export default function ToggleGroupStory() {
  const [value, setValue] = useState("grid");

  return (
    <ToggleGroup
      value={value}
      onChange={setValue}
      items={[
        { value: "list", label: "List" },
        { value: "grid", label: "Grid" },
        { value: "board", label: "Board" },
      ]}
    />
  );
}

export function TwoItems() {
  const [value, setValue] = useState("on");
  return <ToggleGroup value={value} onChange={setValue} items={[{ value: "on", label: "On" }, { value: "off", label: "Off" }]} />;
}

export function ManyItems() {
  const [value, setValue] = useState("day");
  return (
    <ToggleGroup
      value={value}
      onChange={setValue}
      items={[
        { value: "day", label: "Day" },
        { value: "week", label: "Week" },
        { value: "month", label: "Month" },
        { value: "year", label: "Year" },
      ]}
    />
  );
}
