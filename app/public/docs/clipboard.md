# Clipboard

> Props for {@link Clipboard}. */
export interface ClipboardProps {
  /** Text to copy to clipboard when triggered. */
  value: string;
  /** Custom trigger element (e.g., button or icon). If omitted, renders a default "Copy" button. */
  children?: ReactNode;
  /** Duration (ms) to show "Copied!" feedback. Defaults to 2000. */
  timeout?: number;
}

/** Copy-to-clipboard button with visual feedback. * Wraps ark-ui's Clipboard component. Shows "Copy" with icon by default, or renders custom children as the trigger. Displays "Copied!" checkmark for the specified timeout. * @example ```tsx <Clipboard value="npm install @sunbeam/beam-ui" /> <Clipboard value="token123" timeout={1500}> <button type="button">Copy Token</button> </Clipboard> ```

> **[View rendered page](https://design.sunbeam.pt/components/clipboard?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Clipboard } from "@sunbeam/beam-ui/components/ui/clipboard"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| value | `string` | Yes | Text to copy to clipboard when triggered. |
| children | `ReactNode` | No | Custom trigger element (e.g., button or icon). If omitted, renders a default "Copy" button. |
| timeout | `number` | No | Duration (ms) to show "Copied!" feedback. Defaults to 2000. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
