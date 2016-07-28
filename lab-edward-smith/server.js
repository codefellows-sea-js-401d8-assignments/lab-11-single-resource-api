'use strict';

const express  = require('express');
const app = express();
const mongoose = require('mongoose');
const movieRouter = require('./route/routes');
const morgan = require('morgan');
const errorResponse = require('./lib/errorModule');
const debug = require('debug');

const LOCAL_DB = 'mongodb://localhost/movie_db';
const DB_SERVER = process.env.DB_SERVER || LOCAL_DB;

mongoose.connect(DB_SERVER);

app.use(morgan('dev'));
app.use(errorResponse());
app.use('/api/movie', movieRouter);

app.all('*', (req, res) => {
  debug('404 on all');
  res.status(404).send('not found');
});

const server = app.listen(3000, () => console.log('server up on 3000'));

module.exports = server;
