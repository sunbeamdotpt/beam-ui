/**
 * capture-stories.mjs
 *
 * Multi-strategy SVG capture pipeline for Storybook stories.
 *
 * Strategies:
 *   static        — capture storybook-root child directly
 *   portal-open   — story renders with open={true}, capture portal content
 *   portal-trigger — click/hover trigger to open overlay, then capture
 *   layout        — full viewport capture for shell/layout components
 *
 * Features:
 *   - Auto-classifies stories by component type
 *   - Programmatic portal triggers (click, contextmenu, hover)
 *   - CSS box-shadow → SVG filter post-processing
 *   - Auto-viewport sizing (crop to content bounds)
 *   - dom-to-svg inlineResources() for images
 *   - Embedded font injection
 *   - Material Symbols → inline SVG replacement
 *
 * Prerequisites:
 *   - Storybook running at http://localhost:6006
 *   - npm install -D puppeteer dom-to-svg
 *
 * Run: node app/scripts/capture-stories.mjs
 *
 * Output: app/captured-svgs/{ComponentName}/{VariantName}.svg
 */

import puppeteer from "puppeteer";
import { mkdirSync, writeFileSync, readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUTPUT_DIR = resolve(ROOT, "captured-svgs");
const STORYBOOK_URL = "http://localhost:6006";

const DOM_TO_SVG_BUNDLE = resolve(__dirname, "dom-to-svg.bundle.js");
const EMBEDDED_FONTS = readFileSync(resolve(__dirname, "embedded-fonts.css"), "utf-8");

/* ─── Shadow post-processing ──────────────────────────────────────────── */

/** Beam's design tokens define these shadow values. We inject matching SVG
 *  filters since dom-to-svg can't convert CSS box-shadow. */
const BEAM_SHADOW_FILTERS = {
  golden: `<filter id="beam-golden" x="-30%" y="-30%" width="160%" height="200%">
    <feDropShadow dx="-3" dy="5" stdDeviation="6.5" flood-color="rgb(127,99,21)" flood-opacity="0.15"/>
    <feDropShadow dx="-11" dy="21" stdDeviation="16" flood-color="rgb(127,99,21)" flood-opacity="0.11"/>
    <feDropShadow dx="-21" dy="43" stdDeviation="26.5" flood-color="rgb(127,99,21)" flood-opacity="0.08"/>
    <feDropShadow dx="-43" dy="85" stdDeviation="40" flood-color="rgb(127,99,21)" flood-opacity="0.05"/>
  </filter>`,
  nav: `<filter id="beam-nav" x="-10%" y="-10%" width="120%" height="140%">
    <feDropShadow dx="0" dy="3" stdDeviation="6.5" flood-color="rgb(127,99,21)" flood-opacity="0.08"/>
  </filter>`,
  code: `<filter id="beam-code" x="-10%" y="-10%" width="120%" height="160%">
    <feDropShadow dx="0" dy="7" stdDeviation="10" flood-color="rgb(0,0,0)" flood-opacity="0.5"/>
  </filter>`,
};

/** Inject SVG shadow filters based on Panda CSS class names preserved by dom-to-svg. */
/** Extra viewBox padding needed per shadow token (max offset + blur radius) */
const SHADOW_PADDING = {
  golden: { top: 8, right: 8, bottom: 130, left: 90 },  // -43dx+40blur left, 85dy+40blur bottom
  nav:    { top: 8, right: 8, bottom: 20, left: 8 },
  code:   { top: 8, right: 8, bottom: 30, left: 8 },
};

function injectShadowFilters(svgString) {
  // Check which shadow tokens are used via Panda CSS classes
  const used = [];
  if (/bx-sh_golden/.test(svgString)) used.push("golden");
  if (/bx-sh_nav/.test(svgString)) used.push("nav");
  if (/bx-sh_code/.test(svgString)) used.push("code");

  if (used.length === 0) return svgString;

  // Insert defs block
  const defs = `<defs>${used.map((k) => BEAM_SHADOW_FILTERS[k]).join("")}</defs>`;
  let result = svgString.replace(/(<svg[^>]*>)/, `$1${defs}`);

  // Apply filters to matching elements
  for (const key of used) {
    result = result.replace(
      new RegExp(`(<g[^>]*class="[^"]*bx-sh_${key}[^"]*")`, "g"),
      (match) => `${match} filter="url(#beam-${key})"`
    );
  }

  // Expand viewBox to accommodate shadow overflow
  const pad = { top: 0, right: 0, bottom: 0, left: 0 };
  for (const key of used) {
    const sp = SHADOW_PADDING[key];
    pad.top = Math.max(pad.top, sp.top);
    pad.right = Math.max(pad.right, sp.right);
    pad.bottom = Math.max(pad.bottom, sp.bottom);
    pad.left = Math.max(pad.left, sp.left);
  }

  const vbMatch = result.match(/viewBox="([\d.-]+)\s+([\d.-]+)\s+([\d.-]+)\s+([\d.-]+)"/);
  if (vbMatch) {
    const x = parseFloat(vbMatch[1]) - pad.left;
    const y = parseFloat(vbMatch[2]) - pad.top;
    const w = parseFloat(vbMatch[3]) + pad.left + pad.right;
    const h = parseFloat(vbMatch[4]) + pad.top + pad.bottom;
    result = result.replace(/viewBox="[^"]*"/, `viewBox="${x} ${y} ${w} ${h}"`);
    result = result.replace(/ width="[^"]*"/, ` width="${w}"`);
    result = result.replace(/ height="[^"]*"/, ` height="${h}"`);
  }

  return result;
}

/* ─── Strategy classification ─────────────────────────────────────────── */

/** Components whose stories already render with open={true} (portal content in DOM) */
const PORTAL_OPEN = new Set([
  "Dialog", "KanbanCardDetail", "Wizard", "Drawer",
]);

/** Components that need a click/hover to reveal portal content.
 *  Selector priority: data-part="trigger" (Ark UI convention) → first button in root.
 *  ContextMenu uses right-click on data-part="context-trigger". */
const PORTAL_TRIGGER_CONFIG = {
  Popover:             { action: "click" },
  DropdownMenu:        { action: "click" },
  ContextMenu:         { action: "contextmenu" },
  Select:              { action: "click" },
  Combobox:            { action: "click" },
  ColorPicker:         { action: "click" },
  DatePicker:          { action: "click" },
  HoverCard:           { action: "hover" },
  Tooltip:             { action: "hover" },
  NotificationCenter:  { action: "click" },
  ReactionPicker:      { action: "click" },
  AssigneePicker:      { action: "click" },
  BranchSelector:      { action: "click" },
  LabelPicker:         { action: "click" },
  MilestonePicker:     { action: "click" },
};

/** Layout/shell components that need full viewport */
const LAYOUT_COMPONENTS = new Set([
  "Shell", "Header", "Footer", "Sidebar", "RightRail",
  "ApiLayout", "DocsLayout", "FullwidthLayout",
]);

function classifyStory(componentName) {
  if (PORTAL_OPEN.has(componentName)) return "portal-open";
  if (componentName in PORTAL_TRIGGER_CONFIG) return "portal-trigger";
  if (LAYOUT_COMPONENTS.has(componentName)) return "layout";
  return "static";
}

/* ─── Story discovery ─────────────────────────────────────────────────── */

async function discoverStories() {
  const resp = await fetch(`${STORYBOOK_URL}/index.json`);
  const data = await resp.json();
  const entries = data.entries || data.stories || {};

  const byComponent = new Map();
  for (const [id, entry] of Object.entries(entries)) {
    if (entry.type !== "story") continue;
    const componentName = entry.title.split("/").pop();
    if (!byComponent.has(componentName)) byComponent.set(componentName, []);
    byComponent.get(componentName).push({ id, name: entry.name });
  }

  return [...byComponent.entries()].map(([componentName, variants]) => ({
    componentName,
    variants,
    strategy: classifyStory(componentName),
  }));
}

/* ─── Viewport auto-sizing ────────────────────────────────────────────── */

/** Measure visible content bounds for viewBox cropping.
 *  For portal components, bounds are measured AFTER the capture wrapper is created
 *  (inside captureSvg), so we skip pre-measurement here. */
async function getContentBounds(page, strategy) {
  if (strategy === "layout") return null;
  // Portal content is normalized into a wrapper during capture —
  // dom-to-svg will size the SVG to the wrapper bounds automatically
  if (strategy === "portal-open" || strategy === "portal-trigger") return null;

  return page.evaluate(() => {
    const root = document.getElementById("storybook-root");
    const target = root?.children[0] || root || document.body;
    const rect = target.getBoundingClientRect();
    const padding = 24;
    return {
      x: Math.max(0, Math.floor(rect.left) - padding),
      y: Math.max(0, Math.floor(rect.top) - padding),
      width: Math.ceil(rect.width) + padding * 2,
      height: Math.ceil(rect.height) + padding * 2,
    };
  });
}

/* ─── Portal trigger actions ──────────────────────────────────────────── */

async function triggerPortal(page, componentName) {
  const config = PORTAL_TRIGGER_CONFIG[componentName];
  if (!config) return false;

  const { action } = config;

  try {
    // Universal selector strategy for Ark UI components:
    // 1. [data-part="trigger"] — standard Ark UI trigger (Popover, Select, etc.)
    // 2. [data-part="context-trigger"] — context menu specific
    // 3. First button inside storybook-root — fallback for asChild triggers (DropdownMenu)
    const triggerSelector = await page.evaluate(() => {
      const trigger = document.querySelector('[data-part="trigger"]');
      if (trigger) return '[data-part="trigger"]';
      const ctxTrigger = document.querySelector('[data-part="context-trigger"]');
      if (ctxTrigger) return '[data-part="context-trigger"]';
      const root = document.getElementById("storybook-root");
      const btn = root?.querySelector("button");
      if (btn) {
        // Tag it so we can select it
        btn.setAttribute("data-capture-trigger", "true");
        return '[data-capture-trigger="true"]';
      }
      return null;
    });

    if (!triggerSelector) return false;

    if (action === "click") {
      await page.click(triggerSelector);
    } else if (action === "contextmenu") {
      const el = await page.$(triggerSelector);
      if (el) {
        const box = await el.boundingBox();
        if (box) {
          await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2, { button: "right" });
        }
      }
    } else if (action === "hover") {
      const el = await page.$(triggerSelector);
      if (el) {
        await el.hover();
      }
    }

    // Wait for portal content to appear (data-state changes from "closed" to "open")
    await page.waitForSelector('[data-state="open"]', { timeout: 3000 }).catch(() => {});

    // Wait for animations to settle
    await new Promise((r) => setTimeout(r, 400));
    return true;
  } catch (e) {
    return false;
  }
}

