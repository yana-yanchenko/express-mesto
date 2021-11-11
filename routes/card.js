const router = require('express').Router();

const {
  getAllCards, createCard, deleteCard, deleteLike, setLike,
} = require('../controllers/card');

router.get('/cards', getAllCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCard);
router.put('/cards/:cardId/likes', setLike);
router.delete('/cards/:cardId/likes', deleteLike);

module.exports = router;
