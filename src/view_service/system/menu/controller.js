const jwt = require('jsonwebtoken')
const { PRIVATE_KEY, PUBLIC_KEY } = require('../../../config/screct')
const { UNAUTHORIZATION } = require('../../../config/errorConstants')
const DBOperator = require('./dboperator')
class Controller {
  // 创建菜单
  async createMenu(ctx, next) {

    // 获取客户端数据
    const { name, type, url, icon, sort, parentId, permission } = ctx.request.body
    const menu = { name, type, url, icon, sort, parentId, permission }
    const result = await DBOperator.createMenu(menu)
    if (result) {
      ctx.body = {
        code: 0,
        data: "创建菜单成功~"
      }
    }
  }
  // 查询菜单列表
  async findMenuList(ctx, next) {
    const result = await DBOperator.findMenuList()
    ctx.body = {
      code: 0,
      data: result
    }

  }
  //查询某一个菜单
  async findMenuById(ctx, next) {
    const { id } = ctx.params
    const result = await DBOperator.findMenuById(id)
    ctx.body = {
      code: 0,
      data: result ? result : null
    }

  }
  //修改菜单
  async updateMenu(ctx, next) {
    const { id } = ctx.params

    const { name, type, url, icon, sort, parentId, permission } = ctx.request.body

    const oldMenu = await DBOperator.findMenuById(id)

    const newMenu = {
      id,
      name: name || oldMenu.name,
      type: type || oldMenu.type,
      url: url || oldMenu.url,
      icon: icon || oldMenu.icon,
      sort: sort || oldMenu.sort,
      parentId: parentId || oldMenu.parentId,
      permission: permission || oldMenu.permission
    }
    const result = await DBOperator.updateMenu(newMenu)
    if (result) {
      ctx.body = {
        code: 0,
        data: '修改成功~',
      }
    }

  }
  //删除菜单
  async deleteMenu(ctx, next) {
    const { id } = ctx.params
    await DBOperator.deleteMenu(id)
    ctx.body = {
      code: 0,
      data: '删除成功~'
    }
  }

}

module.exports = new Controller()