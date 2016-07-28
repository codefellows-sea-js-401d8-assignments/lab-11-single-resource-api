'use strict';

const server = require('express')();
const router = require('./route/router');
const morgan = require('morgan');
const errorResponse = require('./lib/error_response');

server.use(morgan('dev'));
server.use(errorResponse);
server.use('/', router);


module.exports = server;
