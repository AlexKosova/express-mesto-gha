import {
  create,
  find,
  findByIdAndRemove,
  findByIdAndUpdate,
} from '../models/card';
import InvalidError from '../errors/InvalidError';
import NotFoundError from '../errors/NotFoundError';
import { ERROR_INVALID } from '../utils/constants';

const createCard = (req, res, next) => {
  const data = {
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id,
  };
  console.log(req.user._id);
  create(data)
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === ERROR_INVALID) {
        next(new InvalidError(err.message));
      } else next(err);
    });
};

const getCards = (req, res, next) => {
  find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  findByIdAndRemove(cardId)
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
  findByIdAndUpdate(
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
  findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
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

export default {
  createCard, getCards, deleteCard, putLike, deleteLike,
};