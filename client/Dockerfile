# ── Stage 1: Build the React app ──────────────────────────────────
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files first for better layer caching
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

# Copy source and build
COPY . .

# Accept build-time env vars
ARG VITE_APP_DOMAIN=https://pdflynx.com
ARG VITE_GA4_ID=
ENV VITE_APP_DOMAIN=$VITE_APP_DOMAIN
ENV VITE_GA4_ID=$VITE_GA4_ID

RUN npm run build

# ── Stage 2: Serve with Nginx ────────────────────────────────────
FROM nginx:1.27-alpine

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from stage 1
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
