//导入路由模块
const KoaRouter = require('@koa/router');
const { findGoodsList, findGoodsById, createGoods, deleteGoods, updateGoods } = require('../view_service/goods/info/controller');
const { verigyGoods, verigyParams } = require('../view_service/goods/info/middleware');
const { verifyAuth } = require('../common/middleware/verifyAuth.middleware');
const { findCategoryCountList, findCategorySaleList, findCategoryFavorList, findCategoryTop10List, findCitySaleList, findGoodsCount } = require('../view_service/chart/controller');


//创建路由对象
const goodsRouter = new KoaRouter({ prefix: '/goods' });

//定义路由映射
//创建
goodsRouter.post('/', verifyAuth, verigyParams, createGoods);
//查询
goodsRouter.post('/list', verifyAuth, findGoodsList);
//查询
goodsRouter.get('/:id', verifyAuth, findGoodsById);
//删除
goodsRouter.delete('/:id', verifyAuth, verigyGoods, deleteGoods);
//修改
goodsRouter.patch('/:id', verifyAuth, verigyGoods, updateGoods);

//图表数据:每个分类商品的个数
goodsRouter.get('/category/count', verifyAuth, findCategoryCountList)
//图表数据:每个分类商品的销量
goodsRouter.get('/category/sale', verifyAuth, findCategorySaleList)
//图表数据:每个分类商品的收藏
goodsRouter.get('/category/favor', verifyAuth, findCategoryFavorList)
//图表数据:销量前十的商品
goodsRouter.get('/sale/top10', verifyAuth, findCategoryTop10List)
//图表数据:不同城市的销量数据
goodsRouter.get('/address/sale', verifyAuth, findCitySaleList)
// 图表数据:商品数据的统计数量
goodsRouter.get('/amount/list', verifyAuth, findGoodsCount)

//导出路由
module.exports = goodsRouter;