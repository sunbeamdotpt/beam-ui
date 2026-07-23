# Verification: how to verify a change in beam-ui

## Baseline gate (always)

From the workspace root:

```sh
deno task ci
```

Runs `deno fmt --check`, `deno lint`, `deno check packages/beam-ui/src/index.ts`,
and the package tests (vitest under Deno, jsdom). This is the quality gate from
`AGENTS.md`; it must pass before any handoff.

## Showcase app + Storybook (after component/API changes)

```sh
cd app
npm run build              # vite build of the docs site
npm run build-storybook    # 83 stories; also exercises autodocs
```

Both were green at the 2026-07-02 checkpoint (after the subpath-export work).
`npm run build` needs Panda codegen output to be current — if `preset.ts` or
component token usage changed, run `npx panda codegen` in `app/` first.

## Publish readiness (library)

```sh
cd packages/beam-ui
deno publish --dry-run
```

Must pass; publishing itself is done by the human (see charter).

## Container image

Root `Dockerfile`: node:22-alpine build stage (vite build + storybook build +
beam-sync esbuild bundle) → `denoland/deno` runtime serving `server.ts` on
:8080. Multi-arch via buildx (the `multiarch` docker-container builder exists
in the local Docker context):

```sh
docker buildx build --platform linux/amd64,linux/arm64 ...
```

Note: `workflows.yaml` (wfe-server/buildkit pipeline) and `sunbeam.yaml`
pre-date the Deno migration and target the old Gitea registry; treat them as
stale until updated.
