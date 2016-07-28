'use strict';
const app = require('express')();
const debug = require('debug');
const serverErrLog = debug('hero:errors');
const bodyParser = require('body-parser').json();
const heroRouter = require('./route/heroRouter');

app.use('/api', heroRouter);

app.listen(3000, () => console.log('server is up'));
