import { useState } from "react";
import { ColorPicker } from "./color-picker.tsx";

export default function ColorPickerStory() {
  const [color, setColor] = useState("#FA520F");

  return (
    <ColorPicker
      value={color}
      onChange={setColor}
      label="Brand Color"
    />
  );
}

export function WithoutLabel() {
  const [color, setColor] = useState("#3B82F6");
  return <ColorPicker value={color} onChange={setColor} />;
}

export function CustomPresets() {
  const [color, setColor] = useState("#000000");
  return (
    <ColorPicker
      value={color}
      onChange={setColor}
      label="Monochrome"
      presets={["#000000", "#333333", "#666666", "#999999", "#CCCCCC", "#FFFFFF"]}
    />
  );
}
