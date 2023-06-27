const Card = require('../models/card');
const InvalidError = require('../errors/InvalidError').default;
const NotFoundError = require('../errors/NotFoundError').default;
const { ERROR_INVALID } = require('../utils/constants');

const createCard = (req, res, next) => {
  const data = {
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id,
  };
  // console.log(req.user._id);
  Card.create(data)
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === ERROR_INVALID) {
        next(new InvalidError(err.message));
      } else next(err);
    });
};

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .onFail(new Error('NotFound'))
    .then((cards) => res.send(cards))
    .catch((err) => {
      if (err.message === 'NotFound') {
        new NotFoundError(err.message);
      } else {
        next(err);
      }
    });
};

const putLike = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .onFail(new Error('NotFound'))
    .then((cards) => res.send(cards))
    .catch(next);
};

const deleteLike = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .onFail(new Error('NotFound'))
    .then((cards) => res.send(cards))
    .catch((err) => {
      if (err.message === 'NotFound') {
        new NotFoundError(err.message);
      } else {
        next(err);
      }
    });
};

module.exports = {
  createCard, getCards, deleteCard, putLike, deleteLike
};
