FROM node:latest

WORKDIR /app

# Copy package.json files
COPY web/package.json ./web/
COPY server/package.json ./server/

# Install dependencies
RUN cd web && npm install && cd ../server && npm install

# Copy .env files
COPY server/.env ./server/

# Build web
COPY web ./web
RUN cd web && npm run build

# Copy server
COPY server ./server

EXPOSE 3000
EXPOSE 4000

CMD ["sh", "-c", "(cd /app/server && npm start) & (cd /app/web && npm start)"]
