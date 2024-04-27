const { deleteById } = require('../../../common/database/deletaById');
const { findById } = require('../../../common/database/findById');
const { findList, findListHaveBody } = require('../../../common/database/findList')
const connection = require('../../../common/database/index')

class DBOperator {
  // 查询角色列表
  async findRoleList(size, offset, body) {
    try {
      const { name, intro, createAt } = body
      if (!(name || intro || createAt)) {
        const result = await findList('role', size, offset)
        //拼接菜单
        // forEach循环内部使用了异步函数，但这会导致forEach本身无法正确处理异步操作的结果。
        //在JavaScript中，forEach不会等待异步操作完成，因此item.menuList的赋值可能不会按预期进行。
        //为了解决这个问题，可以使用Promise.all与map方法结合，将异步操作转换为 Promise 对象的数组，然后等待所有 Promise 完成。：
        const promises = result.list.map(async (item) => {
          const menuList = await this.findRoleMenuById(item.id);
          return { ...item, menuList };
        });

        const updatedResultList = await Promise.all(promises);
        result.list = updatedResultList
        return result
      } else {
        const result = await findListHaveBody('role', size, offset, body)
        return result
      }

    } catch (error) {
      console.log(error)
    }

  }
  //获取某个角色
  async findRoleById(id) {
    const result = await findById('role', id)
    return result
  }
  //创建角色
  async createRole(role) {
    try {
      const { name, intro, menuList } = role
      const sql = `
        INSERT INTO role (name, intro)
        VALUES (?, ?);`
      const [result] = await connection.query(sql, [name, intro])
      const roleMenu = { roleId: result.insertId, menuList }
      const result1 = await this.createRoleMenu(roleMenu)
      return result1
    } catch (error) {
      console.log(error)
    }
  }
  //更新角色
  async updateRole(role) {
    try {
      const { id, name, intro } = role
      const sql = `
        UPDATE role
        SET name = ?, intro = ?
        WHERE id = ?;`
      const [result] = await connection.query(sql, [name, intro, id])
      return result
    } catch (error) {
      console.log(error)
    }

  }
  //删除角色
  async deleteRole(id) {
    const result = deleteById('role', id)
    return result
  }
  //分配权限
  async createRoleMenu(roleMenu) {
    const { roleId, menuList } = roleMenu
    try {
      //先删除记录
      const deleteSql = `
        DELETE FROM role_menu
        WHERE roleId = ?;`
      await connection.query(deleteSql, [roleId])
      // 后添加新记录
      // 生成占位符字符串：首先，根据menuList数组的长度，生成相应数量的占位符对 (?, ?)
      const placeholders = menuList?.map(() => '(?, ?)').join(',');
      const sql = `
      INSERT INTO role_menu (roleId, menuId)
      values ${placeholders};`
      // 构建参数数组
      const params = menuList?.flatMap((menuId) => [roleId, menuId])
      const [result] = await connection.query(sql, params);
      return result
    } catch (error) {
      console.log(error)
    }
  }
  //查询某个角色的菜单
  async findRoleMenuById(id) {
    try {
      //查询某个角色拥有的所有菜单
      const result = await this.findRoleMenuIdListById(id)
      const roleMenuIdList = result?.menuIds || []
      //一级菜单
      const firstRole = `
        select id, name, type, url, icon, sort, createAt, updateAt 
        from menu 
        where type = ? AND id IN (?)
        ORDER BY sort ASC;`
      //有菜单
      if (roleMenuIdList.length != 0) {
        const [firstRoleResult] = await connection.query(firstRole, [1, roleMenuIdList])
        //二级菜单
        const secondRole = `
          select * 
          from menu 
          where type = ? && parentId =?
          ORDER BY sort ASC;`
        for (const item of firstRoleResult) {
          const [secondRoleResult] = await connection.query(secondRole, [2, item.id])
          item.children = secondRoleResult
          //三级菜单
          for (const item1 of secondRoleResult) {
            const [thirdRoleResult] = await connection.query(secondRole, [3, item1.id])
            item1.children = thirdRoleResult.length > 0 ? thirdRoleResult : null
          }
        }
        return firstRoleResult
      } else {
        return []
      }

    } catch (error) {
      console.log(error)
    }
  }
  //查询某个角色菜单的id
  async findRoleMenuIdListById(id) {
    try {
      const sql = `SELECT r.id, r.name, r.intro, GROUP_CONCAT(rm.menuId) AS menuIds
      FROM role r
      JOIN role_menu rm ON r.id = rm.roleId
      WHERE r.id = ?
      GROUP BY r.id;`
      const [result] = await connection.query(sql, [id])
      if (result[0]?.menuIds) {
        result[0].menuIds = result[0].menuIds.split(',').map(item => Number(item))
      }
      return result[0]
    } catch (error) {
      console.log(error)
    }

  }

}
module.exports = new DBOperator();