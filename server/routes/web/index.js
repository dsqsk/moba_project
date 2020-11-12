const { schema } = require('../../models/AdminUser')

module.exports = app => {
  const router = require('express').Router()
  const mongoose = require('mongoose')
  const Category = require('../../models/Category')
  const Article = require('../../models/Article')
  router.get('/news/init', async (req, res) => {
    // 数据录入测试用
    const parent = await Category.findOne({ name: '新闻资讯' })
    const cats = await Category.find().where({
      parent: parent
    }).lean()
    const newsTitles = ["斗气化马群英会，主播VS职业选手", "云中君源·梦皮肤台词语音研讨会开启公告", "王者荣耀IP新游《代号：启程》亮相荣耀盛典", "日活跃用户数日均1亿！    《王者荣耀》感谢每一个不可或缺的你！", "11月1日周年庆典观看盛典奖励领取未到账说明", "11月11日净化游戏环境声明及处罚公告", "11月11日“演员”惩罚名单", "11月11日外挂专项打击公告", "11月11日战队赛违规刷分处罚公告", "11月10日体验服停机更新公告", "【手Q独家】商城限时免单", "峡谷狂欢告别孤单，神奇女侠&amp;科学大爆炸限时返场", "【美梦成真 抽内测皮肤】活动公告", "周年祈愿送永久英雄/皮肤", "王者共创，荣耀盛典，抽内测、赢永久、限定皮肤自选限时返场", "2020年秋冬赛事战令全新升级，终极奖励韩信星元皮肤等你拿！", "2020年KPL秋季赛9月16日热血开赛，主场地域化全面升级", "2020年KPL秋季赛热血来袭，线下售票9月7日12:00开启！", "2020年KGL秋季赛选手大名单公布，9月13日该我上场！", "2020年KPL秋季赛大名单公布"]
    const newsList = newsTitles.map(title => {
      const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
      return {
        categories: randomCats.slice(0, 2),
        header: title
      }
    })
    await Article.deleteMany({})
    await Article.insertMany(newsList)
    res.send(newsList)
  })

  // 前端文章展示接口
  router.get('/news/list', async (req, res) => {
    // 分类为主体关联标题
    const parent = await Category.findOne({
      name: '新闻资讯'
    })
    const category = await Category.aggregate([
      // 条件查询
      { $match: { parent: parent._id } },
      // 以parent为主体查询集合
      {
        $lookup: {
          from: 'articles',//关联表
          localField: '_id',// 本地键
          foreignField: 'categories',//外地键
          as: 'newsList'
        }
      },
      {
        //修改字段
        $addFields: {
          newsList: { $slice: ['$newsList', 5] }
        }
      }
    ])
    // 提取热门分类
    const subCategories = category.map(v => v._id)
    category.unshift({
      name: '热门',
      newsList: await Article.find().where({
        categories: { $in: subCategories }
      }).populate('categories').limit(5).lean()
    })
    category.map(cat => {
      cat.newsList.map(news => {
        news.categoryName = cat.name === '热门' ? news.categories[0].name : cat.name
        return news
      })
      return cat
    })
    res.send(category)

  })
  app.use('/web/api', router)
}