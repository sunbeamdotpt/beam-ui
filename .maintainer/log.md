# Decision log: beam-ui

Append-only. Newest at the bottom. Date every entry; record the *why*.

## 2026-06-03 — v0.12.0 baseline (recovered from session logs)

Tests moved to vitest-under-Deno (jsdom), `deno publish --dry-run` fixed
(zag-js pin, implicit-any, `ReactNode` returns), released as `ec19f07`.
*Why:* the package had to be JSR-publishable with a green test suite before
deeper refactoring.

## 2026-07-02 — design-language modernization (recovered from session logs)

Approved 8-phase plan: Deno-native stack (Preact + Panda `beamPreset`, JSR
publishing), router decoupling, polymorphic primitives, token hardening,
subpath exports for heavy deps, test/a11y harness, Fresh 2.x showcase, docs &
release prep. Completed that day (uncommitted): phases 0–2, Card
consolidation, prop-type exports, `src/system.ts` barrel, lint debt (98
issues), subpath exports. *Why:* the user wants "a rock-solid, STABLE, and
consistent design language that will work in any react-based framework",
all-in on the Deno ecosystem (sans Deno Deploy).

Token migration (spacing → `beamPreset`) was attempted by bulk regex and
corrupted the tree; the session died on an API quota error mid-recovery with
nothing committed. See [fragile-areas.md](fragile-areas.md). *Why recorded:
this is the reason for charter hard rule 4 (no bulk regex rewrites).*

## 2026-07-22 — agent-mail enrollment

Created this `.maintainer/` bundle and enrolled beam-ui. Initial knowledge was
reconstructed from the two prior Kimi Code session wires (2026-06-03,
2026-07-02) because none of the 07-02 work was committed or journaled
anywhere. *Why:* overnight unattended work on the container image needs the
boot/handoff ritual and cross-repo mail.

## 2026-07-22 — container image goes to GitHub Actions + ghcr.io

The human asked for a multi-arch (`linux/amd64,linux/arm64`) image of the
design-language site published to `ghcr.io/sunbeamdotpt/beam-ui:latest`, built
by a GitHub Actions pipeline modeled on the sso-gateway repo's
`.github/workflows/release.yml` (QEMU + buildx + metadata-action, GITHUB_TOKEN
login). The legacy `workflows.yaml`/`sunbeam.yaml` (wfe-server/buildkit →
Gitea registry) are stale and not the path forward. *Why:* the project source
now lives on GitHub (`github.com/sunbeamdotpt/beam-ui`), so the image should
live beside it.

## 2026-07-23 — tree repair + three systemic Panda bugs (visual-regression-driven)

Repaired the stranded 2026-07-02 tree (11 hand-fixed quote corruptions,
scratch scripts removed). Then ran a full visual regression against a HEAD
baseline (208 screen pairs, light+dark × 104 routes, pixelmatch). It caught
three systemic bugs that `deno task ci` + builds could not:

1. **Panda extraction skipped the `system.ts` barrel** — the library's
   relative `../system.ts` imports don't match Panda's import map, so most
   library CSS was silently missing (invisible switches, collapsed header).
   Fixed with `importMap: { css: ["styled-system/css", "/system.ts"],
   tokens: [...] }` in `app/panda.config.ts`. *Why not revert the barrel:
   the barrel exists for Deno lint hygiene; importMap is the mechanism Panda
   provides for exactly this.*
2. **`padding: "N M"` two-token shorthands** emit unitless raw CSS
   (`.p_2\.5_4{padding:2.5 4}`) which browsers drop. 21 occurrences in 11
   components converted to `paddingBlock`/`paddingInline` by hand.
3. **Bare width/height tokens emitted literal px** (`width: "10"` → `10px`,
   intended 40px) because `beamPreset` defined `spacing` but no `sizes`.
   Fixed in the preset: single `spacingScale` constant feeds both `spacing`
   and `sizes`. *Why in the preset: one systemic fix instead of ~20
   component edits, and it matches Panda's default-preset convention.*

Final suite verdict: PASS — zero unexplained differences; remaining diffs
are the documented docs-text updates, the intentional Card refactor, an icon
restyle on guides/docs, and nondeterministic chart demo data.

Also tonight: docs site + Storybook updated (JSR installs, children-based
Shell/layout API, prop tables), `.github/workflows/release.yml` added
(sso-gateway-model multi-arch pipeline to ghcr.io), and a node_modules
corruption from the baseline work (npm pruning deno's symlinks) was repaired
by rebuilding `packages/beam-ui/node_modules/.deno` via `deno install`.

## 2026-07-23 — pushed; image pipeline live

Human signed off after the local demo; pushed mainline in the approved
4-commit split (`0dcbcdf` feat, `80f0f36` docs, `e113f91` chore, `a7ffd3b`
ci). Note: the Jun-3 commits (tests, v0.12.0) had never been pushed either —
the push fast-forwarded the remote from `cfbb75c` to `a7ffd3b`. The Release
Container workflow now builds `:latest` (amd64+arm64) on every mainline push.

Scratch verification dirs (`.visual-diff/`, `.baseline-worktree/`) were
deleted post-sign-off. To re-run the visual regression: build the baseline
from a worktree at the old ref, capture with `npx playwright test` in both
trees (kill port 4173 between runs), diff with pixelmatch+pngjs.

GitHub flags 46 dependabot vulnerabilities on the default branch (8 high) —
recorded in state.md as untriaged.

## 2026-07-23 — image verified; deploy tasked to sbbb

CI run 30014354620 refreshed `ghcr.io/sunbeamdotpt/beam-ui:latest`
(index `sha256:669393d1…`, linux/amd64+arm64) with the kanban dark-mode
fix, dependency sweep, and 0.13.0 bump. Sent agent-mail task #52 to sbbb
to update the design.sunbeam.pt deployment, including the registry move
(Gitea → ghcr.io). Kanban fix used the `bg.card` semantic token so light
mode is pixel-identical — the right pattern for surface fixes (static
palette colors never flip).

## 2026-07-24 — agent-mail → kanban ticketing migration

Cross-repo coordination moved off agent-mail (deprecated) onto kanban cards
via `sunbeam kanban` — the same migration sbbb did earlier. The AGENTS.md
ritual, charter, and state.md now describe the kanban flow; mail-thread
references in older entries (e.g. task #52 to sbbb) are historical. *Why:*
the human standardized cross-repo tracking on kanban so tickets are visible
to everyone, not just the two mail endpoints.
