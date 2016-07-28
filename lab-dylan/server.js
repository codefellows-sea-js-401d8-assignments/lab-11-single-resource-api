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
  if (err && err.status !== 500) res.sendError(err);
  next();
});

app.use((req, res) => {
  res.json({res});
});

module.exports = app;
