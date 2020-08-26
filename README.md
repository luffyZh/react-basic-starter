# React Basic Starter

## ✨Feature

- React && React Hooks

- React Router

- Fetch

- Eslint/Prettier

## 🌍Enviroment

```
node >= 10.14.2
npm(跟随 node 版本)

```

## 🚗How to use

### 开发环境

```
yarn install
yarn start
```

> 此时项目运行在：http://localhost:3000/

### 生产环境

```
yarn install
yarn build
yarn prod
```

> 此时项目运行在：http://localhost:6888/，此时的版本就是生产版本。如果提示没有 `serve` 命令，使用 `sudo npm install -g serve` 进行安装

## 🧿 部署 —— nginx

打包后的项目生成一个 `/build` 文件夹，里面就是所有的静态资源文件，包括一个入口 `index.html`，所以使用 Nginx 部署比较方便。

> 当然，也可以使用其它方式，比如 Node/Now 等。

- 第一步

将 `/build` 文件夹整体放入 Nginx `/usr/share/nginx/html` 文件夹内。

> 放入的目录名称路径随意，只要是你的 nginx 静态资源目录就行。

- 第二步 —— 配置 nginx

```bash

server {
    listen 80;
    # gzip config
    gzip on;
    gzip_min_length 1k;
    gzip_comp_level 9;
    gzip_types text/plain text/css text/javascript application/json application/javascript application/x-javascript application/xml;
    gzip_vary on;
    gzip_disable "MSIE [1-6]\.";

    root /usr/share/nginx/html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

> 这里的配置只是参考，如果需要设置其他端口，在 nginx 进行相应的设置即可。
