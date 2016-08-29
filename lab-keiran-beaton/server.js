'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const foodRouter = require('./route/food-router');
const Promise = require('./lib/promise');

const LOCAL_DB_SERVER = 'mongodb://localhost/dev_db';
const DB_SERVER = process.env.DB_SERVER || LOCAL_DB_SERVER;

mongoose.Promise = Promise;
mongoose.connect(DB_SERVER);

app.use('/api/food', foodRouter);

app.use((err, req, res, next) => {
  res.status(err.statusCode).json(err.message);
});

module.exports = app.listen(3000, () => console.log('server is up on 3000'));
