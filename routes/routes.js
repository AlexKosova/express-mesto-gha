const routes = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');
const { ERROR_NOT_FOUND } = require('../utils/constants');

routes.use(() => {
  throw new NotFoundError(ERROR_NOT_FOUND);
});

module.exports = routes;
