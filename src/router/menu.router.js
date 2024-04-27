//导入路由模块
const KoaRouter = require('@koa/router');
const { createMenu, findMenuList, findMenuById, updateMenu, deleteMenu } = require('../view_service/system/menu/controller');
const { verifyAuth } = require('../common/middleware/verifyAuth.middleware');
const { verigyMenuId } = require('../view_service/system/menu/middleware');


//创建路由对象
const menuRouter = new KoaRouter({ prefix: '/menu' });

//定义路由映射
//创建菜单
menuRouter.post('/', verifyAuth, createMenu);
//查询菜单列表
menuRouter.post('/list', verifyAuth, findMenuList);
//查询某个菜单
menuRouter.get('/:id', verifyAuth, findMenuById);
//修改菜单
menuRouter.patch('/:id', verifyAuth, verigyMenuId, updateMenu);
//删除菜单
menuRouter.delete('/:id', verifyAuth, verigyMenuId, deleteMenu);



//导出路由
module.exports = menuRouter;