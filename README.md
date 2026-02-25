# sub-web-modify
[本项目](https://suburl.v1.mk)重制[原项目](https://github.com/CareyWang/sub-web)CSS样式，兼容nodejs 24最新版本（可直接一键部署至Vercel），解决大部分布局细节问题，增加“暗黑模式”，默认自动切换亮/暗模式（点击“太阳/月亮”图标可手动切换），增加“高级功能”点击显示/隐藏，添加短链接选择/自定义功能，增加近百条远程配置，新增[sub-web聚合API](https://github.com/youshandefeiyang/sub-web-api)，增加从短链接中获取订阅信息并返回至前端界面，增加上传自定义远程配置/JS进阶排序节点/JS进阶筛选节点等功能，感兴趣的朋友可以自建API服务，增加URL传参设置自定义后端<br/>
## 效果预览：
![avatar](https://raw.githubusercontent.com/youshandefeiyang/webcdn/main/sub-web-modify.GIF)
### 使用方法：

推荐使用 Docker 进行本地构建与部署。请确保您的服务器已安装 Docker 及 Docker Compose 插件。

**方式一：使用 Docker Compose（推荐）**

首先将本项目克隆到本地并进入项目根目录。新建或修改目录下的 `docker-compose.yml` 文件，内容如下：

```yaml
name: sub-web-modify
services:
    sub-web-modify:
        build: .
        restart: always
        privileged: false
        ports:
            - 8090:80
        container_name: sub-web-modify
```
配置完成后，在项目根目录下执行以下命令进行镜像构建并在后台启动容器：
```
docker compose up -d --build
```
方式二：使用原生 Docker 命令

如果您习惯使用原生的 Docker 命令，同样在克隆并进入项目根目录后，首先执行镜像构建命令：
```
docker build -t sub-web-modify:local .
```
等待镜像构建完成后，运行以下命令启动容器：
```
docker run -d --restart always -p 8090:80 --name sub-web-modify sub-web-modify:local
```
访问测试：

部署完成后，您可以通过浏览器访问相应的端口（举例为 8090），如果需要指定后端，可以在 URL 后面附带参数：
```
http://你的服务器IP:8090/?backend=[https://url.v1.mk](https://url.v1.mk)
```