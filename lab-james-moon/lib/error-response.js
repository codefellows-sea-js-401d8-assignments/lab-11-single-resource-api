'use strict';

module.exports = exports = function() {
  return (req, res, next) => {
    res.sendError = function(error) {
      if (error.type === 'AppError') {
        console.log('encountered AppError');
        return res.status(error.statusCode).send(error.message);
      }
      if (error.type !== 'AppError') {
        console.log('not an AppError');
        return res.status(500).send(error.message);
      }
    };
    next();
  };
};
