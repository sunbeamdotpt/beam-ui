# Kbd

> Props for {@link Kbd}. */
export interface KbdProps {
  /** Keyboard key name or symbol (e.g., "Ctrl", "⌘", "Enter", "⌘K"). */
  children: string;
  /** Override platform detection. Defaults to auto-detect based on user agent. */
  platform?: "mac" | "windows" | "linux";
  /** Optional CSS class for additional styling. */
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
      aria-hidden="true"
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
    if (platform === "linux") {
      return (
        <>
          <KeyIcon name="keyboard_command_key" /> Super
        </>
      );
    }
    return "Ctrl";
  }
  if (key === "\u2325") {
    if (platform === "mac") return <KeyIcon name="keyboard_option_key" />;
    return "Alt";
  }
  if (key === "Shift") {
    return (
      <>
        <KeyIcon name="shift" /> Shift
      </>
    );
  }
  if (key === "Ctrl") return "Ctrl";
  if (key === "Alt") return "Alt";
  if (key === "Tab") {
    return (
      <>
        <KeyIcon name="keyboard_tab" /> Tab
      </>
    );
  }
  if (key === "Enter") {
    return (
      <>
        <KeyIcon name="keyboard_return" /> Enter
      </>
    );
  }
  if (key === "Backspace") {
    return (
      <>
        <KeyIcon name="backspace" /> Backspace
      </>
    );
  }
  if (key === "Space") {
    return (
      <>
        <KeyIcon name="space_bar" /> Space
      </>
    );
  }
  if (key === "Esc") return "Esc";

  // Arrow keys
  if (key === "\u2191") return <KeyIcon name="keyboard_arrow_up" />;
  if (key === "\u2193") return <KeyIcon name="keyboard_arrow_down" />;
  if (key === "\u2190") return <KeyIcon name="keyboard_arrow_left" />;
  if (key === "\u2192") return <KeyIcon name="keyboard_arrow_right" />;

  // Compound shortcuts like ⌘K
  if (key.startsWith("\u2318") && key.length > 1) {
    const letter = key.slice(1);
    if (platform === "mac") {
      return (
        <>
          <KeyIcon name="keyboard_command_key" />
          {letter}
        </>
      );
    }
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

/** Keyboard key badge with platform-aware rendering (Mac command symbols, Windows/Linux Ctrl, etc.). Renders Material Symbol icons for special keys and cross-platform transliteration for modifiers. * @example ```tsx <Kbd>⌘K</Kbd> <Kbd platform="windows">Ctrl+S</Kbd> <Kbd>Enter</Kbd> ```

> **[View rendered page](https://design.sunbeam.pt/components/kbd?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Kbd } from "@sunbeam/beam-ui/components/ui/kbd"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| children | `string` | Yes | Keyboard key name or symbol (e.g., "Ctrl", "⌘", "Enter", "⌘K"). |
| platform | `"mac" | "windows" | "linux"` | No | Override platform detection. Defaults to auto-detect based on user agent. |
| className | `string` | No | Optional CSS class for additional styling. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
