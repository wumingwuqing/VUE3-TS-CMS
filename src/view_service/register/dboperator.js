const connection = require('../../common/database')

class DBOperator {
  async register(user) {
    //1.获取用户信息
    const { username, password } = user
    //2.拼接statement
    const statement = `insert into user (username,password) values (?,?);`
    //3.执行sql语句
    const [result] = await connection.execute(statement, [username, password])
    return result
  }
}
module.exports = new DBOperator();