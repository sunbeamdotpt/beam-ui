import { useState } from "react";
import { Combobox } from "./combobox";

const languages = [
  { value: "ts", label: "TypeScript" },
  { value: "rs", label: "Rust" },
  { value: "go", label: "Go" },
  { value: "py", label: "Python" },
  { value: "java", label: "Java" },
  { value: "rb", label: "Ruby" },
  { value: "swift", label: "Swift" },
  { value: "kt", label: "Kotlin" },
];

export default function ComboboxStory() {
  const [value, setValue] = useState("ts");

  return (
    <div style={{ maxWidth: 320 }}>
      <Combobox
        options={languages}
        value={value}
        onChange={setValue}
        placeholder="Search languages..."
      />
    </div>
  );
}

export function Disabled() {
  return (
    <div style={{ maxWidth: 320 }}>
      <Combobox options={languages} value="ts" onChange={() => {}} disabled />
    </div>
  );
}

export function EmptyState() {
  const [value, setValue] = useState("");
  return (
    <div style={{ maxWidth: 320 }}>
      <Combobox options={[]} value={value} onChange={setValue} placeholder="No options available" />
    </div>
  );
}
