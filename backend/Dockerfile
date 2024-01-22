FROM node:21 AS build

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install
COPY . .

RUN npm run build



FROM node:21
WORKDIR /app

COPY --from=build /app/dist ./dist
COPY package*.json ./

RUN npm install --only=production

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]