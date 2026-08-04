# sub-web-surge

[本项目](https://suburl.v1.mk)重制[原项目](https://github.com/CareyWang/sub-web)CSS样式，兼容 nodejs 24 最新版本（可直接一键部署至 Vercel），解决大部分布局细节问题，增加“暗黑模式”，默认自动切换亮/暗模式（点击“太阳/月亮”图标可手动切换），增加“高级功能”点击显示/隐藏，添加短链接选择/自定义功能，增加近百条远程配置，新增 [sub-web 聚合 API](https://github.com/youshandefeiyang/sub-web-api)，增加从短链接中获取订阅信息并返回至前端界面，增加上传自定义远程配置/JS进阶排序节点/JS进阶筛选节点等功能，感兴趣的朋友可以自建 API 服务，增加 URL 传参设置自定义后端。

## 效果预览

![avatar](https://raw.githubusercontent.com/youshandefeiyang/webcdn/main/sub-web-modify.GIF)

## 本地开发

需要 Node.js 22+ 与 yarn 1.x（node:22 自带 yarn 1.x）：

```bash
yarn install   # 安装依赖
yarn serve     # 启动开发服务器
yarn build     # 生产构建，产物输出到 dist/
yarn lint      # 代码检查
yarn test      # 单元测试
yarn analyze   # 生成打包体积分析报告（dist/report.html）
```

> 依赖更新与安全审计由 Dependabot 自动维护。

## 部署

### 方式一：Docker Compose（推荐）

仓库已自带 `docker-compose.yml`，直接执行：

```bash
docker compose up -d --build
```

默认映射宿主机 `8090` 端口到容器 `80`，可通过 `http://服务器IP:8090` 访问。

### 方式二：原生 Docker 命令

```bash
docker build -t sub-web-surge:local .
docker run -d --restart always -p 8090:80 --name sub-web-surge sub-web-surge:local
```

### 方式三：使用 CI 自动构建的镜像

推送到 `main` 分支后，GitHub Actions 会自动构建并推送到 GitHub Container Registry（ghcr.io）：

```bash
docker run -d --restart always -p 8090:80 --name sub-web-surge ghcr.io/<你的GitHub用户名>/sub-web-surge:latest
```

如需同时推送到 Docker Hub，请在仓库配置 `DOCKERHUB_USERNAME` 与 `DOCKERHUB_TOKEN` secrets 并开启工作流中的可选步骤。

### 指定转换后端

部署完成后，可以通过 URL 参数指定后端：

```
http://你的服务器IP:8090/?backend=https://url.v1.mk
```

## 自定义配置

前端配置位于 `.env`，可修改项目链接、教程视频、默认 SubConverter 后端、短链接后端与文本托管后端等，修改后重新构建即可。

## 技术栈说明

- 本项目基于 **Vue 2.7 + Vue CLI 5 + Element UI**，Element UI 与 Vue 2 官方已停止维护（EOL）。
- 如计划长期维护，建议后续规划迁移至 Vue 3 + Element Plus + Vite。
