
const { createGoods, findGoodsList, findGoodsById, updateGoods, deleteGoods } = require('./dboperator')

class Controller {
  // 创建
  async createGoods(ctx, next) {

    const { name, oldPrice, newPrice, desc, status, imgUrl, inventoryCount, saleCount, favorCount, address, categoryId } = ctx.request.body
    const goods = { name, oldPrice, newPrice, desc, status, imgUrl, inventoryCount, saleCount, favorCount, address, categoryId }

    const result = await createGoods(goods)
    if (result) {
      ctx.body = {
        code: 0,
        message: '创建成功',
        data: result
      }
    }

  }
  // 查询列表
  async findGoodsList(ctx, next) {
    const { size, offset } = ctx.request.body
    const { name, createAt } = ctx.request.body
    const body = { name, createAt }

    const result = await findGoodsList(size, offset, body)
    if (result) {
      ctx.body = {
        code: 0,
        message: '查询列表成功',
        data: result
      }
    }


  }
  //查询某一个
  async findGoodsById(ctx, next) {

    const { id } = ctx.params
    const result = await findGoodsById(id)

    if (result) {
      ctx.body = {
        code: 0,
        message: '查询成功',
        data: result
      }
    }

  }
  //修改
  async updateGoods(ctx, next) {

    const { id } = ctx.params
    const { name, oldPrice, newPrice, desc, status, imgUrl, inventoryCount, saleCount, favorCount, address, categoryId } = ctx.request.body

    const old = await findGoodsById(id)
    console.log(old)
    const newGoods = {
      id,
      name: name || old.name,
      oldPrice: oldPrice || old.oldPrice,
      newPrice: newPrice || old.newPrice,
      desc: desc || old.desc,
      status: status || old.status,
      imgUrl: imgUrl || old.imgUrl,
      inventoryCount: inventoryCount || old.inventoryCount,
      saleCount: saleCount || old.saleCount,
      favorCount: favorCount || old.favorCount,
      address: address || old.address,
      categoryId: categoryId || old.categoryId
    }
    console.log(newGoods)
    const result = await updateGoods(newGoods)
    if (result) {
      ctx.body = {
        code: 0,
        message: '修改成功',
        data: result
      }
    }
  }
  //删除
  async deleteGoods(ctx, next) {
    const { id } = ctx.params
    const result = await deleteGoods(id)
    if (result) {
      ctx.body = {
        code: 0,
        message: '删除成功',
        data: result
      }
    }
  }

}

module.exports = new Controller()