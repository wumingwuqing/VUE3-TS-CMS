const connection = require(".")

//删除用户
async function deleteById(tableName, id) {
  const sql = `delete from ${tableName} where id = ?`
  const result = await connection.query(sql, [id])
  return result[0]
}
module.exports = {
  deleteById
}