const UserModel = require('./../models/user')

module.exports.getAllUsers = (req, res) => {
  UserModel.find()
  .then((data) => {
    res.status(200).send(data)
  })
  .catch((err) => {
    res.status(404).send({ message: 'Ошибка'})
  })
}

module.exports.getUserId = (req, res) => {
  const { userId } = req.params
  UserModel.findById(userId)
  .then((user) => {
    if(!user) {
      return res.status(404).send({ message: 'Пользователя с таким _id нет!' })
    }
    res.status(200).send(user)
  })
  .catch((err) => {
    res.status(404).send({ message: err.message })
  })
}

module.exports.postUser = (req, res) => {
  const { name, aboute, avatar } = req.body
  UserModel.create({ name, aboute, avatar })
  .then((user) => {
    res.status(200).send(user)
  })
  .catch((err) => {
    res.status(404).send({ message: 'Ошибка'})
  })
}