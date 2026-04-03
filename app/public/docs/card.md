# Card

> Content container with icon, title, description, and call-to-action link.

> **[View rendered page](https://design.sunbeam.pt/components/card?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Card } from "@sunbeam/beam-ui/components/ui/card"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| icon | `string` | Yes | Material Symbols icon name |
| title | `string` | Yes | Card heading |
| description | `string` | Yes | Card body text |
| ctaLabel | `string` | Yes | Call-to-action button text |
| ctaHref | `string` | Yes | CTA link destination |
| className | `string` | No | Additional CSS class |

## Usage
```tsx
<Card icon="rocket" title="Get Started" description="Build your first app" ctaLabel="Read docs" ctaHref="/docs" />
```

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
