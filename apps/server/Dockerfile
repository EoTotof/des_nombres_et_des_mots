FROM node:22-alpine AS base

WORKDIR /app

RUN corepack enable


# ─────────────────────────────────────────────
# Dependencies
# ─────────────────────────────────────────────

FROM base AS deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY apps/server/package.json apps/server/package.json
COPY packages/game-core/package.json packages/game-core/package.json
COPY packages/game-contracts/package.json packages/game-contracts/package.json

RUN pnpm install --frozen-lockfile


# ─────────────────────────────────────────────
# Build
# ─────────────────────────────────────────────

FROM deps AS builder

COPY . .

RUN pnpm --filter @dnedm/game-core build
RUN pnpm --filter @dnedm/game-contracts build
RUN pnpm --filter server build

RUN pnpm --filter server --prod deploy /prod/server

RUN test -f /prod/server/dist/main.js

# ─────────────────────────────────────────────
# Production
# ─────────────────────────────────────────────

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

USER node

COPY --from=builder --chown=node:node /prod/server ./

EXPOSE 3001

CMD ["node", "dist/main.js"]
