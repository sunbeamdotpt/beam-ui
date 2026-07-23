import { useState } from "react";
import { NumberInput } from "./number-input.tsx";

export default function NumberInputStory() {
  const [value, setValue] = useState(5);

  return (
    <div style={{ maxWidth: 240 }}>
      <NumberInput
        value={value}
        onChange={setValue}
        min={0}
        max={100}
        step={1}
        label="Quantity"
      />
    </div>
  );
}

export function WithoutLabel() {
  const [value, setValue] = useState(10);
  return (
    <div style={{ maxWidth: 240 }}>
      <NumberInput value={value} onChange={setValue} min={0} max={100} />
    </div>
  );
}

export function LargeStep() {
  const [value, setValue] = useState(50);
  return (
    <div style={{ maxWidth: 240 }}>
      <NumberInput value={value} onChange={setValue} min={0} max={1000} step={10} label="Amount" />
    </div>
  );
}
