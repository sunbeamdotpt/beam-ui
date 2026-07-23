# Dialog

> Props for {@link Dialog}. */
export interface DialogProps {
  /** If true, the dialog is visible; if false, it is hidden. */
  open: boolean;
  /** Callback fired when the user closes the dialog (via close button or backdrop click). */
  onClose: () => void;
  /** Title displayed at the top of the dialog. */
  title: string;
  /** Main content of the dialog (typically text, form fields, or other components). */
  children: ReactNode;
  /** Optional action buttons (typically rendered at the bottom right of the dialog). */
  actions?: ReactNode;
}

/** Modal dialog with title, body, and optional action buttons. * Renders a centered modal over a semi-transparent backdrop. Supports keyboard escape to close. Integrates with Ark UI's DialogRoot for accessibility. * @example ```tsx <Dialog open={show} onClose={() => setShow(false)} title="Confirm Action"> <p>Are you sure?</p> <div style={{ display: "flex", gap: "8px" }}> <Button onClick={confirm}>Yes</Button> <Button variant="ghost" onClick={() => setShow(false)}>Cancel</Button> </div> </Dialog> ```

> **[View rendered page](https://design.sunbeam.pt/components/dialog?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Dialog } from "@sunbeam/beam-ui/components/ui/dialog"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| open | `boolean` | Yes | If true, the dialog is visible; if false, it is hidden. |
| onClose | `() => void` | Yes | Callback fired when the user closes the dialog (via close button or backdrop click). |
| title | `string` | Yes | Title displayed at the top of the dialog. |
| children | `ReactNode` | Yes | Main content of the dialog (typically text, form fields, or other components). |
| actions | `ReactNode` | No | Optional action buttons (typically rendered at the bottom right of the dialog). |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
