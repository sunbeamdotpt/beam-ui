import { Kbd } from "./kbd.tsx";

export default function KbdStory() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 12,
        alignItems: "center",
      }}
    >
      <Kbd>⌘K</Kbd>
      <Kbd>⌘</Kbd>
      <Kbd>⌥</Kbd>
      <Kbd>Shift</Kbd>
      <Kbd>Enter</Kbd>
      <Kbd>Tab</Kbd>
      <Kbd>Esc</Kbd>
      <Kbd>↑</Kbd>
      <Kbd>↓</Kbd>
      <Kbd>←</Kbd>
      <Kbd>→</Kbd>
      <Kbd>Backspace</Kbd>
      <Kbd>Space</Kbd>
    </div>
  );
}

export function ModifierKey() {
  return <Kbd>⌘</Kbd>;
}
export function Shortcut() {
  return <Kbd>⌘K</Kbd>;
}
export function ArrowKeys() {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Kbd>↑</Kbd>
      <Kbd>↓</Kbd>
      <Kbd>←</Kbd>
      <Kbd>→</Kbd>
    </div>
  );
}
export function WindowsPlatform() {
  return <Kbd platform="windows">⌘K</Kbd>;
}
export function LinuxPlatform() {
  return <Kbd platform="linux">⌘K</Kbd>;
}
export function MacPlatform() {
  return <Kbd platform="mac">⌘K</Kbd>;
}
