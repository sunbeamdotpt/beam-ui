# CodeEditor

> Full code editor powered by CodeMirror 6 with Beam syntax themes and language support.

> **[View rendered page](https://design.sunbeam.pt/components/code-editor?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { CodeEditor } from "@sunbeam/beam-ui/components/ui/code-editor"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| value | `string` | Yes | Editor content |
| onChange | `(value: string) => void` | No | Content change handler |
| language | `string` | No | Language mode |
| placeholder | `string` | No | Placeholder text |
| readOnly | `boolean` | No | Read-only mode |
| className | `string` | No | Additional CSS class |

## Usage
```tsx
<CodeEditor value={code} onChange={setCode} language="javascript" />
```

## Features
- CodeMirror 6 engine
- Beam syntax themes (light/dark)
- Line numbers, active line highlight
- Search, history, key bindings

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
