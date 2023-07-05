const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const InvalidError = require('../errors/InvalidError');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startWith('Bearer ')) {
    next(new AuthError('Необходимо авторизоваться'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'secretKey');
    if (!payload) {
      next(new AuthError('Необходимо авторизоваться'));
    }
  } catch (err) {
    next(new InvalidError('Что-то пошло не так...'));
  }

  req.user = payload;
};

module.exports = auth;
