
const express = require('express')
const mongoose = require("mongoose", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
})
const userRouters = require('./routes/user')
const cardRouters = require('./routes/card')
const app = express()

const mestodb = 'mongodb://localhost:27017/mestodb'
const { PORT = 3000 } = process.env

app.use(express.json())

app.use((req, res, next) => {
  req.user = {
    _id: '618c0237e493fcf6545805a6' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use('/', userRouters)
app.use('/', cardRouters)


app.listen(PORT, () => {
  console.log(`Server start http://localhost:${PORT}`)
})

mongoose.connect(mestodb);