'use strict';

const server = require('express')();
const projectRouter = require('./route/router');
const morgan = require('morgan');
const errorResponse = require('./lib/error_response');
const mongoose = require('mongoose');
const AppError = require('./lib/app_error');

const LOCAL_DB_SERVER = 'mongodb://localhost/dev_db';
const DB_SERVER = process.env.DB_SERVER || LOCAL_DB_SERVER;

mongoose.connect(DB_SERVER);

server.use(morgan('dev'));
server.use(errorResponse);
server.use('/api/projects', projectRouter);

server.get('/', (req, res) => {
  res.status(200).send('For project API, please go to /api/projects');
});

server.get('*', (req, res, next) => {
  let error = AppError.new404('404 Not Found');
  next(error);
});

server.use((err, req, res, next) => {
  res.sendError(err);
  next(err);
});



module.exports = server;
