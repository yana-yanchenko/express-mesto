const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllUsers, getUserId, createUser, updateUserMe, updateUserMeAvatar, login, getUserMe,
} = require('../controllers/user');

const auth = require('../middlewares/auth');

router.get('/users', auth, getAllUsers);

router.get('/users/:userId', auth, getUserId);

router.get('/user/me', auth, getUserMe);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(7),
  }),
}), createUser);

router.patch('/users/me', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUserMe);

router.patch('/users/me/avatar', auth, celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/^https?:\/\/(www.)?[a-zA-Z0-9-.]+\.[a-zA-Z]{2,}([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+)*#*$/),
  }),
}), updateUserMeAvatar);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(7),
  }),
}), login);

module.exports = router;
