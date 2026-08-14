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

export const overrides: Record<string, ComponentOverride> = {
  // Modals are closed unless `open` is set — without a default they render
  // as invisible 0×0 instances on the canvas.
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
  //
  // The design-language navigation props (linkAs/currentPath/onNavigate/
  // isActive) are already hidden globally by the generator. Data-driven
  // components (Accordion items, StatBar stats, Steps steps, …) render
  // empty until sample data is curated here — add as we see real usage.
};
