const connection = require('../../../common/database/index')
const { findList, findListHaveBody } = require('../../../common/database/findList')

class DBOperator {
  // 创建
  async createDepartment(department) {
    try {
      const { name, leader, parentId } = department
      const sql = `insert into department( name, leader, parentId) 
      values(?,?,?);`
      const result = await connection.query(sql, [name, leader, parentId])
      return result[0]
    } catch (error) {
      console.log(error)
    }

  }
  // 查询
  async findDepartmentList(size = 10, offset = 0, body) {
    const { name, leader, parentId, createAt } = body
    const result = (name || leader || parentId || createAt) ? await findListHaveBody('department', size, offset, body) : await findList('department', size, offset)
    return result
  }
  //查询某一个
  async findDepartmentById(id) {
    try {
      const sql = `select * from department where id = ?;`
      const [result] = await connection.query(sql, [id])
      return result[0]
    } catch (error) {
      console.log(error)
    }

  }
  //修改
  async updateDepartment(newdepartment) {
    try {
      const { id, name, leader, parentId } = newdepartment
      const sql = `update department set
        name='${name}',leader='${leader}',parentId=${parentId}
        where id = ${id};`
      const result = await connection.query(sql)
      return result[0]
    } catch (error) {
      console.log(error)
    }

  }
  //删除
  async deleteDepartment(id) {
    const sql = `delete from department where id = ?`
    const result = await connection.query(sql, [id])
    return result[0]
  }
}
module.exports = new DBOperator();