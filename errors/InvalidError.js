import { ERROR_INVALID } from '../utils/constants';

class InvalidError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_INVALID;
  }
}

export default { InvalidError };
