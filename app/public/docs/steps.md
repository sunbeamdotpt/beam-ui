# Steps

> Single step in a steps component. */
interface StepItem {
  /** Step title. */
  title: string;
  /** Optional step description. */
  description?: string;
}

/** Props for {@link Steps}. */
export interface StepsProps {
  /** Array of steps. */
  steps: StepItem[];
  /** Currently active step index (0-based). */
  currentStep: number;
  /** Optional callback when user clicks a step. */
  onChange?: (step: number) => void;
}

/** Horizontal step indicator with titles, optional descriptions, and completion markers. Completed steps show a checkmark, current step has a highlighted ring, upcoming steps are muted. Steps are clickable if onChange handler is provided. * @example ```tsx <Steps steps={[ { title: "Personal", description: "Your info" }, { title: "Payment" }, { title: "Review" }, ]} currentStep={1} onChange={(i) => setStep(i)} /> ```

> **[View rendered page](https://design.sunbeam.pt/components/steps?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { Steps } from "@sunbeam/beam-ui/components/ui/steps"
```

## Props
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| steps | `StepItem[]` | Yes | Array of steps. |
| currentStep | `number` | Yes | Currently active step index (0-based). |
| onChange | `(step: number) => void` | No | Optional callback when user clicks a step. |

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