/* ─── SVG capture ─────────────────────────────────────────────────────── */

async function captureSvg(page, fontCss, strategy) {
  return page.evaluate(async (embeddedFonts, strat) => {
    const lib = window.domToSvg;
    if (!lib || !lib.elementToSVG) return null;

    const root = document.getElementById("storybook-root");

    /* ── Find capture target ── */
    // Ark UI v4 renders positioners in-tree (not body portals).
    // For overlay components, normalize position:fixed + transform on positioners
    // so they flow naturally and dom-to-svg can measure them correctly.
    if (strat === "portal-open" || strat === "portal-trigger") {
      // Normalize ALL positioners in the document (they're inside storybook-root)
      document.querySelectorAll('[data-part="positioner"]').forEach((pos) => {
        pos.style.position = "relative";
        pos.style.transform = "none";
        pos.style.top = "auto";
        pos.style.left = "auto";
        pos.style.right = "auto";
        pos.style.bottom = "auto";
        pos.style.zIndex = "auto";
        pos.removeAttribute("hidden");
        // Ensure content inside is visible
        const content = pos.querySelector('[data-part="content"]');
        if (content) {
          content.removeAttribute("hidden");
          content.style.position = "relative";
          content.setAttribute("data-state", "open");
        }
      });

      // Normalize dialog backdrops
      document.querySelectorAll('[data-part="backdrop"]').forEach((bd) => {
        bd.style.position = "relative";
        bd.style.width = "100%";
        bd.style.height = "auto";
        bd.style.minHeight = "400px";
      });
    }

    const target = root?.children[0] || root || document.body;

    /* ── Capture ── */
    try {
      const svgDoc = lib.elementToSVG(target);

      // Note: inlineResources() is intentionally skipped — it fetches external
      // resources in the page context which causes protocol timeouts and browser
      // crashes. Fonts are handled via embedded-fonts.css, icons via inline SVG
      // replacement. Images (avatars etc.) remain as external refs.

      // Inject embedded fonts
      const styleEl =
        svgDoc.querySelector("style") ||
        svgDoc.createElementNS("http://www.w3.org/2000/svg", "style");
      styleEl.textContent = embeddedFonts + "\n" + (styleEl.textContent || "");
      if (!styleEl.parentNode) {
        svgDoc.documentElement.insertBefore(styleEl, svgDoc.documentElement.firstChild);
      }

      const svgString = new XMLSerializer().serializeToString(svgDoc);
      return svgString;
    } catch (e) {
      return "ERROR: " + e.message;
    }
  }, fontCss, strategy);
}

