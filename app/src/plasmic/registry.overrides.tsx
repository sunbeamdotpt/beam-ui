/**
 * Plasmic component-registry overrides — hand-curated, merged over the
 * generated skeleton (components.generated.tsx) at registration time.
 *
 * - skipComponents: never registered in Studio (see scope doc §4 triage).
 * - overrides: per-component meta patches; `props` are merged per-key over
 *   the generated prop metadata (set a prop to null to hide it). Slot props
 *   take Plasmic's `defaultValue` (any ReactNode, so JSX works here).
 *
 * This module is imported BOTH by the build-time generator
 * (scripts/generate-plasmic-registry.ts, for skipComponents) and by the
 * generated runtime module — keep it free of side effects.
 */

export interface PropOverride {
  type?: string;
  options?: (string | number)[];
  displayName?: string;
  description?: string;
  defaultValue?: unknown;
  hidden?: boolean;
  advanced?: boolean;
  allowedComponents?: string[];
}

export interface ComponentOverride {
  displayName?: string;
  description?: string;
  props?: Record<string, PropOverride | null>;
}

/** Components that must not appear in Studio. */
export const skipComponents: string[] = [
  // DnD kit drag interactions fight the Studio canvas; needs a staticMode
  // prop in the library + a usePlasmicCanvasContext() wrapper (scope doc §4).
  "KanbanBoard",
  // Keyboard-driven modal — no meaningful canvas representation.
  "CommandPalette",
];

// Shared sample data sets reused across data-driven components.
const SAMPLE_BRANCHES = ["main", "develop", "feature/auth"];
const SAMPLE_TAGS = ["v1.0.0", "v1.1.0"];
const SAMPLE_OPTIONS = [
  { value: "option-1", label: "Option 1" },
  { value: "option-2", label: "Option 2" },
];
const SAMPLE_TABS = [
  { value: "tab-1", label: "Overview" },
  { value: "tab-2", label: "Details" },
];
const SAMPLE_STEPS = [
  { title: "Personal", description: "Your info" },
  { title: "Payment" },
  { title: "Review" },
];
const SAMPLE_WIZARD_STEPS = [
  { title: "Profile", content: "Configure your profile." },
  { title: "Preferences", content: "Set your preferences." },
];

