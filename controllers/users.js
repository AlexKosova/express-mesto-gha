/* eslint-disable no-undef */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const RegisterError = require('../errors/RegisterError');
const NotFoundError = require('../errors/NotFoundError');
const InvalidError = require('../errors/InvalidError');
const { ERROR_INVALID } = require('../utils/constants');

const JWT_KEY = 'secretKey';

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then(
      (hash) => User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      }),
    )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === 11000 || err.code === 11001) {
        next(new RegisterError('Пользователь уже существует'));
      }
      if (err.code === ERROR_INVALID || err.name === 'ValidationError') {
        next(new InvalidError('Введены некорректные данные'));
      } else next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_KEY, {
        expiresIn: '7d',
      });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      }).send({ token });
    }).catch(next);
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;
  if (!mongoose.isValidObjectId(userId)) {
    throw new InvalidError('Некорректный id пользователя');
  }
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      next(err);
    });
};

const getUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .then((user) => res.send(user))
    .catch((err) => {
      next(err);
    });
};

const updateProfile = (req, res, next) => {
  const { _id } = req.user;
  const data = {
    name: req.body.name,
    about: req.body.about,
  };
  User.findByIdAndUpdate(_id, data, { new: true, runValidators: true })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === ERROR_INVALID || err.name === 'ValidationError') {
        next(new InvalidError('Введены некорректные данные'));
      } else {
        next(err);
      }
    });
};

const updateAvatar = (req, res, next) => {
  const { _id } = req.user;
  const data = { avatar: req.body.avatar };
  User.findByIdAndUpdate(_id, data, { runValidators: true, new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === ERROR_INVALID || err.name === 'ValidationError') {
        next(new InvalidError('Неверная ссылка'));
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
  login,
  getUser,
};
