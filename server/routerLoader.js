//routerLoader.js
import path from 'path'
const router = require('koa-router');
const Router = new router();
const fs = require('fs');

/**
 * 添加router
 */
const addRouters = (router, filename) => {
    Object.keys(router).forEach((key) => {
        const route = key.split(' ');

        console.log(`正在映射地址:${filename}${route[1]}--->HTTP Method:${route[0].toLocaleUpperCase()}--->路由方法:${router[key].name}`)
        Router[route[0]](filename+route[1], router[key])
    })
}
 
const Scan = (folder) => {
    const url = path.join(__dirname , `./${folder}`)
    const dir = fs.readdirSync(url)

    dir.forEach((file) => {
        const routerModel = require(url + '/' + file);
        const filename = file.split('.')[0]
        addRouters(routerModel, `/${folder}/${filename}`);
    })
}

/**
 * 返回router中间件
 */
const setRouters = (folder) => {
    Scan(folder);
    return Router.routes()
}

module.exports = setRouters;
