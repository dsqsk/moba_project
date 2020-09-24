// 导出为函数，接受函数对象供外层使用
module.exports = app => {
  const express = require('express')

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

  //挂载子路由
  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    const Modelname = require('inflection').classify(req.params.resource)
    req.Model = require(`../models/${Modelname}`)
    next()
  }, router)
}