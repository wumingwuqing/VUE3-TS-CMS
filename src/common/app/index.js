//导入所需模块
const koa = require('koa');

const bodyParser = require('koa-bodyparser');//post数据处理

const { autoRouter } = require('../../router/autoRouter');//自动注册路由


const corsConfig = require('../utils/useCors');//跨域处理






//创建app
const app = new koa();

app.use(
  corsConfig()
);




//使用中间件
app.use(bodyParser());

autoRouter(app)



//导出app
module.exports = app