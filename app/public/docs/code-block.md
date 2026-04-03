# CodeBlock

> Content keyed by toggle combo, e.g. "Non-streaming|V2|Synchronous". Falls back to "default". */
  variants?: Record<string, ReactNode>;
  /** Simple content (no variants) */
  content?: ReactNode;
}

interface ToggleGroup {
  options: string[];
  defaultValue?: string;
}

interface CodeBlockProps {
  tabs: CodeTab[];
  streamToggle?: ToggleGroup;
  versionToggle?: ToggleGroup;
  modeToggle?: ToggleGroup;
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
    <div role="group" className={css({ display: "flex", backgroundColor: "sunbeam.black", borderRadius: "md", padding: "2px" })}>
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          aria-pressed={value === opt}
          className={cx(
            css({
              padding: "4px 12px",
              fontSize: "10px",
              fontWeight: "button",
              borderRadius: "md",
              textTransform: "uppercase",
              border: "none",
              cursor: "pointer",
              transition: "all 0.15s ease",
              fontFamily: "body",
            }),
            value === opt
              ? css({ backgroundColor: "code.activePill", color: "white" })
              : css({ backgroundColor: "transparent", color: "rgba(255,255,255,0.35)", _hover: { color: "rgba(255,255,255,0.7)" } })
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* CodeBlock                                                           */
/* ------------------------------------------------------------------

> **[View rendered page](https://design.sunbeam.pt/components/code-block?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { CodeBlock } from "@sunbeam/beam-ui/components/ui/code-block"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| tabs | `CodeTab[]` | Yes |  |
| streamToggle | `ToggleGroup` | No |  |
| versionToggle | `ToggleGroup` | No |  |
| modeToggle | `ToggleGroup` | No |  |
| className | `string` | No |  |

## Also Exports
- `syn`

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
