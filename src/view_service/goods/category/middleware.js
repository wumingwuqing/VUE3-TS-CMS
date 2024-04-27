const { findCategoryById } = require("./dboperator")


// 验证信息
const verigyCategory = async (ctx, next) => {

  const { id } = ctx.params
  if (id <= 9) {
    ctx.body = {
      code: 1,
      message: 'id小于9禁止操作！'
    }
    return
  }
  const result = await findCategoryById(id)
  if (!result) {
    ctx.body = {
      code: 2,
      message: '不存在！'
    }
    return
  }
  //执行下一个中间件
  await next()
}
//验证参数
const verigyParams = async (ctx, next) => {
  const { name } = ctx.request.body

  if (name) {
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
  verigyCategory, verigyParams
}