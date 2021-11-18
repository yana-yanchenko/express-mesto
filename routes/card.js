const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const {
  getAllCards, createCard, deleteCard, deleteLike, setLike,
} = require('../controllers/card');

router.get('/cards', auth, getAllCards);
router.post('/cards', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().required().pattern(/^https?:\/\/(www.)?[a-zA-Z0-9-.]+\.[a-zA-Z]{2,}([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+)*#*$/),
  }),
}), createCard);
router.delete('/cards/:cardId', auth, deleteCard);
router.put('/cards/:cardId/likes', auth, setLike);
router.delete('/cards/:cardId/likes', auth, deleteLike);

module.exports = router;
