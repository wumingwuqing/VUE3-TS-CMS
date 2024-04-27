//导入路由模块
const KoaRouter = require('@koa/router');
const { findDepartmentList, findDepartmentById, createDepartment, deleteDepartment, updateDepartment } = require('../view_service/system/department/controller');
const { verigyDepartment, verigyParams } = require('../view_service/system/department/middleware');
const { verifyAuth } = require('../common/middleware/verifyAuth.middleware');

//创建路由对象
const departmentRouter = new KoaRouter({ prefix: '/department' });

//定义路由映射
//创建
departmentRouter.post('/', verifyAuth, verigyParams, createDepartment);
//查询
departmentRouter.post('/list', verifyAuth, findDepartmentList);
//查询
departmentRouter.get('/:id', verifyAuth, findDepartmentById);
//删除
departmentRouter.delete('/:id', verifyAuth, verigyDepartment, deleteDepartment);
//修改
departmentRouter.patch('/:id', verifyAuth, verigyDepartment, updateDepartment);



//导出路由
module.exports = departmentRouter;