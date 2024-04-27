const { findList, findListHaveBody } = require('../../../common/database/findList')
const connection = require('../../../common/database/index')

class DBOperator {
  // 创建
  async createCategory(category) {
    try {
      const { name } = category
      const sql = `insert into category (name) 
      values(?);`
      const result = await connection.query(sql, [name])
      return result[0]
    } catch (error) {
      console.log(error)
    }

  }
  // 查询
  async findCategoryList(size = 10, offset = 0, body) {
    const { name, createAt } = body
    const result = (name || createAt) ? findListHaveBody('category', size, offset, body) : await findList('category', size, offset)
    return result
  }
  //查询某一个
  async findCategoryById(id) {
    try {
      const sql = `select * from category where id = ?;`
      const [result] = await connection.query(sql, [id])
      return result[0]
    } catch (error) {
      console.log(error)
    }

  }
  //修改
  async updateCategory(category) {
    try {
      const { id, name } = category
      const sql = `update category set
        name='${name}'
        where id = ${id};`
      const result = await connection.query(sql)
      return result[0]
    } catch (error) {
      console.log(error)
    }

  }
  //删除
  async deleteCategory(id) {
    const sql = `delete from category where id = ?`
    const result = await connection.query(sql, [id])
    return result[0]
  }
}
module.exports = new DBOperator();