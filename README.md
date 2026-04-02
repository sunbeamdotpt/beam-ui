# Beam Design Language

The complete visual framework for Sunbeam Studios.

## Structure

- `packages/beam-ui/` — Component library (`@sunbeam/beam-ui`)
- `app/` — Design language showcase site

## Development

```bash
cd app
npm install
npm run dev
```

The showcase site runs at `http://localhost:5173` and demonstrates every token, component, and layout in the design system.

## Package

The `@sunbeam/beam-ui` package exports:

- **UI Components** — Button, Badge, Card, CodeBlock, Callout, Tabs, Icon, SearchInput, StatBar, ModelRow, FeatureTile, CapabilityCard, TopicCard, BentoItem
- **Shell Components** — Header, Footer, Sidebar, RightRail, Breadcrumbs
- **Layouts** — DocsLayout, ApiLayout, FullwidthLayout
- **Hooks** — useTheme (light/dark mode)
- **Data** — Navigation types and default structures

### Peer Dependencies

- React 19+
- React Router 7+
- Panda CSS 0.52+
- Ark UI 4+
- Zustand 5+
