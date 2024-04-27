const connection = require('../../../common/database/index')

class DBOperator {
  //创建菜单
  async createMenu(menu) {
    const { name, type, url, icon, sort, parentId, permission } = menu
    try {
      const sql = `
      insert into menu(name, type, url, icon, sort, parentId,permission) 
      values(?, ?, ?, ?, ?, ?,?);`
      const [result] = await connection.query(sql, [name, type, url, icon, sort, parentId, permission])

      return result
    } catch (error) {
      console.log(error)
    }
  }

  //查询菜单列表
  async findMenuList() {
    try {
      //一级菜单
      const firstMenu = `
        select id, name, type, url, icon, sort, createAt, updateAt 
        from menu 
        where type = ? && parentId is null
        ORDER BY sort ASC;`
      const [firstMenuResult] = await connection.query(firstMenu, [1])
      //二级菜单
      const secondMenu = `
      select id, name, type, url, sort,parentId, createAt, updateAt 
      from menu 
      where type = ? && parentId =?
      ORDER BY sort ASC;`
      for (const item of firstMenuResult) {
        const [secondMenuResult] = await connection.query(secondMenu, [2, item.id])
        item.children = secondMenuResult
        //三级菜单
        for (const item1 of secondMenuResult) {
          const [thirdMenuResult] = await connection.query(secondMenu, [3, item1.id])
          item1.children = thirdMenuResult.length > 0 ? thirdMenuResult : null
        }
      }
      const menuList = {
        list: firstMenuResult
      }
      return menuList
    } catch (error) {
      console.log(error)
    }
  }
  //查询某一个菜单
  async findMenuById(id) {
    try {
      const sql = `select * from menu where id = ${id}`
      const [result] = await connection.query(sql)
      return result[0]
    } catch (error) {
      console.log(error)
    }

  }
  //修改菜单
  async updateMenu(menu) {
    try {
      const sql = `update menu set 
        name = '${menu.name}',type = '${menu.type}',
        icon = '${menu.icon}',url = '${menu.url}',
        sort = '${menu.sort}',parentId = ${menu.parentId},
        permission = '${menu.permission}'
        where id = ${menu.id}`
      const result = await connection.query(sql)
      return result
    } catch (error) {
      console.log(error)
    }

  }
  ///删除菜单
  async deleteMenu(id) {
    if (id <= 43) return
    try {
      const sql = `delete from menu where id = ${id}`
      const result = await connection.query(sql)
      return result
    } catch (error) {
      console.log(error)
    }
  }
}
module.exports = new DBOperator();