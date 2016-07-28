'use strict';

let appError = function(error, statusCode, message, errCb) {
  return function(error) {
    errCb({error, statusCode, message, type:'AppError'});
  };
};

module.exports = exports = appError;
