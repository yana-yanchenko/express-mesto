const router = require('express').Router();
const {
  getAllUsers, getUserId, postUser, updateUserMe, updateUserMeAvatar,
} = require('../controllers/user');

router.get('/users', getAllUsers);

router.get('/users/:userId', getUserId);

router.post('/users', postUser);

router.patch('/users/me', updateUserMe);
router.patch('/users/me/avatar', updateUserMeAvatar);

module.exports = router;
