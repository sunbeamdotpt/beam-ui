# Beam Sync Pipeline — Complete Technical Reference

> From React components to pixel-perfect Penpot design assets with editable text

## The Problem

Beam UI is a React component library (85+ components) built with:
- **React 19** — component framework
- **Panda CSS** — design tokens, semantic colors, responsive styles via `css()` utility
- **Ark UI v4** — accessible primitives (dialogs, popovers, selects, etc.)
- **Ysabeau Infant** — variable weight body/heading font (431/575/647/791)
- **Monaspace Argon** — monospace font for code (400)
- **Material Symbols Outlined** — icon font

Our design team (Lonni & Amber) needs these components in **Penpot** — the open-source
design tool — as pixel-perfect, editable assets. They need to:
- See exactly what each component looks like in both light and dark themes
- Edit text content (labels, headings, body copy)
- Use components as reference when designing new screens
- Stay in sync as components change

The challenge: **there is no direct path from React/CSS to Penpot**. Penpot can import
SVGs, but SVG text becomes vector paths (not editable). CSS features like `box-shadow`,
`backdrop-filter`, and `position: fixed` overlays don't translate to SVG. And Penpot's
import chokes on complex SVG structures.

## The Solution: A 4-Stage Pipeline

```
React Components → Storybook → SVG Capture → Cleaning → Penpot Import
     (code)        (render)    (Puppeteer)   (strip)     (plugin API)
```

Each stage exists because the previous stage's output isn't directly usable by the next consumer.

---

## Stage 1: Storybook (Why We Need It)

### The Problem
React components can't be rendered outside a browser. They depend on React's runtime,
Panda CSS's PostCSS pipeline, Ark UI's context providers, and browser APIs. We need
a way to render each component in isolation with all its variants.

### The Solution
Storybook 8.6 with `react-vite` framework. Each component has a colocated `.story.tsx`
file next to its source:

```
packages/beam-ui/src/components/ui/
  card.tsx              ← component source
  card.story.tsx        ← story variants
```

Stories export named functions for each variant:
```tsx
export default function CardStory() {
  return <Card title="Repositories" />;
}
export function SingleCard() {
  return <Card title="Analytics" />;
}
```

### Key Storybook Setup Details
- **Config**: `app/.storybook/main.ts` — Vite aliases for `styled-system` + `@sunbeam/beam-ui`
- **Preview**: `app/.storybook/preview.ts` — imports `panda.css`, wraps stories in
  `data-theme="light"` div with MemoryRouter
- **Panda CSS**: Pre-generated via `panda cssgen --outfile .storybook/panda.css` because
  Storybook's Vite doesn't process Panda's PostCSS plugin correctly
- **Story generation**: `app/scripts/generate-stories.ts` discovers `.story.tsx` files and
  generates CSF3 wrappers in `app/src/stories/`
- **Running**: `cd app && npx storybook dev -p 6006`
- **Production**: Built with `STORYBOOK_BASE=/storybook/` and served at `design.sunbeam.pt/storybook/`

### What Storybook Gives Us
- Each component variant rendered in isolation at `http://localhost:6006/iframe.html?id={storyId}`
- Story index at `/index.json` with all story IDs, names, and component titles
- Consistent rendering environment (same fonts, tokens, CSS)

---

## Stage 2: SVG Capture (Why Not Screenshots?)

### The Problem
We need vector output, not raster. Screenshots (PNG) can't be:
- Zoomed without pixelation
- Imported into Penpot as editable shapes
- Used as a basis for text replacement

### The Solution
**Puppeteer + dom-to-svg** — render each story in headless Chrome, then convert the
DOM to SVG using the `dom-to-svg` library.

### Why dom-to-svg?
- Produces clean SVG with real `<text>` elements (selectable, searchable)
- Doesn't use `<foreignObject>` (which design tools can't read)
- Preserves CSS stacking order, colors, positioning
- Works in Puppeteer's browser context

