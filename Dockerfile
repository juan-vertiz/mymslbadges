FROM node:lts-alpine

LABEL org.opencontainers.image.source="https://github.com/juan-vertiz/mymsltranscript"
LABEL org.opencontainers.image.description="MyMSLTranscript is a single-endpoint API that provides an SVG representation of the given Microsoft Learn transcript."
LABEL org.opencontainers.image.licenses="GPL-3.0-or-later"

WORKDIR /usr/src/app

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm ci

COPY . .

EXPOSE 3000

HEALTHCHECK CMD curl --fail http://localhost:3000/health || exit 1

CMD ["node", "./bin/www"]
