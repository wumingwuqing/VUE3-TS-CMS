
const { USERNAME_OR_PASSWORD_IS_REQUIRE } = require('../../config/errorConstants')
const md5Password = require('../../common/utils/md5Password')


const verifyNameWord = async (ctx, next) => {
  //1.验证用户名或者密码是否为空
  const { username, password } = ctx.request.body
  if (!username || !password) {
    return ctx.app.emit('error', USERNAME_OR_PASSWORD_IS_REQUIRE, ctx)
  }
  // 3.执行下一个中间件
  await next()
}

const handlePassword = async (ctx, next) => {
  // 1.获取密码
  const { password } = ctx.request.body
  // 2.密码加密
  ctx.request.body.password = md5Password(password)
  // 3.执行下一个中间件
  await next()
}



module.exports = {
  verifyNameWord, handlePassword
}