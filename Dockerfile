FROM node:16 as builder

WORKDIR /usr/src/app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm ci

COPY . .

RUN npm run build




FROM node:16

WORKDIR /usr/src/app

COPY ./package.json .
COPY ./package-lock.json .
COPY ./.env .

COPY ./templates ./templates

RUN npm ci --production

COPY --from=builder /usr/src/app/build ./dist


EXPOSE 8080
CMD [ "node", "dist/index.js" ]