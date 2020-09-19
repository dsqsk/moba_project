const express = require('express')

// 定義
const app = express()

// app.use(require('cors')())
app.use(express.json())

require('./admin_routes/index')(app)
require('./mongoose')(app)

app.listen(8081, () => {
  console.log("http://localhost:8081");
});

