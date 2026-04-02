# Beam Design Language

The complete visual framework for Sunbeam Studios.

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
import { Button, Card, CodeBlock } from "@sunbeam/beam-ui"
import { useTheme } from "@sunbeam/beam-ui/hooks/use-theme"

function App() {
  const { theme, toggle } = useTheme()
  return (
    <Card icon="auto_awesome" title="Hello" description="Welcome to Beam" ctaLabel="Get Started" ctaHref="/docs" />
  )
}
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

## Package Exports

- **UI Components** — Button, Badge, Card, CodeBlock, Callout, Tabs, Icon, SearchInput, StatBar, ModelRow, FeatureTile, CapabilityCard, TopicCard, BentoItem
- **Shell Components** — Header, Footer, Sidebar, RightRail, Breadcrumbs
- **Layouts** — DocsLayout, ApiLayout, FullwidthLayout
- **Hooks** — useTheme (light/dark mode)
- **Data** — Navigation types and default structures

## Docker

```bash
docker build -t beam-design .
docker run -p 8080:8080 beam-design
```

Serves the showcase site at `http://localhost:8080`.

## License

MIT — Sunbeam Studios
