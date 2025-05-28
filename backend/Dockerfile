FROM node:22-alpine

WORKDIR /app

COPY package.json pacakge-lock.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD  ["node", "server.js"]