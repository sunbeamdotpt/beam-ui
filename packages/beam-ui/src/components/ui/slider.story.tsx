import { useState } from "react";
import { Slider } from "./slider.tsx";

export default function SliderStory() {
  const [value, setValue] = useState(40);

  return (
    <div style={{ maxWidth: 320 }}>
      <Slider value={value} onChange={setValue} label={`Volume: ${value}%`} />
    </div>
  );
}

export function WithoutLabel() {
  const [value, setValue] = useState(50);
  return (
    <div style={{ maxWidth: 320 }}>
      <Slider value={value} onChange={setValue} />
    </div>
  );
}

export function CustomRange() {
  const [value, setValue] = useState(500);
  return (
    <div style={{ maxWidth: 320 }}>
      <Slider
        value={value}
        onChange={setValue}
        min={0}
        max={1000}
        step={50}
        label={`$${value}`}
      />
    </div>
  );
}
