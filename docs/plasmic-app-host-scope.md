---
title: Plasmic App-Host — Scope (2026-08-06)
---

# Plasmic App-Host — Scope (2026-08-06)

Goal: make the hosted app container (design.sunbeam.pt) double as a
**Plasmic app host**, so Plasmic Studio can visually compose pages from the
real beam-ui components and design tokens. Tracked as card **BEAM-002**.

Sources: [Plasmic app-hosting docs](https://docs.plasmic.app/learn/app-hosting/),
[code-component registration](https://docs.plasmic.app/learn/registering-code-components/),
[style tokens](https://docs.plasmic.app/learn/tokens/),
[TanStack/Vite quickstart](https://docs.plasmic.app/learn/tanstack-quickstart/),
[Loader V2 / React 19](https://docs.plasmic.app/learn/upgrade-to-loader-v2/).

## 1. How app-hosting works (the mechanics)

- An **app host** is a route in our app (convention: `/plasmic-host`) that
  renders **only** `<PlasmicCanvasHost />` (from `@plasmicapp/react-web/lib/host`).
  Plasmic Studio loads this page in an iframe and renders artboards with our
  real components.
- Code components become available in Studio via `registerComponent(Component,
  { name, props })` calls, executed on the host page. Prop metadata drives
  the right-panel controls (`'string'`, `'number'`, `'boolean'`,
  `{ type: 'choice', options }`, `'slot'`, `'object'`, dynamic
  `hidden`/`options` functions, `defaultValue`, slot `allowedComponents`
  and `defaultValue` templates).
- Style tokens become available via `registerToken`. Supported token kinds:
  **color, font size, line height, opacity, spacing, font family**. Groups
  via `"Group / Name"` naming; token *targets* (global variants) cover
  dark/light mode.
- The host page must be **publicly reachable** for team editing
  (`https://design.sunbeam.pt/plasmic-host`), and the server must NOT send
  `X-Frame-Options: deny` (Studio iframes the page). Trusted-host security
  model: hosts are per-project trusted in Plasmic settings.
- No credentials are needed for the host page itself. A Plasmic **project ID
  + public API token** is only needed if/when the app *renders*
  Plasmic-authored content (loader runtime or codegen) — phase 2.

## 2. Repo fit (verified)

- `app/` is Vite + react-router v7 + **React 19** → use `@plasmicapp/react-web`
  (framework-agnostic; React 19 supported since Loader V2, 2026-03).
- beam-ui components are consumed as React source (Vite alias
  `@sunbeam/beam-ui` → `packages/beam-ui/src`); they register like any React
  component. No Preact runtime in the app bundle (deno.json maps `react` →
  npm:react@19).
- **Panda requirement**: components render via generated atomic classes, so
  the host page must import the same stylesheets as the app (Panda output +
  `@sunbeam/beam-ui/styles/fonts.css` + theme global.css). Extraction already
  covers library source via the July importMap fix.
- `server.ts` already SPA-falls-back to `app/dist/index.html`
  (server.ts:150-151) and sets no X-Frame-Options — keep it that way.
- 83 components indexed (`app/public/api/components.json`) — but that file is
  Penpot-oriented (names/variants only, no props). Registration metadata
  needs a new source.
- Registration code lives **in `app/`**, never in `packages/beam-ui` —
  Plasmic is a showcase-app integration and must not leak into the JSR
  package (design-language rule: heavy deps stay behind subpaths).

## 3. Token scope (beamPreset → Plasmic)

Direct mappings (registerToken):

| beamPreset | Plasmic token | Notes |
|---|---|---|
| `colors` palette (sunbeam/sunshine/beam/warm/etc.) | color tokens | group names `Beam / sunshine-700` etc. |
| `colors` alpha groups (accent.06–40, chrome.*, scrim.*, …) | color tokens | register exact rgba values |
| semantic colors (bg.*, text.*, border.*, accent) | color tokens | **two token targets**: Base (light) + Dark, from `_dark` values |
| `spacing` / `sizes` (0.25–360) | spacing tokens | numeric names kept (`Spacing / 2.5` = 10px) |
| `fontSizes` (named + numeric) | font-size tokens | values are rem/px strings |
| `fonts` (heading/body/mono) | font-family tokens | self-hosted woff2 already ships |
| `lineHeights` | line-height tokens | |

Gaps (no Plasmic token kind): **radii, shadows, fontWeights, textStyles,
breakpoints**. These stay baked into components; if Studio users need them,
the lever is registered component variants/props, not tokens. (Plasmic
"style presets" may cover some of this — evaluate during W5.)

Generation: write a script that reads `packages/beam-ui/src/preset.ts` and
emits a `plasmic-tokens.ts` registration module (run at app build like the
other generators) so tokens never drift from the preset.

## 4. Component scope — triage (83 components)

- **Register as-is (bulk)**: pure presentational css()-styled components —
  button, card, badge, callout, kbd, feature-tile, empty-state, bento-item,
  stat-bar, skeleton, spinner, avatar, list, table, tabs, accordion, steps,
  progress-bar, pagination, tooltip, clipboard, kbd, model-row, feature-tile…
  Props map mechanically: string/number/boolean/choice, `children` → slot.
- **Slot composition (needs default slot content)**: dialog, popover,
  dropdown-menu, context-menu, toast, notification-center, shell (Header/
  Sidebar/Footer/RightRail/Breadcrumbs), layouts. Register with
  `allowedComponents` + slot templates so editors don't start from empty
  boxes.
- **Needs wrapper or prop adaptation**: components with the design-language
  navigation props (`linkAs`, `currentPath`, `onNavigate`) — register with
  Studio-friendly props (plain `href` strings, hide function props);
  controlled-state components (auth-form, editable, tags-input, wizard) —
  expose `defaultValue`-style props, hide event handlers
  (`advanced: true`/`hidden`); `Spinner color` etc. stay strings.
- **Heavy subpath components** (charts, code-editor, syntax-highlighter,
  diagram-renderer, math-renderer, markdown-renderer/editor, kanban-board,
  kanban-card-detail): register via **dynamic import** (Plasmic docs support
  `next/dynamic`-style code splitting) so the host page bundle stays lean.
  DnD kanban inside the Studio canvas needs a static/canvas mode —
  `usePlasmicCanvasContext()` to disable drag interactions in-editor.
- **Skip for now**: tweak/* (internal theming dev-tools), command-palette
  (keyboard-driven, modal), scroll-area internals. Revisit later.

Metadata source: new generator (react-docgen-typescript against
`packages/beam-ui/src`, or hand-maintained registry module) producing
`plasmic-registry.tsx`. Given prop-control nuance (hidden rules, slot
templates), expect a **generated skeleton + hand-curated overrides** file.

## 5. Work breakdown (sub-cards under BEAM-002)

- **W1 — Plasmic project setup (human)**: create Plasmic project, pick plan
  (Starter free tier: 3 seats, 10k page views/mo), get project ID + public
  API token (phase 2), invite team.
- **W2 — App plumbing**: add `@plasmicapp/react-web` (pin; Plasmic packages
  require exact deduped versions), `/plasmic-host` route rendering only
  `PlasmicCanvasHost`, `plasmic-init.ts`, host entry imports Panda styles +
  fonts.css. Verify against Studio from localhost.
- **W3 — Token registration generator**: preset.ts → `plasmic-tokens.ts`
  at build time; light/dark token targets documented for Studio users.
- **W4 — Component registry**: prop-metadata generator + curated overrides;
  register the "as-is" bulk first, then slot compositions, then wrappers;
  dynamic-import the heavy subpath set.
- **W5 — Container + Studio cutover**: deploy (sbbb card), set project host
  URL to `https://design.sunbeam.pt/plasmic-host`, verify team editing.
  Server change needed: none (SPA fallback + no XFO) — add a regression note
  to `.maintainer/fragile-areas.md`.
- **W6 — Codegen pipeline** (decided 2026-08-06: **full codegen**, not
  loader — Plasmic is for UI design/wiring; generated code is ours to
  build and deploy):
  - `@plasmicapp/cli` + `plasmic init` in `app/` → `plasmic.json`
    (projectId + **public** API token — safe to commit; srcDir e.g.
    `src/plasmic`, TS scheme). Human supplies the project (W1).
  - `plasmic sync` emits plain React/TSX page + component code that
    imports our code components via each registration's `importPath` —
    set these to the **package subpaths** (`@sunbeam/beam-ui`,
    `@sunbeam/beam-ui/kanban`, `/charts`, …) so generated code tree-shakes
    and heavy deps stay behind subpath exports. Per Plasmic guidance,
    `registerComponent` calls live on the host page for codegen.
  - Generated files are owned by Plasmic (overwritten on sync) — never
    hand-edit; wiring/logic goes in wrapper components or route files
    that import the generated pages. react-router routes point at the
    generated page components.
  - Pipeline: `plasmic sync` runs locally or in CI (watch mode exists for
    dev); synced code is committed and built into the container by the
    normal release flow — no runtime loader, no extra env in the image.

## 6. Open questions for the human

1. Plasmic plan/seats — is the free Starter tier enough, or paid?
2. Which components matter first for the pages you want to build visually?
   (Lets W4 land in two increments instead of all 83 at once.)
3. ~~App-host only vs. serving Plasmic content~~ — **decided**: full
   codegen (W6); Plasmic is for UI design/wiring, we own the pipeline.
4. Self-hosted Plasmic Studio, or studio.plasmic.app cloud? (Assumed cloud.)
