const fs = require('fs')

function autoRouter(app) {
  //1.获取所有路由文件
  const files = fs.readdirSync(__dirname)
  for (const file of files) {
    //2.过滤掉不是router的文件
    if (!file.endsWith('.router.js')) {
      continue
    }
    //3.获取文件路径
    const routerPath = `${__dirname}/${file}`
    //4.加载文件
    const router = require(routerPath)
    //5.注册路由
    app.use(router.routes())
    app.use(router.allowedMethods())
  }
  return app
}

module.exports = { autoRouter }