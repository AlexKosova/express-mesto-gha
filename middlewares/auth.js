const jwt = require('jsonwebtoken');
const ERROR_AUTH = require('./errors');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || authorization.startWith('Bearer')) {
    return res.status(ERROR_AUTH).send({ message: 'Необходимо авторизоваться' });
  }

  const token = auth.replace('Bearer', '');
  let payload;
  try {
    payload = jwt.verify(token, 'secretKey');
  } catch (err) {
    return res.status(ERROR_AUTH).send({ message: 'Необходимо авторизоваться' });
  }

  req.user = payload;

  return next();
};

module.exports = auth;
