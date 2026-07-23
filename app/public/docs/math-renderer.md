# MathRenderer

> Props for {@link MathRenderer}. */
export interface MathRendererProps {
  /** LaTeX math string (e.g., `"E = mc^2"`, `"\\int_0^\\infty e^{-x^2} dx"`). */
  math: string;
  /** If true, renders as block (centered, full-width). Defaults to `false` (inline). */
  display?: boolean;
  /** Optional CSS class for the container. */
  className?: string;
}

let katexModule: typeof import("katex") | null = null;
let katexCssLoaded = false;

/** Renders LaTeX math expressions using KaTeX (lazy-loaded on first use). Supports both inline and display (block) modes with automatic error fallback to code rendering. * @example ```tsx <MathRenderer math="E = mc^2" /> <MathRenderer math="\\int_0^\\infty e^{-x^2} dx" display /> ```

> **[View rendered page](https://design.sunbeam.pt/components/math-renderer?render=html)** — see the live component with full DOM structure and styling.

## Import
```tsx
import { MathRenderer } from "@sunbeam/beam-ui/components/ui/math-renderer"
```

## Props
_No documented props._

---
*Part of the [Beam Design Language](https://design.sunbeam.pt) by Sunbeam Studios.*
