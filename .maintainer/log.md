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

## 2026-08-06 — stale Gitea pipeline files resolved

Removed `workflows.yaml` (wfe-server/Gitea-registry CI, superseded by
`.github/workflows/release.yml` since 2026-07-23) and rewrote
`sunbeam.yaml` for the current stack: kind `deno-app`, Deno tasks for
test/lint/fmt, app npm scripts for build/dev, `package` targeting
`ghcr.io/sunbeamdotpt/beam-ui:latest` for local verification only
(release images come from GitHub Actions). *Why:* state.md had flagged
both files as stale since July; keeping two contradictory pipeline
descriptions invites someone to revive the wrong one.

## 2026-08-06 — dependabot sweep: 66 open alerts → 2

Bumped `react-router-dom` ^7.15.1→^7.18.0 and postcss ^8.5.0→^8.5.18
(app), hoisted `@pandacss/dev` ^1.12.0 to root devDeps + unscoped postcss
override ^8.5.26, regenerated `package-lock.json` via `npm audit fix`.
fast-uri, brace-expansion, ip-address patched; the hono / @hono/node-server
/ express / qs / body-parser alerts vanished because @pandacss/dev 1.12.0
dropped @pandacss/mcp (and with it the whole @modelcontextprotocol/sdk
subtree). Remaining: react-router GHSA-qwww-vcr4-c8h2 (patched only in
8.3.0 — major bump, needs the human's call) and one dompurify low with no
patch published. *Why:* state.md had 46 untriaged alerts since July; the
July sweep (5e4e356) only covered part of the tree.
Gotcha reconfirmed: npm install prunes Deno's node_modules symlinks;
repair is `rm -rf packages/beam-ui/node_modules/.deno .bin && deno install`
(fragile-areas.md). Also learned: npm *scoped* overrides are silently
ignored for dependency chains rooted in a workspace package (npm 11.x) —
use unscoped overrides + root-hoisted devDeps instead.

## 2026-08-06 — fonts self-hosted (Monaspace was 404 everywhere)

Root cause of the long-standing "huge issues with bundling our font":
both Monaspace CDN URLs were dead — the v1.101 jsdelivr path AND the
v1.400 `fonts/webfonts/` path (v1.400 restructured to
`fonts/Web Fonts/...`), so the monospace font never loaded and fell back
silently; Ysabeau Infant + Material Symbols depended on Google Fonts at
runtime. Now all three fonts ship as woff2 inside the package
(`packages/beam-ui/src/styles/fonts/`): Ysabeau Infant var (wght 1–1000,
normal+italic, latin subset), **Monaspace Argon Var from monaspace
v1.400** (wght 200–800, per the human's request for latest), Material
Symbols Outlined var. `fonts.css` rewritten with local @font-face +
OFL/Apache license files; `app/index.html` CDN links and dead inline
@font-face block removed; app imports the stylesheet in `main.tsx`;
installation docs updated. Verified: `deno task ci`, app + storybook
builds emit the woff2s, Playwright `document.fonts.check` true for all
three families, zero CDN requests. Known gap: JSR `exports` in deno.json
has no `./styles/*` subpath — app/storybook resolve it via the Vite
alias, external JSR consumers can't (pre-existing).

## 2026-08-06 — preset token scales extended for migration

Added to `beamPreset`: numeric fontSizes (9/9.5/10.5/11/13/13.5/15/36/40px),
spacing steps 0.25–75 (1px hairlines, 18/22px, 60–300px), sizes-only layout
max-widths (100–360 = 400–1440px), and exact-alpha color groups: accent.06–40,
chrome.03–70, warm.04–40, sunshine.25/35/50, creamA.30, ivory.30/50,
scrim.45–60, grid.06–20, diff.add/del.bg/emphasis. Numeric keys follow the
preset's own spacingScale convention. Static `accent.*` coexists with the
semantic `accent` token (verified in generated types); `cream.30` would
collide with flat `cream`, hence `creamA.30`. styled-system regenerated via
`deno run -A npm:@pandacss/dev@1.12.0 codegen`. *Why exact-alpha tokens
instead of semantic unification: zero visual drift during migration; alpha
scales are a legitimate token layer (Radix-style).*

## 2026-08-06 — token migration phase 1: mechanical batches (11-agent swarm)

~460 raw px/hex/rgba values converted across 60 component files via an
11-agent swarm, hand edits only (charter rule 4), each agent re-running
`deno check` until its own files were clean. Method that worked: exact-match
mapping table (fontSize scale incl. new numeric tokens, px÷4 spacing/sizes,
exact-alpha color groups), semantic tokens preferred where the value already
played that role. Leftovers are three fixable patterns — border/outline
shorthand strings (need borderWidth/borderStyle split), focus-ring boxShadow
strings (need focusRing shadow tokens in the preset), ~10 odd one-off values
(360/380px, 9px, chrome.06/30/90, rgba(130,130,160,*)) — plus legitimate raw
values (gradients, calc(), grid track lists, palette data files, inline
style props, SVG attrs, third-party widget configs) that stay by design.
`deno task ci` + app build green.

## 2026-08-06 — token migration complete (phases 2-3 + long tail)

Phase 2 (4-agent cleanup swarm): ~140 border/outline shorthand splits to
longhand token props, focus-ring/shadow strings → new focusRing.*/thumb/
drawer/pop tokens, one-off leftovers (sizes 90/95, spacing 2.25, chrome.06/
30/90, slate.*) converted. Phase 3 (4 judgment agents): kanban css() +
inline icon styles, badge/statuses dedup, charts, editor palettes.
**Key discovery (J2): Panda cannot statically evaluate imported constants
inside css() — they silently produce no CSS.** Pattern established: status
colors live in data/statuses.ts (`statusColors`) and are applied via inline
style; css() holds only static token strings. Long tail: theme-toggle +
file-upload converted, kanban leftovers via new micro tokens (spacing
1.25/1.75, fontSize "8", colors.white, scrim.85), blockedBadge/progressDone
routed through statusColors inline. Remaining raw values are all documented
exceptions: Mermaid/light-syntax palettes, categorical data maps
(AVATAR/BRANCH/LEVEL/PRIORITY/LABEL/EVENT_COLORS), gradients/calc/grid
tracks, SVG attrs, JSDoc, inline runtime values.

## 2026-08-06 — release v0.14.0 (coverage gate waived by human)

Pushed the 11-commit loose-ends series (rebased onto f3713ec docs PR),
created CHANGELOG.md, bumped to 0.14.0. Gates: tests green,
`deno publish --dry-run --allow-dirty` passes. **Coverage gate (>90%)
waived by the human in-session** — the repo has no coverage tooling and
the suite (65 tests/4 files over ~85 components) is far below the bar;
building the harness is part of BEAM-001. Recorded per sunbeam-release
§2 ("say so, don't wave through" — surfaced and decided by the human).
`deno publish` itself remains the human's action (charter).

## 2026-08-06 — Plasmic app-host scoped (BEAM-002 → BEAM-003..006)

Human asked for a Plasmic app-host in the container with full
component/token scoping. Research (Plasmic docs, no swarm per human)
found: app-host = public /plasmic-host route rendering PlasmicCanvasHost
(@plasmicapp/react-web, React 19 supported since Loader V2); server.ts
needs zero changes (SPA fallback, no X-Frame-Options — added to
watch-list); registerToken covers colors/spacing/fontSizes/fonts/
lineHeights but NOT radii/shadows/fontWeights; 83 components triaged into
bulk/slot-composition/wrapper/heavy-dynamic-import/skip buckets; host
page needs no credentials (project ID+token only for rendering
Plasmic-authored content, deferred as phase-2 decision). Scope doc at
docs/plasmic-app-host-scope.md; sub-cards W2-W5 filed, W1 (Plasmic
project/plan) is the human's. Registration code will live in app/, never
in the JSR package (design-language rules).

## 2026-08-06 — Plasmic: full codegen decided (W6 = BEAM-007)

Human decided the integration mode: **full codegen, no loader** — Plasmic
is for UI design and wiring; generated React/TSX is synced (`plasmic
sync`), committed, and built into the container by the normal release
pipeline. Consequences: registerComponent importPaths must be the
package subpaths (generated code tree-shakes, heavy deps stay behind
subpath exports); generated files are Plasmic-owned (never hand-edit —
wiring lives in wrapper/route components); no runtime env needed in the
image (public API token lives in plasmic.json, safe to commit). Scope
doc updated; carded as BEAM-007.
