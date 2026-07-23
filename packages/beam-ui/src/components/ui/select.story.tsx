import { useState } from "react";
import { Select } from "./select.tsx";

export default function SelectStory() {
  const [value, setValue] = useState("ts");

  return (
    <div style={{ maxWidth: 280 }}>
      <Select
        value={value}
        onChange={setValue}
        placeholder="Choose a language"
        options={[
          { value: "ts", label: "TypeScript" },
          { value: "rs", label: "Rust" },
          { value: "go", label: "Go" },
          { value: "py", label: "Python" },
        ]}
      />
    </div>
  );
}

export function Disabled() {
  return (
    <div style={{ maxWidth: 280 }}>
      <Select
        value="ts"
        onChange={() => {}}
        options={[{ value: "ts", label: "TypeScript" }]}
        disabled
      />
    </div>
  );
}

export function CustomPlaceholder() {
  const [value, setValue] = useState("");
  return (
    <div style={{ maxWidth: 280 }}>
      <Select
        value={value}
        onChange={setValue}
        placeholder="Pick a framework..."
        options={[{ value: "react", label: "React" }, { value: "vue", label: "Vue" }, {
          value: "svelte",
          label: "Svelte",
        }]}
      />
    </div>
  );
}

export function Default() {
  const [value, setValue] = useState("ts");
  return (
    <div style={{ maxWidth: 280 }}>
      <Select
        value={value}
        onChange={setValue}
        options={[{ value: "ts", label: "TypeScript" }, { value: "rs", label: "Rust" }, {
          value: "go",
          label: "Go",
        }]}
      />
    </div>
  );
}

export function ManyOptions() {
  const [value, setValue] = useState("a");
  return (
    <div style={{ maxWidth: 280 }}>
      <Select
        value={value}
        onChange={setValue}
        options={Array.from(
          { length: 20 },
          (_, i) => ({ value: String(i), label: `Option ${i + 1}` }),
        )}
      />
    </div>
  );
}
