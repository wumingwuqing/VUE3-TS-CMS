const connection = require(".")

//查询某一个用户
async function findById(tableName, id) {
  try {
    const sql = `select * from ${tableName} where id = ?;`
    const [result] = await connection.query(sql, [id])
    return result[0]
  } catch (error) {
    console.log(error)
  }

}

module.exports = {
  findById
}