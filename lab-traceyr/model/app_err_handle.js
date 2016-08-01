'use strict';
let AppError = function(message, statusCode, responseMessage){
  this.message = message;
  this.statusCode = statusCode;
  this.responseMessage = responseMessage;
};

AppError.prototype.response = function(res){
  res.status(this.statuCode).json(this.message);
};

AppError.checkForError = function(err){
  return err instanceof AppError;
};

AppError.error400 = function(message){
  return new AppError(message, 400, 'bad request');
};

AppError.error404 = function(message){
  return new AppError(message, 404, 'not found');
};

AppError.error500 = function(message){
  return new AppError(message, 500, 'internal server error');
};

module.exports = exports = AppError;
