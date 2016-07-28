'use strict';

const pokemonRouter = require('./route/pokemonRouter');
const bodyParser = require('body-parser');
const express = require('express');
let app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const serverPort = 9000;

const mongoTestServer = 'mongodb://localhost/testDatabase';

mongoose.connect(mongoTestServer);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: 'true'}));
app.use(morgan('dev'));
app.use('/api', pokemonRouter);

app.get('*', (req, res, next) => {
  let handledError = new Error();
  handledError.status = 404;
  next(handledError);
});

app.use((err, req, res, next) => {
  if (err.status !== 404) {
    return next();
  }
  res.status(404).json('Page not found...');
  res.end();
});


module.exports = exports = app.listen(serverPort, () => console.log('Server running at http://localhost:' + serverPort));
