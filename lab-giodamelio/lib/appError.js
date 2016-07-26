const debug = require('debug')('lab:apperror');

function AppError(res, message, statusCode, responseMethod) {
  debug(`Error: ${message}`);
  res.status(statusCode).json(responseMethod);
}

AppError.notFound = function(res, message) {
  return new AppError(res, message, 404, {
    error: 'Not found',
  });
};

AppError.badRequest = function(res, message) {
  return new AppError(res, message, 400, {
    error: 'Bad request',
  });
};

module.exports = AppError;
