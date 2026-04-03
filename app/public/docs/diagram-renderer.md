# DiagramRenderer

> Renders Mermaid diagram definitions to SVG with Beam theming.

> **[View rendered page](https://design.sunbeam.pt/components/diagram-renderer?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { DiagramRenderer } from "@sunbeam/beam-ui/components/ui/diagram-renderer"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| code | `string` | Yes | Mermaid diagram definition |
| className | `string` | No | Additional CSS class |

## Usage
```tsx
<DiagramRenderer code="graph TD; A-->B; B-->C;" />
```

## Features
- Mermaid.js rendering
- Beam-themed colors (light/dark)
- Error fallback display

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
