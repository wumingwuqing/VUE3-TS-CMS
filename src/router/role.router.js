//导入路由模块
const KoaRouter = require('@koa/router');
const { createRole, createRoleMenu, findRoleMenuById, findRoleMenuIdListById, findRoleList, findRoleById, updateRole, deleteRole } = require('../view_service/system/role/controller');
const { verifyAuth } = require('../common/middleware/verifyAuth.middleware');
const { verifyParams, verifyRoleId } = require('../view_service/system/role/middleware');



//创建路由对象
const roleRouter = new KoaRouter({ prefix: '/role' });

//定义路由映射
//获取角色列表
roleRouter.post('/list', verifyAuth, findRoleList);
//获取某个角色
roleRouter.get('/:id', verifyAuth, findRoleById);
//创建角色
roleRouter.post('/', verifyAuth, verifyParams, createRole);
//更新角色
roleRouter.patch('/:id', verifyAuth, verifyRoleId, updateRole);
//删除角色
roleRouter.delete('/:id', verifyAuth, verifyRoleId, deleteRole);


//给角色分配权限
roleRouter.post('/assign', verifyAuth, createRoleMenu);
//查询某个角色的菜单
roleRouter.get('/:id/menu', verifyAuth, findRoleMenuById);
//查询某个角色菜单的id
roleRouter.get('/:id/menuIds', verifyAuth, findRoleMenuIdListById);




//导出路由
module.exports = roleRouter;