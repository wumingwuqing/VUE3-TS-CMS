const { findList, findListHaveBody } = require('../../../common/database/findList')
const connection = require('../../../common/database/index')

class DBOperator {
  // 创建
  async createGoods(goods) {
    try {
      const { name, oldPrice, newPrice, desc, status, imgUrl, inventoryCount, saleCount, favorCount, address, categoryId } = goods
      const sql = `insert into goods (name, oldPrice, newPrice, \`desc\`, status, imgUrl, inventoryCount, saleCount, favorCount, address,categoryId ) 
      values(?,?,?,?,?,?,?,?,?,?,?);`
      const result = await connection.query(sql, [name, oldPrice, newPrice, desc, status, imgUrl, inventoryCount, saleCount, favorCount, address, categoryId])
      return result[0]
    } catch (error) {
      console.log(error)
    }

  }
  // 查询
  async findGoodsList(size = 10, offset = 0, body) {
    const { name, createAt } = body
   
    const result = (name || createAt) ? await findListHaveBody('goods', size, offset, body) : await findList('goods', size, offset)
    return result
  }
  //查询某一个
  async findGoodsById(id) {
    try {
      const sql = `select * from goods where id = ?;`
      const [result] = await connection.query(sql, [id])
      return result[0]
    } catch (error) {
      console.log(error)
    }

  }
  //修改
  async updateGoods(goods) {
    try {
      const { id, name, oldPrice, newPrice, desc, status, imgUrl, inventoryCount, saleCount, favorCount, address, categoryId } = goods
      const sql = `update goods set
      name='${name}',oldPrice=${oldPrice},
      newPrice=${newPrice},\`desc\`='${desc}',
      status=${status},imgUrl='${imgUrl}',
      inventoryCount='${inventoryCount}',saleCount=${saleCount},
      favorCount=${favorCount},address='${address},
      categoryId=${categoryId}'
        where id = ${id};`
      const result = await connection.query(sql)
      return result[0]
    } catch (error) {
      console.log(error)
    }

  }
  //删除
  async deleteGoods(id) {
    const sql = `delete from goods where id = ?`
    const result = await connection.query(sql, [id])
    return result[0]
  }
}
module.exports = new DBOperator();