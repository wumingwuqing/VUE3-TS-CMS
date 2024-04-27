const { findStoryById } = require("./dboperator")


//验证参数
const verigyParams = async (ctx, next) => {
  const { title, content } = ctx.request.body

  if (title && content) {
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
  verigyParams
}