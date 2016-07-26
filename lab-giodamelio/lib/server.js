const express = require('express');
const bodyParser = require('body-parser');

const server = express();

server.use(bodyParser.json());
server.use('/api/pokemon', require('./routes/pokemon'));

module.exports = server;
