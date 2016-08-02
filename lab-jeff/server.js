'use strict';

const pokemonRouter = require('./route/pokemonRouter');
const trainerRouter = require('./route/trainerRouter');
const bodyParser = require('body-parser');
const express = require('express');
let app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const serverPort = 3000;

const mongoServer = 'mongodb://localhost/pokemonDatabase';
const mongoTestServer = process.env.mongoTestServer || mongoServer;

mongoose.connect(mongoTestServer);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: 'true'}));
app.use(morgan('dev'));
app.use('/api/trainer', trainerRouter);
app.use('/api/pokemon', pokemonRouter);

app.get('*', (req, res, next) => {
  let handledError = new Error();
  handledError.status = 400;
  next(handledError);
});

app.use((err, req, res, next) => {
  if (err.status !== 400) {
    return next();
  }
  res.status(400).send(err.message || 'Invalid request, please try again.');
  next();
});


module.exports = exports = app.listen(serverPort, () => console.log('Server running at http://localhost:' + serverPort));
