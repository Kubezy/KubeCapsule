# Stage 1: Build
FROM node:alpine AS builder

WORKDIR /app

COPY web/package.json ./web/
RUN cd web && npm install

COPY server/package.json ./server/
RUN cd server && npm install

COPY web ./web
RUN cd web && npm run build

# Stage 2: Production
FROM node:alpine

WORKDIR /app

COPY --from=builder /app/web/package.json ./web/
COPY --from=builder /app/server/package.json ./server/
COPY --from=builder /app/web/node_modules ./web/node_modules
COPY --from=builder /app/server/node_modules ./server/node_modules

COPY --from=builder /app/web ./web
COPY server/.env ./server/
COPY server ./server

EXPOSE 3000
EXPOSE 4000

CMD ["sh", "-c", "(cd /app/server && npm start) & (cd /app/web && npm start)"]
