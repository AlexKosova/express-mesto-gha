import {
  find, create, findById, findByIdAndUpdate,
} from '../models/user';
import InvalidError from '../errors/InvalidError';
import NotFoundError from '../errors/NotFoundError';
import { ERROR_INVALID } from '../utils/constants';

const getUsers = (req, res, next) => {
  find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  create({ name, about, avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === ERROR_INVALID) {
        next(new InvalidError(err.message));
      } else next(err);
    });
};

const getUserById = (req, res, next) => {
  const { _id } = req.params;
  findById(_id)
    .onFail(new Error('NotFound'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        new NotFoundError(err.message);
      } else {
        next(err);
      }
    });
};

const updateProfile = (req, res, next) => {
  const data = {
    name: req.body.name,
    about: req.body.about,
  };
  findByIdAndUpdate(req.user._id, data, { new: true })
    .onFail(new Error('NotFound'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'NotFound') {
        new NotFoundError(err.message);
      } else {
        next(err);
      }
    });
};

const updateAvatar = (req, res, next) => {
  const data = {
    avatar: req.body.avatar,
  };
  findByIdAndUpdate(req.user._id, data)
    .onFail(new Error('NotFound'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'NotFound') {
        new NotFoundError(err.message);
      } else {
        next(err);
      }
    });
};

export default {
  getUsers,
  createUser,
  getUserById,
  updateProfile,
  updateAvatar,
};
