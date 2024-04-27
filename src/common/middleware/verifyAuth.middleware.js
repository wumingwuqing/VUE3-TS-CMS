const jwt = require('jsonwebtoken')
const { PUBLIC_KEY } = require('../../config/screct')
const { UNAUTHORIZATION } = require('../../config/errorConstants')

// 验证token
const verifyAuth = async (ctx, next) => {
  // 获取token
  const authorization = ctx.headers.authorization
  if (!authorization) {
    ctx.app.emit('error', UNAUTHORIZATION, ctx)
    return
  }
  const token = authorization.replace('Bearer ', '')

  // 验证token
  try {
    const result = jwt.verify(token, PUBLIC_KEY, { algorithm: 'RS256' })
    // 将token中的用户信息保存到ctx.user
    ctx.user = result
    await next()
  } catch (err) {
    console.log(err)
    ctx.app.emit('error', UNAUTHORIZATION, ctx)
    return
  }
}

module.exports = { verifyAuth }