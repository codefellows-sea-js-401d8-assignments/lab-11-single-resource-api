'use strict';

const express = require('express');
const morgan = require('morgan');

const port = process.argv[2] || process.env.PORT || 3000;
const server = express();

server.use(morgan('dev'));
server.use(funMidWare);

function funMidWare(req, res, next) {
  console.log('hello from funMidWare');
  next();
}

server.get('/', (req, res) => {
  res.status(200).json({hello: 'from endware'});
});

module.exports = server.listen(port, () => {
  console.log('server up on port ' + port);
});
