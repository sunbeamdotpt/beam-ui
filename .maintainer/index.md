# beam-ui maintainer knowledge bundle

Knowledge base for the beam-ui maintainer. Start here, follow links.
Instructions live in [charter.md](charter.md); code conventions live in the
repo's `AGENTS.md`; this bundle holds *knowledge* — what is true and why.

## State

- [state.md](state.md) — what is in flight right now, updated at every handoff
- [log.md](log.md) — append-only decision journal

## Concepts

- [verification.md](verification.md) — how to actually verify a change in this repo
- [fragile-areas.md](fragile-areas.md) — incident-adjacent zones: codegen barrels,
  tokenization, subpath exports

## Repo shape (one paragraph)

Monorepo. `packages/beam-ui/` is the JSR-published component library (Preact,
React-compatible via `preact/compat`, Panda CSS with `beamPreset`; heavy deps
behind subpath exports). `app/` is the showcase/docs site + Storybook that
consumes the library and is shipped as a container image via the root
`Dockerfile` (node build stage → Deno runtime serving `server.ts` on :8080).
`packages/beam-sync/` is a plugin bundled into the image. `packages/beam-ui-typst/`
holds the Typst design-language documents — protected, outside the Deno
workspace.
