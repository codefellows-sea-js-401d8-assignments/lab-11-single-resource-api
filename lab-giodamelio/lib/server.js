const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const sendError = require('./sendError');

const server = express();

server.use(bodyParser.json());
server.use(sendError());
server.use(morgan('dev'));

// Setup our resource routes
server.use('/api/pokemon', require('./routes/pokemon'));

// Throw an error to allow us to test our error handling
server.get('/500', () => {
  throw new Error('Horrible Thing has happened!');
});

// Catch errors
server.use((err, req, res, next) => { // eslint-disable-line
  res.sendError(err);
});

module.exports = server;
