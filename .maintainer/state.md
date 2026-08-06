---
type: State
title: Current state of beam-ui
description: What is in flight, what is blocked, what the next session should pick up first.
tags: [state]
timestamp: 2026-08-06T21:00:00Z
---

# State — 2026-08-06 (loose ends closed; ready for new work)

All July loose ends resolved and committed on mainline
(`41138e5`..`1ca1c07`, 8 commits). `deno task ci` + app build green;
5-page Playwright visual spot-check clean (kanban, badge, code-block,
diff-viewer, charts).

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

- Working tree has build-output churn in `app/` (build-info, page-dates,
  components.json, panda.css) — regenerated every build, intentionally
  uncommitted. `packages/beam-ui-typst/` WIP is the human's — untouched.
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
