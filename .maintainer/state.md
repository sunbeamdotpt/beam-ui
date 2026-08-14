---
type: State
title: Current state of beam-ui
description: What is in flight, what is blocked, what the next session should pick up first.
tags: [state]
timestamp: 2026-08-14T18:45:00Z
---

# State — 2026-08-14 (BEAM-002 verification fixes)

Additional Studio verification failures fixed and pushed in `69cf72a`:

- `Beam / KanbanCardDetail` sample checklist shape now matches the component's
  expected `{ id, title, done }[]` array, eliminating the `.filter` TypeError.
- `Beam / LoginForm` now has clean defaults (`oauthProviders: []`, `error: ""`,
  `loading: false`) so the props panel no longer shows unset values.
- `Beam / MarkdownEditor` exposes `value` as a writable Plasmic state, making
  the textarea editable in Studio interactive mode.
- `Beam / KanbanCardDetail` exposes `open` as a writable Plasmic state via a
  new `onOpenChange` callback, so the dialog can be opened/closed in Studio.

`deno task ci` green, `npm run test:plasmic:registry` zero warnings,
`npm run test:plasmic:kitchen-sink` passes for light and dark. The Vite dev
server is still running for live Studio verification.

## In flight

- **BEAM-002** — Plasmic app-host scope + implement (in review column).
  Implementation complete. Awaiting human Studio verification of the latest
  fixes; report any remaining drag-test failures and we'll patch them.
- **BEAM-006** and **BEAM-007** — blocked on the human for Plasmic project ID
  + public API token (W1 of the original scope).

## Pick up first

1. **Human verification in Plasmic Studio**: refresh the host page, re-drag
   `Beam / KanbanCardDetail`, `Beam / LoginForm`, and `Beam / MarkdownEditor`,
   and confirm the checklist renders, the login form shows clean defaults, and
   the markdown editor can be typed in interactive mode.
2. If any other components fail drag-test verification, add sample data or
   writable states in `app/src/plasmic/registry.overrides.tsx` and regenerate.
3. **Unblock BEAM-006/BEAM-007** by providing the Plasmic project ID + public
   API token when ready.

# State — 2026-08-14 (BEAM-002 Phase 2 closed + registry triage + Accordion state)

BEAM-002 implementation is complete and pushed through `7b449a1`. `deno task ci`
green, app build green, `npm run test:plasmic:registry` passes with **zero
warnings**, and the kitchen-sink harness renders all registered components with
**zero error boxes** in light/dark. The Plasmic host canvas defaults to dark
mode; every registered component that requires data now ships with sample
defaults.

Registry now has **84 components** (down from 91). Page-level layouts
(`ApiLayout`, `DocsLayout`, `FullwidthLayout`), the full-app `Shell`, and the
shell sub-components `Header`, `Footer`, `Sidebar` are excluded because they are
page wrappers or composed inside Shell, not canvas building blocks. `Breadcrumbs`
stays registered as a standalone navigation primitive.

`Beam / Accordion` now exposes its open/closed value as a writable Plasmic
state. In Studio it can be toggled in **Focus mode** with **interactive mode**
turned on.

## In flight

- **BEAM-002** — Plasmic app-host scope + implement (in review column).
  Implementation complete. Awaiting human Studio verification.
- **BEAM-006** and **BEAM-007** — blocked on the human for Plasmic project ID
  + public API token (W1 of the original scope).

## Done this session

- Defaulted the Plasmic host canvas to dark mode via `data-theme="dark"` on
  the host document and dark surface colors on the artboard root in
  `canvas-overrides.css`.
- Unlocked the `Beam / Checkbox` `checked` prop in Studio by adding
  `required: false` to the prop override.
- Primary variant default fix committed (`6afa57d`); generator now sets
  `defaultValue: "primary"` when a variant group contains that option.
- Added sample data defaults in `registry.overrides.tsx` for all 25+
  data-driven components that previously had empty required object/array props.
