const User = require('../models/user');
const InvalidError = require('../errors/InvalidError');
const NotFoundError = require('../errors/NotFoundError');
const { ERROR_INVALID } = require('../utils/constants');

const getUsers = (res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === ERROR_INVALID) {
        next(InvalidError(err.message));
      } else next(err);
    });
};

const getUserById = (req, res, next) => {
  User.findById(req.params._id)
    .onFail(new Error('NotFound'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.message === 'NotFound') {
        NotFoundError(err.message);
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
  User.findByIdAndUpdate(req.user._id, data, { new: true })
    .onFail(new Error('NotFound'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === 'NotFound') {
        NotFoundError(err.message);
      } else {
        next(err);
      }
    });
};

const updateAvatar = (req, res, next) => {
  const data = {
    avatar: req.body.avatar,
  };
  User.findByIdAndUpdate(req.user._id, data)
    .onFail(new Error('NotFound'))
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
