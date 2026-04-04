import { useState } from "react";
import { TextInput } from "./text-input";

export default function TextInputStory() {
  const [value, setValue] = useState("");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 320 }}>
      <TextInput value={value} onChange={setValue} label="Email" placeholder="you@example.com" type="email" />
      <TextInput value="bad input" onChange={() => {}} label="With error" error="This field is required" />
      <TextInput value="" onChange={() => {}} label="Disabled" placeholder="Cannot edit" disabled />
    </div>
  );
}

export function Default() {
  const [value, setValue] = useState("");
  return <TextInput value={value} onChange={setValue} label="Name" placeholder="Enter name" />;
}

export function WithError() {
  return <TextInput value="bad" onChange={() => {}} label="Email" error="Invalid email address" />;
}

export function Disabled() {
  return <TextInput value="" onChange={() => {}} label="Locked" placeholder="Cannot edit" disabled />;
}

export function Password() {
  const [value, setValue] = useState("");
  return <TextInput value={value} onChange={setValue} label="Password" type="password" placeholder="Enter password" />;
}

export function EmailType() {
  const [value, setValue] = useState("");
  return <TextInput value={value} onChange={setValue} label="Email" type="email" placeholder="you@example.com" />;
}

export function NumberType() {
  const [value, setValue] = useState("");
  return <TextInput value={value} onChange={setValue} label="Quantity" type="number" placeholder="0" />;
}

export function TextType() {
  const [value, setValue] = useState("");
  return <TextInput value={value} onChange={setValue} label="Name" type="text" placeholder="Enter name" />;
}
