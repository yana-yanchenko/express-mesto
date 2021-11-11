const router = require('express').Router()
const {
  getAllUsers, getUserId, postUser,
} = require('./../controllers/user')

router.get('/users', getAllUsers)

router.get('/users/:userId', getUserId)

router.post('/users', postUser)

module.exports = router