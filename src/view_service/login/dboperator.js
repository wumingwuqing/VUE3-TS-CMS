const connection = require('../../common/database/index')

class DBOperator {
  //查询用户信息
  async findUserByName(username) {
    try {
      //1.获取用户信息
      const statement = 'select * from `user` where name = ?;'
      //2.执行sql语句
      const [result] = await connection.execute(statement, [username])
      return result

    } catch (error) {
      console.log(error)
    }

  }
}
module.exports = new DBOperator();