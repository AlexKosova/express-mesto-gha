const routes = require('express').Router();
const Joi = require('joi');
const { celebrate } = require('celebrate');
const NotFoundError = require('../errors/NotFoundError');
const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');

routes.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
  }),
}), login);

routes.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^https?:\/\/(?:www\.)?[a-zA-Z0-9а-яА-Я-._~:/?#[\]@!$&'()*+,;=]+/im),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
  }),
}), createUser);

routes.use('/users', auth, userRouter);
routes.use('/cards', auth, cardRouter);

routes.use(() => {
  throw new NotFoundError('Страница не найдена');
});

module.exports = routes;
