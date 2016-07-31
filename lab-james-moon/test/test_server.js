'use strict';
const app = require('express')();
const morgan = require('morgan');
const mongoose = require('mongoose');
const AppError = require('../lib/app-error');
const errorResponse = require('../lib/error-response');
const heroRouter = require('../route/heroRouter');

const LOCAL_DB_SERVER = 'mongodb://localhost/dev_db';
const DB_SERVER = process.env.DB_SERVER || LOCAL_DB_SERVER;

mongoose.connect(DB_SERVER);

app.use(errorResponse());
app.use(morgan('dev'));
app.use('/api', heroRouter);

app.use((req, res) => {
  return res.sendError(AppError.status404('not found'));
});

module.exports = app;
