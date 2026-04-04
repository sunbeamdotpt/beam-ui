import { ThemeToggle } from "./theme-toggle";

export default function ThemeToggleStory() {
  return (
    <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
      <ThemeToggle variant="icon" />
      <ThemeToggle variant="switch" />
      <ThemeToggle variant="pill" />
    </div>
  );
}

export function IconVariant() { return <ThemeToggle variant="icon" />; }
export function SwitchVariant() { return <ThemeToggle variant="switch" />; }
export function PillVariant() { return <ThemeToggle variant="pill" />; }
