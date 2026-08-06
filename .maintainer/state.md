---
type: State
title: Current state of beam-ui
description: What is in flight, what is blocked, what the next session should pick up first.
tags: [state]
timestamp: 2026-07-22T00:00:00Z
---

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

## Known loose ends

- The user's unanswered 2026-07-02 message: *"huge issues with bundling our
  font and getting the typography right"* — font/typography bundling is an
  open problem, not addressed.
- Token migration (px → `beamPreset` spacing) is only half-applied across
  component source (valid but inconsistent). Charter rule 4 applies when
  resuming it.
- `workflows.yaml` / `sunbeam.yaml` (Gitea pipeline) are stale.
- Plan items #4–#8 and phases 5–7 (Preact/Fresh migration, release prep)
  never started.
- GitHub reports 46 dependabot vulnerabilities on the default branch
  (8 high) — not yet triaged.
- Untracked/modified files under `packages/beam-ui-typst/` are the human's
  own WIP — do not commit or revert them.

## Blocked / waiting

- Nothing, once the image is verified on ghcr.io.

## Pick up first

- Check for open cards on the `beam-ui` boards (`sunbeam kanban board list
  beam-ui`, then `sunbeam kanban card list <board-id>`).
- Triaged dependabot alerts and the font/typography question are the most
  valuable next items.
