FROM node:20-alpine

COPY . /app
WORKDIR /app

RUN npm install -g pnpm
RUN pnpm i
RUN pnpm run build

ENTRYPOINT ["sh", "-c", "pnpm next start"]
