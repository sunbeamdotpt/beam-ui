/**
 * capture-stories.mjs
 *
 * Visits each Storybook story in headless Chrome, converts the rendered
 * DOM to SVG using dom-to-svg, and saves the output with embedded fonts.
 *
 * Uses Storybook's index.json for real story IDs (no guessing).
 * Captures portal content (dialogs, popovers) that render outside the root.
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

/** Fetch real story IDs from Storybook's index */
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
  }));
}

async function captureSvg(page, fontCss) {
  return page.evaluate(async (embeddedFonts) => {
    const lib = window.domToSvg;
    if (!lib || !lib.elementToSVG) return null;

    // Find the best capture target:
    // 1. storybook-root children (normal components)
    // 2. Portal content (dialogs, popovers appended to body)
    // 3. Fall back to body
    const root = document.getElementById("storybook-root");
    let target = root?.children[0];

    // If root is empty, look for portal content
    if (!target || target.children.length === 0) {
      // Find non-storybook divs appended to body (portals)
      const bodyChildren = [...document.body.children].filter(
        (el) =>
          el.id !== "storybook-root" &&
          el.id !== "storybook-docs" &&
          !el.classList.contains("sb-wrapper") &&
          !el.classList.contains("sb-preparing-story") &&
          !el.classList.contains("sb-preparing-docs") &&
          !el.classList.contains("sb-nopreview") &&
          !el.classList.contains("sb-errordisplay") &&
          el.tagName !== "SCRIPT"
      );

      if (bodyChildren.length > 0) {
        // Wrap portal content in a container for capture
        const wrapper = document.createElement("div");
        wrapper.style.position = "relative";
        wrapper.style.display = "inline-block";
        for (const child of bodyChildren) {
          // Clone to avoid removing from DOM
          wrapper.appendChild(child.cloneNode(true));
        }
        document.body.appendChild(wrapper);
        target = wrapper;
      } else if (root) {
        target = root;
      } else {
        target = document.body;
      }
    }

    try {
      const svgDoc = lib.elementToSVG(target);

      // Inject embedded fonts
      const styleEl =
        svgDoc.querySelector("style") ||
        svgDoc.createElementNS("http://www.w3.org/2000/svg", "style");
      styleEl.textContent = embeddedFonts + "\n" + (styleEl.textContent || "");
      if (!styleEl.parentNode) {
        svgDoc.documentElement.insertBefore(styleEl, svgDoc.documentElement.firstChild);
      }

      return new XMLSerializer().serializeToString(svgDoc);
    } catch (e) {
      return "ERROR: " + e.message;
    }
  }, fontCss);
}

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
  console.log(`Found ${stories.length} components, ${totalVariants} variants`);

  mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  let captured = 0;
  let failed = 0;

  for (const story of stories) {
    const compDir = resolve(OUTPUT_DIR, story.componentName);
    mkdirSync(compDir, { recursive: true });

    for (const variant of story.variants) {
      const url = `${STORYBOOK_URL}/iframe.html?id=${variant.id}&viewMode=story`;
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 900 });

      try {
        await page.goto(url, { waitUntil: "networkidle0", timeout: 15000 });

        // Force-load fonts, replace icon font with inline SVGs, clean up
        await page.evaluate(async () => {
          await document.fonts.ready;
          await Promise.allSettled([...document.fonts].map((f) => f.load().catch(() => {})));

          // Hide native form inputs (their "on" value leaks)
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
                const resp = await fetch(
                  `https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/${name}/default/24px.svg`
                );
                if (resp.ok) iconCache[name] = await resp.text();
              } catch {}
            }

            if (iconCache[name]) {
              const wrapper = document.createElement("span");
              wrapper.style.display = "inline-flex";
              wrapper.style.width = size + "px";
              wrapper.style.height = size + "px";
              wrapper.style.verticalAlign = "middle";
              // Parse the SVG safely via DOMParser
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
        });

        await new Promise((r) => setTimeout(r, 500));
        await page.addScriptTag({ path: DOM_TO_SVG_BUNDLE });
        await new Promise((r) => setTimeout(r, 300));

        const svg = await captureSvg(page, EMBEDDED_FONTS);

        if (!svg || svg.length < 200 || svg.startsWith("ERROR:")) {
          console.log(`  SKIP ${story.componentName}/${variant.name}: ${svg?.slice(0, 60) || "empty"}`);
          failed++;
        } else {
          writeFileSync(resolve(compDir, `${variant.name}.svg`), svg, "utf-8");
          captured++;
        }
      } catch (err) {
        console.log(`  FAIL ${story.componentName}/${variant.name}: ${err.message.slice(0, 80)}`);
        failed++;
      }

      await page.close();

      if ((captured + failed) % 50 === 0) {
        console.log(`  progress: ${captured + failed}/${totalVariants} (${captured} ok, ${failed} fail)`);
      }
    }

    console.log(`  ${story.componentName}: ${story.variants.length} variants`);
  }

  await browser.close();
  console.log(`\nDone: ${captured} captured, ${failed} failed out of ${totalVariants}`);
  console.log(`Output: ${OUTPUT_DIR}`);
}

main().catch(console.error);
