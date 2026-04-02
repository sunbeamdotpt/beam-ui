# Stage 1: Build the static site
FROM node:22-alpine AS build
WORKDIR /build

# Copy workspace structure (without lockfile — it has macOS-specific optional deps)
COPY package.json ./
COPY packages/ packages/
COPY app/package.json app/panda.config.ts app/postcss.config.cjs app/tsconfig.json app/vite.config.ts app/index.html ./app/
COPY app/src/ app/src/

# Install from app dir — fresh install gets correct platform binaries
WORKDIR /build/app
RUN npm install
RUN npx panda codegen
RUN npx vite build

# Stage 2: Get Caddy binary
FROM caddy:2-alpine AS caddy

# Stage 3: Distroless production
FROM gcr.io/distroless/static-debian12:nonroot

COPY --from=caddy /usr/bin/caddy /usr/bin/caddy
COPY --from=build /build/app/dist /srv

COPY <<'EOF' /etc/caddy/Caddyfile
:8080 {
	root * /srv
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
