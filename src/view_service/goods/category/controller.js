
const { createCategory, findCategoryList, findCategoryById, updateCategory, deleteCategory } = require('./dboperator')

class Controller {
  // 创建
  async createCategory(ctx, next) {

    const { name } = ctx.request.body
    const category = { name }

    const result = await createCategory(category)
    if (result) {
      ctx.body = {
        code: 0,
        message: '创建成功',
        data: result
      }
    }

  }
  // 查询列表
  async findCategoryList(ctx, next) {
    const { size, offset } = ctx.request.body
    const { name, createAt } = ctx.request.body
    const body = { name, createAt }
    const result = await findCategoryList(size, offset, body)
    if (result) {
      ctx.body = {
        code: 0,
        message: '查询列表成功',
        data: result
      }
    }

  }
  //查询某一个
  async findCategoryById(ctx, next) {

    const { id } = ctx.params
    const result = await findCategoryById(id)

    if (result) {
      ctx.body = {
        code: 0,
        message: '查询成功',
        data: result
      }
    }

  }
  //修改
  async updateCategory(ctx, next) {

    const { id } = ctx.params
    const { name } = ctx.request.body

    const old = await findCategoryById(id)
    console.log(old)
    const newCategory = {
      id,
      name: name || old.name,
    }
    console.log(newCategory)
    const result = await updateCategory(newCategory)
    if (result) {
      ctx.body = {
        code: 0,
        message: '修改成功',
        data: result
      }
    }
  }
  //删除
  async deleteCategory(ctx, next) {
    const { id } = ctx.params
    const result = await deleteCategory(id)
    if (result) {
      ctx.body = {
        code: 0,
        message: '删除成功',
        data: result
      }
    }
  }

}

module.exports = new Controller()