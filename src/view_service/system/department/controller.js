const jwt = require('jsonwebtoken')
const { PRIVATE_KEY, PUBLIC_KEY } = require('../../../config/screct')
const { UNAUTHORIZATION } = require('../../../config/errorConstants')
const { findDepartmentList, findDepartmentById, createDepartment, updateDepartment, deleteDepartment } = require('./dboperator')
const { user } = require('../../../config/database')
class Controller {
  // 创建
  async createDepartment(ctx, next) {

    const { name, leader, parentId } = ctx.request.body
    const department = { name, leader, parentId }

    const result = await createDepartment(department)
    if (result) {
      ctx.body = {
        code: 0,
        message: '创建部门成功',
        data: result
      }
    }

  }
  // 查询列表
  async findDepartmentList(ctx, next) {
    const { size, offset } = ctx.request.body
    const { name, leader, parentId, createAt } = ctx.request.body
    const body = { name, leader, parentId, createAt }


    const result = await findDepartmentList(size, offset, body)
    if (result) {
      ctx.body = {
        code: 0,
        message: '查询部门列表成功',
        data: result
      }
    }


  }
  //查询某一个
  async findDepartmentById(ctx, next) {

    const { id } = ctx.params
    const result = await findDepartmentById(id)

    if (result) {
      ctx.body = {
        code: 0,
        message: '查询用户成功',
        data: result
      }
    }

  }
  //修改
  async updateDepartment(ctx, next) {

    const { id } = ctx.params
    const { name, leader, parentId } = ctx.request.body

    const old = await findDepartmentById(id)
    console.log(old)
    const newdepartment = {
      id,
      name: name || old.name,
      leader: leader || old.leader,
      parentId: parentId || old.parentId,
    }
    console.log(newdepartment)
    const result = await updateDepartment(newdepartment)
    if (result) {
      ctx.body = {
        code: 0,
        message: '修改成功',
        data: result
      }
    }
  }
  //删除
  async deleteDepartment(ctx, next) {
    const { id } = ctx.params
    const result = await deleteDepartment(id)
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