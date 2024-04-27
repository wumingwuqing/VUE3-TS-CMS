const jwt = require('jsonwebtoken')
const { PRIVATE_KEY, PUBLIC_KEY } = require('../../config/screct')
const { UNAUTHORIZATION } = require('../../config/errorConstants')
class Controller {
  sign(ctx, next) {

    //1.获取用户信息
    const { id, username } = ctx.user

    //2.颁发令牌

    const token = jwt.sign({ id, username }, PRIVATE_KEY, { expiresIn: 60 * 60 * 24, algorithm: 'RS256' })

    //3.返回结果
    ctx.body = { code: 0, data: { id, username, token } }
  }
  test(ctx, next) {
    ctx.body = 'textsss success'
  }

}

module.exports = new Controller()