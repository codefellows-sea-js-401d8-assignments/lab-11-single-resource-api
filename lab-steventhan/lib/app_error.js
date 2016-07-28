'use strict';

let AppError = function (message, statusCode, responseMessage) {
  this.message = message;
  this.statusCode = statusCode;
  this.responseMessage = responseMessage;
};

AppError.isAnInstance = function (error) {
  return error instanceof AppError;
};

AppError.new400 = function (message) {
  return new AppError(message, 400, '400 Bad Request');
};

AppError.new404 = function (message) {
  return new AppError(message, 404, '404 Not Found');
};

AppError.new500 = function (message) {
  return new AppError(message, 500, '500 Internal Server Error');
};

module.exports = AppError;
