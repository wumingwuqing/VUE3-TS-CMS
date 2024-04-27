
const DBOperator = require('./dboperator')
class Controller {
  //查询角色列表
  async findRoleList(ctx, next) {
    const { size, offset } = ctx.request.body
    const { name, intro, createAt } = ctx.request.body
    const body = { name, intro, createAt }
    const result = await DBOperator.findRoleList(size, offset, body)
    if (result) {
      ctx.body = {
        code: 0,
        data: result
      }

    }

  }
  //获取某个角色
  async findRoleById(ctx, next) {
    const { id } = ctx.params
    const result = await DBOperator.findRoleById(id)
    ctx.body = {
      code: 0,
      message: "获取角色成功~",
      data: result
    }
  }
  //创建角色
  async createRole(ctx, next) {
    const { name, intro, menuList } = ctx.request.body
    const role = { name, intro, menuList }
    const result = await DBOperator.createRole(role)
    if (result) {
      ctx.body = {
        code: 0,
        data: "创建角色成功~",
        result: result
      }
    }
  }
  //更新角色
  async updateRole(ctx, next) {
    const { id } = ctx.params
    const { name, intro } = ctx.request.body
    const role = await DBOperator.findRoleById(id)
    const newrole = { id, name: name || role.name, intro: intro || role.intro }
    const result = await DBOperator.updateRole(newrole)
    if (result) {
      ctx.body = {
        code: 0,
        data: "更新角色成功~"
      }
    }
  }
  //删除角色
  async deleteRole(ctx, next) {
    const { id } = ctx.params
    const result = await DBOperator.deleteRole(id)
    if (result) {
      ctx.body = {
        code: 0,
        data: "删除角色成功~"
      }
    }
  }
  // 创建角色菜单
  async createRoleMenu(ctx, next) {

    // 获取客户端数据
    const { roleId, menuList } = ctx.request.body
    const roleMenu = { roleId, menuList }
    const result = await DBOperator.createRoleMenu(roleMenu)
    if (result) {
      ctx.body = {
        code: 0,
        data: "创建菜单成功~"
      }
    }
  }
  //查询某个角色的菜单
  async findRoleMenuById(ctx, next) {
    const { id } = ctx.params
    const result = await DBOperator.findRoleMenuById(id)
    ctx.body = {
      code: 0,
      data: result
    }
  }
  //查询某个角色菜单的id
  async findRoleMenuIdListById(ctx, next) {
    const { id } = ctx.params
    const result = await DBOperator.findRoleMenuIdListById(id)
    ctx.body = {
      code: 0,
      data: result ? result : null
    }

  }


}

module.exports = new Controller()