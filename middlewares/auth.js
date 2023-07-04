const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startWith('Bearer')) {
    next(new AuthError('Необходимо авторизоваться'));
  }

  const token = authorization.replace('Bearer', '');
  let payload;

  try {
    payload = jwt.verify(token, 'secretKey');
  } catch (err) {
    next(new AuthError('Необходимо авторизоваться'));
  }
  req.user = payload;
  next();
};

module.exports = auth;
