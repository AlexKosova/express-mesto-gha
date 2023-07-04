const routes = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');
const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');

routes.post('/signin', login);
routes.post('/signup', createUser);

routes.use(auth);

routes.use(userRouter);
routes.use(cardRouter);

routes.use(() => {
  throw new NotFoundError('Страница не найдена');
});

module.exports = routes;
