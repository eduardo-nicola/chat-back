FROM node:22

WORKDIR /usr/src/app

COPY package.json ./

COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

RUN apt-get install -y chromium

COPY . .

EXPOSE  3000

CMD ["pnpm", "run", "start:dev"]