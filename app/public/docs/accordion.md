# Accordion

> Collapsible content sections built on Ark UI with single or multiple expand modes.

> **[View rendered page](https://design.sunbeam.pt/components/accordion?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Accordion } from "@sunbeam/beam-ui/components/ui/accordion"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| items | `AccordionEntry[]` | Yes | Array of { value, title, content } |
| multiple | `boolean` | No | Allow multiple items open |
| defaultValue | `string[]` | No | Initially expanded items |
| className | `string` | No | Additional CSS class |

## Usage
```tsx
<Accordion items={[{ value: "faq1", title: "Question?", content: <p>Answer.</p> }]} />
```

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
