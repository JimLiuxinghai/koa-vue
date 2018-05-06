import path from 'path'
import Koa from 'koa'
import convert from 'koa-convert'
import views from 'koa-views'
import koaStatic from 'koa-static'
import bodyParser from 'koa-bodyparser'
import koaLogger from 'koa-logger'
import session from 'koa-session-minimal'
import MysqlStore from 'koa-mysql-session'
import log4js from 'koa-log4'
import routers from './routers/index'
import setRouters from './routerLoader'

const util = require('./util/server');
global.util = util;
const request = require('./util/request');
global.request = request;

// 日志
// const log = require('./log/logs');

// const logger = log4js.getLogger('access') //将当前文件日志命名为 app 
// logger.info('--------step into koa-------------')
const app = new Koa()

global.SERVER_ENV = process.env.NODE_ENV || 'development.lxh';

global.ROOT_PATH = path.join(__dirname, '..');
const config = require(`../config/env/${SERVER_ENV}`);
global.ENV_CONFIG = config.default;

//配置cookie

let cookie = {
  maxAge: 60 * 60 * 1000 * 24 * 30, // cookie有效时长
  expires: '',  // cookie失效时间
  path: '/', // 写cookie所在的路径
  domain: '', // 写cookie所在的域名
  httpOnly: '', // 是否只用于http请求中获取
  overwrite: false,  // 是否允许重写
  secure: '',
  sameSite: '',
  signed: ''
}

// 配置session中间件
app.use(session({
  key: 'USER_SID',
  //store: new MysqlStore(ENV_CONFIG.db.hunter),
  cookie: cookie
}))
// 配置控制台日志中间件app.use(convert(koaLogger()))
//------------- 记录所有http请求---------------
//app.use(log4js.koaLogger(log4js.getLogger('http'), { level: 'auto' }))
app.use(convert(koaLogger()))

// app.use(log.use())
// 配置ctx.body解析中间件
app.use(bodyParser())

// 配置静态资源加载中间件
app.use(convert(koaStatic(
  path.join(__dirname , './../build/')
)))

// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './../build/views/'), {
  extension: 'html'
}))

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())
app.use(setRouters('api'));  //引入router中间件

// 监听启动端口
app.listen( global.ENV_CONFIG.port )
console.log(`the server is start at port ${global.ENV_CONFIG.port}`)
