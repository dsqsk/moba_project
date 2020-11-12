const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },
})

schema.virtual('children', {
  localField: '_id',
  foreiginField: 'parent',
  justOne: false,
  res: 'Category'
})

module.exports = mongoose.model('Category', schema)