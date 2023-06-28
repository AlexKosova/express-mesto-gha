const { default: mongoose } = require('mongoose');
const User = require('../models/user');
const InvalidError = require('../errors/InvalidError');
const NotFoundError = require('../errors/NotFoundError');
const { ERROR_INVALID, ERROR_NOT_FOUND } = require('../utils/constants');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === ERROR_INVALID || err.name === 'ValidationError') {
        next(new InvalidError(err.message));
      } else next(err);
    });
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;
  if (!mongoose.isValidObjectId(userId)) {
    throw new InvalidError(ERROR_INVALID);
  }
  User.findById(userId)
    .then((user) => {
      if (!user) { throw new NotFoundError(ERROR_NOT_FOUND); }
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      next(err);
    });
};

const updateProfile = (req, res, next) => {
  const { _id } = req.params;
  const data = {
    name: req.body.name,
    about: req.body.about,
  };
  User.findByIdAndUpdate(_id, data, { new: true, runValidators: true })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === ERROR_INVALID || err.name === 'ValidationError') {
        next(new InvalidError(err.message));
      } else {
        next(err);
      }
    });
};

const updateAvatar = (req, res, next) => {
  const { _id } = req.params;
  const data = {
    avatar: req.body.avatar,
  };
  User.findByIdAndUpdate(_id, data, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'NotFound') {
        NotFoundError(err.message);
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateProfile,
  updateAvatar,
};
