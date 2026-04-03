# SyntaxHighlighter

> Code syntax highlighting powered by Shiki with custom Beam light/dark themes.

> **[View rendered page](https://design.sunbeam.pt/components/syntax-highlighter?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { SyntaxHighlighter } from "@sunbeam/beam-ui/components/ui/syntax-highlighter"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| code | `string` | Yes | Source code to highlight |
| language | `string` | Yes | Language identifier (e.g. 'typescript') |
| theme | `"light" | "dark"` | No | Color theme override |
| showLineNumbers | `boolean` | No | Display line numbers |
| highlightLines | `number[]` | No | Lines to highlight |
| className | `string` | No | Additional CSS class |

## Usage
```tsx
<SyntaxHighlighter code="const x = 1;" language="typescript" showLineNumbers />
```

## Features
- Shiki-powered highlighting
- Custom Beam dark/light themes
- Line number gutter
- Line highlighting

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
