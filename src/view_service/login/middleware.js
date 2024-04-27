const { USERNAME_OR_PASSWORD_IS_REQUIRE, USERNAME_IS_NOT_EXIST, PASSWORD_IS_INCORRECT } = require('../../config/errorConstants')
const { sign } = require('./controller')
const DBOperator = require('./dboperator')
const md5Password = require('../../common/utils/md5Password')
// 验证登录信息
const verigyLogin = async (ctx, next) => {

  //获取请求参数
  const { username, password } = ctx.request.body
  //验证参数是否为空
  if (!username || !password) {
    return ctx.app.emit('error', USERNAME_OR_PASSWORD_IS_REQUIRE, ctx)
  }

  //验证用户是否存在
  const users = await DBOperator.findUserByName(username)

  const user = users[0]
  if (!user) {
    return ctx.app.emit('error', USERNAME_IS_NOT_EXIST, ctx)
  }

  //验证用户名和密码
  if (user.password !== md5Password(password)) {
    return ctx.app.emit('error', PASSWORD_IS_INCORRECT, ctx)
  }
  ctx.user = user
  //颁发令牌
  sign(ctx)

  //执行下一个中间件
  await next()
}
//
module.exports = {
  verigyLogin,
}