const mongoose = require('mongoose');
const Card = require('../models/card');
const InvalidError = require('../errors/InvalidError');
const NotFoundError = require('../errors/NotFoundError');
const { ERROR_INVALID, ERROR_NOT_FOUND } = require('../utils/constants');

const createCard = (req, res, next) => {
  const newCard = {
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id,
  };
  Card.create(newCard)
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === ERROR_INVALID || err.name === 'ValidationError') {
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
  if (!mongoose.isValidObjectId(cardId)) {
    throw new InvalidError(ERROR_INVALID);
  }
  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(ERROR_NOT_FOUND);
      }
      res.status(200).send(card);
    })
    .catch(next);
};

const putLike = (req, res, next) => {
  const { cardId } = req.params;
  if (!mongoose.isValidObjectId(cardId)) {
    throw new InvalidError(ERROR_INVALID);
  }
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(ERROR_NOT_FOUND);
      }
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      next(err);
    });
};

const deleteLike = (req, res, next) => {
  const { cardId } = req.params;
  if (!mongoose.isValidObjectId(cardId)) {
    throw new InvalidError(ERROR_INVALID);
  }
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(ERROR_NOT_FOUND);
      }
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  putLike,
  deleteLike,
};
