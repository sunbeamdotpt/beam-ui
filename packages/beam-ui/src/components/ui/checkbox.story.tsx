import { useState } from "react";
import { Checkbox } from "./checkbox.tsx";

export default function CheckboxStory() {
  const [checked, setChecked] = useState(false);
  const [accepted, setAccepted] = useState(true);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Checkbox
        checked={checked}
        onChange={setChecked}
        label="Enable notifications"
      />
      <Checkbox
        checked={accepted}
        onChange={setAccepted}
        label="I accept the terms"
      />
      <Checkbox
        checked={false}
        onChange={() => {}}
        label="Disabled option"
        disabled
      />
      <Checkbox
        checked={false}
        onChange={() => {}}
        label="Indeterminate"
        indeterminate
      />
    </div>
  );
}

export function Checked() {
  return <Checkbox checked onChange={() => {}} label="Checked" />;
}
export function Unchecked() {
  return <Checkbox checked={false} onChange={() => {}} label="Unchecked" />;
}
export function Disabled() {
  return <Checkbox checked={false} onChange={() => {}} label="Disabled" disabled />;
}
export function DisabledChecked() {
  return <Checkbox checked onChange={() => {}} label="Disabled Checked" disabled />;
}
export function Indeterminate() {
  return (
    <Checkbox
      checked={false}
      onChange={() => {}}
      label="Indeterminate"
      indeterminate
    />
  );
}
export function WithoutLabel() {
  return <Checkbox checked onChange={() => {}} />;
}
