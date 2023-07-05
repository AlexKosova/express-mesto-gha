const jwt = require('jsonwebtoken');

const getToken = (id) => jwt.sign({ id }, 'secretKey', {
  expiresIn: '7d',
});
module.exports = getToken;
