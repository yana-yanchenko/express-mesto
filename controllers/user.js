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