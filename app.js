
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

app.use('/', userRouters)
app.use('/', cardRouters)


app.listen(PORT, () => {
  console.log(`Server start http://localhost:${PORT}`)
})

mongoose.connect(mestodb);