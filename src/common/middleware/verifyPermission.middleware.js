const { UNPERMISSION } = require("../config/error_constants")
const permissionService = require("../service/permission.service")

// const verifyMomentPermission = async (ctx, next) => {
//   // 获取登录用户的id和修改动态的id
//   const { momentId } = ctx.params
//   const { id } = ctx.user
//   // 判断权限
//   const isPermission = await permissionService.checkMomentPermission(momentId, id)

//   if (!isPermission) {
//     return ctx.app.emit("error", UNPERMISSION, ctx)
//   }
//   // 放行
//   await next()
// }

const verifyPermission = async (ctx, next) => {
  // 获取登录用户的
  const { id } = ctx.user

  // id和修改动态的id
  // name ->moment /user/comment/label
  //params: {momentId:?}
  //keyname: momentId
  const keyName = Object.keys(ctx.params)[0]
  const resourceId = ctx.params[keyName]
  const resourceName = keyName.replace('Id', "")
  // 判断权限
  const isPermission = await permissionService.checkPermission(resourceName, resourceId, id)
  if (!isPermission) {
    return ctx.app.emit("error", UNPERMISSION, ctx)
  }
  // 放行
  await next()
}
module.exports = { verifyPermission }