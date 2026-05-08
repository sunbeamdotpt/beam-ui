# Beam UI Showcase App

The design system showcase site for the Beam Design Language. It renders documentation pages, component galleries, layout examples, and foundation guides in a browsable React application.

## What the App Is

This is a Vite + React 19 application that serves as the public documentation site for Beam UI components. It includes:

- Component docs with live previews, props tables, and usage examples
- Shell docs (header, footer, sidebar, breadcrumbs)
- Layout docs (DocsLayout, ApiLayout, FullwidthLayout, CreatorsLayout)
- Foundations (colors, typography, spacing, elevation, accessibility, etc.)
- Model index and API reference pages

## How to Run It

```bash
cd libs/beam-ui/app
npm install
npx panda codegen
npm run dev
```

The dev server starts at `http://localhost:5173`.

### Other Commands

| Command | Description |
|---------|-------------|
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run storybook` | Start Storybook on port 6006 |
| `npm run test:visual` | Run Playwright visual regression tests |

## How to Add a New Component Page

1. Create a page file in `src/pages/components/{kebab-case}-page.tsx`
2. Import the page in `src/app.tsx`
3. Add a `<Route>` inside the `/components/*` branch:

```tsx
import { MyComponentPage } from "./pages/components/my-component-page";

// Inside <Routes>
<Route path="components/my-component" element={
  <DocsLayout>
    <MyComponentPage />
  </DocsLayout>
} />
```

4. Follow the page template in `src/pages/components/_template.tsx`:
   - Wrap content in `<ComponentPage>`
   - Provide `name`, `description`, and `importPath`
   - Use `<SectionHeading>` + `<PropsTable>` for structured docs

## Architecture Note About Routing

Routes are defined centrally in `src/app.tsx` using `react-router-dom`. The app uses nested layouts:

- `<Shell>` — global header/footer/sidebar wrapper
- `<DocsLayout>` — two-column docs with TOC sidebar
- `<ApiLayout>` — three-column API reference layout
- `<FullwidthLayout>` — single-column full-width pages

The `useDocsContext` hook (provided by `DocsLayout`) manages the table of contents per page. Each page calls `setToc([])` on mount and clears it on unmount.
