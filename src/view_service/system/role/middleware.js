const { findRoleById } = require("./dboperator")

// 验证roleid
const verifyRoleId = async (ctx, next) => {
  const { id } = ctx.params
  if (id <= 4) {
    ctx.body = {
      code: 1,
      message: 'id小于4禁止操作！'
    }
    return
  }

  const result = await findRoleById(id)
  if (!result) {
    ctx.body = {
      code: 2,
      message: '角色不存在！'
    }
    return
  }
  //执行下一个中间件
  await next()
}
// 验证参数
const verifyParams = async (ctx, next) => {
  const { name } = ctx.request.body

  if (name) {
    //执行下一个中间件
    await next()
  } else {
    ctx.body = {
      code: 3,
      message: '参数不全！'
    }
  }

}
module.exports = {
  verifyRoleId, verifyParams
}