# Beam Sync

A Penpot plugin that imports Beam UI components as editable design assets.

## What is Beam Sync?

Beam Sync bridges the Beam Design Language (a React component library) and Penpot, the open-source design tool. Designers can browse components, select variants and themes, and import them directly into their Penpot projects as native shapes with editable text.

The plugin communicates with a hosted API (`design.sunbeam.pt/api/components`) that serves cleaned SVG data and text metadata generated from the React component pipeline.

## Build and Install

```bash
cd libs/beam-ui/packages/beam-sync
npm install
npm run build
```

The build outputs to `dist/` and includes:

- `manifest.json` — Penpot plugin manifest
- `plugin.ts` — sandboxed plugin code (Penpot API access)
- `index.html` + bundled assets — plugin UI

### Install in Penpot

1. Open Penpot → Plugins → Add Plugin
2. Enter the manifest URL: `https://design.sunbeam.pt/beam-sync/manifest.json`
3. The plugin panel appears inside Penpot

## Architecture Overview

```
Penpot Plugin (iframe)
├── UI (Vanilla TS + Vite)
│   └── Component browser, theme toggle, import controls
└── Sandbox (plugin.ts)
    ├── Receives: component name, variant, theme
    ├── Fetches: SVG + text metadata from API
    └── Calls: penpot.createShapeFromSvg(), penpot.createText()
```

The plugin follows the Penpot Plugin SDK pattern:

- **UI → Plugin**: `parent.postMessage({ type: "import-component", ... })`
- **Plugin → UI**: `penpot.ui.sendMessage({ type: "import-complete", ... })`
- **Plugin → Penpot**: Direct `penpot.*` API calls

Key post-import fixes performed by the plugin:

- Set `fillOpacity: 1` on all imported shapes (required for visibility)
- Add native Penpot shadows based on detected shadow classes
- Hide SVG path-text and overlay editable `penpot.createText()` shapes
- Align CTA arrow paths to their matching text

## Pipeline Reference

For the full capture, cleaning, and import pipeline, see [`docs/beam-sync-pipeline.md`](../../docs/beam-sync-pipeline.md).
