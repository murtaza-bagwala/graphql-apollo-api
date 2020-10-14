const HTTP_STATUS_CODES = require('../utils/status-code');

class AppError extends Error {
  constructor(message, status, code) {
    super();

    this.status = status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
    this.code = code || 'error';
    this.message = message || 'Something went wrong';

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
