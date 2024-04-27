
const { findUserList, findUserById, createUser, updateUser, deleteUser } = require('./dboperator')
class Controller {
  // 创建用户
  async createUser(ctx, next) {

    const { name, realname, password, cellphone, enable = 1, roleId, departmentId } = ctx.request.body
    const user = { name, realname, password, cellphone, enable, roleId, departmentId }

    const result = await createUser(user)

    ctx.body = {
      code: 0,
      message: '创建用户成功',
      data: result
    }
  }
  // 查询用户列表
  async findUserList(ctx, next) {
    const { size, offset } = ctx.request.body
    const { name, realname, cellphone, enable, createAt } = ctx.request.body
    const body = { name, realname, cellphone, enable, createAt }

    const result = await findUserList(size, offset, body)
    if (result.list)
      ctx.body = {
        code: 0,
        message: '查询用户列表成功',
        data: result
      }
  }
  //查询某一个用户
  async findUserById(ctx, next) {
    const { id } = ctx.params
    const result = await findUserById(id)
    if (result) {
      ctx.body = {
        code: 0,
        message: '查询用户成功',
        data: result
      }
    }

  }
  //修改用户
  async updateUser(ctx, next) {

    const { id } = ctx.params
    const { name, realname, password, cellphone, enable, roleId, departmentId } = ctx.request.body

    const oldUser = await findUserById(id)
    const newUser = {
      id,
      name: name || oldUser.name,
      realname: realname || oldUser.realname,
      password: password || oldUser.password,
      cellphone: cellphone || oldUser.cellphone,
      enable: enable || oldUser.enable,
      roleId: roleId || oldUser.roleId,
      departmentId: departmentId || oldUser.departmentId
    }
    console.log(newUser)
    const result = await updateUser(newUser)
    if (result) {
      ctx.body = {
        code: 0,
        message: '修改用户成功',
        data: result
      }
    }
  }
  //删除用户
  async deleteUser(ctx, next) {
    const { id } = ctx.params
    const result = await deleteUser(id)
    if (result) {
      ctx.body = {
        code: 0,
        message: '删除用户成功',
        data: result
      }
    }
  }

}

module.exports = new Controller()