### What dom-to-svg CAN'T Do
| CSS Feature | Status | Workaround |
|-------------|--------|------------|
| `box-shadow` | Not supported | Post-process: inject SVG `<filter>` (for browser viewing) or Penpot native shadows |
| `backdrop-filter` | Not supported | Accept the loss (only affects Header frosted glass) |
| CSS animations | Static frame only | Spinners/skeletons captured frozen |
| `position: fixed` overlays | Renders off-screen | Normalize positioners before capture |
| Icon fonts | Garbled glyphs | Replace with inline SVG paths from Google CDN |
| Non-uniform border-radius | Partial | Works for most Beam components |
| Form input values | "on" text leaks | Hide checkbox/radio inputs before capture |
| External fonts | CORS blocked | Embed Ysabeau Infant as base64 woff2 |

### Capture Script Location
`app/scripts/capture-stories.mjs`

### Strategy Classification
Not all components render the same way. The script auto-classifies each component:

**Static** (303 variants) — Badge, Button, Table, Card, etc.
Capture `#storybook-root > child` directly. Simple.

**Portal-Open** (11 variants) — Dialog, KanbanCardDetail, Wizard
Stories already render with `open={true}`. Content is in the DOM but uses
`position: fixed` + Ark UI positioners that need normalizing.

**Portal-Trigger** (48 variants) — Popover, Select, DatePicker, DropdownMenu, etc.
Stories render in closed state. Must programmatically click/hover the trigger to
open the overlay before capture.

**Layout** (17 variants) — Shell, Header, Footer, Sidebar
Full viewport capture, no cropping.

### Ark UI v4 Positioner Behavior (Critical Knowledge)
Ark UI v4 does **NOT** use React portals. Positioners render **in-tree** inside
`#storybook-root`, not as `document.body` children. They use:
```css
position: fixed;
transform: translate3d(0px, -100vh, 0px); /* hidden when closed */
```

When opened (via click/hover), the transform changes to the correct viewport position.
For SVG capture, we **normalize** them to flow naturally:
```js
document.querySelectorAll('[data-part="positioner"]').forEach((pos) => {
  pos.style.position = "relative";
  pos.style.transform = "none";
  pos.style.top = "auto";
  pos.style.left = "auto";
  pos.removeAttribute("hidden");
});
```

### Trigger Detection
Universal approach that works for all Ark UI components:
1. `[data-part="trigger"]` — standard Ark UI trigger (Popover, Select, etc.)
2. `[data-part="context-trigger"]` — context menu right-click
3. First `button` inside `#storybook-root` — fallback for `asChild` triggers (DropdownMenu)

### Theme Control
**Critical**: The `<html>` element may have `data-theme="dark"` from system preference,
overriding Storybook's decorator. Must force it:
```js
document.documentElement.setAttribute("data-theme", theme);
```

### Pre-Capture DOM Preparation
1. Force-load all fonts (`document.fonts.ready` + explicit `.load()`)
2. Hide native `<input type="checkbox">` and `<input type="radio">` (their "on" value leaks)
3. Replace Material Symbols icon font spans with inline SVGs:
   - Fetch from `https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/{name}/default/24px.svg`
   - Parse via DOMParser, set width/height/fill from computed styles
   - 3-second AbortController timeout per fetch
   - Cache icons per page

### Font Embedding
Google Fonts loaded via `@import` are CORS-blocked from `cssRules` access.
Solution: Download Ysabeau Infant woff2 and embed as base64 in `embedded-fonts.css`.
This ~50KB file is injected into every SVG's `<style>` block.

Location: `app/scripts/embedded-fonts.css`

### Shadow Post-Processing
dom-to-svg preserves Panda CSS class names on `<g>` elements (e.g., `class="bx-sh_golden"`).
After capture, we inject SVG `<filter>` elements with `<feDropShadow>` chains and
expand the viewBox to prevent clipping:

| Shadow Token | ViewBox Padding |
|-------------|-----------------|
| golden | top: 8, right: 8, bottom: 130, left: 90 |
| nav | top: 8, right: 8, bottom: 20, left: 8 |
| code | top: 8, right: 8, bottom: 30, left: 8 |

Note: These SVG filters render in browsers but **NOT in Penpot**. They're useful for
the SVG files as standalone references. Penpot shadows are added natively via API.

