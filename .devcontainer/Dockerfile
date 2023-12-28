FROM oven/bun:latest

WORKDIR /usr/src/app

COPY package.json ./
COPY bun.lockb ./
COPY src ./

RUN bun install

EXPOSE 8080

CMD [ "bun", "run", "dev" ]