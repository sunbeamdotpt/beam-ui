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

# Build Beam Sync plugin
WORKDIR /build/packages/beam-sync
RUN npm install 2>/dev/null || true
RUN npx esbuild plugin.ts --bundle --format=esm --minify --outfile=dist/assets/plugin.js 2>/dev/null || true
RUN npx vite build 2>/dev/null || true
RUN cp manifest.json dist/ 2>/dev/null || true
RUN cp -r assets dist/ 2>/dev/null || true

# Copy plugin build to main dist
WORKDIR /build
RUN cp -r packages/beam-sync/dist app/dist/beam-sync 2>/dev/null || true

# Stage 2: Deno runtime
FROM denoland/deno:2.3.2

WORKDIR /app
COPY --from=build /build/app/dist /app/dist
COPY server.ts /app/server.ts

EXPOSE 8080
USER deno
CMD ["deno", "run", "--allow-net", "--allow-read", "--allow-env", "server.ts"]
