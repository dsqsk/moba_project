module.exports = options => {
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../models/AdminUser')
  const assert = require('assert')

  return async (req, res, next) => {
    // 校验token
    const token = String(req.headers.authorization || '').split(' ').pop()
    assert(token, 401, '请先登录')

    const { id } = jwt.verify(token, req.app.get('secret'))
    assert(id, 401, '请先登录')

    // 根据id校验用户
    req.user = AdminUser.findById(id)
    assert(req.user, 401, '请先登录')
    await next()
  }
}