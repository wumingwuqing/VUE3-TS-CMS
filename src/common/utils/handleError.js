const app = require('../app');
const {
  USERNAME_OR_PASSWORD_IS_REQUIRE,
  USERNAME_IS_ALREADY_EXIST,
  USERNAME_IS_NOT_EXIST,
  PASSWORD_IS_INCORRECT,
  UNAUTHORIZATION,
  UNPERMISSION,
  LABELEXIST
} = require('../../config/errorConstants');


app.on('error', (err, ctx) => {
  let code = 0;
  let message = '';
  switch (err) {
    case USERNAME_OR_PASSWORD_IS_REQUIRE:
      code = -1001
      message = '用户名或密码不能为空'
      break;
    case USERNAME_IS_ALREADY_EXIST:
      code = -1002
      message = '用户名已存在'
      break;
    case USERNAME_IS_NOT_EXIST:
      code = -1003
      message = '用户名不存在'
      break;
    case PASSWORD_IS_INCORRECT:
      code = -1004
      message = '密码错误'
      break;
    case UNAUTHORIZATION:
      code = -1005
      message = 'token无效,未授权的用户'
      break;
    case UNPERMISSION:
      code = -1006
      message = '没有权限'
      break;
    case LABELEXIST:
      code = -1007
      message = 'label已经存在,请勿重复添加'
      break;
    default:
      break;
  }

  ctx.body = {
    code,
    message
  }
})