# Fragile areas: beam-ui

Incident-adjacent zones. Read before editing these.

## Bulk refactors of component source — the 2026-07-02 tokenization incident

A subagent tried to replace hardcoded spacing values with `beamPreset` tokens
across ~50 component files using regex scripts, then "fixed" the resulting
quote damage with more regex scripts. Net result: syntactically corrupted
TypeScript (`list.tsx`, `scroll-area.tsx`), ~30 files silently reverted, 13
files left with mangled tokenized values, and six scratch `*.py` scripts
dropped in the repo root. The session then died on an API quota error
mid-recovery.

**Lesson (charter hard rule 4):** never bulk-rewrite component source with
regex. Token work happens file-by-file, with `deno check` after each small
batch, and committed incrementally so a failure never strands the tree.

## `src/system.ts` — the styled-system barrel

`packages/beam-ui/src/system.ts` is a hand-written barrel re-exporting from
`styled-system/` (Panda codegen output). It lives *outside* `styled-system/`
deliberately, because Panda's codegen wipes and regenerates that directory —
anything placed inside it is destroyed on the next `panda codegen`. Panda only
exposes a `config:change` hook (no `codegen:done`), so Panda itself cannot
generate this barrel. The file carries a single
`deno-lint-ignore-file no-sloppy-imports`. All package imports of the system
go through it; keep it that way.

## Subpath exports for heavy deps

CodeMirror, Recharts, Mermaid, KaTeX, DnD-kit, remark/rehype, and the kanban
mega-components are exported only from subpath barrels
(`src/{code-editor,charts,diagram,math,markdown,syntax-highlighter,kanban}.ts`),
wired in `packages/beam-ui/deno.json` `exports`. The root entry must stay
light — `src/index.ts` is just `export * from "./components/ui/index.ts"`.
App pages and doc example strings import from the subpaths; if you move a
heavy component, update the barrel, the app call sites, *and* the doc example
strings together.

## Storybook visual validation

Two pre-existing warnings on `WorkItemList/Empty List` captures (known since
before 2026-07-02, not caused by the modernization). Verify before "fixing"
them that they aren't intentional empty-state renders.

## Panda codegen output in `app/`

`app/styled-system/` is generated. Regenerate with `npx panda codegen` in
`app/` after touching `preset.ts` or token usage; don't hand-edit its output.

## npm install prunes Deno's node_modules links

Root `node_modules` is shared between npm (workspaces: app + packages) and
Deno (`.deno/` store + symlinks for `packages/beam-ui`'s npm deps). Every
`npm install` at the root prunes Deno's top-level symlinks and leaves empty
scope dirs behind, which breaks `deno task test` ("Failed to resolve import
@testing-library/react", "Could not find referrer npm package", or duplicate
`@playwright/test` version errors). Repair after any root npm install:

```sh
rm -rf packages/beam-ui/node_modules/.deno packages/beam-ui/node_modules/.bin
cd packages/beam-ui && deno install
```

Keep `@playwright/test` versions aligned between npm (`app/package.json`)
and the Deno store — `npx playwright` resolves the root `.bin` symlink
(Deno-managed), while test files import the npm copy.
