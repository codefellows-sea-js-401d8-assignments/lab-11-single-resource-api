'use strict';

let AppError = require('./app_error');
let errorLog = require('debug')('app:errorresponse');


let errorResponse = (req, res, next) => {
  res.sendError = (error) => {
    errorLog(error.message);
    if (AppError.isAnInstance(error)) {
      return res.status(error.statusCode).json({status: error.statusCode, msg: error.responseMessage});
    }
    return res.status(500).json({status: 500, msg: 'Internal Server Error'});
  };
  next();
};


module.exports = errorResponse;
