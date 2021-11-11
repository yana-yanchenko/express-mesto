const router = require('express').Router();
const {
  getAllUsers, getUserId, postUser, updateUserMe, updateUserMeAvatar,
} = require('../controllers/user');

router.get('/users', getAllUsers);

router.get('/users/:userId', getUserId);

router.post('/users', postUser);

router.patch('/user/me', updateUserMe);
router.patch('/user/me/avatar', updateUserMeAvatar);

module.exports = router;
