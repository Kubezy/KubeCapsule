FROM node:latest

WORKDIR /app

COPY web/package.json ./web/
COPY server/package.json ./server/

RUN cd web && npm install && cd ../server && npm install

COPY server/.env ./server/

COPY web ./web
RUN cd web && npm run build

COPY server ./server

EXPOSE 3000
EXPOSE 4000

CMD ["sh", "-c", "(cd /app/server && npm start) & (cd /app/web && npm start)"]
