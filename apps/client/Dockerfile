FROM node:22-alpine AS base

WORKDIR /app

RUN corepack enable


# ─────────────────────────────────────────────
# Dependencies
# ─────────────────────────────────────────────

FROM base AS deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

COPY apps/client/package.json apps/client/package.json
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
RUN pnpm --filter client build


# ─────────────────────────────────────────────
# Production
# ─────────────────────────────────────────────

FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

USER node

COPY --from=builder --chown=node:node /app/apps/client/.next/standalone ./
COPY --from=builder --chown=node:node /app/apps/client/.next/static ./apps/client/.next/static
COPY --from=builder --chown=node:node /app/apps/client/public ./apps/client/public
COPY --from=builder /app/packages/game-core ./packages/game-core
COPY --from=builder /app/packages/game-contracts ./packages/game-contracts

EXPOSE 3000

CMD ["node", "apps/client/server.js"]
