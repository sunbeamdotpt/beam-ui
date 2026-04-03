# MarkdownEditor

> Write/preview markdown editor with formatting toolbar.

> **[View rendered page](https://design.sunbeam.pt/components/markdown-editor?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { MarkdownEditor } from "@sunbeam/beam-ui/components/ui/markdown-editor"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| value | `string` | Yes | Markdown content |
| onChange | `(value: string) => void` | Yes | Content change handler |
| placeholder | `string` | No | Placeholder text |
| minHeight | `string` | No | Minimum editor height |
| className | `string` | No | Additional CSS class |

## Usage
```tsx
<MarkdownEditor value={md} onChange={setMd} placeholder="Write something..." />
```

## Features
- Write/Preview tabs
- Formatting toolbar (bold, italic, link, code, etc.)
- Live markdown preview

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
