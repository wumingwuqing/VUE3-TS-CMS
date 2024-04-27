//导入路由模块
const KoaRouter = require('@koa/router');
const { findStoryList, createStory } = require('../view_service/story/list/controller');
const { verigyParams } = require('../view_service/story/list/middleware');
const { verifyAuth } = require('../common/middleware/verifyAuth.middleware');


//创建路由对象
const storyRouter = new KoaRouter({ prefix: '/story' });

//定义路由映射
//创建
storyRouter.post('/', verifyAuth, verigyParams, createStory);
//查询
storyRouter.post('/list', verifyAuth, findStoryList);




//导出路由
module.exports = storyRouter;