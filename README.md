# Beam Design Language

A design language by humans, for humans.

## Install

Configure the Sunbeam registry, then install:

```bash
# .npmrc
@sunbeam:registry=https://src.sunbeam.pt/api/packages/studio/npm/
```

```bash
npm install @sunbeam/beam-ui
```

### Peer Dependencies

```bash
npm install react react-dom react-router-dom zustand @ark-ui/react @pandacss/dev
```

## Usage

```tsx
import { Shell } from "@sunbeam/beam-ui/components/shell/shell"
import { Button } from "@sunbeam/beam-ui/components/ui/button"
import { useTheme } from "@sunbeam/beam-ui/hooks/use-theme"

// Shell renders Header + Footer by default
function App() {
  const { theme, toggle } = useTheme()
  return (
    <Shell>
      <Button variant="primary">Get Started</Button>
    </Shell>
  )
}
```

### Panda CSS Setup

```ts
// panda.config.ts
import { defineConfig } from "@pandacss/dev"
import { beamPreset } from "@sunbeam/beam-ui/preset"

export default defineConfig({
  presets: [beamPreset],
  include: ["./src/**/*.tsx"],
  jsxFramework: "react",
})
```

## Structure

- `packages/beam-ui/` — Component library (`@sunbeam/beam-ui`)
- `app/` — Design language showcase site (live at [design.sunbeam.pt](https://design.sunbeam.pt))

## Development

```bash
cd app
npm install
npm run dev
```

The showcase site runs at `http://localhost:5173` and demonstrates every token, component, and layout in the design system.

## Build & Deploy

### 1. Build the showcase site

```bash
cd app
npm run build
```

### 2. Docker build & push (via remote BuildKit)

```bash
docker buildx build \
  --builder sunbeam-remote \
  --platform linux/amd64 \
  -t src.sunbeam.pt/studio/beam-ui:latest \
  -t src.sunbeam.pt/studio/beam-ui:<version> \
  --push .
```

### 3. Deploy to cluster

```bash
sunbeam platform apply devtools --context production
```

### 4. Commit, tag, bump & publish

```bash
git add -A && git commit -m "feat: release description"

# Bump version in packages/beam-ui/package.json
git add packages/beam-ui/package.json
git commit -m "chore(release): bump @sunbeam/beam-ui to v<version>"

git tag -a v<version> -m "Release v<version> — summary"
git push origin mainline --tags

# Publish to Gitea npm registry
cd packages/beam-ui
npm publish
```

## Package Exports

- **UI Components** — 70+ components (Accordion, Badge, Button, Card, Charts, CodeBlock, CodeEditor, DiffViewer, Dialog, Kanban, MarkdownRenderer, NotificationCenter, Wizard, WorkItemList, and more)
- **Shell Components** — Shell, Header, Footer, Sidebar, RightRail, Breadcrumbs
- **Layouts** — DocsLayout, ApiLayout, FullwidthLayout, CreatorsLayout
- **Hooks** — useTheme (light/dark mode with cross-domain cookie)
- **Data** — Navigation types, status vocabularies, default structures
- **Preset** — `beamPreset` for Panda CSS (tokens, semantic tokens, text styles)

## License

MIT — Sunbeam Studios
