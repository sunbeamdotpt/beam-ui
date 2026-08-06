---
type: State
title: Current state of beam-ui
description: What is in flight, what is blocked, what the next session should pick up first.
tags: [state]
timestamp: 2026-08-06T21:00:00Z
---

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
