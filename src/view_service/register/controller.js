const { USERNAME_IS_ALREADY_EXIST } = require("../../config/errorConstants");
const Dboperator = require("./dboperator");


class Controller {
  //注册
  async register(ctx, next) {
    //1.获取用户传递过来的数据
    const userInfo = ctx.request.body
    try {
      //2.将信息存储到数据库中
      const result = await Dboperator.register(userInfo)

      //3.查看存储结果
      ctx.body = {
        code: 0,
        message: '注册成功',
        data: result
      }
    } catch (error) {
      ctx.app.emit('error', USERNAME_IS_ALREADY_EXIST, ctx)
    }

  }
}

module.exports = new Controller();