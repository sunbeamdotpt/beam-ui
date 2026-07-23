# Accordion

> Represents a single accordion section. */
interface AccordionEntry {
  /** Unique identifier for the accordion item. */
  value: string;
  /** Visible heading text. */
  title: string;
  /** Content displayed when the item is expanded. */
  content: ReactNode;
}

/** Props for {@link Accordion}. */
export interface AccordionProps {
  /** Array of accordion items to render. */
  items: AccordionEntry[];
  /** If true, multiple sections can be expanded simultaneously; otherwise only one. Defaults to false. */
  multiple?: boolean;
  /** Section(s) expanded by default; array of `value` strings. */
  defaultValue?: string[];
  /** Additional Panda CSS classes. */
  className?: string;
}

/** Collapsible accordion with one or many expandable sections. * Each section shows a title and expands on click to reveal content. The expand/collapse icon rotates 180° when open. * @example ```tsx <Accordion items={[ { value: "q1", title: "How does it work?", content: "..." }, { value: "q2", title: "Is it free?", content: "..." }, ]} multiple={false} /> ```

> **[View rendered page](https://design.sunbeam.pt/components/accordion?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Accordion } from "@sunbeam/beam-ui/components/ui/accordion"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| items | `AccordionEntry[]` | Yes | Array of accordion items to render. |
| multiple | `boolean` | No | If true, multiple sections can be expanded simultaneously; otherwise only one. Defaults to false. |
| defaultValue | `string[]` | No | Section(s) expanded by default; array of `value` strings. |
| className | `string` | No | Additional Panda CSS classes. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
