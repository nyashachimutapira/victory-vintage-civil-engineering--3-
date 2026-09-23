# Multi-stage Dockerfile for production
FROM node:18-alpine AS build
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files first for cached installs
COPY package.json pnpm-lock.yaml ./
COPY .npmrc ./ 2>/dev/null || true

RUN pnpm install --frozen-lockfile

# Copy rest of the project and build
COPY . .
RUN pnpm run build

# Production image
FROM node:18-alpine AS prod
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

COPY --from=build /app/dist ./dist

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/index.js"]
