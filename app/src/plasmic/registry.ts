/**
 * Plasmic registration — the single place where beam-ui components and
 * design tokens are registered for Plasmic Studio.
 *
 * Imported for side effects ONLY, by the /plasmic-host page. With the
 * codegen pattern, generated code imports our components via each
 * registration's `importPath` (the @sunbeam/beam-ui subpaths), so this
 * module never needs to ship in the public app bundle — only the host page
 * depends on everything registered here.
 *
 * Filled in by follow-up cards:
 *   W3 / BEAM-004 — token registrations generated from beamPreset
 *                   (generated file; do not hand-edit) — DONE
 *   W4 / BEAM-005 — component registrations (generated skeleton +
 *                   hand-curated overrides)
 *
 * Registrations use:
 *   import { registerComponent, registerToken } from "@plasmicapp/react-web/lib/host";
 */

// W3 / BEAM-004: design tokens from beamPreset (auto-generated).
import "./tokens.generated";

export {};