/* ─── SVG viewBox cropping ────────────────────────────────────────────── */

function cropSvgViewBox(svgString, bounds) {
  if (!bounds || bounds.width <= 0 || bounds.height <= 0) return svgString;

  const x = Math.max(0, Math.round(bounds.x));
  const y = Math.max(0, Math.round(bounds.y));
  const w = Math.round(bounds.width);
  const h = Math.round(bounds.height);

  // Replace width, height, and viewBox attributes
  let result = svgString;
  result = result.replace(/width="[^"]*"/, `width="${w}"`);
  result = result.replace(/height="[^"]*"/, `height="${h}"`);
  result = result.replace(/viewBox="[^"]*"/, `viewBox="${x} ${y} ${w} ${h}"`);

  return result;
}

/* ─── Shared pre-capture DOM preparation ──────────────────────────────── */

async function prepareDom(page, theme = "light") {
  await page.evaluate(async (themeValue) => {
    // Force theme on <html> element (system preference may override Storybook decorator)
    document.documentElement.setAttribute("data-theme", themeValue);

    // Force-load all fonts
    await document.fonts.ready;
    await Promise.allSettled([...document.fonts].map((f) => f.load().catch(() => {})));

    // Hide native form inputs (their "on" value leaks in SVG)
    document.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach((el) => {
      el.style.display = "none";
    });

    // Replace Material Symbols icon font spans with inline SVGs
    const iconSpans = document.querySelectorAll(".material-symbols-outlined");
    const iconCache = {};
    for (const span of iconSpans) {
      const name = span.textContent.trim();
      if (!name) continue;
      const size = parseInt(getComputedStyle(span).fontSize) || 24;
      const color = getComputedStyle(span).color || "currentColor";

      if (!iconCache[name]) {
        try {
          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), 3000);
          const resp = await fetch(
            `https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/${name}/default/24px.svg`,
            { signal: controller.signal }
          );
          clearTimeout(timer);
          if (resp.ok) iconCache[name] = await resp.text();
        } catch {}
      }

      if (iconCache[name]) {
        const wrapper = document.createElement("span");
        wrapper.style.display = "inline-flex";
        wrapper.style.width = size + "px";
        wrapper.style.height = size + "px";
        wrapper.style.verticalAlign = "middle";
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(iconCache[name], "image/svg+xml");
        const svg = svgDoc.documentElement;
        svg.setAttribute("width", size);
        svg.setAttribute("height", size);
        svg.setAttribute("fill", color);
        wrapper.appendChild(document.importNode(svg, true));
        span.replaceWith(wrapper);
      }
    }
  }, theme);
}

