FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

RUN npm ci --omit=dev

RUN mkdir -p uploads

ENV NODE_ENV=production
EXPOSE 4003

CMD ["npm", "start"]