### Viewport Auto-Sizing
- **Static**: Measure component bounding rect + 24px padding, crop viewBox
- **Portal/Layout**: No cropping — dom-to-svg sizes to the normalized wrapper

### Dark Mode
Each story is captured twice. Dark variants saved as `{VariantName}.dark.svg`.

### Output
- 758 SVGs: `app/captured-svgs/{Component}/{Variant}.svg` and `.dark.svg`
- 85 components, 379 variants per theme

### Error Recovery
- `protocolTimeout: 60000` on browser launch
- Per-page `setDefaultTimeout(30000)`
- Safe page close: `try { await page.close(); } catch {}`
- Auto-relaunch browser on crash: `if (!browser.connected) { ... }`
- Icon fetch timeout: 3s AbortController

### Performance
Current: ~8 minutes sequential.
Planned: Parallel Puppeteer pages (4-6 concurrent tabs) → ~2 minutes.

---

## Stage 3: SVG Cleaning (Why Not Import Raw?)

### The Problem
dom-to-svg wraps every element in multiple `<g>` layers for its internal stacking
context system. A simple Card component generates ~50 empty `<g>` elements. Penpot's
`createShapeFromSvg()` chokes on this — shapes import but don't render visually.

A raw captured SVG: **64KB** → Cleaned: **3KB**. Same visual content.

### The Solution
Strip all dom-to-svg scaffolding while preserving visual elements (rects, paths, text).

### Cleaning Steps (in order)

1. **Parse viewBox offset** — `viewBox="ox oy w h"`, extract `(ox, oy)`
2. **Normalize coordinates** — shift all `x`, `y`, `cx`, `cy` by `(-ox, -oy)`.
   Shift `transform="matrix(a b c d tx ty)"` translation components. Set viewBox to `0 0 w h`.
3. **Strip `@font-face` blocks** — Penpot already has the fonts installed
4. **Remove HTML comments**
5. **Remove empty `<style>` blocks**
6. **Strip `<defs>` entirely** — SVG `<filter>` defs don't render in Penpot
7. **Remove `filter="url(#...)"` references**
8. **Flatten masks** — remove `<mask>` elements and `mask="url(#...)"` attributes.
   Penpot breaks mask references when shapes are moved. Icons render fine without masks.
9. **Remove empty `<g data-stacking-layer>` elements**
10. **Collapse empty `<g>` elements** — iterate up to 15 passes
11. **Remove metadata attributes**: `data-stacking-layer`, `data-stacking-context`,
    `data-z-index`, `data-tag`, `aria-owns`, `role`, `aria-level`, `aria-hidden`,
    `data-view-box`, `data-width`, `data-height`
12. **Remove redundant text attributes**: `dominant-baseline`, `font-size-adjust`,
    `font-stretch`, `font-variant`, `text-rendering`, `unicode-bidi`, `word-spacing`,
    `writing-mode`, `user-select`, `text-anchor`, `direction`, `text-decoration`,
    `font-style`, `textLength`, `lengthAdjust`, `xml:space`
13. **Remove standalone `color="..."` attribute** (careful not to strip `flood-color`)
14. **Clean `&quot;` in font-family** to single quotes
15. **Convert `rgb(r,g,b)` to hex** — more reliable in Penpot
16. **Final empty `<g>` collapse + whitespace cleanup**

### Text Data Extraction
During cleaning, parse all `<text>` elements:
```json
{
  "text": "ANALYTICS",
  "x": 162.0,
  "y": 186.0,
  "fill": "#1F1F1F",
  "fontFamily": "Ysabeau Infant",
  "fontSize": "24",
  "fontWeight": "575",
  "letterSpacing": "-0.6"
}
```

**Important**: SVG `y` is the text **baseline**, not top of bounding box.

### Shadow Class Detection
Scan for Panda CSS classes: `bx-sh_golden`, `bx-sh_nav`, `bx-sh_code`.
These map to native Penpot shadow definitions applied post-import.

### Output Format
```json
{
  "svg": "<svg ...>...</svg>",
  "texts": [{ "text": "...", "x": 0, "y": 0, ... }],
  "shadows": ["golden"],
  "width": 1394,
  "height": 498
}
```

