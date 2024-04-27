//导入路由模块
const KoaRouter = require('@koa/router');
const { register } = require('../view_service/register/controller');
const { verifyNameWord, handlePassword } = require('../view_service/register/middleware');
//创建路由对象
const registerRouter = new KoaRouter({ prefix: '/register' });

//定义路由映射
//用户注册接口
registerRouter.post('/', verifyNameWord, handlePassword, register);



//导出路由
module.exports = registerRouter;