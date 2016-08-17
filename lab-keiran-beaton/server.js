'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const foodRouter = require(__dirname + '/route/food-router');

const LOCAL_DB_SERVER = 'mongodb://localhost/dev_db';
const DB_SERVER = process.env.DB_SERVER || LOCAL_DB_SERVER;

mongoose.connect(DB_SERVER);

app.use('/api/food', foodRouter);

app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message
  });
  next(err);
});

module.exports = app.listen(3000, () => console.log('server is up'));
