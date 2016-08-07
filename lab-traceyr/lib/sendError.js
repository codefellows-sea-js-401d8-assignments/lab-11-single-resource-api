'use strict';
const AppError = require('../model/app_err_handle');

let sendError = function(req, res, next){
  res.sendError = function(err){
    if(err){
      console.log(err.message);
      if(AppError.checkForError(err)){
        return res.status(err.statusCode).send(err.responseMessage);
      }
      res.status(500).send('internal server problem');
    }
  };
  next();
};

module.exports = exports = sendError;
