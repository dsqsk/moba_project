// 导出为函数，接受函数对象供外层使用
module.exports = app => {
  const express = require('express')

  // express子路由
  const router = express.Router()
  const Category = require('../models/Category')

  // 创建分类接口
  router.post('/categories', async (req, res) => {
    const model = await Category.create(req.body)
    res.send(model)
  })
  // 编辑数据
  router.put('/categories/:id', async (req, res) => {
    const model = await Category.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // 删除数据
  router.delete('/categories/:id', async (req, res) => {
    await Category.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  //分类列表
  router.get('/categories', async (req, res) => {
    const items = await Category.find(req.body)
    res.send(items)
  })

  // 详情页数据
  router.get('/categories/:id', async (req, res) => {
    const model = await Category.findById(req.params.id)
    res.send(model)
  })

  //挂载子路由
  app.use('/admin/api', router)
}