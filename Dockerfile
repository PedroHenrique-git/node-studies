FROM node:lts-alpine

WORKDIR /app

COPY nasa-project/package*.json ./
RUN npm install

COPY nasa-project/client/package*.json client/
RUN npm run install-client --only=production

COPY nasa-project/server/package*.json server/
RUN npm run install-server --only=production

COPY nasa-project/client/ client/
RUN npm run build:client

COPY nasa-project/server/ server/

USER node

CMD [ "npm", "run", "deploy" ]

EXPOSE 8000