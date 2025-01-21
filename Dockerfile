FROM node:lts-alpine

WORKDIR /usr/src/app

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm ci

COPY . .

EXPOSE 3000

HEALTHCHECK CMD curl --fail http://localhost:3000/health || exit 1

CMD ["node", "./bin/www"]
