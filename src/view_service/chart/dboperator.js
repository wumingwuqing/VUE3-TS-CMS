const connection = require('../../common/database/index')

class DBOperator {
  //图表数据:每个分类商品的个数
  async findCategoryCountList() {
    //查询所有类别ID
    const [categoryIDlist] = await connection.query('select id,name from category')
    //查询每个类别下的商品数量
    for (const item of categoryIDlist) {
      const [categoryCountList] = await connection.query(`select count(*) as goodsCount from goods where categoryId = ${item.id}`)
      item.goodsCount = categoryCountList[0].goodsCount
    }
    return categoryIDlist
  }
  //图表数据:每个分类商品的销量
  async findCategorySaleList() {
    //查询所有类别ID
    const [categoryIDlist] = await connection.query('select id,name from category')
    //查询每个类别下的商品销量
    for (const item of categoryIDlist) {
      const [categoryCountList] = await connection.query(`select sum(goods.saleCount) as goodsCount from goods where categoryId = ${item.id}`)
      item.goodsCount = categoryCountList[0].goodsCount || 0
    }
    return categoryIDlist
  }

  //图表数据:每个分类商品的收藏
  async findCategoryFavorList() {
    //查询所有类别ID
    const [categoryIDlist] = await connection.query('select id,name from category')
    //查询每个类别下的商品收藏
    for (const item of categoryIDlist) {
      const [categoryCountList] = await connection.query(`select sum(goods.favorCount) as goodsFavor from goods where categoryId = ${item.id}`)
      item.goodsFavor = categoryCountList[0].goodsFavor || 0
    }
    return categoryIDlist
  }
  //图表数据:销量前十的商品
  async findCategoryTop10List() {
    const [categoryTop10List] = await connection.query(`select goods.id,goods.name,goods.saleCount from goods order by goods.saleCount desc limit 10`)
    return categoryTop10List
  }
  //图表数据:不同城市的销量数据
  async findCitySaleList() {
    const [citySaleList] = await connection.query(`select address,sum(goods.saleCount) as count from goods group by address`)
    return citySaleList
  }
  //图表数据:商品数据的统计数量
  async findGoodsCount() {
    // 商品总销量
    const [goodsSaleCount] = await connection.query(`select sum(goods.saleCount) as goodsSaleCount from goods`)
    const goodsSale = {
      amount: "sale",
      title: "商品总销量",
      tips: "所有商品的总销量",
      subtitle: "商品总销量",
      number1: goodsSaleCount[0].goodsSaleCount,
      number2: goodsSaleCount[0].goodsSaleCount
    }
    // 商品总收藏
    const [goodsFavorCount] = await connection.query(`select sum(goods.favorCount) as goodsFavorCount from goods`)
    const goodsFavor = {
      amount: "favor",
      title: "商品总收藏",
      tips: "所有商品的总收藏",
      subtitle: "商品总收藏",
      number1: goodsFavorCount[0].goodsFavorCount,
      number2: goodsFavorCount[0].goodsFavorCount
    }
    //商品总库存
    const [goodsStockCount] = await connection.query(`select sum(goods.inventoryCount) as goodsStockCount from goods`)
    const goodsStock = {
      amount: "stock",
      title: "商品总库存",
      tips: "所有商品的总库存",
      subtitle: "商品总库存",
      number1: goodsStockCount[0].goodsStockCount,
      number2: goodsStockCount[0].goodsStockCount
    }
    //商品总销售额
    const [goodsSalePriceCount] = await connection.query(`select sum(goods.oldPrice * goods.saleCount) as goodsSalePrice from goods`)
    const goodsSalePrice = {
      amount: "price",
      title: "商品总销售额",
      tips: "所有商品的总销售额",
      subtitle: "商品总销售额",
      number1: goodsSalePriceCount[0].goodsSalePrice,
      number2: goodsSalePriceCount[0].goodsSalePrice
    }


    return [goodsSale, goodsFavor, goodsStock, goodsSalePrice]
  }
}
module.exports = new DBOperator();