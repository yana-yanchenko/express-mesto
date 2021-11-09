const CardModel = require('./../models/card')

module.exports.getAllCards = (req, res) => {
  CardModel.find()
  .then((data) => {
    res.status(200).send(data)
  })
  .catch((err) => {
    res.status(404).send({ message: 'Ошибка'})
  })
}