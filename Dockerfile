# Stage 1: Build the static site
FROM node:22-alpine AS build
WORKDIR /build

# Copy workspace structure (without lockfile — it has macOS-specific optional deps)
COPY package.json ./
COPY packages/ packages/
COPY app/package.json app/panda.config.ts app/postcss.config.cjs app/tsconfig.json app/vite.config.ts app/index.html ./app/
COPY app/src/ app/src/
COPY app/public/ app/public/

# Install deps at root (workspace) and app level
RUN npm install
WORKDIR /build/app
RUN npm install
RUN npx panda codegen
RUN NODE_OPTIONS="--max-old-space-size=4096" npx vite build

# Stage 2: Get Caddy binary
FROM caddy:2-alpine AS caddy

# Stage 3: Distroless production
FROM gcr.io/distroless/static-debian12:nonroot

COPY --from=caddy /usr/bin/caddy /usr/bin/caddy
COPY --from=build /build/app/dist /srv

COPY <<'EOF' /etc/caddy/Caddyfile
:8080 {
	root * /srv

	# AI user-agent matcher (single regex, OR logic)
	@ai header_regexp User-Agent (?i)(GPTBot|ChatGPT|OAI-SearchBot|ClaudeBot|Claude-User|Claude-Web|anthropic-ai|PerplexityBot|Perplexity-User|Google-Extended|Gemini|PhindBot|YouBot|Devin|FirecrawlAgent|Crawl4AI)

	# Serve per-component markdown to AI user-agents (skip if ?render=html)
	@aiDocs {
		header_regexp User-Agent (?i)(GPTBot|ChatGPT|OAI-SearchBot|ClaudeBot|Claude-User|Claude-Web|anthropic-ai|PerplexityBot|Perplexity-User|Google-Extended|Gemini|PhindBot|YouBot|Devin|FirecrawlAgent|Crawl4AI)
		not query render=html
		path_regexp comp ^/(components|foundations)/(.+)$
	}
	rewrite @aiDocs /docs/{re.comp.2}.md

	file_server
	try_files {path} /index.html
	encode gzip
	header {
		X-Content-Type-Options nosniff
		X-Frame-Options DENY
		Referrer-Policy strict-origin-when-cross-origin
	}
}
EOF

EXPOSE 8080
USER nonroot
ENTRYPOINT ["/usr/bin/caddy", "run", "--config", "/etc/caddy/Caddyfile"]
