
# ── Dockerfile.backend ──────────────────────────────────────────────
# Node 18 + Alpine (matches your local version)
FROM node:18-alpine

WORKDIR /app

# Copy root package.json and install dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy the entire backend source (excludes client/ via .dockerignore)
COPY . .

# Port your Express app listens on (matches client proxy → 2999)
EXPOSE 2999

# server.js uses ES Modules ("type": "module") — plain node works fine
CMD ["node", "server.js"]