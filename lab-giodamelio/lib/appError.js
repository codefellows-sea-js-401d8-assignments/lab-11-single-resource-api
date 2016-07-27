const debug = require('debug')('lab:apperror');

function AppError(status, message) {
  debug(`Error: ${message}`);
  this.status = status;
  this.message = message;
}

module.exports = AppError;
