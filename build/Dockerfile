FROM node:latest AS server_build
WORKDIR /app/server
COPY ../server/package*.json ./
RUN npm install
COPY ../server/. .
EXPOSE 4000

FROM node:latest AS web_build
WORKDIR /app/web
COPY ../web/package*.json ./
RUN npm install
COPY ../web/. .
RUN npm run build
EXPOSE 3000

FROM node:latest
WORKDIR /app
COPY --from=server_build /app/server/build ./server
COPY --from=web_build /app/web/build ./web
EXPOSE 3000
EXPOSE 4000
CMD ["sh", "-c", "(cd server && npm start) & (cd web && npm start)"]
