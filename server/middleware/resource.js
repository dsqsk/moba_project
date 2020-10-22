module.exports = position => {
  return async (req, res, next) => {
    const inflection = require('inflection')
    const Modelname = inflection.classify(req.params.resource)
    req.Model = require(`../models/${Modelname}`)
    await next()
  }
}