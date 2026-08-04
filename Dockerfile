# syntax=docker/dockerfile:1
# --- Build stage ---
FROM node:22.22.3-alpine3.22 AS build

# 拉取 git 依赖必需；如有原生模块再加 python3 make g++
RUN apk add --no-cache git

WORKDIR /app

# 先拷贝依赖清单利用缓存（node:22 已自带 yarn 1.x）
COPY package.json yarn.lock ./
# 使用 BuildKit 缓存 yarn 缓存目录，加速重复构建
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn yarn install --frozen-lockfile

# 再拷贝源码并构建
COPY . .
RUN yarn build

# --- Runtime stage ---
FROM nginx:1.31-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
