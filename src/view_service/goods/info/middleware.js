const { findGoodsById } = require("./dboperator")


// 验证信息
const verigyGoods = async (ctx, next) => {

  const { id } = ctx.params
  if (id <= 191) {
    ctx.body = {
      code: 1,
      message: 'id小于192禁止操作！'
    }
    return
  }
  const result = await findGoodsById(id)
  if (!result) {
    ctx.body = {
      code: 2,
      message: '商品不存在！'
    }
    return
  }
  //执行下一个中间件
  await next()
}
//验证参数
const verigyParams = async (ctx, next) => {
  const { name, oldPrice, newPrice, desc, status, imgUrl, inventoryCount, saleCount, favorCount, address, categoryId } = ctx.request.body

  if (name && oldPrice && newPrice && desc && status && imgUrl && inventoryCount && saleCount && favorCount && address && categoryId) {
    //执行下一个中间件
    await next()
  } else {
    console.log(name, leader)
    ctx.body = {
      code: 3,
      message: '参数不全！'
    }
  }

}
module.exports = {
  verigyGoods, verigyParams
}