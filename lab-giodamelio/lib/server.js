const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const server = express();

server.use(bodyParser.json());
server.use(morgan('dev'));
server.use('/api/pokemon', require('./routes/pokemon'));

module.exports = server;
