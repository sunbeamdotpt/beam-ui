# Changelog

All notable changes to `@sunbeam/beam-ui` (JSR, semver). The showcase app and
container image follow the repo's mainline; see `.maintainer/log.md` for the
full decision journal.

## [0.15.0] — 2026-08-14

### Added

- **Plasmic Studio app-host integration** (BEAM-002/003/004/005/007).
  - Component registry generator that scans `@sunbeam/beam-ui` exports and
    emits Plasmic `registerComponent` metadata.
  - Token registration from `beamPreset` so Plasmic designers use the same
    design-language tokens.
  - Kitchen-sink regression page + Playwright harness for every registered
    component in light and dark.
  - Sample data defaults for all data-driven components so dragged instances
    render immediately on the canvas.
  - Writable Plasmic state exposure for stateful components: `Accordion`,
    `AssigneePicker`, `BranchSelector`, `Combobox`, `ContextMenu`,
    `DatePicker`, `DropdownMenu`, `HoverCard`, `KanbanCardDetail`,
    `LabelPicker`, `MarkdownEditor`, `MilestonePicker`, `NotificationCenter`,
    `Popover`, `ReactionPicker`, `Select`, and `Tooltip`.
  - Canvas defaults to dark mode; `Checkbox` `checked` prop is editable;
    primary variants default to `"primary"` when available.

### Changed

- Page-level layouts (`ApiLayout`, `DocsLayout`, `FullwidthLayout`), `Shell`,
  and shell sub-components (`Header`, `Footer`, `Sidebar`) are excluded from
  the Plasmic registry; they are page wrappers, not artboard building blocks.

### Fixed

- Chart components render at the correct size in Plasmic Studio.
- `Combobox` closes on selection.
- `ContextMenu` trigger hitbox no longer fills the canvas.
- `Clipboard` and `CodeBlock` render with usable defaults.
- `KanbanCardDetail` sample checklist shape matches the component type.
- `LoginForm` props panel no longer shows unset values.

## [0.14.0] — 2026-08-06

### Fixed

- **Fonts now load.** Both Monaspace CDN URLs had been 404ing (dead v1.101
  jsdelivr path and the restructured v1.400 repo path), so the monospace
  font silently fell back everywhere. Ysabeau Infant, Monaspace Argon
  (v1.400 variable), and Material Symbols Outlined now ship self-hosted as
  woff2 inside the package — `styles/fonts.css` uses local `@font-face`
  with zero runtime CDN dependencies. (BEAM-001 follow-ups tracked separately)

### Added

- `beamPreset` token scales extended: numeric `fontSizes` (8–40px steps
  alongside the named scale), finer `spacing` steps (0.25–75), `sizes`
  layout max-widths (90–360 = 360–1440px), exact-alpha color groups
  (`accent.*`, `chrome.*`, `warm.*`, `sunshine.25/35/50`, `creamA.30`,
  `ivory.*`, `scrim.*`, `grid.*`, `slate.*`, `diff.*`), and shadow tokens
  (`focusRing.sm`–`2xl`, `thumb`, `thumbSoft`, `drawer`, `pop`).
- `data/statuses.ts`: exported `statusColors` palette — single source of
  truth for work-status/priority colors (badge solid variants and kanban
  blocked/progress indicators consume it).

### Changed

- **Token migration complete**: all component source now uses `beamPreset`
  tokens instead of hardcoded px/hex/rgba values (~700 conversions across
  60+ files). No rendered-output changes intended; palette data files,
  Mermaid/light-syntax themes, gradients, and SVG attributes remain raw by
  design.
- Dependency security sweep (66 Dependabot alerts addressed; react-router
  7.18+, postcss 8.5.18+, hono/express subtree eliminated via
  `@pandacss/dev` 1.12.0).

### Notes for consumers

- No breaking API changes. If you previously loaded fonts via Google Fonts
  `<link>` tags per the old docs, you can delete them — a single
  `import "@sunbeam/beam-ui/styles/fonts.css"` now covers everything.
- Known gap (pre-existing): the JSR `exports` map has no `./styles/*`
  subpath; consumers resolving `@sunbeam/beam-ui` through a bundler alias
  (as the showcase app does) are unaffected.
