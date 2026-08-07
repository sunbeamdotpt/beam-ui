# CodeBlock

> Represents a single code tab. */
interface CodeTab {
  /** Tab label (e.g., "JavaScript", "Python"). */
  label: string;
  /** Content keyed by toggle combo (e.g., "Non-streaming|V2|Synchronous"). Falls back to "default" key if no exact match. */
  variants?: Record<string, ReactNode>;
  /** Static content when no variants are used. */
  content?: ReactNode;
}

/** Toggle control group for filtering code variants. */
interface ToggleGroup {
  /** Array of option strings (e.g., ["Streaming", "Non-streaming"]). */
  options: string[];
  /** Initially selected option. Defaults to first option. */
  defaultValue?: string;
}

/** Props for {@link CodeBlock}. */
export interface CodeBlockProps {
  /** Array of code tabs to display. */
  tabs: CodeTab[];
  /** Optional streaming mode toggle (appears in top bar). */
  streamToggle?: ToggleGroup;
  /** Optional version toggle (appears in controls bar as pill group). */
  versionToggle?: ToggleGroup;
  /** Optional mode toggle (appears in controls bar as pill group). */
  modeToggle?: ToggleGroup;
  /** Additional Panda CSS classes. */
  className?: string;
}

/* ------------------------------------------------------------------ */
/* Small pill toggle                                                   */
/* ------------------------------------------------------------------ */
function PillToggle({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div
      role="group"
      className={css({
        display: "flex",
        backgroundColor: "sunbeam.black",
        borderRadius: "md",
        padding: "0.5",
      })}
    >
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          aria-pressed={value === opt}
          className={cx(
            css({
              py: "1",
              px: "3",
              fontSize: "2xs",
              fontWeight: "button",
              borderRadius: "md",
              textTransform: "uppercase",
              border: "none",
              cursor: "pointer",
              transition: "all 0.15s ease",
              fontFamily: "body",
            }),
            value === opt ? css({ backgroundColor: "code.activePill", color: "white" }) : css({
              backgroundColor: "transparent",
              color: "chrome.35",
              _hover: { color: "chrome.70" },
            }),
          )}
          type="button"
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* CodeBlock                                                           */
/* ------------------------------------------------------------------ */

/** Tabbed code block with copy button and optional variant toggles. * Renders multiple language/framework tabs. Each tab can have static content or variant-keyed content selected by toggles (stream mode, version, execution mode). Includes a copy button and syntax highlighting helpers via the `syn` export. * Variant resolution: exact key match first, then partial matches, then "default" fallback. * @example ```tsx <CodeBlock tabs={[ { label: "JavaScript", variants: { "Streaming|V2": <code>// streaming v2 code</code>, "default": <code>// fallback code</code> } } ]} streamToggle={{ options: ["Streaming", "Non-streaming"] }} versionToggle={{ options: ["V1", "V2"] }} /> ```

> **[View rendered page](https://design.sunbeam.pt/components/code-block?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { CodeBlock } from "@sunbeam/beam-ui/components/ui/code-block"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| tabs | `CodeTab[]` | Yes | Array of code tabs to display. |
| streamToggle | `ToggleGroup` | No | Optional streaming mode toggle (appears in top bar). |
| versionToggle | `ToggleGroup` | No | Optional version toggle (appears in controls bar as pill group). |
| modeToggle | `ToggleGroup` | No | Optional mode toggle (appears in controls bar as pill group). |
| className | `string` | No | Additional Panda CSS classes. |

## Also Exports
- `syn`

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
