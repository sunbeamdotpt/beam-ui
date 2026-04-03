# Button

> Primary action element with multiple visual variants.

> **[View rendered page](https://design.sunbeam.pt/components/button?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Button } from "@sunbeam/beam-ui/components/ui/button"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| children | `ReactNode` | Yes | Button label content |
| variant | `"dark" | "cream" | "ghost" | "text" | "primary"` | No | Visual style variant |
| href | `string` | No | Renders as a Link when provided |
| onClick | `() => void` | No | Click handler |
| type | `"button" | "submit" | "reset"` | No | HTML button type |
| className | `string` | No | Additional CSS class |

## Usage
```tsx
<Button variant="dark" onClick={handleClick}>Submit</Button>
```

## Variants
- dark: Black background, white text
- cream: Gold background with border
- ghost: Transparent with border
- text: Text-only link style
- primary: Brand orange background

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
