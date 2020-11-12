const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  header: { type: String },
  body: { type: String },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
}, {
  timestamps: true
}
)

module.exports = mongoose.model('Article', schema)