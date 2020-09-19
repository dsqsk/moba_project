
module.exports = app => {
  const mongoose = require("mongoose")
  mongoose.connect('mongodb://localhost:27017/moba_project', {
    useNewUrlParser: true,
    useUnifiedTopology: true, //眼不见心不烦  
    useFindAndModify: true
  })
}