import { useState } from "react";
import { Switch } from "./switch";

export default function SwitchStory() {
  const [checked, setChecked] = useState(true);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Switch checked={checked} onChange={setChecked} label="Enable notifications" />
      <Switch checked={false} onChange={() => {}} label="Disabled" disabled />
    </div>
  );
}

export function On() { return <Switch checked={true} onChange={() => {}} label="Enabled" />; }
export function Off() { return <Switch checked={false} onChange={() => {}} label="Disabled toggle" />; }
export function Disabled() { return <Switch checked={false} onChange={() => {}} label="Cannot change" disabled />; }
export function DisabledChecked() { return <Switch checked={true} onChange={() => {}} label="Locked on" disabled />; }
export function WithoutLabel() { return <Switch checked={true} onChange={() => {}} />; }
