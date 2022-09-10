FROM node:16-alpine AS deps
ARG BUILD_ENVIRONMENT
WORKDIR /app
ENV NODE_ENV=${BUILD_ENVIRONMENT}
COPY package.json package-lock.json .
RUN npm ci

FROM node:16-alpine AS builder
ARG BUILD_ENVIRONMENT
ENV NODE_ENV=${BUILD_ENVIRONMENT}
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:16-alpine AS app-dev
ARG BUILD_ENVIRONMENT
WORKDIR /app
ENV NODE_ENV=${BUILD_ENVIRONMENT}
ENV NEXT_TELEMETRY_DISABLED 1
ENV RANDOMENV="superWichtigeEnvVar"
ENV NEXT_PUBLIC_RANDOMENV="superWichtigeEnvVar"
COPY . .
COPY --from=deps /app/node_modules ./node_modules

CMD [ "node_modules/.bin/next", "dev"]

FROM node:16-alpine AS app-prod
ARG BUILD_ENVIRONMENT
WORKDIR /app
ENV NODE_ENV=${BUILD_ENVIRONMENT}
ENV RANDOMENV="superWichtigeEnvVar"
ENV NEXT_PUBLIC_RANDOMENV="superWichtigeEnvVar"
ENV NEXT_TELEMETRY_DISABLED 1
COPY --from=builder /app/next.config.js .
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

CMD [ "node_modules/.bin/next", "start"]
