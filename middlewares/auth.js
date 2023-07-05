const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const InvalidError = require('../errors/InvalidError');

const auth = (req, res, next) => {
  // const { autorization } = req.headers;

  // if (!autorization || !autorization.startWith('Bearer ')) {
  //   next(new AuthError('Необходимо авторизоваться'));
  // }

  const token = req.headers.autorization.replace('Bearer', '');
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

  // const token = req.cookies.jwt;
  // const validToken = getToken(token);
  // if (!validToken) {
  //     return next(new AuthError('Необходимо авторизоваться'));
  //   }
  // req.user = validToken;
  // next();
};

module.exports = auth;
