const { findCategoryCountList, findCategorySaleList, findCategoryFavorList, findCategoryTop10List, findCitySaleList, findGoodsCount } = require('./dboperator')

class Controller {
  //图表数据:每个分类商品的个数
  async findCategoryCountList(ctx, next) {
    const result = await findCategoryCountList()
    if (result) {
      ctx.body = {
        code: 0,
        message: '查询列表成功',
        data: result
      }
    }

  }
  //图表数据:每个分类商品的销量
  async findCategorySaleList(ctx, next) {
    const result = await findCategorySaleList()
    if (result) {
      ctx.body = {
        code: 0,
        message: '查询列表成功',
        data: result
      }
    }
  }
  //图表数据:每个分类商品的收藏
  async findCategoryFavorList(ctx, next) {
    const result = await findCategoryFavorList()
    if (result) {
      ctx.body = {
        code: 0,
        message: '查询列表成功',
        data: result
      }
    }
  }
  //图表数据:销量前十的商品
  async findCategoryTop10List(ctx, next) {
    const result = await findCategoryTop10List()
    if (result) {
      ctx.body = {
        code: 0,
        message: '查询列表成功',
        data: result
      }
    }
  }
  // 图表数据:不同城市的销量数据
  async findCitySaleList(ctx, next) {
    const result = await findCitySaleList()
    if (result) {
      ctx.body = {
        code: 0,
        message: '查询列表成功',
        data: result
      }
    }
  }
  // 图表数据:商品数据的统计数量
  async findGoodsCount(ctx, next) {
    const result = await findGoodsCount()
    if (result) {
      ctx.body = {
        code: 0,
        message: '查询列表成功',
        data: result
      }
    }
  }
}

module.exports = new Controller()