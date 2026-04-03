# CodeBlock

> Tabbed code display with optional toggle groups for streaming, version, and mode variants.

> **[View rendered page](https://design.sunbeam.pt/components/code-block?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { CodeBlock } from "@sunbeam/beam-ui/components/ui/code-block"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| tabs | `CodeTab[]` | Yes | Array of code tabs with label and content/variants |
| streamToggle | `ToggleGroup` | No | Toggle for streaming vs non-streaming |
| versionToggle | `ToggleGroup` | No | Toggle for API version |
| modeToggle | `ToggleGroup` | No | Toggle for sync/async mode |
| className | `string` | No | Additional CSS class |

## Usage
```tsx
<CodeBlock tabs={[{ label: "Python", content: <pre>print("hello")</pre> }]} />
```

## Features
- Multiple language tabs
- Pill toggle groups for variants
- Copy-to-clipboard support

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