/* ─── Main pipeline ───────────────────────────────────────────────────── */

/* ─── Semaphore for concurrency control ───────────────────────────────── */

function createSemaphore(concurrency) {
  let count = 0;
  const queue = [];
  return {
    async acquire() {
      if (count < concurrency) { count++; return; }
      await new Promise((resolve) => queue.push(resolve));
      count++;
    },
    release() {
      count--;
      if (queue.length > 0) queue.shift()();
    },
  };
}

/* ─── Single task capture ─────────────────────────────────────────────── */

async function captureOneTask({ story, variant, theme, browser, semaphore, stats }) {
  await semaphore.acquire();

  const suffix = theme === "dark" ? ".dark" : "";
  const compDir = resolve(OUTPUT_DIR, story.componentName);
  const outPath = resolve(compDir, `${variant.name}${suffix}.svg`);
  const url = `${STORYBOOK_URL}/iframe.html?id=${variant.id}&viewMode=story`;
  const vpWidth = story.strategy === "layout" ? 1440 : 1280;

  let page;
  try {
    page = await browser.newPage();
    page.setDefaultTimeout(30000);
    await page.setViewport({ width: vpWidth, height: 900 });

    await page.goto(url, { waitUntil: "networkidle0", timeout: 15000 });
    await prepareDom(page, theme);

    if (story.strategy === "portal-trigger") {
      await triggerPortal(page, story.componentName);
    }
    if (story.strategy === "portal-open") {
      await new Promise((r) => setTimeout(r, 500));
    }

    await new Promise((r) => setTimeout(r, 300));
    await page.addScriptTag({ path: DOM_TO_SVG_BUNDLE });
    await new Promise((r) => setTimeout(r, 200));

    const bounds = await getContentBounds(page, story.strategy);
    const svg = await captureSvg(page, EMBEDDED_FONTS, story.strategy);

    if (!svg || svg.length < 200 || svg.startsWith("ERROR:")) {
      if (theme === "light") stats.failed++;
    } else {
      let finalSvg = svg;
      if (story.strategy !== "layout" && bounds) {
        finalSvg = cropSvgViewBox(finalSvg, bounds);
      }
      finalSvg = injectShadowFilters(finalSvg);
      writeFileSync(outPath, finalSvg, "utf-8");
      if (theme === "light") stats.captured++;
    }
  } catch (err) {
    if (theme === "light") stats.failed++;
  }

  try { await page.close(); } catch {}
  semaphore.release();

  const done = stats.captured + stats.failed;
  if (done > 0 && done % 50 === 0) {
    console.log(`  progress: ${done}/${stats.total} (${stats.captured} ok, ${stats.failed} fail)`);
  }
}

