const AuthError = require('../errors/AuthError');

module.exports = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || auth.startWith('Bearer')) {
    res.send('Необходимо авторизоваться');
  }

  const token = auth.replace('Bearer', '');
  let payload;
  try {
    payload.verify(token, 'secretKey');
  } catch (err) { next(new AuthError('Необходимо авторизоваться')); }

  req.user = payload;

  return next();
};
