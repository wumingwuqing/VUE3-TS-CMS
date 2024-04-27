const mysql = require('mysql2');
const database = require('../../config/database');
//创建连接池
const connectionPool = mysql.createPool(database);

//获取是否连接成功
connectionPool.getConnection((err, connection) => {
  if (err) {
    console.log('连接失败', err);
    return;
  }
  connection.connect(err => {
    if (err) {
      console.log('和数据库交互失败', err);
      return;
    }
    console.log('和数据库交互成功');
  });
});

//获取连接池中的连接对象
const connection = connectionPool.promise();

module.exports = connection;