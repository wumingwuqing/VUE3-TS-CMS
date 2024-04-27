const { findMenuById } = require("./dboperator")

// 验证菜单id
const verigyMenuId = async (ctx, next) => {
  const { id } = ctx.params
  if (id <= 43) {
    ctx.body = {
      code: 1,
      message: 'id小于43禁止操作！'
    }
    return
  }

  const result = await findMenuById(id)
  if (!result) {
    ctx.body = {
      code: 2,
      message: '菜单不存在！'
    }
    return
  }
  //执行下一个中间件
  await next()
}
//
module.exports = {
  verigyMenuId
}