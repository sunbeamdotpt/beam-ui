import { useState } from "react";
import { DatePicker } from "./date-picker";

export default function DatePickerStory() {
  const [value, setValue] = useState("2026-04-03");

  return (
    <div style={{ maxWidth: 300 }}>
      <DatePicker
        value={value}
        onChange={setValue}
        label="Due Date"
      />
    </div>
  );
}

export function WithoutLabel() {
  const [value, setValue] = useState("2026-04-03");
  return <div style={{ maxWidth: 300 }}><DatePicker value={value} onChange={setValue} /></div>;
}

export function Disabled() {
  return <div style={{ maxWidth: 300 }}><DatePicker value="2026-04-03" onChange={() => {}} label="Locked Date" disabled /></div>;
}

export function CustomPlaceholder() {
  const [value, setValue] = useState("");
  return <div style={{ maxWidth: 300 }}><DatePicker value={value} onChange={setValue} label="Start Date" placeholder="Pick a start date" /></div>;
}
