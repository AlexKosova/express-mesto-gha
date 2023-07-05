const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const InvalidError = require('../errors/InvalidError');
const JWT_KEY = require('../controllers/users');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startWith('Bearer ')) {
    next(new AuthError('Необходимо авторизоваться'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_KEY);
  } catch (err) {
    next(new InvalidError('Что-то пошло не так...'));
  }

  req.user = payload;
};

module.exports = auth;
