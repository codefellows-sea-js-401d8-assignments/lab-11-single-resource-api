'use strict';

const express = require('express');
const fs = require('fs');
const pokeRouter = require('../route/router.js');
const morgan = require('morgan');
const resError = require('./response_error.js');
const port = 3000;

let server = module.exports = exports = express();

let accessLogStream = fs.createWriteStream('./access.log', {
  flags: 'a'
});

server.use(morgan('combined', {
  stream: accessLogStream
}));

server.use(resError);

server.use('/api', pokeRouter);

server.listen(port, () => {
  console.log('server up on ' + port);
});
