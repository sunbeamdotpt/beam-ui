/**
 * Beam Design Language — Deno Server
 *
 * Replaces Caddy. Serves:
 *   - Main SPA (design.sunbeam.pt)
 *   - Storybook SPA (/storybook/)
 *   - Component API (/api/components)
 *   - Beam Sync plugin (/beam-sync/)
 *   - AI-agent markdown docs (per user-agent)
 *   - Health check (/health)
 */

const PORT = parseInt(Deno.env.get("PORT") ?? "8080", 10);
const DIST = Deno.env.get("DIST") ?? "./dist";
const STORYBOOK = `${DIST}/storybook`;
const API = `${DIST}/api`;
const PLUGIN = `${DIST}/beam-sync`;
const DOCS = `${DIST}/docs`;

const MIME_TYPES: Record<string, string> = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ttf": "font/ttf",
  ".ico": "image/x-icon",
  ".txt": "text/plain",
  ".md": "text/markdown",
  ".xml": "application/xml",
};

const AI_AGENTS = /(?:GPTBot|ChatGPT|OAI-SearchBot|ClaudeBot|Claude-User|Claude-Web|anthropic-ai|PerplexityBot|Perplexity-User|Google-Extended|Gemini|PhindBot|YouBot|Devin|FirecrawlAgent|Crawl4AI)/i;

function getMimeType(path: string): string {
  const ext = path.match(/\.[^.]+$/)?.[0] ?? "";
  return MIME_TYPES[ext] ?? "application/octet-stream";
}

async function serveFile(path: string, headers?: Record<string, string>): Promise<Response> {
  try {
    const data = await Deno.readFile(path);
    return new Response(data, {
      headers: {
        "content-type": getMimeType(path),
        "x-content-type-options": "nosniff",
        ...headers,
      },
    });
  } catch {
    return new Response("Not Found", { status: 404 });
  }
}

async function fileExists(path: string): Promise<boolean> {
  try {
    const stat = await Deno.stat(path);
    return stat.isFile;
  } catch {
    return false;
  }
}

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const path = decodeURIComponent(url.pathname);
  const ua = req.headers.get("user-agent") ?? "";

  // Health check
  if (path === "/health") {
    return new Response(JSON.stringify({ ok: true, time: new Date().toISOString() }), {
      headers: { "content-type": "application/json" },
    });
  }

  // API routes — CORS enabled
  if (path.startsWith("/api/")) {
    const apiPath = `${API}${path.slice(4)}`;
    // Try exact file
    if (await fileExists(apiPath)) {
      return serveFile(apiPath, {
        "access-control-allow-origin": "*",
        "cache-control": "public, max-age=300",
      });
    }
    // Try with .json extension
    if (await fileExists(apiPath + ".json")) {
      return serveFile(apiPath + ".json", {
        "access-control-allow-origin": "*",
        "cache-control": "public, max-age=300",
      });
    }
    return new Response("Not Found", { status: 404 });
  }

  // Beam Sync plugin — redirect /beam-sync to /beam-sync/
  if (path === "/beam-sync") {
    return Response.redirect(url.origin + "/beam-sync/", 308);
  }
  if (path.startsWith("/beam-sync/")) {
    const subPath = path.slice(10) || "/index.html";
    if (subPath.endsWith("/")) {
      return serveFile(`${PLUGIN}${subPath}index.html`, { "access-control-allow-origin": "*" });
    }
    const pluginPath = `${PLUGIN}${subPath}`;
    if (await fileExists(pluginPath)) {
      return serveFile(pluginPath, { "access-control-allow-origin": "*" });
    }
    return serveFile(`${PLUGIN}/index.html`, { "access-control-allow-origin": "*" });
  }

  // Storybook — redirect /storybook to /storybook/
  if (path === "/storybook") {
    return Response.redirect(url.origin + "/storybook/", 308);
  }
  if (path.startsWith("/storybook/")) {
    const subPath = path.slice(10) || "/index.html";
    const sbPath = `${STORYBOOK}${subPath}`;
    if (subPath.endsWith("/")) {
      return serveFile(`${STORYBOOK}${subPath}index.html`);
    }
    if (await fileExists(sbPath)) {
      return serveFile(sbPath);
    }
    return serveFile(`${STORYBOOK}/index.html`);
  }

  // AI agent detection — serve markdown docs for component/foundation routes
  if (AI_AGENTS.test(ua) && url.searchParams.get("render") !== "html") {
    const compMatch = path.match(/^\/(components|foundations)\/(.+)$/);
    if (compMatch) {
      const mdPath = `${DOCS}/${compMatch[2]}.md`;
      if (await fileExists(mdPath)) {
        return serveFile(mdPath);
      }
    }
  }

  // Static files from dist
  const filePath = `${DIST}${path}`;
  if (path !== "/" && await fileExists(filePath)) {
    return serveFile(filePath);
  }

  // SPA fallback
  return serveFile(`${DIST}/index.html`);
}

console.log(`Beam Design Language server listening on :${PORT}`);
Deno.serve({ port: PORT }, handler);
