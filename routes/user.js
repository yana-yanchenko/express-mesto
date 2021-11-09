const router = require('express').Router()
const {
  getAllUsers,
} = require('./../controllers/user')

router.get('/users', getAllUsers)

module.exports = router