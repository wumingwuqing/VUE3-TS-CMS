//导入路由模块
const KoaRouter = require('@koa/router');
const { verigyLogin } = require('../view_service/login/middleware');
const { verifyAuth } = require('../common/middleware/verifyAuth.middleware');
const { sign, test } = require('../view_service/login/controller');

//创建路由对象
const loginRouter = new KoaRouter({ prefix: '/login' });

//定义路由映射
//用户登录接口
loginRouter.post('/', verigyLogin, sign)
loginRouter.get('/test', verifyAuth, test)



//导出路由
module.exports = loginRouter;