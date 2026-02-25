# Stage 1 — Build the React app
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# CRA build output → /app/build
RUN npm run build

# Stage 2 — Serve with Nginx
FROM nginx:alpine

# Copy built React files
COPY --from=builder /app/build /usr/share/nginx/html

# Copy Nginx config (handles React Router + API proxy)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
