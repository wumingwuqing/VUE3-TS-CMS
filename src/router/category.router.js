//导入路由模块
const KoaRouter = require('@koa/router');
const { findCategoryList, findCategoryById, createCategory, deleteCategory, updateCategory } = require('../view_service/goods/category/controller');
const { verigyCategory, verigyParams } = require('../view_service/goods/category/middleware');
const { verifyAuth } = require('../common/middleware/verifyAuth.middleware');


//创建路由对象
const categoryRouter = new KoaRouter({ prefix: '/category' });

//定义路由映射
//创建
categoryRouter.post('/', verifyAuth, verigyParams, createCategory);
//查询
categoryRouter.post('/list', verifyAuth, findCategoryList);
//查询
categoryRouter.get('/:id', verifyAuth, findCategoryById);
//删除
categoryRouter.delete('/:id', verifyAuth, verigyCategory, deleteCategory);
//修改
categoryRouter.patch('/:id', verifyAuth, verigyCategory, updateCategory);



//导出路由
module.exports = categoryRouter;