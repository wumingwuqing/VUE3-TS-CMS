//导入所需模块
const koa = require('koa');
const bodyParser = require('koa-bodyparser');//post数据处理

const { autoRouter } = require('../../router/autoRouter');

const cors = require('koa2-cors'); //跨域处理
//创建app
const app = new koa();

app.use(
  cors({
    origin: function (ctx) { //设置允许来自指定域名请求
      return 'http://localhost:5173'; //只允许http://localhost:8080这个域名的请求
    },
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], //设置所允许的HTTP请求方法
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
  })
);

//使用中间件
app.use(bodyParser());

autoRouter(app)



//导出app
module.exports = app