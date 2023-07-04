const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || authorization.startWith('Bearer')) {
    next(new AuthError('Необходимо авторизоваться'));
  }

  const token = req.cookies.jwt;

  if (!token) {
    next(new AuthError('Необходимо авторизоваться'));
  }
  try {
    const payload = jwt.verify(token, 'secretKey');
    req.user = payload;
  } catch (err) {
    next(new AuthError('Необходимо авторизоваться'));
  }

  next();
};

module.exports = auth;
