/**
 * Beam Sync — Penpot Plugin Entry Point
 *
 * Runs in Penpot's plugin sandbox. Has access to the `penpot` global API.
 * Communicates with the UI iframe via message passing.
 */

import { importComponent, type ComponentData } from "./src/lib/importer.ts";

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
// NOTE: fetch() is done in the UI iframe (browser context), not here (sandbox).
// The UI sends the fetched data to plugin.ts for Penpot API operations.
penpot.ui.onMessage(async (msg: any) => {
  switch (msg.type) {
    case "import-component": {
      // UI already fetched the component data — we just import it
      const data: ComponentData = msg.content;
      try {
        const group = await importComponent(data, penpot, {
          x: penpot.viewport.center.x,
          y: penpot.viewport.center.y,
        });

        penpot.ui.sendMessage({
          type: "import-complete",
          content: { component: data.component, variant: data.variant, theme: data.theme, id: group.id },
        });
      } catch (e: any) {
        penpot.ui.sendMessage({
          type: "error",
          content: `Failed to import ${data.component}/${data.variant}: ${e.message}`,
        });
      }
      break;
    }

    case "import-batch": {
      // UI sends an array of pre-fetched component data
      const { items } = msg.content;
      let done = 0;
      let x = 0;
      let y = 0;
      const spacing = 100;
      let lastComponent = "";

      for (const data of items) {
        try {
          if (data.component !== lastComponent) {
            if (lastComponent) { x += 1500; y = 0; }
            lastComponent = data.component;
          }

          await importComponent(data, penpot, { x, y });
          y += data.height + spacing;
          done++;

          penpot.ui.sendMessage({
            type: "import-progress",
            content: { done, total: items.length },
          });
        } catch {}
      }

      penpot.ui.sendMessage({ type: "import-all-complete", content: { done } });
      break;
    }
  }
});
