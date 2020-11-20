// 导出为函数，接受函数对象供外层使用
module.exports = app => {
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../../models/AdminUser')
  const assert = require('http-assert')
  // express子路由
  const router = express.Router({
    mergeParams: true // 合并url参数
  })
  // const Category = require('../models/Category')

  // 创建分类接口
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  // 编辑数据
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  // 删除数据
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  //分类列表
  router.get('/', async (req, res) => {
    const querryOptions = {}
    if (req.Model.modelName === 'categories') {
      querryOptions.populate('parent')
    }
    const items = await req.Model.find(req.body).populate('parent')
    res.send(items)
  })

  // 详情页数据
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  const authMiddleware = require('../../middleware/auth')
  const resourceMiddleware = require('../../middleware/resource')
  //挂载子路由
  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

  // 图片上传
  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
  })

  res.send(file)
  // 登录模块
  app.post('/admin/api/login', async (req, res) => {
    // const data = req.body
    // const username = data.username
    // const password = data.password
    const { username, password } = req.body
    // 根据username查找
    const user = await AdminUser.findOne({ username }).select('+password')
    // 判断用户是否存在
    assert(user, 403, '用户不存在')

    // 校验密码
    const bcrypt = require('bcrypt')
    const isValid = bcrypt.compareSync(password, user.password)
    assert(isValid, 403, '用户不存在')

    // 返回token
    const token = jwt.sign({ id: user.id, }, app.get('secret'))
    res.send({ token })
  })

  // 错误处理
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}