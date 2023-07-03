const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getUserById, updateProfile, updateAvatar, getUser,
} = require('../controllers/users');

userRouter.get('/users', getUsers);
userRouter.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24),
  }),
}), getUserById);
userRouter.get('/users/me', getUser);
userRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);
userRouter.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/^https?:\/\/(?:www\.)?[a-zA-Z0-9а-яА-Я-._~:/?#[\]@!$&'()*+,;=]+/im),
  }),
}), updateAvatar);

module.exports = userRouter;
