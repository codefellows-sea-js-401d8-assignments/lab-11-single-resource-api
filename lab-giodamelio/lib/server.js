const express = require('express');

const server = express();

server.use('/pokemon', require('./routes/pokemon'));

module.exports = server;
