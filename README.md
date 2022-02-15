# 模拟登录淘宝网页端并获取cookie

## 安装方式
```js
    npm install tabao-login
```

## 使用方式
```js
    const tabaoLogin = require('tabao-login');
    tabaoLogin({username: '...',password: '...'}).then(res => {
        console.log(res);
    }).catch(e => {
        console.log(e);
    })
```