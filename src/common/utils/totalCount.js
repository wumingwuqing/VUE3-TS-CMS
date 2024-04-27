const connection = require('../database')

const getTotalCount = async (tableName) => {
  const sql = `select count(*) as totalCount from ${tableName}`
  const [result] = await connection.query(sql)
  return result[0].totalCount
}

module.exports = {
  getTotalCount
}