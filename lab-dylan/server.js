'use strict';
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const pokemonRouter = require('./route/pokemon-router');
const AppError = require('./lib/AppError');

const LOCAL_DB_SERVER = 'mongoddb://localhost/dev_db';
const DB_SERVER = process.env.DB_SERVER || LOCAL_DB_SERVER;

mongoose.connect(DB_SERVER);

app.use('/api/pokemon', pokemonRouter);

app.use((err, req, res, next) => {
  let error = err;
  next(error);
});

app.use((req, res) => {
  let err = new AppError(new Error(), 404, 'Route not found');
  res.json({err});
});

module.exports = app;
