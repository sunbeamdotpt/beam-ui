import { Button } from "./button";

export default function ButtonStory() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
      <Button variant="primary">Primary</Button>
      <Button variant="dark">Dark</Button>
      <Button variant="cream">Cream</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="text">Text Link</Button>
    </div>
  );
}

export function Primary() { return <Button variant="primary">Primary</Button>; }
export function Dark() { return <Button variant="dark">Dark</Button>; }
export function Cream() { return <Button variant="cream">Cream</Button>; }
export function Ghost() { return <Button variant="ghost">Ghost</Button>; }
export function Text() { return <Button variant="text">Text Link</Button>; }
export function Disabled() { return <Button variant="primary" disabled>Disabled</Button>; }
export function DisabledDark() { return <Button variant="dark" disabled>Disabled Dark</Button>; }
export function DisabledCream() { return <Button variant="cream" disabled>Disabled Cream</Button>; }
export function DisabledGhost() { return <Button variant="ghost" disabled>Disabled Ghost</Button>; }
export function AsLink() { return <Button variant="primary" href="https://example.com">External Link</Button>; }
export function SubmitType() { return <Button variant="primary" type="submit">Submit</Button>; }
export function ResetType() { return <Button variant="ghost" type="reset">Reset</Button>; }
