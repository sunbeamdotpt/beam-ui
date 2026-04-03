# MathRenderer

> Renders LaTeX math expressions using KaTeX.

> **[View rendered page](https://design.sunbeam.pt/components/math-renderer?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { MathRenderer } from "@sunbeam/beam-ui/components/ui/math-renderer"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| math | `string` | Yes | LaTeX expression |
| display | `boolean` | No | Display mode (block) vs inline |
| className | `string` | No | Additional CSS class |

## Usage
```tsx
<MathRenderer math="E = mc^2" display />
```

## Features
- KaTeX rendering engine
- Display and inline modes
- Error fallback

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
