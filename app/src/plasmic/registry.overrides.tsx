/**
 * Plasmic component-registry overrides — hand-curated, merged over the
 * generated skeleton (components.generated.tsx) at registration time.
 *
 * - skipComponents: never registered in Studio (see scope doc §4 triage).
 * - overrides: per-component meta patches; `props` are merged per-key over
 *   the generated prop metadata (set a prop to null to hide it).
 *
 * This module is imported BOTH by the build-time generator
 * (scripts/generate-plasmic-registry.ts, for skipComponents) and by the
 * generated runtime module — keep it free of side effects.
 */
import type { ReactNode } from "react";

export interface PropOverride {
  type?: string;
  options?: (string | number)[];
  displayName?: string;
  description?: string;
  defaultValue?: unknown;
  hidden?: boolean;
  advanced?: boolean;
  allowedComponents?: string[];
  defaultValueContent?: ReactNode;
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
  // Curated adjustments go here. Example (slot with default content):
  //
  // Dialog: {
  //   props: {
  //     children: {
  //       type: "slot",
  //       defaultValueContent: <p>Edit me</p>,
  //     },
  //   },
  // },
  //
  // The design-language navigation props (linkAs/currentPath/onNavigate/
  // isActive) are already hidden globally by the generator.
};
