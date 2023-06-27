const cardRouter = require('express').Router();

const {
  getCards, deleteCard, createCard, putLike, deleteLike,
} = require('../controllers/cards').default;

cardRouter.get('/cards', getCards);
cardRouter.post('/cards', createCard);
cardRouter.delete('/cards/:cardId', deleteCard);
cardRouter.put('/cards/:cardId/likes', putLike);
cardRouter.delete('/cards/:cardId/likes', deleteLike);

module.exports = cardRouter;
