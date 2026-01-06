FROM node:18-alpine

WORKDIR /app

COPY web/package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

WORKDIR /app/web

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