- Exposed `Beam / Accordion` state to Plasmic Studio by adding controlled mode
  (`value` + `onValueChange`) and registering a writable state (`25dcf79`).
- Extended `registry.overrides.tsx` and the generator to support `states` and
  event-handler `argTypes`.
- Removed page-level layouts and `Shell` from the Plasmic registry (`c8978f3`).
- Removed `Header`, `Footer`, and `Sidebar` from the Plasmic registry
  (`7b449a1`).
- Regenerated app artifacts committed (`public/api/components.json`,
  `src/generated/build-info.ts`, `components.generated.json`).

## Pick up first

1. **Human verification in Plasmic Studio**: refresh the host page, ensure Focus
   mode + interactive mode are on, then click `Beam / Accordion` sections to
   confirm they expand/collapse.
2. **Apply the same state-exposure pattern** to other stateful components if
   Studio interaction is desired: Tabs, ToggleGroup, Switch, Checkbox, etc.
3. **Unblock BEAM-006/BEAM-007** by providing the Plasmic project ID + public
   API token when ready.

# State — 2026-08-14 (BEAM-002 Phase 2 defaults curated)

Six commits pushed this session (`f936480`..`80fb395`). Phase 1 (repeatable
harness) and Phase 2 (curated defaults) of BEAM-002 are now complete.
`deno task ci` green, app build green,
`npm run test:plasmic:registry` passes with **zero warnings**, and the
kitchen-sink harness renders all 91 registered components with **zero error
boxes** in light/dark.

## In flight

- **BEAM-002** — Plasmic app-host scope + implement (in progress column).
  Phase 1 + Phase 2 done. Remaining: optional richer sample data for advanced
  object props of data-heavy components (Accordion, ActivityHeatmap,
  Breadcrumbs, CodeBlock, CommentThread, CommitGraph, ContextMenu, DiffViewer,
  charts, etc.) — these do not block basic Studio usage and can be curated as
  real use cases arise.
- **BEAM-006** and **BEAM-007** — blocked on the human for Plasmic project ID
  + public API token (W1 of the original scope).

## Done this session

- Phase 1 harness: `components.generated.json`, validation script,
  `/plasmic-kitchen-sink`, Playwright snapshots, npm scripts.
- Phase 2 defaults: design-language-aligned `defaultValue` for all 48 required
  scalar props plus co-dependent array defaults (options, steps, tabs,
  branches, milestones, wizard steps). Zero validation warnings.
- Studio feedback loop fixes: generator now emits real booleans (not `"false"`
  strings) for boolean defaults; Breadcrumbs got sample `items`.
- Docs visual re-baseline run; no git-tracked changes because
  `app/tests/__screenshots__/` is gitignored.
- Generated app artifacts committed per standing housekeeping rule
  (`public/api/components.json`, `src/generated/build-info.ts`).

## Pick up first

1. **Human verification in Plasmic Studio**: refresh the host page, then
   re-drag fresh Beam / Breadcrumbs and Beam / Checkbox. Breadcrumbs should
   render without the `map` error; Checkbox toggles should default off and
   be editable. Report any mismatch and we'll add overrides.
2. **Continue sample-data pass**: add defaults for remaining advanced required
   object/array props (Accordion, List, ContextMenu, DropdownMenu, charts,
   tables, etc.) so every dragged component renders on the canvas.
3. **Unblock BEAM-006/BEAM-007** by providing the Plasmic project ID + public
   API token when ready.

# State — 2026-08-06 (v0.14.0 shipped; Plasmic scoped)

All July loose ends resolved, pushed (`f3713ec`..`7bad499`), and released
as **v0.14.0** (tag pushed; CHANGELOG.md created). Image built via run
31128925488 (workflow_dispatch — push triggers were swallowed by the
2026-08-06 GitHub Actions incident): `v0.14.0`/`v0.14`/`v0`/`latest` at
index sha256:f7116363…. Deploy card **SBBB-082** filed. Gates: tests
green, `deno publish --dry-run` passes; **coverage gate waived by the
human** (no tooling; harness is BEAM-001 work). `deno publish` to JSR is
the human's action per charter — needs `--token` or interactive login.

