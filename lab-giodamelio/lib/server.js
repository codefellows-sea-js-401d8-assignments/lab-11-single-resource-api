const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const sendError = require('./sendError');

const server = express();

server.use(bodyParser.json());
server.use(sendError());

if (process.env.NODE_ENV !== 'testing') {
  server.use(morgan('dev'));
}

server.use('/api/pokemon', require('./routes/pokemon'));

module.exports = server;
