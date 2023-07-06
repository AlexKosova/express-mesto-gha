const mongoose = require('mongoose');
const Card = require('../models/card');
const InvalidError = require('../errors/AuthError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenErr = require('../errors/ForbiddenErr');
const { ERROR_INVALID } = require('../utils/constants');

const createCard = (req, res, next) => {
  const newCard = {
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id,
  };
  Card.create(newCard)
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === ERROR_INVALID || err.name === 'ValidationError') {
        next(new InvalidError('Введены неверные данные'));
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
  const { _id } = req.user;
  if (!mongoose.isValidObjectId(cardId)) {
    throw new InvalidError('Некорректный id');
  }
  if (_id === req.params.owner.toString()) {
    Card.findByIdAndRemove(cardId)
      .then((card) => {
        if (!card) {
          next(new NotFoundError('Данные не найдены'));
        } else { next(new ForbiddenErr('У вас нет прав для удаления этой карточки'));}
      }).catch(next);
  }
  // Card.findByIdAndRemove(cardId)
  //   .then((card) => {
  //     if (!card) {
  //       next(new NotFoundError('Данные не найдены'));
  //     }
  //     if (_id === card.owner.toString()) {
  //       res.send(card);
  //     } else { next(new ForbiddenErr('У вас нет прав для удаления этой карточки')); }
  //   })
  //   .catch(next);
};

const putLike = (req, res, next) => {
  const { cardId } = req.params;
  if (!mongoose.isValidObjectId(cardId)) {
    throw new InvalidError('Некорректный id');
  }
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Данные не найдены');
      }
      res.send({ data: card });
    })
    .catch(next);
};

const deleteLike = (req, res, next) => {
  const { cardId } = req.params;
  if (!mongoose.isValidObjectId(cardId)) {
    throw new InvalidError('Некорректный id');
  }
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Данные не найдены');
      }
      res.send({ data: card });
    })
    .catch(next);
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  putLike,
  deleteLike,
};
