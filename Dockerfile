# Stage 1: Build the static site + Storybook + plugin
FROM node:22-alpine AS build
WORKDIR /build

# Copy workspace structure
COPY package.json ./
COPY packages/ packages/
COPY app/package.json app/panda.config.ts app/postcss.config.cjs app/tsconfig.json app/vite.config.ts app/index.html ./app/
COPY app/.storybook/ app/.storybook/
COPY app/src/ app/src/
COPY app/public/ app/public/
COPY app/scripts/ app/scripts/
COPY app/captured-svgs/ app/captured-svgs/

# Install deps at root (workspace) and app level
RUN npm install
WORKDIR /build/app
RUN npm install
RUN npx panda codegen
RUN NODE_OPTIONS="--max-old-space-size=4096" npx vite build
RUN npx panda cssgen --outfile .storybook/panda.css
RUN STORYBOOK_BASE=/storybook/ npx storybook build -o dist/storybook

# Build Beam Sync plugin (use root node_modules for esbuild)
WORKDIR /build
RUN npx esbuild packages/beam-sync/plugin.ts \
  --bundle --format=esm --minify \
  --outfile=packages/beam-sync/dist/assets/plugin.js || echo "WARN: plugin.ts bundle failed"
# Inline the CSS and JS into index.html (no Vite needed for this simple plugin)
RUN mkdir -p packages/beam-sync/dist/assets && \
  cp packages/beam-sync/manifest.json packages/beam-sync/dist/manifest.json && \
  cp packages/beam-sync/src/ui/styles.css packages/beam-sync/dist/assets/styles.css && \
  npx esbuild packages/beam-sync/src/ui/app.ts \
    --bundle --format=esm --minify \
    --outfile=packages/beam-sync/dist/assets/app.js || echo "WARN: app.ts bundle failed"
# Write a production index.html that refs the built assets
RUN printf '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>Beam Sync</title>\n<link rel="stylesheet" href="assets/styles.css">\n</head>\n<body>\n<div id="app">\n<header class="header"><h1 class="title">Beam Sync</h1><div class="theme-toggle"><button id="theme-light" class="theme-btn active">Light</button><button id="theme-dark" class="theme-btn">Dark</button></div></header>\n<div class="search-bar"><input type="text" id="search" placeholder="Search components..." /></div>\n<div class="actions"><button id="import-all" class="btn primary">Import All</button><button id="sync" class="btn secondary">Sync Changes</button></div>\n<div id="progress" class="progress" hidden><div class="progress-bar"><div id="progress-fill" class="progress-fill"></div></div><span id="progress-text" class="progress-text">0/0</span></div>\n<div id="component-list" class="component-list"><div class="loading">Loading components...</div></div>\n<div id="status" class="status"></div>\n</div>\n<script type="module" src="assets/app.js"></script>\n</body>\n</html>' > packages/beam-sync/dist/index.html
# Copy to main dist
RUN mkdir -p app/dist/beam-sync && cp -r packages/beam-sync/dist/* app/dist/beam-sync/

# Stage 2: Deno runtime
FROM denoland/deno:2.3.2

WORKDIR /app
COPY --from=build /build/app/dist /app/dist
COPY server.ts /app/server.ts

EXPOSE 8080
USER deno
CMD ["deno", "run", "--allow-net", "--allow-read", "--allow-env", "server.ts"]
