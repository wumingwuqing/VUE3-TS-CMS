//导入路由模块
const KoaRouter = require('@koa/router');
const { findUserList, findUserById, createUser, deleteUser, updateUser } = require('../view_service/system/user/controller');
const { verigyUser, verigyParams } = require('../view_service/system/user/middleware');
const { verifyAuth } = require('../common/middleware/verifyAuth.middleware');

//创建路由对象
const userRouter = new KoaRouter({ prefix: '/users' });

//定义路由映射
//创建用户
userRouter.post('/', verifyAuth, verigyParams, createUser);
//查询所有用户
userRouter.post('/list', verifyAuth, findUserList);
//查询用户
userRouter.get('/:id', verifyAuth, findUserById);
//删除用户
userRouter.delete('/:id', verifyAuth, verigyUser, deleteUser);
//修改用户
userRouter.patch('/:id', verifyAuth, verigyUser, updateUser);



//导出路由
module.exports = userRouter;