## Plasmic (BEAM-002)

Scoped 2026-08-06, doc at `docs/plasmic-app-host-scope.md`. Decided:
full codegen, no loader (Plasmic for UI design/wiring; we own the
pipeline). Cards: BEAM-003 plumbing, BEAM-004 token generator, BEAM-005
component registry, BEAM-006 Studio cutover, BEAM-007 codegen pipeline.
W1 (create Plasmic project, pick plan, get ID + public API token) is the
human's.

All July loose ends resolved — 11 commits on mainline (rebased onto the
f3713ec docs PR; pre-rebase hashes in log.md entries are stale).
`deno task ci` + app build green; 5-page Playwright visual spot-check
clean (kanban, badge, code-block, diff-viewer, charts).

## Resolved this session

- **Kanban ticketing migration** edits committed (`41138e5`).
- **Stale Gitea pipeline** — `workflows.yaml` deleted, `sunbeam.yaml`
  rewritten for the Deno/ghcr.io stack (`7e54f11`).
- **Dependabot** — 66 open alerts → 2 (`eb410ed`). Remaining:
  react-router GHSA-qwww-vcr4-c8h2 (patched only in 8.3.0 — major bump,
  needs the human's call) and one dompurify low with no published patch.
- **Fonts self-hosted** (`e25954c`) — root cause was both Monaspace CDN
  URLs 404ing. Ysabeau Infant + Monaspace Argon v1.400 + Material Symbols
  now ship as woff2 in the package. Known gap: JSR `exports` has no
  `./styles/*` subpath (app resolves via Vite alias; external JSR
  consumers can't import fonts.css — pre-existing, unaddressed).
- **Token migration complete** (phases 1–3 + long tail, `44b8a30`,
  `93faca7`, `c6bf97e`, `c6f6593`, `0468c16`, `1ca1c07`). Component
  source is token-only except documented exceptions (palette data files,
  Mermaid/light-syntax themes, gradients/calc/grid tracks, SVG attrs).
  Key gotcha learned: **Panda silently drops imported constants inside
  css()** — status colors live in `data/statuses.ts` (`statusColors`)
  and are applied via inline style.

## Deferred

- Plan phases 5–7 (Fresh 2.x showcase, release prep) → card **BEAM-001**
  on the ideas board.
- react-router 8.x major bump (see above) — awaiting human decision.

## Housekeeping

- Generated app artifacts (public/docs/*.md, llms.txt, components.json,
  build-info, page-dates, storybook panda.css) ARE committed
  (`88783a9`) — the human wants them current in git for the container.
  Keep committing them with app-affecting changes from now on.
- `packages/beam-ui-typst/` WIP is the human's — untouched.
- If npm install breaks Deno symlinks: `rm -rf
  packages/beam-ui/node_modules/.deno .bin && deno install`.

## Pick up first

- The new work the human mentioned (was blocked on this cleanup).
- Check boards: `sunbeam kanban card list` on dev/support/ideas.

# State — 2026-07-23 (after push)

## In flight

- **Multi-arch image pipeline**: mainline pushed (`a7ffd3b`); the
  Release Container workflow is building and pushing
  `ghcr.io/sunbeamdotpt/beam-ui:latest` (linux/amd64+arm64).
- Scratch from the verification work (`.visual-diff/`, `.baseline-worktree/`)
  has been removed. Visual reports are gone; the method is documented in
  log.md if it needs repeating.

## Done and pushed (4 commits on top of the Jun-3 line)

- `0dcbcdf` feat(beam-ui): modernization + repairs
- `80f0f36` docs(app): showcase/storybook updates
- `e113f91` chore: this `.maintainer` bundle + AGENTS.md
- `a7ffd3b` ci: multi-arch release workflow

Verification behind them: `deno task ci` green, app + storybook builds
green, and a 208-screen visual regression vs the old baseline that caught
and fixed three systemic Panda bugs (see log.md 2026-07-23 entry).
