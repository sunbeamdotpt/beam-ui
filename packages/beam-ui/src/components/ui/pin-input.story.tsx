import { useState } from "react";
import { PinInput } from "./pin-input";

export default function PinInputStory() {
  const [value, setValue] = useState("");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <PinInput value={value} onChange={setValue} label="Verification code" />
      <PinInput value="" onChange={() => {}} length={6} mask label="Masked (6 digits)" />
    </div>
  );
}

export function FourDigit() {
  const [value, setValue] = useState("");
  return <PinInput value={value} onChange={setValue} length={4} label="4-digit code" />;
}

export function SixDigit() {
  const [value, setValue] = useState("");
  return <PinInput value={value} onChange={setValue} length={6} label="6-digit code" />;
}

export function Masked() {
  const [value, setValue] = useState("");
  return <PinInput value={value} onChange={setValue} length={4} mask label="PIN (masked)" />;
}
