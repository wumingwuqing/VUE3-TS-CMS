
const { createStory, findStoryList, findStoryById, updateStory, deleteStory } = require('./dboperator')

class Controller {
  // 创建
  async createStory(ctx, next) {

    const { title, content } = ctx.request.body
    const story = { title, content }

    const result = await createStory(story)
    if (result) {
      ctx.body = {
        code: 0,
        message: '创建成功',
        data: result
      }
    }

  }
  // 查询列表
  async findStoryList(ctx, next) {
    const { size, offset } = ctx.request.body
    const result = await findStoryList(size, offset)
    if (result) {
      ctx.body = {
        code: 0,
        message: '查询列表成功',
        data: result
      }
    }

  }

}

module.exports = new Controller()