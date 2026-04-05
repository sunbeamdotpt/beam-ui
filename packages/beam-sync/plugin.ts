/**
 * Beam Sync — Penpot Plugin Entry Point
 *
 * Runs in Penpot's plugin sandbox. Has access to the `penpot` global API.
 * Communicates with the UI iframe via message passing.
 */

import { importComponent, type ComponentData } from "./src/lib/importer.ts";

const API_BASE = "https://design.sunbeam.pt/api";

// Open plugin UI
penpot.ui.open("Beam Sync", `?theme=${penpot.theme}`, {
  width: 360,
  height: 600,
});

// Handle theme changes
penpot.on("themechange", (theme) => {
  penpot.ui.sendMessage({ type: "theme", content: theme });
});

// Handle messages from UI
penpot.ui.onMessage(async (msg: any) => {
  switch (msg.type) {
    case "fetch-components": {
      try {
        const resp = await fetch(`${API_BASE}/components.json`);
        const data = await resp.json();
        penpot.ui.sendMessage({ type: "components-loaded", content: data });
      } catch (e: any) {
        penpot.ui.sendMessage({ type: "error", content: `Failed to fetch components: ${e.message}` });
      }
      break;
    }

    case "import-component": {
      const { component, variant, theme } = msg.content;
      try {
        const suffix = theme === "dark" ? ".dark" : "";
        const resp = await fetch(`${API_BASE}/components/${component}/${variant}${suffix}.json`);
        const data: ComponentData = await resp.json();

        const group = await importComponent(data, penpot, penpotUtils, {
          x: penpot.viewport.center.x,
          y: penpot.viewport.center.y,
        });

        penpot.ui.sendMessage({
          type: "import-complete",
          content: { component, variant, theme, id: group.id },
        });
      } catch (e: any) {
        penpot.ui.sendMessage({
          type: "error",
          content: `Failed to import ${component}/${variant}: ${e.message}`,
        });
      }
      break;
    }

    case "import-all": {
      const { components, theme } = msg.content;
      let done = 0;
      let x = 0;
      let y = 0;
      const spacing = 100;

      for (const comp of components) {
        for (const variant of comp.variants) {
          if (!variant.themes.includes(theme)) continue;
          try {
            const suffix = theme === "dark" ? ".dark" : "";
            const resp = await fetch(`${API_BASE}/components/${comp.name}/${variant.name}${suffix}.json`);
            const data: ComponentData = await resp.json();

            await importComponent(data, penpot, penpotUtils, { x, y });

            y += data.height + spacing;
            done++;

            penpot.ui.sendMessage({
              type: "import-progress",
              content: { done, total: components.length },
            });
          } catch {}
        }
        x += 1500;
        y = 0;
      }

      penpot.ui.sendMessage({ type: "import-all-complete", content: { done } });
      break;
    }
  }
});
