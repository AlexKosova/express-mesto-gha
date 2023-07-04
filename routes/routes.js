const routes = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');
const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');

routes.post('/signin', login);
routes.post('/signup', createUser);

routes.use('/users', auth, userRouter);
routes.use('/cards', auth, cardRouter);

routes.use(() => {
  throw new NotFoundError('Страница не найдена');
});

module.exports = routes;
