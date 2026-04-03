# Wizard

> If true, the Next button is disabled until the consumer sets it to false */
  isValid?: boolean;
}

export interface WizardProps {
  steps: WizardStep[];
  onComplete: () => void;
  onCancel?: () => void;
  /** Called when step changes — receives the new step index */
  onStepChange?: (step: number) => void;
  /** Labels for the buttons */
  nextLabel?: string;
  backLabel?: string;
  completeLabel?: string;
  cancelLabel?: string;
  className?: string;
}

export interface WizardModalProps extends WizardProps {
  open: boolean;
  onClose: () => void;
  title?: string;
}

/* ------------------------------------------------------------------ */
/* Wizard                                                              */
/* ------------------------------------------------------------------

> **[View rendered page](https://design.sunbeam.pt/components/wizard?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Wizard } from "@sunbeam/beam-ui/components/ui/wizard"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| steps | `WizardStep[]` | Yes |  |
| onComplete | `() => void` | Yes |  |
| onCancel | `() => void` | No |  |
| onStepChange | `(step: number) => void` | No | Called when step changes — receives the new step index |
| nextLabel | `string` | No | Labels for the buttons |
| backLabel | `string` | No |  |
| completeLabel | `string` | No |  |
| cancelLabel | `string` | No |  |
| className | `string` | No |  |

## Also Exports
- `WizardModal`

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
