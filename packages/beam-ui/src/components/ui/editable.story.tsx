import { useState } from "react";
import { Editable } from "./editable";

export default function EditableStory() {
  const [value, setValue] = useState("Click me to edit");

  return (
    <div style={{ maxWidth: 400 }}>
      <Editable value={value} onChange={setValue} placeholder="Click to edit..." />
    </div>
  );
}

export function Empty() {
  const [value, setValue] = useState("");
  return <div style={{ maxWidth: 400 }}><Editable value={value} onChange={setValue} placeholder="Type something..." /></div>;
}

export function WithLongText() {
  const [value, setValue] = useState("This is a much longer editable text that demonstrates how the component handles multi-word content");
  return <div style={{ maxWidth: 400 }}><Editable value={value} onChange={setValue} /></div>;
}
