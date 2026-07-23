# Wizard

> Step in a {@link Wizard} or {@link WizardModal}. */
export interface WizardStep {
  /** Step title displayed in the indicator and header. */
  title: string;
  /** Optional description displayed above the step content. */
  description?: string;
  /** Step content (form, text, or other React nodes). */
  content: ReactNode;
  /** Whether the step is valid. If false, the Next button is disabled. Defaults to `true`. */
  isValid?: boolean;
}

/** Props for {@link Wizard}. */
export interface WizardProps {
  /** Array of wizard steps with title and content. */
  steps: WizardStep[];
  /** Called when the final step is completed. */
  onComplete: () => void;
  /** Called when the user clicks Cancel (only shown on first step). */
  onCancel?: () => void;
  /** Called when the user advances to a new step with its index. */
  onStepChange?: (step: number) => void;
  /** Button label for advancing to the next step. Defaults to `"Continue"`. */
  nextLabel?: string;
  /** Button label for returning to the previous step. Defaults to `"Back"`. */
  backLabel?: string;
  /** Button label on the final step. Defaults to `"Finish"`. */
  completeLabel?: string;
  /** Button label for canceling (first step only). Defaults to `"Cancel"`. */
  cancelLabel?: string;
  /** Optional CSS class applied to the root container. */
  className?: string;
}

/** Props for {@link WizardModal}. */
export interface WizardModalProps extends WizardProps {
  /** Whether the modal is open. */
  open: boolean;
  /** Called when the user closes the modal (via close button or Escape). */
  onClose: () => void;
  /** Optional title displayed in the modal header. */
  title?: string;
}

/* ------------------------------------------------------------------ */
/* Wizard                                                              */
/* ------------------------------------------------------------------ */

/** Multi-step wizard with progress indicator and navigation buttons. Shows one step at a time with title, optional description, and custom content. Back button disabled on first step; Cancel only shown on first step. * @example ```tsx <Wizard steps={[ { title: "Profile", content: <ProfileForm /> }, { title: "Preferences", content: <PreferencesForm /> }, ]} onComplete={() => console.log("done")} onCancel={() => console.log("cancelled")} /> ```

> **[View rendered page](https://design.sunbeam.pt/components/wizard?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Wizard } from "@sunbeam/beam-ui/components/ui/wizard"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| steps | `WizardStep[]` | Yes | Array of wizard steps with title and content. |
| onComplete | `() => void` | Yes | Called when the final step is completed. |
| onCancel | `() => void` | No | Called when the user clicks Cancel (only shown on first step). |
| onStepChange | `(step: number) => void` | No | Called when the user advances to a new step with its index. |
| nextLabel | `string` | No | Button label for advancing to the next step. Defaults to `"Continue"`. |
| backLabel | `string` | No | Button label for returning to the previous step. Defaults to `"Back"`. |
| completeLabel | `string` | No | Button label on the final step. Defaults to `"Finish"`. |
| cancelLabel | `string` | No | Button label for canceling (first step only). Defaults to `"Cancel"`. |
| className | `string` | No | Optional CSS class applied to the root container. |

## Also Exports
- `WizardModal`

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
