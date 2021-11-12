const CardModel = require('../models/card');

module.exports.getAllCards = (req, res) => {
  CardModel.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(500).send({ message: '500 — Ошибка по умолчанию.' });
    });
};

module.exports.createCard = (req, res) => {
  const user = req.user._id;
  const { name, link } = req.body;
  if (!name || !link) {
    return res.status(400).send({ message: '400 — Переданы некорректные данные при создании карточки.' });
  }
  return CardModel.create({ name, link, owner: user })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch(() => {
      res.status(500).send({ message: '500 — Ошибка по умолчанию.' });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  CardModel.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: '404 — Карточка с указанным _id не найдена.' });
      }
      return res.status(200).send({ message: 'Карточка удалена!' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: '400 — Переданы некорректные данные для удаления карточки' });
      }
      return res.status(500).send({ message: '500 — Ошибка по умолчанию.' });
    });
};

module.exports.setLike = (req, res) => {
  CardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: '404 — Передан несуществующий _id карточки.' });
      }
      return res.status(200).send({ message: 'Лайк поставлен!' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: '400 — Переданы некорректные данные для постановки/снятии лайка.' });
      }
      return res.status(500).send({ message: '500 — Ошибка по умолчанию.' });
    });
};

module.exports.deleteLike = (req, res) => {
  CardModel.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: '404 — Передан несуществующий _id карточки.' });
      }
      return res.status(200).send({ message: 'Лайк Удалён!' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: '400 — Переданы некорректные данные для постановки/снятии лайка.' });
      }
      return res.status(500).send({ message: '500 — Ошибка по умолчанию.' });
    });
};
