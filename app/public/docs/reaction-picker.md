# ReactionPicker

> A single reaction with count and user toggle state. */
export interface Reaction {
  /** Emoji string. */
  emoji: string;
  /** Number of users who reacted with this emoji. */
  count: number;
  /** Whether the current user has reacted. */
  reacted: boolean;
}

/** Props for {@link ReactionPicker}. */
export interface ReactionPickerProps {
  /** Array of existing reactions to display. */
  reactions: Reaction[];
  /** Fired when existing reaction is clicked (toggle on/off). */
  onToggle: (emoji: string) => void;
  /** Fired when a new emoji is selected from the picker. */
  onAdd: (emoji: string) => void;
  /** Additional CSS class. */
  className?: string;
}

const COMMON_EMOJIS = [
  "\u{1F44D}",
  "\u{1F44E}",
  "\u{1F604}",
  "\u{1F389}",
  "\u{1F615}",
  "\u{2764}\u{FE0F}",
  "\u{1F680}",
  "\u{1F440}",
];

/** Reaction picker with existing reactions displayed and popover for adding new ones. Shows common emoji grid (8 selections) in the add popover. * @example ```tsx <ReactionPicker reactions={[{ emoji: "👍", count: 3, reacted: true }]} onToggle={(emoji) => console.log("Toggle:", emoji)} onAdd={(emoji) => console.log("Add:", emoji)} /> ```

> **[View rendered page](https://design.sunbeam.pt/components/reaction-picker?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { ReactionPicker } from "@sunbeam/beam-ui/components/ui/reaction-picker"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| reactions | `Reaction[]` | Yes | Array of existing reactions to display. |
| onToggle | `(emoji: string) => void` | Yes | Fired when existing reaction is clicked (toggle on/off). |
| onAdd | `(emoji: string) => void` | Yes | Fired when a new emoji is selected from the picker. |
| className | `string` | No | Additional CSS class. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
