const jwt = require('jsonwebtoken')
const AdminUser = require('../models/AdminUser')

module.exports = options => {
  return async (req, res, next) => {
    // 校验token
    const token = String(req.headers.authorization || '').split(' ').pop()
    assert(user, 401, '请先登录')

    const { id } = jwt.verify(token, app.get('secret'))
    assert(user, 401, '请先登录')

    // 根据id校验用户
    req.user = AdminUser.findById(id)
    assert(user, 401, '请先登录')
    await next()
  }
}