export const overrides: Record<string, ComponentOverride> = {
  // ------------------------------------------------------------------
  // Modals are closed unless `open` is set — without a default they render
  // as invisible 0×0 instances on the canvas.
  // ------------------------------------------------------------------
  Dialog: {
    props: {
      open: { defaultValue: true },
      title: { defaultValue: "Dialog title" },
      actions: {
        defaultValue: {
          type: "text",
          tag: "span",
          value: "Save",
        },
      },
    },
  },
  WizardModal: {
    props: {
      open: { defaultValue: true },
      title: { defaultValue: "Wizard" },
      steps: { defaultValue: SAMPLE_WIZARD_STEPS },
    },
  },
  Wizard: {
    props: {
      steps: { defaultValue: SAMPLE_WIZARD_STEPS },
    },
  },

  // ------------------------------------------------------------------
  // Simple scalar defaults so components render with design-language
  // placeholder content instead of blank 0×0 instances.
  // ------------------------------------------------------------------
  Avatar: {
    props: {
      name: { defaultValue: "Ada Lovelace" },
    },
  },
  BentoItem: {
    props: {
      variant: { defaultValue: "small" },
      title: { defaultValue: "Bento item" },
      description: { defaultValue: "Short description of this bento item." },
      difficulty: { defaultValue: "Beginner" },
      category: { defaultValue: "Web Development" },
    },
  },
  BranchSelector: {
    props: {
      branches: { defaultValue: SAMPLE_BRANCHES },
      tags: { defaultValue: SAMPLE_TAGS },
      current: { defaultValue: "main" },
      defaultBranch: { defaultValue: "main" },
    },
  },
  Breadcrumbs: {
    props: {
      items: {
        defaultValue: [
          { label: "Home", href: "/" },
          { label: "Components", href: "/components" },
          { label: "Breadcrumbs" },
        ],
      },
    },
  },
  Checkbox: {
    props: {
      checked: { defaultValue: false },
      label: { defaultValue: "Accept terms" },
    },
  },
  Clipboard: {
    props: {
      value: { defaultValue: "npm install @sunbeam/beam-ui" },
    },
  },
  CodeEditor: {
    props: {
      value: { defaultValue: "// Start coding\n" },
    },
  },
  ColorPicker: {
    props: {
      value: { defaultValue: "#FF5733" },
    },
  },
  Combobox: {
    props: {
      options: { defaultValue: SAMPLE_OPTIONS },
      value: { defaultValue: "option-1" },
    },
  },
  DiagramRenderer: {
    props: {
      code: { defaultValue: "flowchart TD\n  A[Start] --> B[End]" },
    },
  },
  Editable: {
    props: {
      value: { defaultValue: "Editable text" },
    },
  },
  EmptyState: {
    props: {
      title: { defaultValue: "Nothing here" },
      description: { defaultValue: "Add your first item to get started." },
      action: {
        defaultValue: {
          type: "text",
          tag: "span",
          value: "Create item",
        },
      },
    },
  },
  FeatureTile: {
    props: {
      name: { defaultValue: "Feature" },
      endpoint: { defaultValue: "/api/feature" },
      icon: { defaultValue: "star" },
    },
  },
  Header: {
    props: {
      actions: {
        defaultValue: {
          type: "text",
          tag: "span",
          value: "Action",
        },
      },
      brand: {
        defaultValue: {
          type: "text",
          tag: "span",
          value: "Beam",
        },
      },
    },
  },
  HoverCard: {
    props: {
      trigger: {
        defaultValue: {
          type: "text",
          tag: "span",
          value: "Hover me",
        },
      },
    },
  },
  Icon: {
    props: {
      name: { defaultValue: "star" },
    },
  },
  KanbanCardDetail: {
    props: {
      open: { defaultValue: true },
    },
  },
  MarkdownEditor: {
    props: {
      value: { defaultValue: "# Hello\n\nStart writing…" },
    },
  },
  MarkdownRenderer: {
    props: {
      content: { defaultValue: "# Hello\n\nRendered markdown." },
    },
  },
  MathRenderer: {
    props: {
      math: { defaultValue: "E = mc^2" },
    },
  },
  MilestonePicker: {
    props: {
      options: {
        defaultValue: [
          { id: "v1-0", title: "v1.0", progress: 75, open: 3, closed: 9 },
          { id: "v1-1", title: "v1.1", progress: 40, open: 5, closed: 2 },
        ],
      },
      selected: { defaultValue: "v1-0" },
    },
  },
  ModelRow: {
    props: {
      name: { defaultValue: "Solstice 4 Vision" },
      icon: { defaultValue: "model_training" },
      tier: { defaultValue: "Pro" },
      version: { defaultValue: "v1.0" },
      description: { defaultValue: "General-purpose reasoning model." },
    },
  },
  NumberInput: {
    props: {
      value: { defaultValue: 42 },
      label: { defaultValue: "Quantity" },
    },
  },
  Pagination: {
    props: {
      currentPage: { defaultValue: 1 },
      totalPages: { defaultValue: 5 },
    },
  },
  PinInput: {
    props: {
      value: { defaultValue: "1234" },
      label: { defaultValue: "Verification code" },
    },
  },
  Popover: {
    props: {
      trigger: {
        defaultValue: {
          type: "text",
          tag: "span",
          value: "Open",
        },
      },
    },
  },
  ProgressBar: {
    props: {
      value: { defaultValue: 65 },
    },
  },
  RadioGroup: {
    props: {
      options: { defaultValue: SAMPLE_OPTIONS },
      value: { defaultValue: "option-1" },
      label: { defaultValue: "Choose one" },
    },
  },
  Select: {
    props: {
      options: { defaultValue: SAMPLE_OPTIONS },
      value: { defaultValue: "option-1" },
    },
  },
  Shell: {
    props: {
      headerActions: {
        defaultValue: {
          type: "text",
          tag: "span",
          value: "Action",
        },
      },
      header: {
        defaultValue: {
          type: "text",
          tag: "span",
          value: "Header",
        },
      },
      footer: {
        defaultValue: {
          type: "text",
          tag: "span",
          value: "Footer",
        },
      },
      brand: {
        defaultValue: {
          type: "text",
          tag: "span",
          value: "Beam",
        },
      },
    },
  },
  Slider: {
    props: {
      value: { defaultValue: 50 },
      label: { defaultValue: "Amount" },
    },
  },
  Steps: {
    props: {
      steps: { defaultValue: SAMPLE_STEPS },
      currentStep: { defaultValue: 1 },
    },
  },
  Switch: {
    props: {
      checked: { defaultValue: false },
      label: { defaultValue: "Enable notifications" },
    },
  },
  SyntaxHighlighter: {
    props: {
      code: { defaultValue: "console.log('hello');" },
      language: { defaultValue: "javascript" },
    },
  },
  Tabs: {
    props: {
      items: { defaultValue: SAMPLE_TABS },
      activeValue: { defaultValue: "tab-1" },
    },
  },
  TextInput: {
    props: {
      value: { defaultValue: "Hello world" },
      label: { defaultValue: "Label" },
    },
  },
  Toast: {
    props: {
      message: { defaultValue: "Operation completed successfully." },
      visible: { defaultValue: true },
    },
  },
  Toggle: {
    props: {
      pressed: { defaultValue: false },
    },
  },
  ToggleGroup: {
    props: {
      items: { defaultValue: SAMPLE_OPTIONS },
      value: { defaultValue: "option-1" },
    },
  },
  Tooltip: {
    props: {
      content: { defaultValue: "Tooltip text" },
    },
  },
  //
  // The design-language navigation props (linkAs/currentPath/onNavigate/
  // isActive) are already hidden globally by the generator. Data-driven
  // components (Accordion items, StatBar stats, Steps steps, …) render
  // empty until sample data is curated here — add as we see real usage.
  //
};
