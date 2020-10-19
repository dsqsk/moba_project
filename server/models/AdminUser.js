const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    // 单次处理
    select: false,
    set (val) {
      // 散列处理
      return require('bcrypt').hashSync(val, 10)
    }
  },
})

module.exports = mongoose.model('Admin_user', schema)