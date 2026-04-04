import { useState } from "react";
import { Toggle } from "./toggle";

export default function ToggleStory() {
  const [pressed, setPressed] = useState(false);

  return (
    <Toggle pressed={pressed} onChange={setPressed}>
      {pressed ? "On" : "Off"}
    </Toggle>
  );
}

export function Pressed() { return <Toggle pressed={true} onChange={() => {}}>Active</Toggle>; }
export function Unpressed() { return <Toggle pressed={false} onChange={() => {}}>Inactive</Toggle>; }
