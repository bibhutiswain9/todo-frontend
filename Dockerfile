FROM node:20-alpine AS base
RUN corepack enable
WORKDIR /usr/src/app
COPY package* .
COPY pnpm-lock.yaml .
RUN pnpm install
EXPOSE 3000

FROM base AS development
COPY . .
CMD [ "pnpm", "dev" ]

FROM base AS build
COPY . .
RUN pnpm build

FROM build AS production
CMD [ "pnpm", "start" ]
