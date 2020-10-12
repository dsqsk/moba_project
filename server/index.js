const express = require('express')

// 定義
const app = express()

app.use(require('cors')())
app.use(express.json())
// 静态文件托管
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./admin_routes/index')(app)
require('./mongoose')(app)

app.listen(3000, () => {
  console.log("http://localhost:3000");
});

