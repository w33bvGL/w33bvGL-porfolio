FROM ubuntu:latest

RUN apt-get update && apt-get install -y \
    curl \
    git \
    make \
    g++ \
    libtool \
    autoconf \
    automake \
    nasm \
    && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g pnpm@latest

WORKDIR /app

COPY . .

RUN rm -rf node_modules && pnpm store prune

RUN pnpm install --prod=false

RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "preview"]
