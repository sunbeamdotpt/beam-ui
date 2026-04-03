# MarkdownRenderer

> Renders GitHub Flavored Markdown to styled HTML using unified/remark/rehype pipeline.

> **[View rendered page](https://design.sunbeam.pt/components/markdown-renderer?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { MarkdownRenderer } from "@sunbeam/beam-ui/components/ui/markdown-renderer"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| content | `string` | Yes | Markdown string to render |
| className | `string` | No | Additional CSS class |

## Usage
```tsx
<MarkdownRenderer content="# Hello\n\nWorld" />
```

## Features
- GFM support (tables, task lists, strikethrough)
- HTML sanitization
- Theme-aware styling

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
