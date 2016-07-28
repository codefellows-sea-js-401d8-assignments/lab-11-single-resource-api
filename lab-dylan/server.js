'use strict';
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const pokemonRouter = require('./route/pokemon-router');
const morgan = require('morgan');
const errResponse = require('./lib/error_response');

const LOCAL_DB_SERVER = 'mongodb://localhost/dev_db';
const DB_SERVER = process.env.DB_SERVER || LOCAL_DB_SERVER;

mongoose.connect(DB_SERVER);

app.use(errResponse());
app.use(morgan('dev'));
app.use('/api/pokemon', pokemonRouter);


module.exports = app;
