import { type ReactNode } from "react";
import { css, cx } from "styled-system/css";

interface KbdProps {
  children: string;
  /** Override platform detection. Defaults to auto-detect. */
  platform?: "mac" | "windows" | "linux";
  className?: string;
}

type Platform = "mac" | "windows" | "linux";

function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "mac";
  const ua = navigator.userAgent;
  if (/Mac|iPhone|iPad|iPod/i.test(ua)) return "mac";
  if (/Linux/i.test(ua)) return "linux";
  return "windows";
}

/** Material Symbol icon inline at key size */
function KeyIcon({ name }: { name: string }) {
  return (
    <span
      className="material-symbols-outlined"
      style={{ fontSize: "14px", lineHeight: 1, verticalAlign: "middle" }}
    >
      {name}
    </span>
  );
}

// Map Mac symbols to platform-specific renderings
// Returns ReactNode so we can mix icons + text
function resolveKey(key: string, platform: Platform): ReactNode {
  // Single modifier keys
  if (key === "\u2318") {
    if (platform === "mac") return <KeyIcon name="keyboard_command_key" />;
    if (platform === "linux") return <><KeyIcon name="keyboard_command_key" /> Super</>;
    return "Ctrl";
  }
  if (key === "\u2325") {
    if (platform === "mac") return <KeyIcon name="keyboard_option_key" />;
    return "Alt";
  }
  if (key === "Shift") {
    return <><KeyIcon name="shift" /> Shift</>;
  }
  if (key === "Ctrl") return "Ctrl";
  if (key === "Alt") return "Alt";
  if (key === "Tab") return <><KeyIcon name="keyboard_tab" /> Tab</>;
  if (key === "Enter") return <><KeyIcon name="keyboard_return" /> Enter</>;
  if (key === "Backspace") return <><KeyIcon name="backspace" /> Backspace</>;
  if (key === "Space") return <><KeyIcon name="space_bar" /> Space</>;
  if (key === "Esc") return "Esc";

  // Arrow keys
  if (key === "\u2191") return <KeyIcon name="keyboard_arrow_up" />;
  if (key === "\u2193") return <KeyIcon name="keyboard_arrow_down" />;
  if (key === "\u2190") return <KeyIcon name="keyboard_arrow_left" />;
  if (key === "\u2192") return <KeyIcon name="keyboard_arrow_right" />;

  // Compound shortcuts like ⌘K
  if (key.startsWith("\u2318") && key.length > 1) {
    const letter = key.slice(1);
    if (platform === "mac") return <><KeyIcon name="keyboard_command_key" />{letter}</>;
    if (platform === "linux") return <>Ctrl+{letter}</>;
    return <>Ctrl+{letter}</>;
  }

  // Pass through anything else
  return key;
}

const kbdStyle = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "bg.card",
  border: "1px solid",
  borderColor: "border.default",
  borderBottomWidth: "2px",
  borderRadius: "sm",
  fontFamily: "mono",
  fontSize: "13px",
  fontWeight: "body",
  lineHeight: 1,
  padding: "4px 8px",
  minWidth: "24px",
  color: "text.secondary",
  whiteSpace: "nowrap",
  verticalAlign: "middle",
});

export function Kbd({ children, platform, className }: KbdProps) {
  const detected = platform ?? detectPlatform();
  const content = resolveKey(children, detected);

  return <kbd className={cx(kbdStyle, className)}>{content}</kbd>;
}
