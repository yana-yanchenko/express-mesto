const UserModel = require('../models/user');

module.exports.getAllUsers = (req, res) => {
  UserModel.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(() => {
      res.status(500).send({ message: '500 — Ошибка по умолчанию' });
    });
};

module.exports.getUserId = (req, res) => {
  const { userId } = req.params;
  UserModel.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: '404 — Пользователь по указанному _id не найден.' });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: '400 — Переданы некорректные данные для поиска пользователя' });
      }
      return res.status(500).send({ message: '500 — Ошибка по умолчанию.' });
    });
};

module.exports.postUser = (req, res) => {
  const { name, about, avatar } = req.body;
  if (!name || !about || !avatar) {
    return res.status(400).send({ message: '400 — Переданы некорректные данные при создании пользователя' });
  }
  return UserModel.create({ name, about, avatar })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(() => {
      res.status(500).send({ message: '500 — Ошибка по умолчанию.' });
    });
};

module.exports.updateUserMe = (req, res) => {
  const { name, about } = req.body;
  if (!name || !about) {
    return res.status(400).send({ message: '400 — Переданы некорректные данные при обновлении профиля.' });
  }
  return UserModel.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: '404 — Пользователь с указанным _id не найден.' });
      }
      return res.status(200).send(user);
    })
    .catch(() => {
      res.status(500).send({ message: '500 — Ошибка по умолчанию.' });
    });
};

module.exports.updateUserMeAvatar = (req, res) => {
  const { avatar } = req.body;
  if (!avatar) {
    return res.status(400).send({ message: '400 — Переданы некорректные данные при обновлении профиля.' });
  }
  return UserModel.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: '404 — Пользователь с указанным _id не найден.' });
      }
      return res.status(200).send(user);
    })
    .catch(() => {
      res.status(500).send({ message: '500 — Ошибка по умолчанию.' });
    });
};
