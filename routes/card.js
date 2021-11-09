const router = require('express').Router()

const {
  getAllCards,
} = require('./../controllers/card')

router.get('/cards', getAllCards)


module.exports = router