---

## Stage 4: Penpot Import (Why It's Complex)

### The Problem
Penpot's SVG import has three fundamental limitations:
1. **Text → paths** — all SVG `<text>` becomes vector curves, not editable text (Penpot bug #5187, closed as "not planned")
2. **No `fillOpacity`** — shapes import without opacity, rendering them invisible
3. **No SVG filters** — `<feDropShadow>` and other filters are ignored

### The Solution: Hybrid Import Pipeline (v7)
Import the SVG for visual structure (shapes, icons, layout), then:
- Fix fill opacity on all shapes
- Add shadows natively via Penpot's shadow API
- Replace path-text with editable Penpot Text shapes
- Align CTA arrows to their matching text

### The Complete Pipeline

```js
// Step 1: Import cleaned SVG
const group = penpot.createShapeFromSvg(cleanedSvg);

// Step 2: Fix fillOpacity (CRITICAL — shapes are invisible without this)
for (const s of allShapes) {
  if (s.fills?.length > 0) {
    s.fills = s.fills.map(f => ({ ...f, fillOpacity: f.fillOpacity ?? 1 }));
  }
}

// Step 3: Add native shadows based on CSS class names
// Penpot shadows API: shape.shadows = [{ color: {color, opacity}, offsetX, offsetY, blur, spread }]

// Step 4: Hide svg-raw text, create editable Text shapes
// Y positioning: penpotY = svgBaselineY - fontSize * 0.85

// Step 5: Reparent small arrow paths to top level
// (breaks free of SVG group transforms that prevent positioning)

// Step 6: await sleep(200) — CRITICAL
// Penpot needs time to process DOM changes before position reads are accurate

// Step 7: Align arrows to matching-color text via setParentXY
// Match by: path.fills[0].fillColor === text.fills[0].fillColor
// Position: x = text.x + text.width + 8, y = text.y + (text.height - arrow.height) / 2
```

### Key Gotchas (Learned the Hard Way)

| # | Gotcha | Solution |
|---|--------|----------|
| 1 | Shapes invisible after import | Set `fillOpacity: 1` on every shape |
| 2 | SVG filters don't render | Use Penpot native `shadows` API |
| 3 | Text is `svg-raw` (paths) | Hide it, create `penpot.createText()` overlays |
| 4 | Masks break after reparenting | Flatten during SVG cleaning |
| 5 | Direct `x`/`y` assignment doesn't update visually | Use `penpotUtils.setParentXY()` |
| 6 | Arrow position reads stale after DOM changes | `await sleep(200)` before alignment |
| 7 | Complex nested SVGs don't render | Strip dom-to-svg scaffolding first |
| 8 | ViewBox offset breaks alignment | Normalize to `0 0 w h` |
| 9 | `rgb()` colors less reliable than hex | Convert during cleaning |
| 10 | Arrow vs icon identification | width < 15px = arrow, matched by fill color |
| 11 | Penpot plugin has no filesystem access | Fetch data via HTTP from API |

### Beam Shadow Tokens

```js
const BEAM_SHADOWS = {
  golden: [
    { color: { color: "#7F6315", opacity: 0.15 }, offsetX: -3, offsetY: 5, blur: 13, spread: 0 },
    { color: { color: "#7F6315", opacity: 0.11 }, offsetX: -11, offsetY: 21, blur: 32, spread: 0 },
    { color: { color: "#7F6315", opacity: 0.08 }, offsetX: -21, offsetY: 43, blur: 53, spread: 0 },
    { color: { color: "#7F6315", opacity: 0.05 }, offsetX: -43, offsetY: 85, blur: 80, spread: 0 },
  ],
  nav: [
    { color: { color: "#7F6315", opacity: 0.08 }, offsetX: 0, offsetY: 3, blur: 13, spread: 0 },
  ],
  code: [
    { color: { color: "#000000", opacity: 0.5 }, offsetX: 0, offsetY: 7, blur: 20, spread: -7 },
  ],
};
```

### Beam Fonts in Penpot

| Font | Weights | Usage |
|------|---------|-------|
| Ysabeau Infant | 431, 575, 647, 791 | Body, heading, label, button, caption, display, section |
| Monaspace Argon | 400 | Code, code small |

---

## Stage 5: Penpot Plugin ("Beam Sync")

### Why a Plugin?
- Runs inside Penpot — no external tools needed
- Designers click a button, components appear
- Can re-sync when components change
- Sustainable: no MCP server, no CLI, no manual process

### Architecture
```
design.sunbeam.pt/api/components ──HTTP──▶ Beam Sync Plugin ──Penpot API──▶ Design File
                                           (plugin.ts)
```

### Plugin Structure (based on Penpot plugin SDK)
```
beam-sync-plugin/
├── manifest.json          # name, permissions, code entry
├── plugin.ts              # Penpot sandbox code (has `penpot` API)
├── index.html             # Plugin UI
├── src/
│   ├── app.ts             # UI logic
│   └── styles.css
└── assets/
    └── icon.png
```

### manifest.json
```json
{
  "name": "Beam Sync",
  "version": 2,
  "code": "assets/plugin.js",
  "icon": "assets/icon.png",
  "description": "Sync Beam Design Language components into your Penpot project",
  "permissions": ["content:read", "content:write"]
}
```

### Plugin Communication
- **UI → Plugin**: `parent.postMessage({ type: "import-component", ... })`
- **Plugin → UI**: `penpot.ui.sendMessage({ type: "import-complete", ... })`
- **Plugin → Penpot**: Direct `penpot.*` API calls

### Planned Plugin UI Features
- Component browser (85 components, variant count, search/filter)
- Light/dark theme toggle
- Import single component / batch import all
- Sync button (detect changed components, re-import)
- Progress indicator for batch operations
- Page organization (auto-create pages per category)

### API Endpoint (on design.sunbeam.pt)
```
GET /api/components              → { components: [{ name, variants: [{ name, themes }] }] }
GET /api/components/:name/:variant?theme=light  → { svg, texts, shadows, width, height }
```

Cleaned SVGs + text metadata generated at build time, served as static JSON by Caddy.

---

## Component Design Fixes Made During This Work

| Component | File | Fix | Theme |
|-----------|------|-----|-------|
| MarkdownEditor | `markdown-editor.tsx` | Toolbar button `color: text.secondary → text.primary` | Light |
| DiffViewer | `diff-viewer.tsx` | Add/remove bg: `0.15 → 0.2` opacity in dark; explicit white text color in dark; hunk header bg boosted in dark; line numbers `text.muted → text.secondary` | Dark |
| TransferList | `transfer-list.tsx` | Action button `backgroundColor: transparent → bg.card`; arrow icon `color: text.secondary → { base: text.secondary, _dark: warm.ivory }` | Dark |

---

## File Locations

| File | Purpose |
|------|---------|
| `app/scripts/capture-stories.mjs` | SVG capture pipeline |
| `app/scripts/embedded-fonts.css` | Base64 Ysabeau Infant woff2 (~50KB) |
| `app/scripts/dom-to-svg.bundle.js` | IIFE bundle of dom-to-svg library |
| `app/captured-svgs/` | 758 SVG output files |
| `app/.storybook/main.ts` | Storybook config |
| `app/.storybook/preview.ts` | Storybook preview decorator |
| `app/.storybook/panda.css` | Pre-generated Panda CSS for Storybook |
| `docs/beam-sync-pipeline.md` | This document |

---

## Running the Pipeline

### Prerequisites
```bash
cd beam-ui/app
npm install
npx panda codegen
npx panda cssgen --outfile .storybook/panda.css
```

### 1. Start Storybook
```bash
cd beam-ui/app
npx storybook dev -p 6006 --no-open
```

### 2. Run SVG Capture
```bash
cd beam-ui
node app/scripts/capture-stories.mjs
```

### 3. (Future) Build with Capture
Capture integrated into Vite build, runs in parallel during `npm run build`.

### 4. (Future) Deploy
SVGs + cleaned metadata deployed with the design language site.
Plugin fetches from `design.sunbeam.pt/api/components`.
