const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { validateDataCreateCard, validateDataIdCard } = require('../middlewares/validationRequest');

router.get('/', getCards);
router.post('/', validateDataCreateCard, createCard);
router.delete('/:cardId', validateDataIdCard, deleteCard);
router.put('/:cardId/likes', validateDataIdCard, likeCard);
router.delete('/:cardId/likes', validateDataIdCard, dislikeCard);

module.exports = router;
