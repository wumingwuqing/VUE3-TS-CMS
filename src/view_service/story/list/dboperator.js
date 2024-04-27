const connection = require('../../../common/database/index')
const { findList } = require('../../../common/database/findList')


class DBOperator {
  // 创建
  async createStory(story) {
    try {
      const { title, content } = story
      const sql = `INSERT INTO story (title, content)
      values(?,?);`
      const result = await connection.query(sql, [title, content])

      return result[0]
    } catch (error) {
      console.log(error)
    }
  }
  // 查询
  async findStoryList(size = 10, offset = 0) {
    const result = await findList('story', size, offset)
    return result
  }

}
module.exports = new DBOperator();