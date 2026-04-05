/**
 * Beam Sync Plugin UI
 *
 * Communicates with plugin.ts via postMessage.
 * Displays component list, handles search, import, and sync.
 */

interface ComponentInfo {
  name: string;
  category: string;
  variants: { name: string; themes: string[] }[];
}

interface ComponentIndex {
  buildLabel: string;
  components: ComponentInfo[];
}

const API_BASE = "https://design.sunbeam.pt/api";

let components: ComponentInfo[] = [];
let currentTheme: "light" | "dark" = "light";

// ── Message handling ──

function sendToPlugin(msg: any) {
  parent.postMessage(msg, "*");
}

// ── API fetching (runs in UI iframe, not plugin sandbox) ──

async function fetchComponents(): Promise<ComponentIndex | null> {
  try {
    const resp = await fetch(`${API_BASE}/components.json`);
    return await resp.json();
  } catch (e: any) {
    setStatus(`Error fetching components: ${e.message}`);
    return null;
  }
}

async function fetchComponentData(component: string, variant: string, theme: string) {
  const suffix = theme === "dark" ? ".dark" : "";
  const resp = await fetch(`${API_BASE}/components/${encodeURIComponent(component)}/${encodeURIComponent(variant)}${suffix}.json`);
  return await resp.json();
}

window.addEventListener("message", (event) => {
  const msg = event.data;
  if (!msg || !msg.type) return;

  switch (msg.type) {
    case "components-loaded":
      onComponentsLoaded(msg.content);
      break;
    case "import-complete":
      setStatus(`Imported ${msg.content.component}/${msg.content.variant}`);
      break;
    case "import-progress":
      updateProgress(msg.content.done, msg.content.total);
      break;
    case "import-all-complete":
      hideProgress();
      setStatus(`Imported ${msg.content.done} components`);
      break;
    case "theme":
      document.body.setAttribute("data-theme", msg.content);
      break;
    case "error":
      setStatus(`Error: ${msg.content}`);
      break;
  }
});

// ── UI updates ──

function onComponentsLoaded(data: ComponentIndex) {
  components = data.components;
  setStatus(`${components.length} components (build: ${data.buildLabel.slice(0, 10)})`);
  renderList(components);
}

function createComponentItem(comp: ComponentInfo): HTMLElement {
  const item = document.createElement("div");
  item.className = "component-item";

  const info = document.createElement("div");

  const name = document.createElement("div");
  name.className = "component-name";
  name.textContent = comp.name;

  const meta = document.createElement("div");
  meta.className = "component-meta";
  meta.textContent = `${comp.category} \u00B7 ${comp.variants.length} variants`;

  info.appendChild(name);
  info.appendChild(meta);

  const btn = document.createElement("button");
  btn.className = "import-btn";
  btn.textContent = "Import";
  btn.addEventListener("click", async (e) => {
    e.stopPropagation();
    const defaultVariant = comp.variants.find((v) => v.name === "Default") || comp.variants[0];
    setStatus(`Fetching ${comp.name}/${defaultVariant.name}...`);
    try {
      const data = await fetchComponentData(comp.name, defaultVariant.name, currentTheme);
      sendToPlugin({ type: "import-component", content: data });
      setStatus(`Importing ${comp.name}/${defaultVariant.name}...`);
    } catch (err: any) {
      setStatus(`Error: ${err.message}`);
    }
  });

  item.appendChild(info);
  item.appendChild(btn);
  return item;
}

function renderList(items: ComponentInfo[]) {
  const list = document.getElementById("component-list")!;
  list.replaceChildren();

  if (items.length === 0) {
    const empty = document.createElement("div");
    empty.className = "loading";
    empty.textContent = "No components found";
    list.appendChild(empty);
    return;
  }

  for (const comp of items) {
    list.appendChild(createComponentItem(comp));
  }
}

function setStatus(text: string) {
  document.getElementById("status")!.textContent = text;
}

function showProgress() {
  document.getElementById("progress")!.hidden = false;
}

function hideProgress() {
  document.getElementById("progress")!.hidden = true;
}

function updateProgress(done: number, total: number) {
  showProgress();
  const pct = Math.round((done / total) * 100);
  (document.getElementById("progress-fill") as HTMLElement).style.width = `${pct}%`;
  document.getElementById("progress-text")!.textContent = `${done}/${total}`;
}

// ── Event listeners ──

document.getElementById("search")!.addEventListener("input", (e) => {
  const query = (e.target as HTMLInputElement).value.toLowerCase();
  const filtered = query
    ? components.filter((c) => c.name.toLowerCase().includes(query))
    : components;
  renderList(filtered);
});

document.getElementById("theme-light")!.addEventListener("click", () => {
  currentTheme = "light";
  document.getElementById("theme-light")!.classList.add("active");
  document.getElementById("theme-dark")!.classList.remove("active");
});

document.getElementById("theme-dark")!.addEventListener("click", () => {
  currentTheme = "dark";
  document.getElementById("theme-dark")!.classList.add("active");
  document.getElementById("theme-light")!.classList.remove("active");
});

document.getElementById("import-all")!.addEventListener("click", async () => {
  if (!components.length) return;
  showProgress();
  setStatus("Fetching all component data...");

  const items = [];
  let fetched = 0;
  for (const comp of components) {
    for (const variant of comp.variants) {
      if (!variant.themes.includes(currentTheme)) continue;
      try {
        const data = await fetchComponentData(comp.name, variant.name, currentTheme);
        items.push(data);
        fetched++;
        updateProgress(fetched, components.reduce((s, c) => s + c.variants.length, 0));
      } catch {}
    }
  }

  setStatus(`Importing ${items.length} components...`);
  sendToPlugin({ type: "import-batch", content: { items } });
});

document.getElementById("sync")!.addEventListener("click", async () => {
  setStatus("Syncing...");
  const data = await fetchComponents();
  if (data) onComponentsLoaded(data);
});

// ── Init ──

const params = new URLSearchParams(window.location.search);
const theme = params.get("theme") || "light";
document.body.setAttribute("data-theme", theme);

// Fetch component list from API (runs in iframe context)
fetchComponents().then((data) => {
  if (data) onComponentsLoaded(data);
});
