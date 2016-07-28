'use strict';
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const pokemonRouter = require('./route/pokemon-router');
const AppError = require('./lib/AppError');
const morgan = require('morgan');
const errResponse = require('./lib/error_response');

const LOCAL_DB_SERVER = 'mongodb://localhost/dev_db';
const DB_SERVER = process.env.DB_SERVER || LOCAL_DB_SERVER;

mongoose.connect(DB_SERVER);

app.use(errResponse());
app.use(morgan('dev'));
app.use('/api/pokemon', pokemonRouter);

app.use((err, req, res, next) => {
  if (err.error.type === 'AppError') res.send(err.error.message);
  next();
});

app.use((req, res) => {
  // let err = new AppError(new Error(), 404, 'Route not found');
  res.json({res});
});

module.exports = app;
