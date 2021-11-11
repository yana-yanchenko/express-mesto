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

module.exports.createCard = (req, res) => {
  const user = req.user._id
  const { name, link } = req.body
  CardModel.create({ name, link, owner: user })
  .then((card) => {
   res.status(200).send(card)
  })
  .catch((err) => {
    res.status(404).send({ message: 'Ошибка'})
  })
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params
  CardModel.findByIdAndRemove(cardId)
  .then((card) => {
    if(!card) {
      return res.status(404).send({ message: 'Карточки с таким _id нет!' })
    }
    // if(card.owner !== req.user._id) {
    //   return res.status(404).send({ message: 'Карточка вам не пренадлежит!' })
    // }
    res.status(200).send({ message:'Карточка удалена!'})
  })
  .catch((err) => {
    res.status(404).send({ message: err.message })
  })
}