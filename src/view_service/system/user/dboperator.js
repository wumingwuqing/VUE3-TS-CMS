const { deleteById } = require('../../../common/database/deletaById')
const { findById } = require('../../../common/database/findById')
const { findList, findListHaveBody } = require('../../../common/database/findList')
const connection = require('../../../common/database/index')


class DBOperator {
  // 创建用户
  async createUser(user) {
    try {
      const { name, realname, password, cellphone, enable, roleId, departmentId } = user
      const sql = `insert into user(name,realname,password,cellphone,enable,roleId,departmentId) 
      values(?,?,?,?,?,?,?);`
      const result = await connection.query(sql, [name, realname, password, cellphone, enable, roleId, departmentId])
      return result[0]
    } catch (error) {
      console.log(error)
    }

  }
  // 查询用户列表
  async findUserList(size = 10, offset = 0, body) {
    const { name, realname, cellphone, enable, createAt } = body

    try {
      const result = (name || realname || cellphone || enable?.toString() || createAt) ? await findListHaveBody('user', size, offset, body) : await findList('user', size, offset)
      return result
    } catch (error) {
      console.log(error)
    }

  }
  //查询某一个用户
  async findUserById(id) {
    const result = await findById('user', id)
    if (result) {
      const role = await findById('role', result.roleId)
      const department = await findById('department', result.departmentId)
      delete result.password
      delete result.roleId
      delete result.departmentId
      result.role = role
      result.department = department
    }

    return result
  }
  //修改用户
  async updateUser(user) {
    try {
      const { name, realname, password, cellphone, enable, roleId, departmentId, id } = user
      const sql = `update user set
        name='${name}',realname='${realname}',password='${password}',cellphone='${cellphone}',
        enable='${enable}',roleId='${roleId}',departmentId=${departmentId} 
        where id = ${id};`
      const result = await connection.query(sql)
      return result[0]
    } catch (error) {
      console.log(error)
    }

  }
  //删除用户
  async deleteUser(id) {
    const result = await deleteById('user', id);
    return result
  }
}
module.exports = new DBOperator();