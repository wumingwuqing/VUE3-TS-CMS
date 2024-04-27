const app = require('./common/app'); //导入app
const { SERVER_PORT } = require('./config/server');
require('./common/utils/handleError')


//启动app
app.listen(SERVER_PORT, () => {
  console.log(`服务器启动成功:http://localhost:${SERVER_PORT}`)
})