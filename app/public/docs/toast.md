# Toast

> Toast notification style variant. */
type ToastVariant = "success" | "error" | "info";

/** Props for {@link Toast}. */
export interface ToastProps {
  /** Message text displayed in the toast. */
  message: string;
  /** Visual variant. Defaults to `"info"`. */
  variant?: ToastVariant;
  /** Whether the toast is visible. Controls slide-in/out animation. */
  visible: boolean;
  /** Called when the user clicks the close button or auto-dismiss timer expires (4.5s). */
  onDismiss?: () => void;
  /** Called when the toast becomes visible. */
  onShow?: () => void;
}

/** Fixed-position toast notification with auto-dismiss and manual close. Positioned bottom-right; auto-hides after 4.5 seconds if `onDismiss` is provided. Fires `onShow` when toast becomes visible and `onDismiss` on timer or close click. * @example ```tsx const [visible, setVisible] = useState(false); <Toast message="Changes saved" variant="success" visible={visible} onDismiss={() => setVisible(false)} /> ```

> **[View rendered page](https://design.sunbeam.pt/components/toast?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Toast } from "@sunbeam/beam-ui/components/ui/toast"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| message | `string` | Yes | Message text displayed in the toast. |
| variant | `ToastVariant` | No | Visual variant. Defaults to `"info"`. |
| visible | `boolean` | Yes | Whether the toast is visible. Controls slide-in/out animation. |
| onDismiss | `() => void` | No | Called when the user clicks the close button or auto-dismiss timer expires (4.5s). |
| onShow | `() => void` | No | Called when the toast becomes visible. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