/* ─── Main pipeline ───────────────────────────────────────────────────── */

const CONCURRENCY = parseInt(process.env.CAPTURE_CONCURRENCY || "6", 10);

async function main() {
  console.log("Fetching story index...");
  let stories;
  try {
    stories = await discoverStories();
  } catch {
    console.error("ERROR: Storybook not running at " + STORYBOOK_URL);
    process.exit(1);
  }

  const totalVariants = stories.reduce((sum, s) => sum + s.variants.length, 0);
  const strategyCounts = {};
  for (const s of stories) strategyCounts[s.strategy] = (strategyCounts[s.strategy] || 0) + s.variants.length;
  console.log(`Found ${stories.length} components, ${totalVariants} variants`);
  console.log(`Strategies: ${JSON.stringify(strategyCounts)}`);
  console.log(`Concurrency: ${CONCURRENCY} parallel pages`);

  mkdirSync(OUTPUT_DIR, { recursive: true });

  // Create output directories upfront
  for (const story of stories) {
    mkdirSync(resolve(OUTPUT_DIR, story.componentName), { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    protocolTimeout: 60000,
  });

  const semaphore = createSemaphore(CONCURRENCY);
  const stats = { captured: 0, failed: 0, total: totalVariants };

  // Build flat task list
  const tasks = [];
  for (const story of stories) {
    for (const variant of story.variants) {
      for (const theme of ["light", "dark"]) {
        tasks.push({ story, variant, theme, browser, semaphore, stats });
      }
    }
  }

  console.log(`Capturing ${tasks.length} SVGs (${totalVariants} variants × 2 themes)...`);
  const startTime = Date.now();

  // Run all tasks with concurrency limit
  await Promise.all(tasks.map((task) => captureOneTask(task)));

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  try { await browser.close(); } catch {}
  console.log(`\nDone: ${stats.captured} captured, ${stats.failed} failed out of ${totalVariants}`);
  console.log(`Time: ${elapsed}s (${CONCURRENCY} concurrent pages)`);
  console.log(`Output: ${OUTPUT_DIR}`);
}

main().catch(console.error);
